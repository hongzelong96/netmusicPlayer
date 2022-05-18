<template>
	<view class="content" 
		@touchstart="handletouchStart($event)" 
		@touchmove="handletouchMove($event)"
		@touchend="handletouchend($event)">
		<view :id="'a' + index.toString()" class="contentItem" :class="moveDir" v-for="(item,index) in dataA" :key='index'>
			<view class="item" v-for="(itemchild,index) in item.resources" :key="index" @tap="handleTap(itemchild)">
				<image mode="aspectFill" :src="itemchild.uiElement.image.imageUrl" lazy-load="true" />
				<view>
					<text class="title">{{itemchild.uiElement.mainTitle.title}}</text>
					<text class="des">{{itemchild.uiElement.subTitle.title}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollNext: 0,
				scrollInto: 'a0',
				moveDir: '',
				canScroll: true,
				scrollStart: 0,
				defaultfilter:'新歌'
			}
		},
		props: {
			dataList:Array,
			currentTitle:{
				type:String,
			}
		},
		computed:{
			dataA:function(){
				return this.dataList.filter(item=>{
					if(item.uiElement.mainTitle.title === this.currentTitle){
						return item
					}
				})
			},
		},
		watch:{
			currentTitle(val){
				if(val){
					this.scrollInto = 'a0',
					this.scrollNext = 0
					this.$emit('movetoNext',this.scrollInto)
				}
			},
		},
		methods: {
			handletouchStart(event) {
				if (event.touches.length > 1) {
					return;
				}
				// 初始化坐标
				this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
			},
			handletouchMove(event) {
				//多点触控 不触发
				if (event.touches.length > 1) {
					return;
				}
				// 移动位置
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];
				// 滑动位置小 不触发
				if (Math.abs(moveX) < 5) {
					return;
				}

				// 竖向滑动 不触发
				if (Math.abs(moveY) > Math.abs(moveX)) {
					return;
				}

				// 左滑
				if (moveX < 0) {
					this.moveDir = 'left'
				}
				if (moveX > 0) {
					this.moveDir = 'right'
				}
			},
			handletouchend(event) {
				if (this.moveDir === 'left' && this.scrollNext < this.dataList.length-1) {
					this.scrollNext++,
						this.scrollInto = 'a' + this.scrollNext.toString(),
						console.log('左滑', this.scrollInto)
						this.moveDir = "left"
						this.$emit('movetoNext',this.scrollInto)
				} else if (this.moveDir === 'right' && this.scrollNext != 0) {
					this.scrollNext--,
						this.scrollInto = 'a' + this.scrollNext.toString(),
						console.log('右滑', this.scrollInto)
						this.moveDir = "right"
						this.$emit('movetoNext',this.scrollInto)
				}

			},
			handleTap(item){
				this.$emit('playsong',item)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100%;
		display: inline-flex;
		flex-flow: row nowrap;
		white-space: nowrap;
		// padding-right: 350rpx;
		// margin-right: 180rpx;
		position: relative;
		.contentItem {
			display: inline-flex;
			flex-flow: column nowrap;
			height: 100%;
			margin-right: -80rpx;
			padding-right:80rpx ;
			// padding-right: 20rpx;
			.item {
				display: flex;
				flex-flow: row nowrap;
				margin-bottom: 10rpx;
				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 20rpx;
				}

				view {
					display: inline-flex;
					flex-flow: column;
					margin-left: 10rpx;
					width: 540rpx;
				}

				.title {
					margin-top: 15rpx;
					font-size: 35rpx;
					width: 480rpx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space:nowrap;
				}

				.des {
					margin-top: 20rpx;
					font-size: 20rpx;
					width: 480rpx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space:nowrap;
				}
			}
		}

	}
</style>
