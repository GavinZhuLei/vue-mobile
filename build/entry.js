'use strict'
const path = require('path')
const fs = require('fs')

const moduleDir = path.resolve(__dirname, '../src/modules')

let entryObj = {}

let moduleItems = fs.readdirSync(moduleDir)

moduleItems.forEach(item => {
  entryObj[`${item}`] = `./src/modules/${item}/main.js`
})

module.exports = entryObj
