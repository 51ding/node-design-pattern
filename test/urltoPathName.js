var util=require("../异步编程/util");

var filename=util.urlToFileName("http://www.baidu.com",{extension:"html"});

console.log(filename);
