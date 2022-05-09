import path from 'path'
import fs from 'fs'
import type koa from 'koa'


const filePathInfo = (p: string) => path.parse(p)

/**
 * @name: autoImportFiles
 * @description: 自动引入文件夹内的文件
 * @param {string} dir 文件夹路径
 * @param {boolean} isRecursive 是否递归
 * @param {RegExp} re 要引入文件的正则
 * @return {*}
 */
const autoImportFiles = (dir: string, isRecursive: boolean = false, re: RegExp) => {
  let fileList: Array<any> = []

  function readFileList(dir: string, isRecursive: boolean = false, re: RegExp) {
    const files = fs.readdirSync(dir)
    files.forEach(item => {
      // 获得文件完整路径
      const fullPath = path.join(dir, item)
      // 获取文件信息
      const stat = fs.statSync(fullPath)
      // 如果是文件夹并且需要递归，则执行
      if (stat.isDirectory() && isRecursive) {
        readFileList(item, isRecursive, re)
      } else {
        // 判断是否是需要操作的文件
        const fileInfo = filePathInfo(item)
        re.test(fileInfo.base) && fileList.push(fullPath)
      }
    })
  }

  readFileList(dir, isRecursive, re)

  fileList = fileList.map(file => ({
    path: file,
    data: () => import(file),
    ...filePathInfo(file)
  }))

  return fileList
}

/**
 * @name: autoRegisterRouter
 * @description: 自动注册路由
 * @param {string} dir 文件夹路径
 * @param {boolean} isRecursive 是否递归
 * @param {RegExp} re 要引入文件的正则
 * @param {koa} app
 * @return {*}
 */
const autoRegisterRouter = (dir: string, isRecursive: boolean = false, re: RegExp, app: koa) => {
  const files = autoImportFiles(dir, isRecursive, re)
  files.forEach(async item => {
    const res = await item.data()
    app.use(res.default.routes())
  })
}
export default autoRegisterRouter