const glob = require('glob')

function getEntry(globPath) {
  const entries = {}

  glob.sync(globPath).forEach((entry) => {
    const entryArray = entry.split('/')
    const moduleName = entryArray[entryArray.length - 2]
    entries[moduleName] = {
      entry: `src/modules/${moduleName}/main.js`,
      template: 'public/index.html',
      filename: `${moduleName}.html`,
    }
  })

  return entries
}

const pages = getEntry('./src/modules/**?/')
console.log(pages)

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  pages,
  lintOnSave: false,
  chainWebpack: (config) => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end();
  },
}
