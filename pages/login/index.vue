<template>
	<view class="content">
		<image src="../../src/assets/icon/netease.png" mode="aspectFill"/>
		<view class="accountInput">
			<text>手机账号:</text>
			<input type="number" maxlength="11" v-model="user.account" />
		</view>
		<view class="passwordInput">
			<text>密码:</text>
			<input type="text" password="true" v-model="user.password" />
		</view>
		<button @click="handleSubmit()"> 登录</button>
	</view>
</template>

<script>
	import md5 from'../../static/js/md5.js'
	export default{
		data(){
			return{
				user:{
					account:'',
					password:''
				}
			}
		},
		methods:{
			async handleSubmit(){
				if(this.user.account !=''&&this.user.password!=''){
					let res = {}
					res = await this.$http({
						url: 'login/cellphone',
						data: {
							phone: this.user.account,
							md5_password: md5(this.user.password),
						},
					});
					console.log(res)
					if (res.data.code !== 200) {
						return uni.showToast({
							icon: 'none',
							title: '登录失败！用户名或者密码错误',
							duration: 2000,
							// mask: true
						});
					}
					this.cookietoken = res.data.cookie
					this.userid = res.data.account.id
					uni.setStorageSync('cookietoken', this.cookietoken)
					uni.setStorageSync('userid', this.userid)
					//document.cookie = this.cookietoken
					uni.showToast({
						icon: 'none',
						title: '登录成功',
						duration: 1000,
						// mask: true
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/home/index'
						});
					}, 1000);
				}
			}
		}
	}
</script>

<style lang="scss">
	.content{
		width:100%;
		height:100%;
		position: relative;
		background-color: #DA0000;
		image{
			width: 300rpx;
			height:300rpx;
			border-radius: 50%;
			position: absolute;
			left:0;
			right:0;
			top: 300rpx;
			margin:auto;
			background-color: #DA0000;
		}
		view{
			position: absolute;
			left:0;
			right:0;
			margin:auto;
			display: flex;
			justify-content: space-between;
			padding-right: 70rpx;
			padding-left: 70rpx;
			text{
				font-size:35rpx;
			}
			input{
				border: 3rpx solid #f6f6f6f;
				width: 450rpx;
				height: 100%;
			}
		}
		.accountInput{
			top:1000rpx;
		}
		.passwordInput{
			top:1100rpx;
		}
		button{
			position: absolute;
			left:0;
			right:0;
			top: 1200rpx;
			margin:auto;
			width: 450rpx;
			border-radius: 50rpx;
			border: #F6F6F6;
		}
	}
</style>
