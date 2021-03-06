const request = (config) => {
	// 处理 apiUrl
	config.url = 'http://localhost:3000/' + config.url;
	if(!config.data){
		config.data = {};
	}
	if(!config.withCredentials){
		config.withCredentials = true;
	}
	// console.log(JSON.stringify(config.data));
	let promise = new Promise(function(resolve, reject) {
		uni.request(config).then(responses => {
			// 异常
			if (responses[0]) {
				console.log('请求失败')
				reject({message : "网络超时"});
			} else {
				let response = responses[1]; // 如果返回的结果是data.data的，嫌麻烦可以用这个，return res,这样只返回一个data
				console.log(config.url,'请求成功',config.data)
				resolve(response);
			}
		}).catch(error => {
			reject(error);
		})
	})
	return promise;
};

export default request;