<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let token = uni.getStorageSync('cookietoken');
			console.log('token',token)
			// if(token){
			// 	plus.navigator.closeSplashscreen();
			// }else{
			// 	uni.reLaunch({
			// 		url:"pages/login/index",
			// 		success: () => {
			// 			plus.navigator.closeSplashscreen()
			// 		}
			// 	})
			// }
			if(token){
				console.log("登录了")
				uni.reLaunch({
					url:"pages/home/index"
				})
			}else{
				console.log("未登录")
				uni.reLaunch({
					url:"pages/login/index",
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./src/assets/base.css");
</style>
