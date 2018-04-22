var fs=require("fs");

function readFile(filePath){
	return new Promise((resolve,reject)=>{
		JSON.parse("xxxxx");
		fs.readFile(filePath,"utf8",(err,data)=>{
			if(err) return reject(err);
			resolve(data);
		});
	})
};

var x=readFile("spider2.0.js");

x.then(data=>{
	console.log(data);

},err=>{
	console.log(err.message);
})
//}).then(r=>{
//	console.log("征程")
//},()=>{console.log("失败了！")}).catch(err=>{
//	console.log("有异常了！");
//}).then(r=>{
//	console.log("成功",r);
//}).then(r=>{
//	console.log("成功",r);
//}).then(r=>{
//	console.log("成功",r);
//})

console.log(x);


