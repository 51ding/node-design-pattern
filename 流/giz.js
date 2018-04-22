//Buffer的方式
//const fs = require('fs');
//const zlib = require('zlib');
//const file = process.argv[2];
//fs.readFile(file, (err, buffer) => {
//zlib.gzip(buffer, (err, buffer) => {
//fs.writeFile("./aa.html", buffer, err => {
//console.log('File successfully compressed');
//});
//});
//});

//Stream的方式
const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];
fs.createReadStream(file)
//创建一个可写流
.pipe(zlib.createGzip())
.pipe(fs.createWriteStream(file + '.gz'))
.on('finish', () => console.log('File successfully compressed'));