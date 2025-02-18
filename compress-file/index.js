const fs = require("fs");
const archiver = require("archiver");

const compressType = "zip"; // 设置压缩类型

// 设置压缩级别,生成archive对象
const archive = archiver(compressType, {
  zlib: { level: 9 }
}).on("error", err => {
  throw err;
});

// 创建文件输出流
const output = fs.createWriteStream(__dirname + `/cs.${compressType}`);

// 通过管道方法将输出流存档到文件
archive.pipe(output);

// 追加目录
archive.directory("node_modules/");

// 追加文件
archive.file("index.js");

// 监听要写入的所有存档数据
output.on("close", function() {
  console.log(`压缩大小为：${(archive.pointer() / 1024 / 1024).toFixed(2)}M`);
});

archive.on("error", function(err) {
  throw err;
});

// 完成打包归档
archive.finalize();
