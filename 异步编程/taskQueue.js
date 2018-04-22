//任务队列
class TaskQueue{
	constructor(concurrency){
		this.concurrency=concurrency;
		this.running=0;
		this.queue=[];
	}
	
	//参数是一个待执行的方法
	pushTask(task){
		this.queue.push(task);
		this.next();
	}
	
	next(){
		while(this.running<this.concurrency && this.queue.length){
			var task=this.queue.shift();
			task(()=>{
				this.running--;
				this.next();
			})
			this.running++;
		}
	}
}

module.exports=TaskQueue;
