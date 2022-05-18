<template>
	<view>
		<button @click="handleLogout(2)" >登出</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
			}
		},
		methods:{
			async handleLogout(){
				
				await this.$http({
					url: 'logout'
				})
				uni.removeStorageSync('cookietoken')
				// #ifdef H5
				console.log('删除cookie')
				this.deleteCookie()
				// #endif
				// 跳转，重载入页面
				// #ifdef APP-PLUS
				console.log('删除cookie')
				plus.navigator.removeAllCookie()
				// #endif	
				uni.reLaunch({
					url: '/pages/login/index'	
				});
			},
			deleteCookie() {
				console.log('触发了')
				const res = this.$cookies.keys()
				console.log(res)
				res.forEach(item => {
					$cookies.remove(item)
				})
			},
		}
	}
</script>

<style>
</style>
