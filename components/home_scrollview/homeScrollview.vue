<template>
	<view class="mainContanier">
		<view class="item_top">
			<view>
				<text v-for="(item,index) in data" :key='index' :id="item.title" @tap="handleTap($event)">{{item.title}}</text>
			</view>
			<button plain="true" type="default" size="mini">{{buttonDes}}</button>
		</view>
		<scroll-view 
			scroll-x="true"
			:scroll-into-view="moveToNext"
			scroll-with-animation='true'
			class="item_bottom" 
			ref="scroll">
			<slot></slot>
		</scroll-view>
		<!-- <view class="item_bottom">
			<slot></slot>
		</view> -->
	</view>
</template>

<script>
	import {
		throttle
	} from '../common/throttle.js'
	export default {
		data() {
			return {
				scrollNext: 0,
				scrollInto: 'a0',
				moveDir: '',
				canScroll: true,
				scrollStart: 0,
				data:[
					{title:'新歌'},
					{title:'新碟'},
					{title:'数字专辑'},
				]
			}
		},
		props: {
			title: {
				type: String,
				default: '标题'
			},
			buttonDes: {
				type: String,
				default: '更多>'
			},
			moveToNext:{
				type:String,
				default:'a0'
			}
		},
		methods: {
			handleTap(event){
				this.$emit('changeTitle',event.target.id) 
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mainContanier {
		display: flex;
		flex-flow: column nowrap;
		width: 100%;
		margin: 15rpx 0rpx;
		height: 500rpx;
		box-shadow: 0rpx 0rpx 3rpx 0rpx #555555;
		border-radius: 25rpx;
		background-color: white !important;
		.item_top {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			width: 100%;
			height: 100rpx;
			position: relative;
			view{
				position: absolute;
				text-align: center;
				top: 19rpx;
				left: 30rpx;
				display: inline-flex;
			}
			text {
				color: gray;
				margin-right: 10rpx;
				&:not(:last-child):after{
					content:'|';
					margin-left: 10rpx;
				}
				&:hover{
					color: black;
				}
			}

			button {
				width: 160rpx;
				position: absolute;
				width: 120rpx;
				height: 55rpx;
				top: 15rpx;
				right: 30rpx;
				font-size: 15rpx;
				padding: 0;
				margin: 0;
				border-radius: 25rpx;
			}
		}

		.item_bottom {
			width: 100%;
			height: 100%;
			overflow: hidden;
			position: relative;
			padding: 10rpx 0rpx 30rpx 30rpx;
		}
	}
</style>
