<template>
	<view class="mainContanier">
		<blurBg :params="params"></blurBg>
		<view :class="{nav:true,navAll:isImmersedStatusbar}">
			<image src="../../static/return.png" mode="aspectFill" @click="goback"></image>
			<view class="Titlenav">
				<text :class="{songname:true,songnamelong:renderData('title').length<=18}">{{ renderData('title')}}</text>
				<view class="artist">
					<text>{{ renderData('singer') }}</text>
				</view>
			</view>
		</view>
		<zaudio theme="theme1" :autoplay="false" :continue="true" ref="zaudio" :getcommentnum="true" :isone="isone"></zaudio>
		
		<view class="recordContent">
			<view class="none"></view>
			<image class="aag" :class="paused?'aag-paused':'aag-play'" src="../../static/aag.png"></image>
			<view class="record">
				<image class="disc" src="../../static/play.png"></image>
				<image class="img" :class="paused?'img-paused':'img-play'" :src="renderData('coverImgUrl')"></image>
			</view>
			
		</view>
		<view class="playnav">
			<image src="../../static/circle.png" mode="aspectFit" class="icon" v-if="!isone" @click.stop="Playmode(1)"></image>
			<image src="../../static/onecircle.png" mode="aspectFit" class="icon" v-else @click.stop="Playmode(0)"></image>
			<image src="../../static/prev.png" mode="aspectFit" class="icon" @click="changeCurrentSong(-1)"></image>
			<image src="../../static/play2.png" mode="aspectFit" class="icon1" @click="handlePlay(0)" v-if="paused"></image>
			<image src="../../static/pause.png" mode="aspectFit" class="icon1" @click="handlePlay(1)" v-else></image>
			<image src="../../static/next.png" mode="aspectFit" class="icon" @click="changeCurrentSong(1)"></image>
			<image src="../../static/remark.png" mode="aspectFit" class="icon" @click=""></image>
			<image src="../../static/list.png" mode="aspectFit" class="icon"  @click=""></image>
		
		</view>
	</view>
</template>

<script>
	import zaudio from '../../components/zaudio/zaudio.vue'
	import blurBg from '../../components/blurBg/blurBg.vue'
	import {
		mapGetters,mapMutations
	} from 'vuex';
	import {
		formatSeconds
	} from '../../components/zaudio/util.js';
	export default{
		components:{
			zaudio,
			blurBg
		},
		data(){
			return{
				params: {
					width: '850px',
					height: '900px',
					image: "https://mydarling.gitee.io/uniapp-extend/static/images/douyin/4.jpg",
					blur: "xl"
				},
				changePlay:false
			}
		},
		computed:{
			...mapGetters(['audiolist', 'playIndex', 'playinfo', 'paused', 'renderIsPlay', 'audio', 'renderIndex','isone']),
			renderData() {
				return name => {
					if (!this.renderIsPlay) {
						if (name == 'paused') {
							return true;
						}
						return this.audio[name];
					} else {
						if (name == 'paused') {
							return this.paused;
						}
						return this.playinfo[name];
					}
				};
			}
		},
		methods:{
			...mapMutations(['set_delaudiolist','set_isone','set_audio', 'set_playinfo', 'set_pause', 'set_n_pause', 'set_renderIndex', 'set_audiolist']),
			Playmode(val){
				this.set_isone(val)
				if(val){
					uni.showToast({
						icon: "none",
						title: "已开启单曲循环",
						duration: 1000
					})
				}else{
					uni.showToast({
						icon: "none",
						title: "已开列表单曲循环",
						duration: 1000
					})
				}
			},
			handlePlay(val){
				if(val){
					this.paused = true
					this.$refs.zaudio.operation(false)
					console.log('暂停',this.paused)
				}
				else{
					this.paused = false
					console.log('播放',this.paused)
					this.$refs.zaudio.operation(true)
				}
			},
			goback() {
				uni.navigateBack()
			},
			changeCurrentSong(val){
				this.changePlay = true
				let nowindex = this.renderIndex;
				nowindex += val;
				nowindex = nowindex < 0 ?this.audiolist.length - 1 : nowindex >this.audiolist.length-1 ? 0 : nowindex
				this.set_pause(true)
				this.set_renderIndex(nowindex)
			},
			operation(val){
				const {
					duration,
					current,
					duration_value,
					current_value,
					src
				} = this.playinfo;
				const {
					src: renderSrc,
					title: renderTitle,
					singer: renderSinger,
					coverImgUrl: renderCoverImgUrl
				} = this.audio;
				if(!this.renderIsPlay){
					if(this.paused || val){
						this.$audio.src = renderSrc;
						this.$audio.title = renderTitle;
						this.$audio.singer = renderSinger;
						this.$audio.coverImgUrl = renderCoverImgUrl || this.default_cover;
						this.$audio.startTime = 0;
						this.$audio.seek(0);
						
						this.$audio.play();
						
						this.set_pause(false);
						
						this.set_playinfo({
							src: renderSrc,
							title: renderTitle,
							singer: renderSinger,
							coverImgUrl: renderCoverImgUrl
						});
					}else {
						//暂停
						this.$audio.pause();
						this.set_pause(true);
						this.set_n_pause(true);
					}
				}else {
					//渲染与播放地址相同
					if (this.paused) {
						this.$audio.play();

						this.$audio.startTime = parseFloat(current_value);
						this.$audio.seek(parseFloat(current_value));

						this.set_pause(false);

						this.set_playinfo({
							src: renderSrc,
							title: renderTitle,
							singer: renderSinger,
							coverImgUrl: renderCoverImgUrl
						});
					} else {
						this.$audio.pause();
						this.set_pause(true);
						this.set_n_pause(true);
					}
				}
				this.params.image = this.audio.coverImgUrl
				}
		},
		onLoad() {
			this.params.image = this.audio.coverImgUrl
		},
		onShow() {
			this.set_renderIndex(this.playIndex);
			this.params.image = this.audio.coverImgUrl
		}
	}
</script>

<style lang="scss" scoped>
	.mainContanier{
		width: 100%;
		height: auto;
		.nav {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100rpx;
			z-index: 1;
		
			image {
				width: 80rpx;
				height: 80rpx;
				margin-top: 10rpx;
				margin-left: 10rpx;
				vertical-align: middle;
			}
		
			.Titlenav {
				max-width: 350rpx;
				white-space: nowrap;
				overflow: hidden;
				display: inline-block;
				vertical-align: middle;
		
				.artist {
					margin-left: 30rpx;
					font-size: 28rpx;
					color: #FFFFFF
				}
		
				.iconfont {
					font-size: 25rpx;
				}
		
				.songname {
					display: inline-block;
					white-space: nowrap;
					margin-left: 30rpx;
					font-size: 30rpx;
					color: #FFFFFF;
					animation: 20s wordsLoop linear infinite normal;
				}
		
				.songnamelong {
					animation: 0s
				}
			}
		}
		.recordContent{
			width: 100%;
			height: auto;
			.aag{
				position: absolute;
				width: 192rpx;
				height: 320rpx;
				top:135rpx;
				z-index: 10000;
				left: 145rpx;
				right: 0;
				margin: auto;
				transition: 1s ease-in;
			}
			.aag-play{
				transform: rotate(0deg) translate(0rpx,0rpx);
			}
			.aag-paused{
				transform: rotate(-20deg) translate(30rpx,5rpx);
			}
			.record{
				width: 100%;
				height: auto;
				.disc{
					position: absolute;
					width: 500rpx;
					height: 500rpx;
					margin: auto;
					left: 0;
					right: 0;
					top:320rpx;
					z-index: 9999;
				}
				.img{
					position: absolute;
					width: 300rpx;
					height: 300rpx;
					border-radius: 100%;
					margin: auto;
					left: 0;
					right: 0;
					top:420rpx;
					z-index: 9999;
				}
				.img-play{
					animation: RotateDisc 20s linear infinite;
				}
				.img-paused{
					animation-play-state: paused;
				}
			}
			
		}
		.playnav {
			position: absolute;
			z-index: 1;
			height: 100rpx;
			left: 0;
			right: 0;
			margin: auto;
			bottom: 0;
			z-index: 9999;
			padding-left: 100rpx;
			padding-bottom: 80rpx;
			.icon1 {
				width: 100rpx;
				height: 100rpx;
				vertical-align: middle;
				margin: 0 25rpx;
				z-index: 9999;
			}
			.icon {
				height: 40rpx;
				width: 40rpx;
				vertical-align: middle;
				margin: 0 30rpx;
				z-index: 9999;
			}
		}
	}
	
	@keyframes RotateDisc {
		from {
			transform: rotateZ(0deg);
		}
		to {
			transform: rotateZ(360deg);
		}
	}
</style>
