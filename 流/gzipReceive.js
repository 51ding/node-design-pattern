const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

http.createServer((req,res)=>{
	var filename=req.headers.filename;
	console.log(`${filename} alreay Recived!!`);
	req.pipe(zlib.createGunzip())
	.pipe(fs.createWriteStream(filename+".zip"))
	.on("finish",()=>{
		res.writeHead(201, {'Content-Type': 'text/plain'});
		res.end("That's it\n");
		console.log(`File saved: ${filename}`);
	});
}).listen(3000,()=>{
	
	console.log("server is running,,,,,");

})
