const readlineSync = require('readline-sync')
const fs = require('fs')
const path = require('path')

let moduleName = readlineSync.question('your module name: ')

const modulePath = path.resolve(__dirname, '../src/modules', moduleName)
const templatePath = path.resolve(__dirname, '../template')

if (fs.existsSync(modulePath)) {
  console.error(`${moduleName} module is exists`)
  process.exit()
}

fs.mkdirSync(modulePath)
fs.mkdirSync(path.join(modulePath, 'router'))
fs.mkdirSync(path.join(modulePath, 'views'))
fs.mkdirSync(path.join(modulePath, 'views/home'))

// 复制模板中的文件到目标文件夹
const sourceFile = [
  'main.js',
  'App.vue',
  'router/index.js',
  'views/home/Index.vue'
]
const copy = (source) => {
  for (let sitem of source) {
    let fileText = fs.readFileSync(path.join(templatePath, sitem))

    // todo: 对读取的内容进行操作

    fs.writeFileSync(path.join(modulePath, sitem), fileText)
  }
}

copy(sourceFile)

console.log('success!')
