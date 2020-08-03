const fs = require('fs');
const pathFn = require('path');
const util = require('./util.js');

const process = require('child_process');


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

let genSnippet = (path) => {
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

let autoVersion = ()=>{
  const pkgPath = pathFn.join(__dirname, '../../package.json');
  let pkg = fs.readFileSync(pkgPath);
  pkg = JSON.parse(pkg);
  let oldVersion = pkg.version;
  let arr = oldVersion.split('.');
  let newNum = Number(arr[arr.length - 1 ]);
  arr[arr.length - 1 ] = newNum + 1;
  let newVersion = arr.join('.');
  console.log(oldVersion  + ' -> ' + newVersion);
  pkg.version = newVersion;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}



autoVersion();
genSnippet(dirPath);

process.exec(' dir &&  vsce package', function(error, stdout, stderr) {
    console.log("error:"+error);
    console.log("stdout:"+stdout);
    console.log("stderr:"+stderr);
});

