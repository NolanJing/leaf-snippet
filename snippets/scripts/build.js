const fs = require('fs');
const pathFn = require('path');
const util = require('./util.js');

const dirPath = pathFn.resolve(__dirname, '../template'); //扫描的文件夹
const fileMap = {
  vue: {
    suffix: 'vue.json',
    resJsonObj: {},
  },
  js: {
    suffix: 'javascript.json',
    resJsonObj: {},
  },

  ts: {
    suffix: 'javascript.json',
    resJsonObj: {},
  },
};

let gen = (path) => {
  let files = fs.readdirSync(path);
  for (let file of files) {
    let prefix = file.split('.')[0];
    let fileType = file.split('.')[1];

    var content = fs.readFileSync(path + '/' + file, 'utf-8');

    console.log('prefix: ', prefix);

    let res = util.getConfig(content);
    fileMap[fileType].resJsonObj[prefix] = {
      name: prefix,
      prefix: prefix,
      body: res.body,
      description: res.desc,
    };
  }

  for (key in fileMap) {
    console.log('key: ', key);
    const jSONStr = JSON.stringify(fileMap[key].resJsonObj, '', 2);
    fs.writeFileSync(
      pathFn.resolve(__dirname, `../${fileMap[key].suffix}`),
      jSONStr,
    );
  }
};

gen(dirPath);
