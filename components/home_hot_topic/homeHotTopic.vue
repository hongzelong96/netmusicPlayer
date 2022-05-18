<template>
	<view class='mainContanier'>
		<text>热门话题</text>
		<view class="subContanier">
			<view v-for="(item,index) in dataList" :key="index" class="item" @tap="handerTap(item.action,item.uiElement.mainTitle.title)">
				<view>
					<image mode="scaleToFill" lazy-load="true" src="../../src/assets/icon/topicSign.png"></image>
				</view>
				<text class="mainTitle">{{item.uiElement.mainTitle.title}}</text>
				<!-- <text v-if=="index == '0'" style="color:red;">hot</text> -->
				<text class="subTitle">{{item.uiElement.subTitle.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
			}
		},
		props:{
			dataList:Array
		},
		watch:{
			data(val){
				console.log("aa===>data",val)
			}
		},
		methods:{
			handerTap(val1,val2){
				uni.showToast({
					title:'点击' + val2 +',跳转到'+val1,
					icon:'none',
					duration:2000,
				})
			}
		}
	}
</script>

<style lang="scss">
	.mainContanier {
		display: flex;
		flex-flow: column nowrap;
		margin: 15rpx 0rpx;
		box-shadow: 0rpx 0rpx 3rpx 0rpx #555555;
		border-radius: 25rpx;
		background-color: white !important;
		padding: 15rpx 20rpx 30rpx 20rpx;
		>text{
			margin-top: 10rpx;
			margin-left: 15rpx;
			margin-bottom: 30rpx;
		}
		.subContanier{
			display: flex;
			flex-flow: column nowrap;
			width: 100%;
			justify-content: space-between;
			
			.item{
				display:flex;
				flex-flow: row nowrap;
				width: 100%;
				align-items: center;
				position: relative;
				margin-bottom: 20rpx;
				view{
					width:40rpx;
					height:40rpx;
					background-color:#F2F5FA;
					border-radius: 50%;
					display: inline;
					position: relative;
					margin-right:15rpx;
					image{
						width: 20rpx;
						height: 20rpx;
						position: absolute;
						left: 0;
						right: 0;
						top: 0;
						bottom:0;
						margin: auto;
					}
				}
				
				.mainTitle{
					font-size: 30rpx;
					height: 100%;
					text-align: left;
					width: 60%;
					overflow: hidden;
				}
				.subTitle{
					align-self: flex-end;
					font-size: 25rpx;
					flex:1;
					text-align: right;
				}
			}
		}
	}
</style>
