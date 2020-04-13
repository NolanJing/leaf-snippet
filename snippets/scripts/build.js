const fs = require('fs');
const pathFn = require('path');
const util = require('./util.js');

const dirPath = pathFn.resolve(__dirname, '../template'); //扫描的文件夹

let gen = (path) => {
  let vueResJsonObj = {};
  let jsResJsonObj = {};

  let files = fs.readdirSync(path);
  for (let file of files) {
    if (file.endsWith('vue')) {
      var content = fs.readFileSync(path + '/' + file, 'utf-8');
      let prefix = file.split('.')[0];
      console.log('prefix: ', prefix);

      let res = util.getConfig(content);
      vueResJsonObj[prefix] = {
        name: prefix,
        prefix: prefix,
        body: res.body,
        description: res.desc,
      };
    }
    if (file.endsWith('ts') || file.endsWith('js')) {
      var content = fs.readFileSync(path + '/' + file, 'utf-8');
      let prefix = file.split('.')[0];
      console.log('prefix: ', prefix);

      let res = util.getConfig(content);
      jsResJsonObj[prefix] = {
        name: prefix,
        prefix: prefix,
        body: res.body,
        description: res.desc,
      };
    }
  }
  let vueJSONStr = JSON.stringify(vueResJsonObj, '', 2);
  let jsJSONStr = JSON.stringify(jsResJsonObj, '', 2);

  let fileMap = {
    vue: 'vue.json',
    js: 'javascript.json',
    ts: 'javascript.json',
  };
   
  fs.writeFileSync(pathFn.resolve(__dirname, `../${fileMap.vue}`), vueJSONStr);
  fs.writeFileSync(pathFn.resolve(__dirname, `../${fileMap.js}`), jsJSONStr);
};

gen(dirPath);
