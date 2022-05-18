<template>
	<view style="background-color: #F6F6F6;">
		<scroll-view scroll-x="true" class="topnav" scroll-with-animation="true" :scroll-into-view="'a'+ currentTitle">
			<view class="nav-item" v-for="(item,index) in videoGroupList" @click="changeNav(item)" :id="'a'+item.id">
				<text > {{item.name}}</text>
				<hr v-show="currentTitle === item.id"/>
			</view>
		</scroll-view>
		<scroll-view class="content" v-bind:style="{height:contentH+'px'}" scroll-y="true" @scrolltolower="loadMore" lower-threshold="10">
			<!--瀑布流布局start-->
			<!-- <view class="new-list">
				<view class="list-left" ref='left'>
					<view class="card" v-for="(item,index) in cardListLeft">
						<view class="picholder">
							<image class="play" src="../../src/assets/icon/triangle.png"></image>
							<image class="pic" :src="item.cardImg" alt="" mode="widthFix" width="100%" @load="onImageLoad">
						</view>
						<view class="card-text">
							<h2>{{item.cardTitle}}</h2>
							<p>{{item.cardText}}</p>
						</view>
					</view>
					
				</view>
				<view class="list-right" ref='right'>
					<view class="card" v-for="(item,index) in cardListRight">
						<view class="picholder">
							<image class="play" src="../../src/assets/icon/triangle.png"></image>
							<image class="pic" :src="item.cardImg" alt="" mode="widthFix" width="100%" @load="onImageLoad">
						</view>
						<view class="card-text">
							<h2>{{item.cardTitle}}</h2>
							<p>{{item.cardText}}</p>
						</view>
					</view>
				</view>
			</view>
			<view class="noMore" v-if="showNoMore" >我也是有底线的！！！</view> -->
			<!--瀑布流布局end-->
			<view class="videoCard" v-for="(item,index) in videolist" :key="item.data.vid">
				<view class="CardTop">
					<video class="vedio" v-if='currentPlayVedio === item.data.vid' object-fit='fill' :src="videoUrl" autoplay="true"></video>
					<image class="vedio" mode="widthFix" :src='item.data.coverUrl' v-else @click="playVedio(item.data.vid)"></image>
					</view>
				<view class="CardBottom">
					<view class="user">
						<image class="avatar" :src='item.data.creator.avatarUrl'></image>
						<text class="username">{{item.data.creator.nickname}}</text>
					</view>
					<view class="buttons">
						<text class="like">点赞</text>
						<text class="likenum">({{item.data.praisedCount}})</text>
						<text class="comment">评论</text>
						<text class="commentnum">({{item.data.commentCount}})</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allcardList: [
				{
					cardImg: "../../static/Icon/军事.png",
					cardTitle: "我是第一张图片",
					cardText: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				}, 
				{
					cardImg: "../../static/Icon/netease.png",
					cardTitle: "我是第二张图片",
					cardText: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				}, 
				{
					cardImg: "../../static/Icon/军事.png",
					cardTitle: "我是第三张图片",
					cardText: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				}, 
				{
					cardImg: "../../static/Icon/军事.png",
					cardTitle: "我是第四张图片",
					cardText: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				}, 
				{
					cardImg: "../../static/Icon/军事.png",
					cardTitle: "我是第五张图片",
					cardText: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				}, 
				{
					cardImg: "../../static/Icon/军事.png",
					cardTitle: "我是第六张图片",
					cardText: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				}, 
				{
					cardImg: "../../static/Icon/军事.png",
					cardTitle: "我是第七张图片",
					cardText: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				}, 
				{
					cardImg: "../../static/Icon/netease.png",
					cardTitle: "我是第八张图片",
					cardText: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				}, 
				{
					cardImg: "../../static/Icon/军事.png",
					cardTitle: "我是第九张图片",
					cardText: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				}, 
				{
					cardImg: "../../static/Icon/军事.png",
					cardTitle: "我是第十张图片",
					cardText: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				}, 
				{
					cardImg: "../../static/Icon/军事.png",
					cardTitle: "我是第十一张图片",
					cardText: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				}, 
				{
					cardImg: "../../static/Icon/军事.png",
					cardTitle: "我是第十二张图片",
					cardText: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},
				{
					cardImg: "../../static/Icon/netease.png",
					cardTitle: "我是第十三张图片",
					cardText: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},
				{
					cardImg: "../../static/Icon/军事.png",
					cardTitle: "我是第十四张图片",
					cardText: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},
				{
					cardImg: "../../static/Icon/netease.png",
					cardTitle: "我是第十五张图片",
					cardText: "来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊来见识我的瀑布流啊"
				},],			
				
				cardListLeft: [], //用来储存左栏的card
				cardListRight: [], //用来储存右栏的card
				loadCardItem:0,
				cardLeftHeight: 0,
				cardRightHeight: 0, //分别是左右栏的高度
				cardListItem: 0, 
				LoadImgHW: 0, //实际载入的card的高度
				isLeft:1,
				lastdir:0,
				contentH: 800, //设置客户端的屏幕高度默认值
				loadMoreTemp: 1, //作为scoll滚动触底，加载更多的标记，防止多次出发事件，1为允许，0为阻止
				showNoMore: false ,//控制底部“我也是有底线view的显示”
				videoGroupList:[],
				currentTitle:'',//当前选择的分类
				currentPlayVedio:'',//当前播放的视频
				offset:0,
				videoUrl:'',
				videolist:[]
			}
		},
		onLoad() {
			this.getVideoGroupList()
			// this.waterfall(this.cardListLeft); 
		},
		onPageScroll() {
			console.log('right',this.$refs.right.$el.offsetHeight,"left",this.$refs.left.$el.offsetHeight)
		},
		methods: {
			//瀑布流加载
			onImageLoad(e){
				this.LoadImgHW = e.detail.height/e.detail.width
				this.loadCardItem ++
				if(this.loadCardItem < this.allcardList.length){
					console.log("长度",this.allcardList.length,"第几个",this.loadCardItem)
					if(this.cardLeftHeight > this.cardRightHeight){
						// console.log("此时左大右高度",this.cardLeftHeight, this.cardRightHeight)
						this.isLeft = 0;
						this.cardRightHeight += this.LoadImgHW
						this.waterfall()
					}else if(this.cardLeftHeight < this.cardRightHeight){
						// console.log("此时左小右高度",this.cardLeftHeight, this.cardRightHeight)
						this.isLeft = 1;
						this.cardLeftHeight += this.LoadImgHW
						this.waterfall()
					}
					else{
						if(this.lastdir){
							this.isLeft = 0
							this.waterfall()
						}
						else{
							this.isLeft = 1
							this.waterfall()
						}
					}
				}
				else{
					console.log("end load")
				}
			},
			//瀑布流数据左右加载
			waterfall() {
				if(this.isLeft){
					this.cardListLeft.push(this.allcardList[this.loadCardItem]);
					this.lastdir = 1
					
				}else{
					this.cardListRight.push(this.allcardList[this.loadCardItem]);
					this.lastdir = 0
				}
				
			},
			//到底刷新
			async loadMore() {
				this.offset +=1
				console.log(this.offset)
				const res = await this.$http({
					url: 'video/group',
					data: {
						id: this.currentTitle,
						offset: this.offset
					}
				})
				let arr = res.data.datas
				this.videolist = this.videolist.concat(arr)
				console.log('合并后',this.videolist)
			},
			
			//加载视频流
			async getvideolist(){
				const res = await this.$http({
					url: 'video/group',
					data: {
						id: this.currentTitle,
						offset: this.offset
					}
				})
				this.videolist = res.data.datas
				console.log('vedio',this.videolist)
			},
			//加载
			async getVideoGroupList() {
				// console.log(res)
				const res = await this.$http({
					url: 'video/category/list'
				})
				this.videoGroupList = res.data.data
				//让第一项立刻显示
				this.currentTitle = res.data.data[0].id
				this.getvideolist()
			},
			changeNav(val){
				this.currentTitle = val.id
				this.videolist = [],
				this.getvideolist()
			},
			async playVedio(e){
				const res = await this.$http({
					url: 'video/url',
					data: {
						id: e
					},
				})
				this.currentPlayVedio = e
				this.videoUrl = res.data.urls[0].url
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.topnav{
		display: flex;
		flex-flow: row nowrap;
		height: 80rpx;
		white-space: nowrap;
		border-bottom: 1rpx solid grey ;
		padding-bottom: 10rpx;
		position: fixed;
		z-index: 9999;
		background-color: white;
		.nav-item{
			display: inline-flex;
			flex-direction: column;
			justify-content: space-around;
			position: relative;
			width: 180rpx;
			margin: 10rpx 20rpx;
			text{
				font-size: 45rpx;
				text-align: center;
				margin-bottom: 15rpx;
			}
			hr{
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				border: 5rpx solid red; 
				width: 60%;
				text-align: center;
			}
		}
	}
	.content {
		width: 100%;
		height: auto;
		padding-top: 80rpx;
		.new-list{
			// display:flex;
			// flex-direction: row;
			// justify-content: space-between;
			padding: 10rpx;
			position: relative;
			margin-top: 0rpx;
			.list-left{
				display: inline-block;
				position: absolute;
				width: 49%;
			}
			.list-right{
				width: 49%;
				position: absolute;
				transform: translateX(100%);
			}
			.card{
				border: 1rpx solid #2979FF;
				box-shadow: 0rpx 0rpx 15rpx 0rpx #555555;	
				margin: 10rpx;
				.picholder{
					position: relative;
					.play{
						width: 60rpx;
						height: 60rpx;
						position: absolute;
						left: 0;
						right: 0;
						bottom: 0;
						top: 0;
						margin: auto;
						opacity: 0.5;
						z-index: 999;
					}
					.pic{
						width: 100%;
					}
				}
				
			}
			.card-text{
				padding: 5rpx 10rpx;
				h2{
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				p{
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					word-break: break-all;
				}
			}
		}
		
		.videoCard{
			background-color: white;
			box-shadow: 0rpx 0rpx 3rpx 0rpx #555555;
			border-radius: 25rpx;
			display: flex;
			flex-flow: column nowrap;
			box-sizing: border-box;
			margin: 15rpx 0rpx;
			padding: 25rpx;
			.CardTop{
				position: relative;
				.vedio{
					width: 100%;
					margin: auto;
					border-radius: 25rpx;
				}
				margin-bottom: 10rpx;
			}
			.CardBottom{
				display: flex;
				flex-flow: row nowrap;
				text-align: end;
				.avatar{
					display: inline-block;
					width: 60rpx;
					height: 60rpx;
					border-radius: 100%;
					margin-right: 15rpx;
					vertical-align:middle;
				}
				.username{
					vertical-align: middle;
				}
				.buttons{
					align-self: flex-end;
					vertical-align: middle;
					flex:1;
					.like{
					}
					.likenum{
						margin-left:5rpx;
						font-size: 25rpx;
						margin-right: 10rpx;
					}
					.comment{
					}
					.commentnum{
						margin-left:5rpx;
						font-size: 25rpx;
					}
				}
			}
		}
	}
</style>
