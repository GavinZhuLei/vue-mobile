# 使用vw实现移动端适配

> 随着viewport单位越来越受到众多浏览器的支持，决定采用vw来做移动端的适配

如果设计稿使用750px宽度，那么100vw = 750px，即1vw = 7.5px，直接通过设计图上px值转换成vw值。为了解决px到vw的转换计算，使用 **postcss-px-to-viewport** 插件完成

- 首先安装插件
    ```bash
    npm install postcss-px-to-viewpor --save-dev
    ```
- 在 .postcssrc.js 中配置参数
    ```js
    module.exports = {
        "postcss-px-to-viewport": {
          viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
          viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
          unitPrecision: 3, //指定`px`转换为视窗单位值的小数位数
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
          selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以无限添加
          minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
          mediaQuery: false, // 允许在媒体查询中转换`px`
        }
    }
    ```
如果不想把px转换成vw，首先在对应的元素（html）中添加配置中指定的类名.ignore或.hairlines(.hairlines一般用于设置border-width:0.5px的元素中)

```html
<div class="box ignore"></div>
```

css:

```css
.ignore {
    margin: 10px;
    background-color: red;
}
.box {
    width: 180px;
    height: 300px;
}
.hairlines {
    border-bottom: 0.5px solid red;
}
```

编译后：

```css
.box {
    width: 24vw;
    height: 40vw;
}
.ignore {
    margin: 10px; /*.box元素中带有.ignore类名，在这个类名写的`px`不会被转换*/
    background-color: red;
}
.hairlines {
    border-bottom: 0.5px solid red;
}
```
