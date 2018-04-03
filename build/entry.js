'use strict'
const path = require('path')
const fs = require('fs')

const moduleDir = path.resolve(__dirname, '../src/modules')

console.log('log dir')
console.log(moduleDir)

let entryObj = {}

let moduleItems = fs.readdirSync(moduleDir)
console.log(moduleItems)

moduleItems.forEach(item => {
  entryObj[`${item}`] = `./src/modules/${item}/main.js`
})

module.exports = entryObj
