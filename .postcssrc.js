// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    // "autoprefixer": {} // 去除默认autoprefixer
    "postcss-aspect-ratio-mini": {},
    "postcss-write-svg": {
      utf8: false
    },
    "postcss-cssnext": {}, // 具有autoprefixer
    "postcss-px-to-viewport": {
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 3, //指定`px`转换为视窗单位值的小数位数
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以无限添加
      minPixelValue: 1,
      mediaQuery: false, // 允许在媒体查询中转换`px`
    },
    "postcss-viewport-units": {},
    "cssnano": {
      preset: "advanced",
      autoprefixer: false, //与cssnext autoprefixer重复
      "postcss-zindex": false, // 此处是个天坑，启用这个插件 z-index 的值会被重复置为1
    }
  }
}
