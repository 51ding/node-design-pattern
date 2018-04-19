const url = require('url');

exports.urlToFileName=function(urlStr,callback){
	let urlObj;
	try{
		urlObj=url.parse(urlStr,true);
	}
	catch(error){
		return callback(error);
	}
	callback(null,(urlObj.href+".html").replace(/\/\//,"").replace(/\//,"").replace(":",""));
}
