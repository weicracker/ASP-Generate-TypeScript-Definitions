
const fs = require("fs");
const Mustache = require('mustache');
const _ = require('lodash');


let filePath = "./template/tmp.json";
let tmplPath = "./template/tsd.tmp.mustache";
let typePath = "./template/type.mustache";

let viewJson = JSON.parse(fs.readFileSync(filePath, 'UTF-8'));
let viewTmpl = fs.readFileSync(tmplPath,"UTF-8");
let viewType = fs.readFileSync(typePath,"UTF-8");

let tsdSourceCode = Mustache.render(viewTmpl,viewJson,{
    type:viewType
})
let fileName = viewJson.className;
let outFilePath = `${__dirname}/${fileName}.d.ts`;
fs.writeFileSync(outFilePath,tsdSourceCode,"UTF-8");
process.exit(0);