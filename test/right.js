var fs=require("fs");
var argv=["./promisify.js"];

argv.push((ere,data)=>{
	console.log(arguments);
	console.log(data);
})

console.log(argv);

fs.readFile.apply(null,argv);
