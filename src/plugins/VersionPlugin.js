const FStream = require('fs');
const timeStamp = new Date().getTime(); // 获取当前的时间戳
class VersionPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    let self = this;
    compiler.hooks.run.tap('VersionPlugin', () => {
      console.log(
        '============================ tap VersionPluginRun ============================'
      );
      var dir_path = self.options.versionDirectory;
      var version_file = dir_path + '/version.json';
      var content = '{"version":' + timeStamp + '}';
      FStream.exists(dir_path, function (exist) {
        if (exist) {
          writeVersion(self, version_file, content);
          return;
        }
        FStream.mkdir(dir_path, function (err) {
          if (err) throw err;
          console.log('\n创建目录[' + dir_path + ']成功');
          writeVersion(self, version_file, content);
        });
      });
    });
    compiler.hooks.done.tap('VersionPlugin', () => {
      console.log(
        '============================ done VersionPluginRun============================'
      );
    });
  }
}
const writeVersion = (self, versionFile, content) => {
  console.log('\n当前版本号：' + timeStamp);
  console.log('开始写入版本信息...');
  //写入文件
  FStream.writeFile(versionFile, content, function (err) {
    if (err) throw err;
    console.log('版本信息写入成功!');
  });
};

module.exports = VersionPlugin;
