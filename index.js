
const fs = require("fs");
const Mustache = require('mustache');
const _ = require('lodash');
const args = require('minimist')(process.argv.slice(2));
// 从命令行获取 文件路径// 默认去，走测试临时文件
let filePath = args._[0]||"./template/tmp.json";

let tmplPath = "./template/tsd.tmp.mustache";
let typePath = "./template/type.mustache";
console.log("开始读取json");
let viewJson;
try{
    viewJson = JSON.parse(fs.readFileSync(filePath, 'UTF-8'));
}catch(e){
    console.log("JSON文件不正确，请检查！")
    process.exit(0);
}
let viewTmpl = fs.readFileSync(tmplPath,"UTF-8");
let viewType = fs.readFileSync(typePath,"UTF-8");
console.log("正在生成代码");
let tsdSourceCode = Mustache.render(viewTmpl,viewJson,{
    type:viewType
})
let fileName = viewJson.className;
let outFilePath = `${__dirname}/${fileName}.d.ts`;
fs.writeFileSync(outFilePath,tsdSourceCode,"UTF-8");
console.log(`${__dirname}/${fileName}.d.ts，文件创建成功！`);
process.exit(0);