// import * as t from '@babel/types';
// import template from '@babel/template';

module.exports = ({ types: t}) => {
    return {
        name: "babel-plugin-vue-tracker",
        visitor: {
            ArrowFunctionExpression(path) {
                console.log(path)
            }
        }
    }
}