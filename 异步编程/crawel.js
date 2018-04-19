const request=require("request");
const mkdirp=require("mkdirp");
const path=require("path");
const fs=require("fs");
const util=require("./util");

function Crawel(url,callback){
	util.urlToFileName(url,(err,filename)=>{
		
		if(err) return callback(err);
		
		fs.open(filename,"wx",(err,fd)=>{
			if(err && err.code === 'EEXIST'){
				callback(null,filename,false);
			}
			else{
				console.log(`Downloading..${url}`);
				request(url,(err,response,body)=>{
	    	
	    	if(err) return callback(err);
	    	console.log(filename);
	    	fs.writeFile(filename,body,(err)=>{
	    			if(err) return callback(err);
	    			callback(null,filename,true);
	    		})
	    })
				
			}
	    
		})
	});
	
}




Crawel(process.argv[2],(err,filename,downloaded)=>{
	if(err) {console.log(err.message);}
	else if(downloaded){
		console.log("已经爬取完成");
	}
	else{
		console.log("已经怕去过了！");
	}
})
