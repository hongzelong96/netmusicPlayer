<template>
	<view class="mainContanier" :style="{height:windowHeight+'px'}">
		<view class="nav">
			<image class="backpic" src="../../static/return.png" mode="aspectFill" @click="goback"></image>
			<image class="BlurBg" :src="navBGurl"></image>
			<image class="Coverimg" :src="navBGurl"></image>
			<!-- <image src="../../static/return.png" mode="aspectFill" @click="goback"></image> -->
			<view class="nav-title">
				<text>{{listDetail.name}}</text>
				<view class="nav-item-creator">
					<image :src="listDetail.creator.avatarUrl"></image>
					<text>{{listDetail.creator.nickname}}>></text>
				</view>
			</view>
		</view>
		<view class="sharebar">
			<view class="item">
				<image src="../../static/Icon/collect.png"></image>
				<text>收藏</text>
			</view>
			<hr style='height: 25rpx;color: #000000;'/>
			<view class="item">
				<image src="../../static/Icon/comments.png"></image>
				<text>评论</text>
			</view>
			<hr style='height: 25rpx;color: #000000;'/>
			<view class="item">
				<image src="../../static/Icon/share.png"></image>
				<text>分享</text>
			</view>
		</view>
		<view class="content">
			<view class="list-nav">
				<image src="../../static/Icon/playicon.png"></image>
				<text>全部播放</text>
				<text>(共{{songlist.length}}首)</text>
			</view>
			<hr style="width: 100%; margin-top:15rpx;background-color: #d4d4d4;"/>
			<scroll-view class="listcontent" scroll-y="true" :style="{height:audiolist.length===0?mainHeight+'px':videomainHeight+'px'}">
				<view class="list-item" v-for="(item,index) in songlist" :key='item.id' @click="playsong(item.fee,item.id)">
					<text class="index">{{index+1}}</text>
					<view class="text-content">
						<view class="top">
							<text class="songname">{{item.name}}</text>
							<text class="songsubname" v-if="item.tns||item.alia.length !==0">（{{item.tns?item.tns[0]:item.alia[0]}})</text>
						</view>
						<view class="bottom">
							<text v-if="item.fee === 1" class="vip">vip</text>
							<text v-for="(item1,index1) in item.ar" :key="item1.id">{{index1===0?item1.name:'/'+item1.name}}</text>
							<text>-{{item.al.name}}</text>
						</view>
					</view>
					<view class="icon-content">
						<image src="../../static/Icon/playv.png"></image>
						<image src="../../static/Icon/tridot.png"></image>		
					</view>
				</view>
			</scroll-view>
		</view>
		<zaudio style="position: absolute;;" theme="theme3" :autoplay="false" :continue="true" ref="zaudio"></zaudio>
	</view>
</template>

<script>
	import zaudio from '../../components/zaudio/zaudio.vue';
	import toSongDetail from '../../components/common/toSongDetail.js'
	import createAllSonglist from '../../components/common/createAllSonglist.js'
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default{
		mixins:[toSongDetail,createAllSonglist],
		components:{
			zaudio
		},
		data(){
			return{
				videomainHeight: 500,
				mainHeight: 500,
				windowHeight:500,
				navBGurl:'',
				listDetail:'',
				songlist:[],
				songIdlist:[]
			}
		},
		computed:{
			...mapGetters(['audiolist','playinfo','paused'])
		},
		methods:{
			...mapMutations(['set_audio', 'set_audiolist']),
			playsong(e,id){
				console.log('点击',e,id)
				if(e==1){
					return this.toSongDetail(this.songIdlist,e)
				}else{
					
					if (JSON.stringify(this.songIdlist) !== JSON.stringify(this.audiolist) || this.audiolist.length === 0) {
						console.log('没有正在播放的歌曲，或者和当前歌单不一样')
						this.createAllSongList(this.songlist, this.songIdlist)
					}
					console.log('开始播放')
					
					this.toSongDetail(id,e)
				}
			},
			
			async getListDetail(e){
				if(e == null) return
				const res = await this.$http({
					url: 'playlist/detail',
					data: {
						id: e
					}
				})
				console.log('res',res)
				this.listDetail = res.data.playlist
				let urls =''
				res.data.playlist.trackIds.forEach((item, index) => {
					if (index === 0) {
						urls = item.id
					} else {
						urls = urls + ',' + item.id
					}
				
				})
				const res2 = await this.$http({
					url: 'song/detail',
					data: {
						ids: urls
					}
				}) 
				this.songlist = res2.data.songs
				this.navBGurl = this.listDetail.coverImgUrl
				console.log('url')
			}
		},
		onLoad(e) {
			const Magnification = uni.getSystemInfoSync().windowWidth / 750
			this.mainHeight = uni.getSystemInfoSync().windowHeight - 450 * Magnification
			this.videomainHeight = uni.getSystemInfoSync().windowHeight - 720 * Magnification
			this.windowHeight = uni.getSystemInfoSync().windowHeight
			
			this.getListDetail(e.id)
		}
	}
</script>

<style lang="scss" scoped>
	.mainContanier{
		position: relative;
		.nav{
			// border: 1rpx solid red;
			border-bottom-left-radius: 50%;
			border-bottom-right-radius: 50%;
			box-shadow: 15rpx 0rpx 25rpx #d4d4d4 inset;
			height: 450rpx;
			width: 200%;
			position: absolute;
			left: -50%;
			padding: 5% 55%;
			box-sizing: border-box;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: flex-start;
			.backpic{
				position: absolute;
				width: 100rpx;
				height: 100rpx;
			}
			.BlurBg{
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				width: 87%;
				height: 87%;
				border-bottom-left-radius: 50%;
				border-bottom-right-radius: 50%;
				filter: blur(30rpx);
				
			}
			.Coverimg{
				width: 200rpx;
				height: 200rpx;
				border-radius: 15%;
				margin-right: 15rpx;
				box-shadow: 0rpx -25rpx 10rpx -15rpx black ;
			}
			.nav-title{
				flex: 1;
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
				>text{
					color: white;
					margin-bottom: 60rpx;
					z-index: 9999;
				}
				.nav-item-creator{
					>image{
						width: 60rpx;
						height: 60rpx;
						border-radius: 100%;
						vertical-align: middle;
					}
					>text{
						margin-left: 10rpx;
						line-height: 50rpx;
						z-index: 9999;
					}
				}
			}
		}
		.sharebar{
			position: absolute;
			display: flex;
			flex-flow: row nowrap;
			margin-top: 300rpx;
			z-index: 9999;
			background-color: white;
			width: 450rpx;
			left: 0;
			right: 0;
			top: 420rpx;
			margin: auto;
			height: 60rpx;
			border-radius: 40rpx;
			justify-content: space-around;
			align-items: center;
			padding: 0rpx 30rpx;
			box-shadow: 0rpx 0rpx 15rpx 5rpx #d4d4d4;
			.item{
				>image{
					width: 30rpx;
					height: 30rpx;
					display: inline-block;
					vertical-align: middle;
					margin-right:10rpx;
				}
				text{
					font-size: 25rpx;
					display: inline-block;
					vertical-align: middle;
				}
			}
		}
		.content{
			position: absolute;
			display: flex;
			top: 500rpx;
			width: 100%;
			flex-flow: column nowrap;
			justify-content: center;
			align-items: center;
			.list-nav{
				height: 100%;
				align-self: flex-start;
				margin-left: 25rpx;
				>image{
					width: 50rpx;
					height: 50rpx;
					display: inline-block;
					vertical-align: middle;
					margin-right: 20rpx;
				}
				>text{
					display: inline-block;
					vertical-align: middle;
				}
			}
			.listcontent{
				display: flex;
				flex-flow: column nowrap;
				.list-item{
					display: flex;
					flex-flow: row nowrap;
					width: 100%;
					height: 130rpx;
					box-sizing: border-box;
					align-items: center;
					padding: 0rpx 0rpx 0rpx 40rpx;
					.index{
						font-size: 40rpx;
						margin-right: 25rpx;
						display: inline-block;
						vertical-align: middle;
					}
					.text-content{
						display: inline-block;
						height: 100%;
						width: 500rpx;
						transform: translateY(25rpx);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						.bottom{
							font-size: 25rpx;
							.vip{
								border: 1rpx solid red;
								margin-right: 5rpx;
							}
						}
						// vertical-align: middle;
					}
					.icon-content{
						display: inline-block;
						align-items: flex-end;
						vertical-align: middle;
						text-align: right;
						flex: 1;
						image{
							width: 45rpx;
							height: 45rpx;
							margin-right: 8rpx;
						}
					}
				}
			}
		}
	}
</style>
