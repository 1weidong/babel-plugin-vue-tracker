const generator = require('@babel/generator').default;
const { codeFrameColumns } = require('@babel/code-frame');

const AUTOTRACKER = 'autotracker';
// 获取注释中的参数
function parseComment(commentParamAry) {
    // 获取注释中的参数
    const paramAry = commentParamAry.map(param => {
        const type = param.replace(/.*{(.*)}.*/, '$1'); // 获取参数类型
        const fieldStr = param.split('}')[1]; // 获取字段信息
        let name = fieldStr;
        let description = '';

        // 判断参数是否有描述
        if (fieldStr.indexOf("-")) {
            const fielAry = fieldStr.split('-');
            name = fielAry[0];
            description = fielAry[1];
        }

        return {
            type,
            name,
            description,
        };
    })
    return paramAry;
}

// 判断函数中是否声明了注释中的参数
function verifyFuncParams(path, paramAry) {
    const params = path.get("params");
    let errorResult = '';

    const isError = paramAry.some((param, index) => {
        const paramNode = params[index] || params[index - 1];
        if (param.name !== paramNode.node.name) {
            const commentLoc = path.get('leadingComments')[0].node.loc;
            const commentEndLine = commentLoc.end.line - commentLoc.start.line + 1;
            const codeStartLine = commentEndLine + 1;
            const {code} = generator(path.node);
            const loc = paramNode.node.loc;
            const location = {
                start: { line: codeStartLine, column: loc.start.column },
                end: { line: codeStartLine, column: loc.end.column },
            }

            errorResult = codeFrameColumns(
                code,
                location,
                {
                    highlightCode: true,
                    message: `变量：${param.name} 未在函数中声明`
                }
            )

            return true;
        }
        return false;
    });

    if(isError && errorResult) {
        throw new Error(errorResult);
    }

    return isError;
}

function setAutoTracker(path, state, template, comentNode) {
    if (comentNode.type === "CommentBlock") {
        // 提取注释
        const comentStr = comentNode.value.replace(/\s+/g, ""); // 去除空格
        const comentStrAry = comentStr.split('*').filter((item) => item); // 提取内容并去除空值
        const name = comentStrAry[0]; // 获取注释标题
        // 判断注释标题为AUTOTRACKER - 自动埋点标识
        if (name === AUTOTRACKER) {
            // 获取注释中的参数
            const commentParamAry = comentStrAry.slice(1);
            const paramAry = parseComment(commentParamAry)

            const isError = verifyFuncParams(path, paramAry);

            // 注释中的参数未在函数中声明则跳过
            if(isError) return path.skip();

            const trackerImportName = state.opts.trackerName;

            // 函数插装：将埋点函数插入
            const callParamsStr = paramAry.map((param => param.name)).join(', ');
            path.get("body").node.body.unshift(template(`this.${trackerImportName}({${callParamsStr}})`)());
        }
    }
}
module.exports = function (babel) {
  const { types: t, template } = babel;

  return {
    visitor: {
        ObjectMethod(path, state) {
            const coment = path.get("leadingComments")[0] || {};
            const comentNode = coment.node;
            // console.log(comentNode)
            if (comentNode) {
                setAutoTracker(path, state, template, comentNode); 
            }
        }
    },
  };
};
