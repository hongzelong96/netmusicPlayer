export const throttle = (fn,delay)=>{
	var enterTime = 0;
	var gapTime = delay || 200;
	return function(){
		var context = this
		var backTime = new Date()
		if(backTime - enterTime > gapTime){
			fn.apply(context,arguments);
			enterTime = backTime
		}
	}
}