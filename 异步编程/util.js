const url = require('url');
var cheerio=require("cheerio");
var sha1=require("sha1");
//exports.urlToFileName=fuffeunction(urlStr,callback){
//	let urlObj;
//	try{
//		urlObj=url.parse(urlStr,true);
//	}
//	catch(error){
//		return callback(error);
//	}
//	callback(null,(urlObj.href+".html").replace(/\/\//,"").replace(/\//,"").replace(":",""));
//}

//根据url生成相应的文件
exports.urlToFileName=function(url,option){
	var extension=option.extension || '';
	return `${sha1(url)}.${extension}`;
}

exports.getPageLinks=function(body){
	var $=cheerio.load(body);
	var links=[];
	$("a").each((index,item)=>{
		var href=$(item).attr("href");
		if(/^\//.test(href)) links.push(href);
	})
  return links;
}


//将异步函数promise化
exports.promisify=function(callbackBasedApi){
	reurn function(){
		var args=[].slice.call(arguments);
		return new Promise((resolve,reject)=>{
			
		})
	}
}
