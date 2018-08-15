# vue-mobile

> 采用vue实现快速native应用开发，采用APICloud打包应用，实现一套代码多端运行
> 项目引入vux组件库可以使开发效率更加快

## 特性

- 通过命令快速生成模块代码：避免繁琐的新建window, frame 布局页面，编写重复的代码（此处参考APICloud开发文档实现最佳体验）
- sass支持
- 自动添加浏览器前缀：autoprefixer
- 使用vw实现移动端适配： [查看文档](https://github.com/GavinZhuLei/vue-mobile/blob/v1.1/doc/vw.md)
- 处理移动端1px的解决方案（参考vux组件库文档）

## 代码目录

```js
+-- build/                ---webpack打包文件目录
|   --- entry.js               ---获取入口文件
|   --- module.js              ---生成module模块代码，一个module对应一个入口
|   --- plugins.js             ---开发环境webpack插件配置
|   --- plugins.prod.js        ---生产环境webpack插件配置
|   --- webpack.base.conf.js   ---webpack loader配置
|   --- ...
+-- config/               ---webpack打包配置目录
+-- src/                  ---源代码目录
|   +-- assets/                ---资源存放目录
|   +-- components/            ---公用组件
|   +-- modules/               ---项目模块目录
|   |   +-- moudule1                ---项目模块，对应一个入口，可以通过命令自动创建
|   |   |   --- App.vue                   ---根组件
|   |   |   --- main.js                   ---模块入口文件
+-- template/             ---模块模板文件目录
--- index.html            ---html模板文件
+-- static/
|   --- config.xml      --- APICloud打包配置文件，配置具体参考APICloud开发文档
|   +-- script/        --- 本地js文件
|   +-- style/        ---本地样式文件
+-- dist/         --- vue项目打包目录，同时也是APICloud打包目录（通过npm run build自动生成）
```

## 准备开始
1. 在APICloud官网创建应用并且配置应用，（此处不对如何使用APICloud过多讲解，具体操作请到APICloud官网查看），可下载 APICloud Studio 2 实现手机上实施查看效果
2. 源码中提供了一个简单的例子，创建应用需要配置几个模块如下图：

	![](https://github.com/GavinZhuLei/vue-mobile/blob/native/images/1.png)


## 安装运行

``` bash
# 安装依赖
npm install

# 生产环境打包压缩，生成dist/目录用于APICloud打包成app
npm run build

# 创建模块，自动在src/modules/下生成模板代码和入口文件
npm run module
```
