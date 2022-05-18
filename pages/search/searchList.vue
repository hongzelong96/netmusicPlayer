<template>
	<view class="mainContanier">
		<view class="titleContainer">
			<view class="titleItem" @click="handleSelect(1)">
				<text>歌曲</text>
				<hr v-if="selectTitle === 1" />
			</view>
			<view class="titleItem" @click="handleSelect(1000)">
				<text>歌单</text>
				<hr v-if="selectTitle === 1000" />
			</view>
			<view class="titleItem" @click="handleSelect(100)">
				<text>歌手</text>
				<hr v-if="selectTitle === 100" />
			</view>
			<view class="titleItem" @click="handleSelect(10)">
				<text>专辑</text>
				<hr v-if="selectTitle === 10" />
			</view>
			<view class="titleItem" @click="handleSelect(1002)">
				<text>用户</text>
				<hr v-if="selectTitle === 1002" />
			</view>
		</view>
		<view class="listContanier">
			<scroll-view scroll-y="true" style="margin-top: 30rpx;" :style="{height:audiolist.length===0?mainHeight+'px':videomainHeight+'px'}">
				<!-- <scroll-view scroll-y="true" style="margin-top: 30rpx;" :style="{height:audiolist.length===0?mainHeight+'px':videomainHeight+'px'}"> -->
				<view class="songItem" v-for="(item,index) in songlist" :key='item.id' v-show="selectTitle===1"  @click="playsong(item)">
					<text class="SongName">{{item.name}}</text>
					<view class="descontent">
						<text class="vip" v-if="item.fee === 1">vip</text>
						<text class="des" v-for="(item1,index1) in item.ar"
							:key='index1'>{{index1===0?item1.name:'/'+item1.name}}</text>
						<text class="des">-{{item.al.name}}</text>
					</view>
				</view>
				<view class="songlistItem" v-show="selectTitle === 1000" v-for="(item,index) in playlists" :key = 'item.id' @click="tosonglist(item)">
					<image :src="item.coverImgUrl" mode="aspectFit" lazy-load="true"></image>
					<view class="songlistdetail">
						<text class="name">{{item.name}}</text>
						<text
							class="creator">{{item.trackCount}}首，by{{item.creator.nickname}}，播放{{item.playCount}}次</text>
					</view>
				</view>
				<view class="songlistItem" v-show="selectTitle === 100" v-for="(item,index) in artistlists" :key = 'item.id'>
					<image :src="item.picUrl?item.picUrl:item.img1v1Url" mode="aspectFit" lazy-load="true"></image>
					<view class="songlistdetail">
						<text class="name">{{item.name}}</text>
					</view>
				</view>
				<view class="songlistItem" v-show="selectTitle === 10" v-for="(item,index) in albumlists" :key = 'item.id'>
					<image :src="item.blurPicUrl" mode="aspectFit" lazy-load="true"></image>
					<view class="songlistdetail">
						<text class="name">{{item.name}}</text>
						<text class="creator">歌手：{{item.artist.name}}</text>
					</view>
				</view>
				<view class="songlistItem" v-show="selectTitle === 1002" v-for="(item,index) in userlists" :key = 'item.id'>
					<image :src="item.avatarUrl" mode="aspectFit" lazy-load="true"></image>
					<view class="songlistdetail">
						<text class="name">{{item.nickname}}</text>
					</view>
				</view>
			</scroll-view>
			<ZAudio theme="theme3" :autoplay="false" :continue="true" ref='zaudio'></ZAudio>
		</view>
	</view>
</template>

<script>
	import toSongDetail from '../../components/common/toSongDetail.js'
	import ZAudio from '../../components/zaudio/zaudio.vue'
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		mixins:[toSongDetail],
		components: {
			ZAudio
		},
		data() {
			return {
				selectTitle: 1,
				mainHeight: 500,
				videomainHeight: 500,
				key: '',
				offset: 0,
				songlist: [],//歌曲数据
				playlists: [],//歌单数据
				artistlists: [],//歌手数据
				albumlists: [],//专辑数组
				userlists: [],//用户数组
				count: 0,
				songIdlist:[]
			}
		},
		computed:{
			...mapGetters(['audiolist', 'playinfo', 'paused'])
		},
		methods: {
			...mapMutations(['set_audio', 'set_audiolist']),
			handleSelect(val) {
				if (val === this.selectTitle) return
				this.selectTitle = val
				this.getsearch(this.key, this.selectTitle)
			},
			playsong(item){	
				if (item.fee === 1) {
					uni.showToast({
						icon:"none",
						title:'vip受限，无法播放',
						duration:1000
					})
					return 
				}
				let singername = ''
				item.ar.forEach((item, index) => {
					if (index === 0) {
						singername = item.name
					} else {
						singername = singername + '/' + item.name
					}
				})
				let songdetail={
					src:'http://music.163.com/song/media/outer/url?id=' + item.id + '.mp3',
					title:item.name,
					singerid: item.ar.map(item => {
						return {
							id: item.id,
							name: item.name
						}
					}),
					singer:singername,
					singer: singername,
					coverImgUrl:item.al.picUrl,
					id:item.id,
					}
				this.songIdlist = [songdetail]
				console.log("songIdlist",this.songIdlist,item.fee)
				this.toSongDetail(item.id,item.fee)
			},
			async getsearch(key, selectTitle) {
				const res = await this.$http({
					url: "cloudsearch",
					data: {
						keywords: key,
						type: selectTitle,
						offset: this.offset
					}
				})
				console.log("请求返回", res)
				let count = 0
				switch (selectTitle) {
					case 1:
						this.songlist = res.data.result.songs
						count = res.data.result.songCount
						break;
					case 1000:
						this.playlists = res.data.result.playlists
						count = res.data.result.playlistCount
						break;
					case 100:
						this.artistlists = res.data.result.artists
						count = res.data.result.artistCount
						break;
					case 10:
						this.albumlists = res.data.result.albums
						count = res.data.result.albumCount
						break;
					case 1002:
						this.userlists = res.data.result.userprofiles
						count = res.data.result.userprofileCount
						console.log('---<',this.userlists)
						break;
				}
				uni.setNavigationBarTitle({
					title: '搜索结果(' + count + ')'
				})

			},
			tosonglist(item){
				console.log('item.id',item.id)
				uni.navigateTo({
					url:'../songlist/songlist?id=' +item.id,
				})
			}
		},
		onLoad(e) {
			this.key = e.keyword
			this.getsearch(e.keyword, 1)
			const Magnification = uni.getSystemInfoSync().windowWidth / 750
			this.mainHeight = uni.getSystemInfoSync().windowHeight - 80 * Magnification - 1
			this.videomainHeight = uni.getSystemInfoSync().windowHeight - 270 * Magnification - 1
		},
	}
</script>

<style lang="scss" scoped>
	.mainContanier {
		.titleContainer {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			position: fixed;
			top: 80rpx;
			width: 100%;
			height: 120rpx;
			background-color: #FFFFFF;
			z-index: 999;

			.titleItem {
				font-size: 35rpx;
				position: relative;
				margin-top: 25rpx;

				hr {
					position: absolute;
					left: 0;
					right: 0;
					margin: auto;
					margin-top: 15rpx;
					border: 5rpx solid red;
					width: 70%;

				}

			}
		}

		.listContanier {
			padding: 80rpx 10rpx 10rpx 10rpx;

			.songItem {
				padding: 10rpx 20rpx 0 20rpx;

				.vip {
					border: 2rpx solid red;
					font-size: 10rpx;
					margin-right: 10rpx;
				}

				.SongName {
					font-size: 35rpx;
				}
				.descontent{
					width: 90%;
					height:40rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.des {
					font-size: 15rpx;
				}
			}

			.songlistItem {
				display: flex;
				margin-top: 30rpx;
				margin-left: 30rpx;
				margin-right: 20rpx;
				image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 10rpx;
					vertical-align: middle;
				}

				.songlistdetail {
					display: inline-block;
					width: 550rpx;
					margin-left: 20rpx;
					vertical-align: middle;
					text {
						display: block;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.name {
						font-size: 30rpx;
						padding-bottom: 10rpx;
					}

					.creator {
						font-size: 25rpx;
						color: #909090;
					}
				}
			}
		}
	}
</style>
