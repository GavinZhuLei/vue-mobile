// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "postcss-import": {},
    "autoprefixer": {},
    "postcss-px-to-viewport": {
      "viewportWidth": 375,
      "viewportHeight": 667,
      "unitPrecision": 5,
      "viewportUnit": "vw",
      "selectorBlackList": [],
      "minPixelValue": 1,
      "mediaQuery": false
    }
  }
}
