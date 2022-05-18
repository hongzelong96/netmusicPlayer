<template>
	<view class="mainContanier">
		<view @click="handleSearch">
			<search-bar :placeholder="searchPlaceHolder" @confirm="search" v-model="keyword"
				@input="getsuggestion($event)"></search-bar>
		</view>
		<view class="SuggestContanier" v-if="suggestionlist.length!==0">
			<view class="searchitem" v-for="(item,index) in suggestionlist" :key='index'>
				<icon type="search" size="15"></icon>
				<text class="itemcontent" @click="suggestionTo(item.keyword)">{{item.keyword}}</text>
			</view>
		</view>
		<view class="remainingContent">
			<view class="history" v-if="historylist.length>0">
				<view class="title">
					历史
				</view>
				<view class="historyItem" v-for="(item,index) in historylist" :key="index" @click="suggestionTo(item)">
					{{item}}
				</view>
				<icon class="clearbutton" type="clear" size="18" @click="delHistory"></icon>
			</view>
			<text style="margin-top:50rpx;margin-left: 40rpx;">
				热搜话题
			</text>
			<view class="hotlist">
				<view class="lefthot">
					<view :class="{bold:index<='2'?true:false}" v-for="(item,index) in hotSearchlist" v-if='(index+2)%2==0' :key="item.score"
					 @click="suggestionTo(item.searchWord)"><text :class="{lessthanten:index<='8'?true:false}">{{index+1}}</text><text>{{item.searchWord}}</text>
						<image v-if="item.iconUrl" :src="hotSearchlist[index].iconUrl" mode="heightFix"></image>
					</view>
			
				</view>
				<view class="righthot">
					<view :class="{bold:index<='2'?true:false}" v-for="(item,index) in hotSearchlist" v-if='(index+2)%2==1' :key="item.score"
					 @click="suggestionTo(item.searchWord)"><text :class="{lessthanten:index<='8'?true:false}">{{index+1}}</text><text>{{item.searchWord}}</text>
						<image v-if="item.iconUrl" :src="hotSearchlist[index].iconUrl" mode="heightFix"></image>
					</view>
				</view>
			</view>
		</view>
		<xy-dialog title="提示"
				content=""
				:show="showDialog"
				@cancelButton="clickCancel()"
				@confirmButton="clickConfirm()">
				<view style="padding: 0 30upx 30upx;">
					<view>是否确认删除</view>
				</view>
		</xy-dialog>
		<zaudio theme="theme3" :autoplay="false" :continue="true" ref="zaudio"></zaudio>
	</view>

</template>

<script>
	import searchBar from '../../components/sreach_bar/search_bar.vue'
	import xyDialog from '@/components/xy-dialog/xy-dialog.vue'
	export default {
		data() {
			return {
				searchPlaceHolder: '',
				realplaceHolder: '',
				keyword: '',
				suggestionlist: [],
				hotSearchlist: [],
				historylist: [],
				Sendbefore: '',
				showDialog:false
			}

		},
		components: {
			searchBar,
			xyDialog
		},
		methods: {
			async getPlaceHolder() {
				const res = await this.$http({
					url: 'search/default'
				})
				this.searchPlaceHolder = res.data.data.showKeyword
				this.realplaceHolder = res.data.data.realkeyword
			},
			async getHolist() {
				const res = await this.$http({
					url: 'search/hot/detail'
				})
				this.hotSearchlist = res.data.data.slice(0, 10)
				console.log(this.hotSearchlist)
			},
			async getHistory() {
				const historyStorage = await uni.getStorageSync('historyKeyword')
				if (!historyStorage) {
					return
				}
				this.historylist = historyStorage
			},
			async getsuggestion(e) {
				if (this.Sendbefore === e.value) {
					console.log('和上次一样')
					return
				}
				if (!e) {
					this.suggestionlist = []
					return
				}
				e = e.value.replace(/\s*/g, "") //去掉多余空格
				if (!e.length) {
					this.suggestionlist = []
					return
				}
				const res = await this.$http({
					url: 'search/suggest',
					data: {
						keywords: e,
						type: 'mobile'
					}
				})
				console.log('suggest===》', res)
				this.Sendbefore = e
				if (!res.data.result.allMatch) {
					//结果为空
					this.suggestionlist = []
				} else(
					this.suggestionlist = res.data.result.allMatch
				)
			},
			suggestionTo(val) {
				console.log("val:",val)
				let obj={
					value:val
				}
				this.search(obj)
			},
			search(val){
				this.suggestionlist = []
				if(!val.value){
					val.value = this.searchPlaceHolder
				}
				this.saveHistory(val.value)
				// uni.navigateTo({
				// 	url:'pages/search/searchList?keywords='+ val,
				// })
				uni.navigateTo({
					url:'./searchList?keyword='+val.value
				})
			},
			saveHistory(val) {
				//有就删除
				if (this.historylist.indexOf(val) !== -1) {
					this.historylist.splice(this.historylist.indexOf(val), 1)
				}
				this.historylist.unshift(val)
				//大于8就取前8
				if (this.historylist.length > 8) {
					this.historylist = this.historylist.slice(0, 8)
				}
				uni.setStorageSync('historykeyword', this.historylist);
			},
			delHistory(){
				this.showDialog = true
			},
			clickCancel(){
				this.showDialog = false
			},
			clickConfirm(){
				this.historylist =[],
				uni.setStorageSync('historykeyword',this.historylist)
			}
		},
		created() {
			this.getPlaceHolder(),
			this.getHolist(),
			this.getHistory()
		},
		onLoad() {}
	}
</script>

<style lang="scss" scoped>
	.mainContanier {
		.SuggestContanier {
			display: flex;
			flex-flow: column nowrap;
			margin-left: 17rpx;
			border: 1rpx solid #535353;
			width: 640rpx;
			border-radius: 20rpx;
			padding: 20rpx;
			box-sizing: border-box;
			position: absolute;
			background-color: #FFFFFF;
			z-index: 1;
			.searchitem {
				position: relative;
				padding: 10rpx;

				.search {
					width: 30rpx;
					height: 15rpx;
					position: absolute;
					top: 0;
					bottom: 0;
					margin: auto;
				}

				.itemcontent {
					margin-left: 15rpx;
					opacity: 0.7;
					position: absolute;
					bottom:10rpx;
					font-size: 15rpx;
				}

				&:not(:last-child) {
					border-bottom: 1rpx solid #535353;
				}
			}
		}
		.remainingContent{
			.history{
				position: relative;
				display: flex;
				flex-wrap: wrap;
				line-height: 50rpx;
				.title{
					height: 50rpx;
					font-size: 28rpx;
					margin-left: 30rpx;
					margin-bottom: 20rpx;
				}
				.historyItem{
					height: 50rpx;
					font-size: 26rpx;
					background-color: #ededed;
					margin-left: 20rpx;
					padding: 0 30rpx;
					border-radius: 20rpx;
					margin-bottom: 20rpx;
				}
				.clearbutton{
					margin-left: 15rpx;
					margin-top: 4rpx;
				}
			}
			.hotlist{
				.lefthot{
					width: 46%;
					float: left;
					margin-top: 30rpx;
					margin-left: 4%;
					view {
						font-size: 30rpx;
						margin-bottom: 20rpx;
						display: block;
						white-space: nowrap; //不换行	
					
						text {
							margin-right: 15rpx;
							max-width: 60%;
							overflow: hidden; //超出的文本隐藏
							text-overflow: ellipsis; //用省略号显示
							display: inline-block;
						}
					
						.lessthanten {
							margin-right: 30rpx !important;
						}
					
						image {
							height: 30rpx;
							margin-bottom: 6rpx;
						}
					}
				}
				.righthot{
					width: 50%;
					float: left;
					margin-top: 30rpx;
					
					view {
						font-size: 30rpx;
						margin-bottom: 20rpx;
						display: block;
						white-space: nowrap; //不换行	
					
						text {
							margin-right: 15rpx;
							max-width: 60%;
							overflow: hidden; //超出的文本隐藏
							text-overflow: ellipsis; //用省略号显示
							display: inline-block;
						}
					
						.lessthanten {
							margin-right: 30rpx !important;
						}
					
						image {
							height: 30rpx;
							margin-bottom: 6rpx;
						}
					}
				}
			}
		}
	}
	
</style>
