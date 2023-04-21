# babel-plugin-vue-tracker
#### 使用注释实现vue自动埋点的babel插件

### 安装
```js
npm install babel-plugin-vue-tracker or  yarn add babel-plugin-vue-tracker -D
```
### 配置
在.babelrc或babel.config.js等配置文件中
```js
{
    "plugins": [
        [
            "babel-plugin-vue-tracker",
            {
                {
                    trackerName: 'trackerMethodName', // Vue.prototype.trackerMethodName() 自定义在Vue上的原型方法。
                }
            }
        ]
    ]
}
```
### 使用方法

1. 在vue项目下main.js中添加
```js
Vue.prototype.trackerMethodName = (params) => {
    // do something
}
```
2. 在组件中的方法中
```js
methods: {
    /**
   * autotracker
   * @param {number} trackerId - 埋点id
   */
    init(trackerId) {
        console.log(trackerId)
    },
}
```

注意点：

1. 第一个注释需要指定为：autoTracker，告诉
2. babel-plugin-vue-tracker该函数需要自动埋点。
注释中声明的参数需要和函数中的参数名称以及位置一一对应。