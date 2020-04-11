let getConfig = (content) => {
  let resArr = [];
  let desc = '';
  let descReg = /<%desc(\s.*)%>/;
  let dollarAndWordReg = /(\$)\D/;
  let lines = content.split('\n');

  lines.forEach((line) => {
    if (!descReg.test(line)) {
      if (dollarAndWordReg.test(line)) {
        line = line.replace(dollarAndWordReg, (word) => {
          return '\\' + word;
        });
      }

      resArr.push(line);
    } else {
      desc = line.match(descReg)[1].trim();
    }
  });

  return {
    desc: desc,
    body: resArr,
  };
};

module.exports = {
  getConfig,
};
