var fs=require("fs");
var {readFile}=require("fs");
var request=require("request");

var reqest=require("request");

function promisfy(callbackApi){
	
	return function promisified(){
		//指代promisified这个方法的参数
		const args=[].slice.call(arguments);
		return new Promise((resolve,reject)=>{
			
//			args.push(function (err,result){
//				if(err) return reject(err);
//			  if(arguments.length<=2){
//			  	resolve(result);
//			  }
//			  else{
//			  	resolve([].slice.call(arguments,1));
//			  }
//			})
     args.push((err,result,body)=>{

	     	if(err) return reject(err);

	     	if(arguments.length<=2){
	     		console.log("x");
	     		resolve(result);
	     	}else{
	     		console.log('canshuduole1');
	     		resolve([].slice.call(arguments,1));
	     	}
     })
     //调用函数
		 callbackApi.apply(null,args);
		});
	}
}


//var newReadFile=promisfy(fs.readFile);
var newRequst=promisfy(request);
//var file=newReadFile("./urltoPathName.js");
//file.then(data=>{
//	console.log(data);
//}).catch(err=>{
//	console.log(err.message);
//})

var x=newRequst("http://www.baidu.com");
fs.readFile("dsadas",(err,data)=>{
	
})


