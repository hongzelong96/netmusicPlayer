<template>
	<view>
	<scroll-view scroll-y="true" class="mainContanier" :style="{height:audiolist.length===0?mainHeight+'px':videomainHeight+'px'}">
		<image :src="userAvatar" class="avatar"></image>
		<view class="userInfo">
			<text>{{username}}</text>
			<view>
				<text>{{userfollow}}关注</text>
				<text>{{userfans}}粉丝</text>
				<text>Lv{{userLevel}}</text>
			</view>
		</view>
		<view class="userFun">
			<view class="FunItem" @tap="handleTap(1)">
				<image src="../../src/assets/icon/play.png"></image>
				<text>最近播放</text>
			</view>
			<view class="FunItem" @tap="handleTap(2)">
				<image src="../../src/assets/icon/download.png"></image>
				<text>本地/下载</text>
			</view>
			<view class="FunItem" @tap="handleTap(3)">
				<image src="../../src/assets/icon/download.png"></image>
				<text>云盘</text>
			</view>
			<view class="FunItem">
				<image src="../../src/assets/icon/buy.png"></image>
				<text>已购</text>
			</view>
			<view class="FunItem">
				<image src="../../src/assets/icon/firend.png"></image>
				<text>我的好友</text>
			</view>
			<view class="FunItem">
				<image src="../../src/assets/icon/收藏.png"></image>
				<text>收藏和赞</text>
			</view>
			<view class="FunItem">
				<image src="../../src/assets/icon/radio.png"></image>
				<text>我的博客</text>
			</view>
			<view class="FunItem">
				<image src="../../src/assets/icon/can.png"></image>
				<text>音乐罐子</text>
			</view>
		</view>
		<view class="myFavorSong">
			<image :src="likeimg"></image>
			<view class="text">
				<text>我喜欢的音乐</text>
				<text class="mynumber">{{trackCount}}首</text>
			</view>
			<view class="favButton">
				<view class='border'>
					<image src="../../src/assets/icon/aixin.png"></image>
					<text>心动模式</text>
				</view>
			</view>
		</view>
		<view class="listTitle" ref="listTitle">
			<view>创建歌单</view>
			<hr />
			<view>收藏歌单</view>
			<hr />
			<view>歌单助手</view>
		</view>
		<view class="CreateSonglist">
			<view class="title">
				<text>收藏歌单(19个)</text>
				<image class="add" src="../../components/zaudio/static/playbtn2.png"></image>
				<image class="tridot" src="../../components/zaudio/static/next.png"></image>
			</view>
			<view v-for="(item,index) in userSonglist" :key="index" class="itemcontent" @click="tosonglist(item.id)">
				<view class="item">
					<image :src="item.coverImgUrl"></image>
					<view class="textcontent">
						<text class="songTitle">{{item.name}}</text>
						<text>{{item.trackCount}}首</text>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="CollectSonglist">
			bbbbb
		</view>
		<view class="listHelper">
			ccccc
		</view> -->
		
	</scroll-view>
	<zaudio theme="theme3" :autoplay="false" :continue="true" ref="zaudio"></zaudio>
	</view>
</template>

<script>
	import zaudio from '../../components/zaudio/zaudio.vue'
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		components:{
			zaudio
		},
		data() {
			return {
				isFixedTop: false,
				heightF:uni.upx2px(100),
				top:0,
				userId:'',
				username:'',
				userAvatar:'',
				userLevel:'',
				userfans:'',
				userfollow:'',
				userCreatelist:[],
				userCreatelistNum:'',
				userSonglist:[],
				userSubscribedCount:'',
				listenSongs:'',
				trackCount:'',
				playCount:'',
				likeid:'',
				likeimg:'',
				mainHeight:500,
				videomainHeight:500,
			}
		},
		computed:{
			...mapGetters(['audiolist', 'playinfo'])
		},
		onPageScroll(e) {
			var number = e.scrollTop + uni.getSystemInfoSync().statusBarHeight + 44
			
			if(number > this.$refs.listTitle.offsetTop){
				this.isFixedTop = true
				// console.log('fixed',this.isFixedTop,"this.$refs.listTitle.offsetTop",this.$refs.listTitle.offsetHeight)
			}else{
				this.isFixedTop = false
				// console.log("uni.getSystemInfoSync().statusBarHeigh",uni.getSystemInfoSync().statusBarHeigh)
				// console.log(number);
				// console.log('fixed',this.$refs.listTitle,"this.$refs.listTitle.offsetTop",this.$refs.listTitle.$el.offsetTop)
			}
		},
		onLoad() {
			this.getuserInfo()
			const Magnification = uni.getSystemInfoSync().windowWidth / 750
			this.mainHeight = uni.getSystemInfoSync().windowHeight
			this.videomainHeight = uni.getSystemInfoSync().windowHeight - 150 * Magnification
			
		},
		methods: {
			...mapMutations(['set_audiolist', 'set_playinfo', 'set_audio']),
			tosonglist(val){
				uni.navigateTo({
					url:'../songlist/songlist?id=' +val,
				})
			},
			handleTap(val){
				console.log(val)
				switch(val){
					case 1:
					// uni.navigateTo({
					// 	url: '/pages/user/userCenter',
					// })
						break;
					case 2:
					// uni.navigateTo({
					// 	url: '/pages/search/searchList',
					// })
						break;
					case 3:
					// uni.navigateTo({
					// 	url:'/pages/musicPlayer/musicPlayer',
					// })
				}
				
			},
			//获取用户的基本信息
			async getuserInfo(){
				const val = uni.getStorageSync('cookietoken')
				if(val){
					const res = await this.$http({
						url: 'user/account',
					})
					// console.log('resuser',res)
					this.userId = res.data.profile.userId
					this.username = res.data.profile.nickname
					this.userAvatar = res.data.profile.avatarUrl
				}
				
				this.getuserDetail()
				this.getsonglist()
			},
			//获取用户的详细信息
			async getuserDetail(){
				const res = await this.$http({
					url: 'user/detail',
					data: {
						uid: this.userId
					},
				})
				// console.log('resuserdetail',res)
				this.userLevel = res.data.level
				this.userfollow = res.data.profile.follows
				this.userfans = res.data.profile.followeds
				this.userCreatelistNum = res.data.profile.playlistCount - 1
				this.playlistBeSubscribedCount = res.data.profile.playlistBeSubscribedCount
				this.listenSongs = res.data.listenSongs
			},
			async getsonglist(){
				const res = await this.$http({
					url: 'user/playlist',
					data: {
						uid: this.userId,
					},
				})
				console.log('-====>',res,'???',this.userId)
				this.trackCount = res.data.playlist[0].trackCount
				this.playCount = res.data.playlist[0].playCount
				this.likeid = res.data.playlist[0].id
				this.likeimg = res.data.playlist[0].coverImgUrl
			},
			async getsonglist(){
				const res = await this.$http({
					url:'user/playlist',
					data:{
						uid: this.userId,
					}
				})
				console.log('user/playlist',res)
				this.likeid = res.data.playlist[0].id
				this.playCount = res.data.playlist[0].playCount
				this.trackCount = res.data.playlist[0].trackCount
				res.data.playlist.forEach(item=>{
					if(item.userId == this.userId){
						this.userCreatelist.push({
							id: item.id,
							name: item.name,
							trackCount: item.trackCount,
							coverImgUrl: item.coverImgUrl
						})
					}else{
						this.userSonglist.push({
							id: item.id,
							name: item.name,
							trackCount: item.trackCount,
							coverImgUrl: item.coverImgUrl
						})
					}
				})
				console.log('createlist',this.userCreatelist)
				console.log('songlist',this.userSonglist)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mainContanier {
		width: 100%;
		height: 100%;
		background-color: #F6F6F6;
		position: relative;

		.avatar {
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			position: absolute;
			top: 0;
			left: 290rpx;
			flex: 1;
			flex-shrink: 1;
			z-index: 3;
		}

		.userInfo {
			width: 90%;
			height: 200rpx;
			background-color: #FFFFFF;
			position: relative;
			left: 0;
			right: 0;
			margin: auto;
			margin-top: 80rpx;
			border-radius: 25rpx;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			padding: 25rpx 0rpx;

			>text {
				position: relative;
				right: 0;
				left: 0;
				margin: auto;
				font-size: 50rpx;
			}

			view {
				display: flex;
				flex-flow: row;

				text {
					font-size: 35rpx;

					&:not(:last-child):after {
						content: '|';
						margin-left: 10rpx;
						margin-right: 10rpx;
					}
				}
			}
		}

		.userFun {
			width: 90%;
			background-color: #FFFFFF;
			position: relative;
			left: 0;
			right: 0;
			margin: auto;
			border-radius: 25rpx;
			margin-top: 20rpx;
			display: flex;
			flex-flow: row wrap;
			padding: 25rpx;
			box-sizing: border-box;
			.FunItem {
				display: flex;
				flex-flow: column nowrap;
				width: 25%;
				height: 50%;
				justify-content: center;
				align-items: center;
				image {
					width: 50rpx;
					height: 50rpx;
					padding: 35rpx 35rpx 15rpx 35rpx;
				}

				text {
					font-size: 15rpx;
				}

				&:nth-child(n+5) {
					margin-top: 15rpx;
				}
			}
		}

		.myFavorSong {
			display: flex;
			flex-flow: row nowrap;
			width: 90%;
			background-color: #FFFFFF;
			position: relative;
			left: 0;
			right: 0;
			margin: auto;
			margin-top: 20rpx;
			border-radius: 25rpx;
			box-sizing: border-box;
			padding: 25rpx;

			>image {
				width: 90rpx;
				height: 90rpx;
				border-radius: 10rpx;
			}

			.text {
				display: flex;
				flex-direction: column;
				margin-left: 10rpx;
			}

			.favButton {
				width: 35rpx;
				height: 20rpx;
				border: 1prx solid #F6F6F6;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-end;
				flex: 1;
				position: relative;

				.border {
					border: 2rpx solid #000000;
					border-radius: 35rpx;
					padding: 5rpx;
					box-sizing: border-box;
					margin-top: 65rpx;
				}

				image {
					width: 25rpx;
					height: 25rpx;

				}

				text {
					font-size: 8rpx;
				}
			}
		}

		.listTitle {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			box-sizing: border-box;
			position: sticky;
			z-index:999;
			padding: 30rpx;
			hr {
				height: 35rpx;
				margin: 0rpx 15rpx 0rpx 15rpx;
			}
		}

		.listTitleTop {
			width: 100%;
			height: 100%;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			box-sizing: border-box;
			background-color: #FFFFFF;
			padding: 30rpx;

		}

		.CreateSonglist {
			display: flex;
			flex-flow: column nowrap;
			width: 90%;
			background-color: #FFFFFF;
			left: 0;
			right: 0;
			margin: auto;
			margin-top: 10rpx;
			border-radius: 25rpx;
			box-sizing: border-box;
			padding: 25rpx;
			.title{
				display: flex;
				flex-flow:  row nowrap;
				width: 100%;
				margin-bottom: 10rpx;
				text{
					flex: 1;
				}
				.add{
					width: 35rpx;
					height: 35rpx;
					margin-right: 15rpx;
				}
				.tridot{
					width: 35rpx;
					height: 35rpx;
				}
			}
			.itemcontent{
				.item{
					display: flex;
					flex-flow: row nowrap;
					image{
						width: 130rpx;
						height: 130rpx;
						border-radius: 20rpx;
					}
					.textcontent{
						display: flex;
						flex-flow: column nowrap;
						justify-content: center;
						flex: 1;
						text{
							font-size: 25rpx;
							padding: 10rpx;
						}
					}
					
				}
				&:not(:last-child){
					margin-bottom: 20rpx;
				}
			}
		}

		.CollectSonglist {
			display: flex;
			flex-flow: row nowrap;
			width: 90%;
			height: 100%;
			background-color: #FFFFFF;
			left: 0;
			right: 0;
			margin: auto;
			margin-top: 20rpx;
			border-radius: 25rpx;
			box-sizing: border-box;
			padding: 25rpx;
		}

		.listHelper {
			display: flex;
			flex-flow: row nowrap;
			width: 90%;
			height: 18000rpx;
			background-color: #FFFFFF;
			left: 0;
			right: 0;
			margin: auto;
			margin-top: 20rpx;
			border-radius: 25rpx;
			box-sizing: border-box;
			padding: 25rpx;

		}
	}
</style>
