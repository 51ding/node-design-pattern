var myutil=require("./util");
var fs=require("fs");
var request=require("request");
var mkdirp=require("mkdirp");
var path=require("path");
var TaskQueue=require("./taskQueue");
const queue=new TaskQueue(2);

var host="http://www.xiachufang.com";
/**
*@param {String} urlStr 网址
*@param {Number} 递归的深度
*@param {Function} 爬取完成的回调函数
*/
function Spider(urlStr,nesting,callback){
	//重新调整链家
	urlStr=/^\//.test(urlStr)?host+urlStr:urlStr;
	var filename=myutil.urlToFileName(urlStr,{extension:"html"});
	
	fs.readFile(filename,"utf8",(err,data)=>{
		if(err){
			//系统错误码，由fs引起，指定的路径找不到文件或路径
			if(err.code!="ENOENT"){
				return callback(err);
			}
			//文件不存在，执行爬取数据的逻辑
			return down(urlStr,filename,(err,data)=>{
				if(err) return callback(err);
				spiderLinks(urlStr, data, nesting, callback);
			})
		}
		spiderLinks(urlStr, data, nesting, callback);
	})
}


function spiderLinks(currentUrl, body, nesting, callback){
	
	if(nesting==0) return process.nextTick(callback);
	
	var links=myutil.getPageLinks(body);
	
	if(links.lengh==0) return process.nextTick(callback);
	
	let isComplete=0,hasErrors=false;
	
  
	links.forEach(link=>{
		queue.pushTask(done=>{
				Spider(link,nesting-1,err=>{
					if(err){
						hasErrors=true;
						return callback(err);
					}
					if(++isComplete===links.length && !hasErrors)
						callback();
					//task任务完成
					done();
				});
		})
		
		
	})
	
}


//下载页面
function down(url,filename,callback){
	console.log(`Downding....${url}`);
	request(url,(err,response,body)=>{
		if(err) return callback(err);
		saveFile(filename,body,(err)=>{
			if(err) return callback(err);
			console.log(`Downloaded and saved...${url}`);
			callback(null,body);
		})
	});
}


//保存文件
function saveFile(filename,content,callback){
	fs.writeFile(filename,content,callback);
}


Spider(host,1,err=>{
	if(err) return console.log(err.message);
	console.log("爬取成功！");
})





