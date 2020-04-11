let getConfig = (content) => {
  let resArr = [];
  let desc = '';
  let descReg = /<%desc(\s.*)%>/;
  let lines = content.split('\n');

  lines.forEach((line) => {
    if (!descReg.test(line)) {
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
