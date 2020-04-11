const fs = require('fs');
const path = require('path');
const util = require('./util.js');

const dirPath = path.resolve(__dirname, '../template'); //扫描的文件夹
const targetFilePath = path.resolve(__dirname, '../vue.json'); //扫描的文件夹

let gen = (path) => {
  let resJsonObj = {};

  let files = fs.readdirSync(path);
  for (let file of files) {
    if (file.endsWith('vue')) {
      var content = fs.readFileSync(path + '/' + file, 'utf-8');
      let prefix = file.split('.')[0];
      console.log('prefix: ', prefix);
     
      let res = util.getConfig(content)
      resJsonObj[prefix] = {
        name: prefix,
        prefix: prefix,
        body: res.body,
        description: res.desc,
      };
    }
  }
  let JSONStr = JSON.stringify(resJsonObj, '', 2);

  fs.writeFileSync(targetFilePath, JSONStr);
};

gen(dirPath);
 