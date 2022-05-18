<template>
	<view class="mainContanier">
		<scroll-view class="a" scroll-y="true" :style="{height:audiolist.length===0?mainHeight+'px':videomainHeight+'px'}">
			<swiper class="banners" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
				<swiper-item v-for="(item,index) in swiperList" :key="parseInt(item.bannerId)" @click="handlebannertab(index)">
					<view class='swpier-item'>
						<image :src="item.pic" mode="aspectFill" lazy-load="true"></image>
					</view>
				</swiper-item>
			</swiper>
			<scroll-view class="scroll" scroll-x="true" show-scrollbar="false">
				<view class="navContainer">
					<view class="navItem" @click="handleBarClick(1)">
						<text class="iconfont">
							<image src="../../src/assets/icon/recommendDaliy.png"></image>
						</text>
						<text class="icontxt">每日推荐</text>
					</view>
					<view class="navItem" @click="handleBarClick(2)">
						<text class="iconfont">
							<image src="../../src/assets/icon/privateFM.png"></image>
						</text>
						<text class="icontxt">私人FM</text>
					</view>
					<view class="navItem" @click="handleBarClick(3)">
						<text class="iconfont">
							<image src="../../src/assets/icon/songlist.png"></image>
						</text>
						<text class="icontxt">歌单</text>
					</view>
					<view class="navItem" @click="handleBarClick(4)">
						<text class="iconfont">
							<image src="../../src/assets/icon/paihangbang.png"></image>
						</text>
						<text class="icontxt">排行榜</text>
					</view>
					<view class="navItem" @click="handleBarClick(5)">
						<text class="iconfont">
							<image src="../../src/assets/icon/live.png"></image>
						</text>
						<text class="icontxt">直播</text>
					</view>
					<view class="navItem" @click="handleBarClick(6)">
						<text class="iconfont">
							<image src="../../src/assets/icon/digitalsong.png"></image>
						</text>
						<text class="icontxt">数字专辑</text>
					</view>
					<view class="navItem" @click="handleBarClick(7)">
						<text class="iconfont">
							<image src="../../src/assets/icon/meditation.png"></image>
						</text>
						<text class="icontxt">专注冥想</text>
					</view>
					<view class="navItem" @click="handleBarClick(8)"> 
						<text class="iconfont">
							<image src="../../src/assets/icon/songroom.png"></image>
						</text>
						<text class="icontxt">歌房</text>
					</view>
					<view class="navItem" @click="handleBarClick(9)">
						<text class="iconfont">
							<image src="../../src/assets/icon/game.png"></image>
						</text>
						<text class="icontxt">游戏专区</text>
					</view>
				</view>
			</scroll-view>

			<hr style="border: 1rpx solid #E8E8E8;">
			<view class="recommendContanier">
				<view class="item_top">
					<text>推荐歌单</text>
					<button plain="true" type="default" size="mini">更多></button>
				</view>
				<view class="item_bottom">
					<scroll-view class="scroll" scroll-x="true" show-scrollbar="false">
						<view v-for="(item,index) in recommendList" :key="parseInt(item.creativeId)" class="item" @click="tosonglist(item)">
							<image :src="item.uiElement.image.imageUrl" mode="aspectFill" lazy-load="true"></image>
							<text>{{item.uiElement.mainTitle.title}}</text>
						</view>
					</scroll-view>
				</view>
			</view>
			<homeScrollview :moveToNext="moveToNext" @changeTitle="handleTitleChange">
				<tri-column :dataList="NEW_ALBUM_SONG_List" :currentTitle="this.currentTitle" @movetoNext="getmoveNext" @playsong = "playsong">
				</tri-column>
			</homeScrollview>
			<home-hot-topic :dataList="HOT_TOPIC_List"></home-hot-topic>
		</scroll-view>
		<zaudio theme="theme3" :autoplay="false" :continue="true" ref="zaudio"></zaudio>
	</view>
</template>

<script>
	import homeScrollview from '../../components/home_scrollview/homeScrollview.vue'
	import triColumn from '../../components/scrollview_tri_column/triColumn.vue'
	import homeHotTopic from '../../components/home_hot_topic/homeHotTopic.vue'
	import toSongDetail from '../../components/common/toSongDetail.js' //点击跳转到播放器页面的方法
	import zaudio from '../../components/zaudio/zaudio.vue' //播放器组件

	import {
		mapGetters,
		mapMutations
	} from 'vuex'

	export default {
		components: {
			homeScrollview,
			triColumn,
			homeHotTopic,
			zaudio
		},
		mixins: [toSongDetail],
		data() {
			return {
				swiperList: [],
				recommendList: [], //推荐歌单
				NEW_ALBUM_SONG_List: [
					{
							"creativeType": "NEW_SONG_HOMEPAGE",
							"uiElement": {
								"mainTitle": {
									"title": "新歌"
								},
								"button": {
									"action": "orpheus://nm/discovery/newsongalbum?tab=song&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_all",
									"actionType": "orpheus",
									"text": "更多",
									"iconUrl": null
								},
								"rcmdShowType": "DEFAULT"
							},
							"resources": [
								{
									"uiElement": {
										"mainTitle": {
											"title": "沧海一粟(Remix)"
										},
										"subTitle": {
											"title": "我唯一的标签就是坚强"
										},
										"image": {
											"imageUrl": "http://p1.music.126.net/FKINh5-2Mn1BHbnFk-VOUQ==/109951167083216955.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "song",
									"resourceId": "1940692048",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "赵辰龙(Dragon X)",
												"id": 12513047,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
												"img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
												"albumSize": 0,
												"alias": [],
												"trans": "",
												"musicSize": 0,
												"topicPerson": 0
											}
										],
										"alias": "[]",
										"songData": {
											"name": "沧海一粟(Remix)",
											"id": 1940692048,
											"position": 0,
											"alias": [],
											"status": 0,
											"fee": 8,
											"copyrightId": 2709540,
											"disc": "01",
											"no": 4,
											"artists": [
												{
													"name": "赵辰龙(Dragon X)",
													"id": 12513047,
													"picId": 0,
													"img1v1Id": 0,
													"briefDesc": "",
													"picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"albumSize": 0,
													"alias": [],
													"trans": "",
													"musicSize": 0,
													"topicPerson": 0
												}
											],
											"album": {
												"name": "裂变",
												"id": 140841074,
												"type": "Single",
												"size": 3,
												"picId": 109951167083216960,
												"blurPicUrl": "http://p3.music.126.net/FKINh5-2Mn1BHbnFk-VOUQ==/109951167083216955.jpg",
												"companyId": 0,
												"pic": 109951167083216960,
												"picUrl": "http://p4.music.126.net/FKINh5-2Mn1BHbnFk-VOUQ==/109951167083216955.jpg",
												"publishTime": 1645545600000,
												"description": "",
												"tags": "",
												"company": "北京励志之霸文化传媒有限公司",
												"briefDesc": "",
												"artist": {
													"name": "",
													"id": 0,
													"picId": 0,
													"img1v1Id": 0,
													"briefDesc": "",
													"picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"albumSize": 0,
													"alias": [],
													"trans": "",
													"musicSize": 0,
													"topicPerson": 0
												},
												"songs": [],
												"alias": [],
												"status": 0,
												"copyrightId": 2709540,
												"commentThreadId": "R_AL_3_140841074",
												"artists": [
													{
														"name": "赵辰龙(Dragon X)",
														"id": 12513047,
														"picId": 0,
														"img1v1Id": 0,
														"briefDesc": "",
														"picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
														"img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
														"albumSize": 0,
														"alias": [],
														"trans": "",
														"musicSize": 0,
														"topicPerson": 0
													}
												],
												"subType": "录音室版",
												"transName": null,
												"onSale": false,
												"mark": 0,
												"gapless": 0,
												"picId_str": "109951167083216955"
											},
											"starred": false,
											"popularity": 85,
											"score": 85,
											"starredNum": 0,
											"duration": 210651,
											"playedNum": 0,
											"dayPlays": 0,
											"hearTime": 0,
											"sqMusic": null,
											"hrMusic": null,
											"ringtone": "",
											"crbt": null,
											"audition": null,
											"copyFrom": "",
											"commentThreadId": "R_SO_4_1940692048",
											"rtUrl": null,
											"ftype": 0,
											"rtUrls": [],
											"copyright": 0,
											"transName": null,
											"sign": null,
											"mark": 0,
											"originCoverType": 0,
											"originSongSimpleData": null,
											"single": 0,
											"noCopyrightRcmd": null,
											"mvid": 0,
											"hMusic": {
												"name": null,
												"id": 7234891386,
												"size": 8428191,
												"extension": "mp3",
												"sr": 44100,
												"dfsId": 0,
												"bitrate": 320000,
												"playTime": 210651,
												"volumeDelta": -86157
											},
											"mMusic": {
												"name": null,
												"id": 7234891388,
												"size": 5056932,
												"extension": "mp3",
												"sr": 44100,
												"dfsId": 0,
												"bitrate": 192000,
												"playTime": 210651,
												"volumeDelta": -83682
											},
											"lMusic": {
												"name": null,
												"id": 7234891389,
												"size": 3371302,
												"extension": "mp3",
												"sr": 44100,
												"dfsId": 0,
												"bitrate": 128000,
												"playTime": 210651,
												"volumeDelta": -82384
											},
											"bMusic": {
												"name": null,
												"id": 7234891389,
												"size": 3371302,
												"extension": "mp3",
												"sr": 44100,
												"dfsId": 0,
												"bitrate": 128000,
												"playTime": 210651,
												"volumeDelta": -82384
											},
											"rtype": 0,
											"rurl": null,
											"mp3Url": null
										},
										"songPrivilege": {
											"id": 1940692048,
											"fee": 8,
											"payed": 3,
											"realPayed": 0,
											"st": 0,
											"pl": 320000,
											"dl": 320000,
											"sp": 7,
											"cp": 1,
											"subp": 1,
											"cs": false,
											"maxbr": 320000,
											"fl": 128000,
											"pc": null,
											"toast": false,
											"flag": 0,
											"paidBigBang": false,
											"preSell": false,
											"playMaxbr": 320000,
											"downloadMaxbr": 320000,
											"maxBrLevel": "exhigh",
											"playMaxBrLevel": "exhigh",
											"downloadMaxBrLevel": "exhigh",
											"plLevel": "exhigh",
											"dlLevel": "exhigh",
											"flLevel": "standard",
											"rscl": null,
											"freeTrialPrivilege": {
												"resConsumable": false,
												"userConsumable": false,
												"listenType": null
											},
											"chargeInfoList": [
												{
													"rate": 128000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 0
												},
												{
													"rate": 192000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												},
												{
													"rate": 320000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												},
												{
													"rate": 999000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												}
											]
										}
									},
									"action": "play_all_song_from_current_index",
									"actionType": "client_customized",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "the wire"
										},
										"subTitle": {
											"title": "ego apartment新歌释出"
										},
										"image": {
											"imageUrl": "http://p1.music.126.net/cLTJQ0FMuwLxTk4Bz1f0OQ==/109951167341576995.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "song",
									"resourceId": "1941574864",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "ego apartment",
												"id": 52399380,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
												"img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
												"albumSize": 0,
												"alias": [],
												"trans": "",
												"musicSize": 0,
												"topicPerson": 0
											}
										],
										"alias": "[]",
										"songData": {
											"name": "the wire",
											"id": 1941574864,
											"position": 0,
											"alias": [],
											"status": 0,
											"fee": 8,
											"copyrightId": 2709519,
											"disc": "01",
											"no": 1,
											"artists": [
												{
													"name": "ego apartment",
													"id": 52399380,
													"picId": 0,
													"img1v1Id": 0,
													"briefDesc": "",
													"picUrl": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"albumSize": 0,
													"alias": [],
													"trans": "",
													"musicSize": 0,
													"topicPerson": 0
												}
											],
											"album": {
												"name": "the wire",
												"id": 144003256,
												"type": "Single",
												"size": 1,
												"picId": 109951167341577000,
												"blurPicUrl": "http://p3.music.126.net/cLTJQ0FMuwLxTk4Bz1f0OQ==/109951167341576995.jpg",
												"companyId": 0,
												"pic": 109951167341577000,
												"picUrl": "http://p4.music.126.net/cLTJQ0FMuwLxTk4Bz1f0OQ==/109951167341576995.jpg",
												"publishTime": 1650988800000,
												"description": "",
												"tags": "",
												"company": "NihyakuWIND",
												"briefDesc": "",
												"artist": {
													"name": "",
													"id": 0,
													"picId": 0,
													"img1v1Id": 0,
													"briefDesc": "",
													"picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"albumSize": 0,
													"alias": [],
													"trans": "",
													"musicSize": 0,
													"topicPerson": 0
												},
												"songs": [],
												"alias": [],
												"status": 0,
												"copyrightId": 2709519,
												"commentThreadId": "R_AL_3_144003256",
												"artists": [
													{
														"name": "ego apartment",
														"id": 52399380,
														"picId": 0,
														"img1v1Id": 0,
														"briefDesc": "",
														"picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
														"img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
														"albumSize": 0,
														"alias": [],
														"trans": "",
														"musicSize": 0,
														"topicPerson": 0
													}
												],
												"subType": "录音室版",
												"transName": null,
												"onSale": false,
												"mark": 0,
												"gapless": 0,
												"picId_str": "109951167341576995"
											},
											"starred": false,
											"popularity": 5,
											"score": 5,
											"starredNum": 0,
											"duration": 218631,
											"playedNum": 0,
											"dayPlays": 0,
											"hearTime": 0,
											"sqMusic": {
												"name": null,
												"id": 7240540432,
												"size": 25211486,
												"extension": "flac",
												"sr": 44100,
												"dfsId": 0,
												"bitrate": 922519,
												"playTime": 218631,
												"volumeDelta": -57453
											},
											"hrMusic": null,
											"ringtone": "",
											"crbt": null,
											"audition": null,
											"copyFrom": "",
											"commentThreadId": "R_SO_4_1941574864",
											"rtUrl": null,
											"ftype": 0,
											"rtUrls": [],
											"copyright": 0,
											"transName": null,
											"sign": null,
											"mark": 0,
											"originCoverType": 0,
											"originSongSimpleData": null,
											"single": 0,
											"noCopyrightRcmd": null,
											"mvid": 14523597,
											"hMusic": {
												"name": null,
												"id": 7240540428,
												"size": 8747929,
												"extension": "mp3",
												"sr": 44100,
												"dfsId": 0,
												"bitrate": 320000,
												"playTime": 218631,
												"volumeDelta": -57403
											},
											"mMusic": {
												"name": null,
												"id": 7240539427,
												"size": 5248775,
												"extension": "mp3",
												"sr": 44100,
												"dfsId": 0,
												"bitrate": 192000,
												"playTime": 218631,
												"volumeDelta": -54847
											},
											"lMusic": {
												"name": null,
												"id": 7240539425,
												"size": 3499198,
												"extension": "mp3",
												"sr": 44100,
												"dfsId": 0,
												"bitrate": 128000,
												"playTime": 218631,
												"volumeDelta": -53283
											},
											"bMusic": {
												"name": null,
												"id": 7240539425,
												"size": 3499198,
												"extension": "mp3",
												"sr": 44100,
												"dfsId": 0,
												"bitrate": 128000,
												"playTime": 218631,
												"volumeDelta": -53283
											},
											"rtype": 0,
											"rurl": null,
											"mp3Url": null
										},
										"songPrivilege": {
											"id": 1941574864,
											"fee": 8,
											"payed": 3,
											"realPayed": 0,
											"st": 0,
											"pl": 999000,
											"dl": 999000,
											"sp": 7,
											"cp": 1,
											"subp": 1,
											"cs": false,
											"maxbr": 999000,
											"fl": 128000,
											"pc": null,
											"toast": false,
											"flag": 4,
											"paidBigBang": false,
											"preSell": false,
											"playMaxbr": 999000,
											"downloadMaxbr": 999000,
											"maxBrLevel": "lossless",
											"playMaxBrLevel": "lossless",
											"downloadMaxBrLevel": "lossless",
											"plLevel": "lossless",
											"dlLevel": "lossless",
											"flLevel": "standard",
											"rscl": null,
											"freeTrialPrivilege": {
												"resConsumable": false,
												"userConsumable": false,
												"listenType": null
											},
											"chargeInfoList": [
												{
													"rate": 128000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 0
												},
												{
													"rate": 192000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												},
												{
													"rate": 320000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												},
												{
													"rate": 999000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												}
											]
										}
									},
									"action": "play_all_song_from_current_index",
									"actionType": "client_customized",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "忘情派对"
										},
										"subTitle": {
											"title": "用心定位我的坐标"
										},
										"image": {
											"imageUrl": "http://p1.music.126.net/NjOWd9C3eN3ULclf0tpEow==/109951167320500485.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "song",
									"resourceId": "1939955603",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "苏星婕",
												"id": 46966451,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
												"img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
												"albumSize": 0,
												"alias": [],
												"trans": "",
												"musicSize": 0,
												"topicPerson": 0
											}
										],
										"alias": "[]",
										"songData": {
											"name": "忘情派对",
											"id": 1939955603,
											"position": 0,
											"alias": [],
											"status": 0,
											"fee": 8,
											"copyrightId": 0,
											"disc": "01",
											"no": 1,
											"artists": [
												{
													"name": "苏星婕",
													"id": 46966451,
													"picId": 0,
													"img1v1Id": 0,
													"briefDesc": "",
													"picUrl": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"albumSize": 0,
													"alias": [],
													"trans": "",
													"musicSize": 0,
													"topicPerson": 0
												}
											],
											"album": {
												"name": "忘情派对",
												"id": 143741616,
												"type": "Single",
												"size": 1,
												"picId": 109951167320500480,
												"blurPicUrl": "http://p4.music.126.net/NjOWd9C3eN3ULclf0tpEow==/109951167320500485.jpg",
												"companyId": 0,
												"pic": 109951167320500480,
												"picUrl": "http://p4.music.126.net/NjOWd9C3eN3ULclf0tpEow==/109951167320500485.jpg",
												"publishTime": 1650729600000,
												"description": "",
												"tags": "",
												"company": "",
												"briefDesc": "",
												"artist": {
													"name": "",
													"id": 0,
													"picId": 0,
													"img1v1Id": 0,
													"briefDesc": "",
													"picUrl": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"albumSize": 0,
													"alias": [],
													"trans": "",
													"musicSize": 0,
													"topicPerson": 0
												},
												"songs": [],
												"alias": [],
												"status": 0,
												"copyrightId": -1,
												"commentThreadId": "R_AL_3_143741616",
												"artists": [
													{
														"name": "苏星婕",
														"id": 46966451,
														"picId": 0,
														"img1v1Id": 0,
														"briefDesc": "",
														"picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
														"img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
														"albumSize": 0,
														"alias": [],
														"trans": "",
														"musicSize": 0,
														"topicPerson": 0
													}
												],
												"subType": "录音室版",
												"transName": null,
												"onSale": false,
												"mark": 0,
												"gapless": 0,
												"picId_str": "109951167320500485"
											},
											"starred": false,
											"popularity": 85,
											"score": 85,
											"starredNum": 0,
											"duration": 155625,
											"playedNum": 0,
											"dayPlays": 0,
											"hearTime": 0,
											"sqMusic": {
												"name": null,
												"id": 7229370155,
												"size": 19995218,
												"extension": "flac",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 1027866,
												"playTime": 155625,
												"volumeDelta": -53866
											},
											"hrMusic": {
												"name": null,
												"id": 7229370157,
												"size": 34930442,
												"extension": "flac",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 1795621,
												"playTime": 155625,
												"volumeDelta": -53804
											},
											"ringtone": "",
											"crbt": null,
											"audition": null,
											"copyFrom": "",
											"commentThreadId": "R_SO_4_1939955603",
											"rtUrl": null,
											"ftype": 0,
											"rtUrls": [],
											"copyright": 0,
											"transName": null,
											"sign": null,
											"mark": 0,
											"originCoverType": 0,
											"originSongSimpleData": null,
											"single": 0,
											"noCopyrightRcmd": null,
											"mvid": 0,
											"hMusic": {
												"name": null,
												"id": 7229370156,
												"size": 6227565,
												"extension": "mp3",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 320000,
												"playTime": 155625,
												"volumeDelta": -53780
											},
											"mMusic": {
												"name": null,
												"id": 7229370164,
												"size": 3736557,
												"extension": "mp3",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 192000,
												"playTime": 155625,
												"volumeDelta": -51187
											},
											"lMusic": {
												"name": null,
												"id": 7229370158,
												"size": 2491053,
												"extension": "mp3",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 128000,
												"playTime": 155625,
												"volumeDelta": -49509
											},
											"bMusic": {
												"name": null,
												"id": 7229370158,
												"size": 2491053,
												"extension": "mp3",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 128000,
												"playTime": 155625,
												"volumeDelta": -49509
											},
											"rtype": 0,
											"rurl": null,
											"mp3Url": null
										},
										"songPrivilege": {
											"id": 1939955603,
											"fee": 8,
											"payed": 3,
											"realPayed": 0,
											"st": 0,
											"pl": 999000,
											"dl": 999000,
											"sp": 7,
											"cp": 1,
											"subp": 1,
											"cs": false,
											"maxbr": 999000,
											"fl": 128000,
											"pc": null,
											"toast": false,
											"flag": 128,
											"paidBigBang": false,
											"preSell": false,
											"playMaxbr": 999000,
											"downloadMaxbr": 999000,
											"maxBrLevel": "hires",
											"playMaxBrLevel": "hires",
											"downloadMaxBrLevel": "hires",
											"plLevel": "hires",
											"dlLevel": "hires",
											"flLevel": "standard",
											"rscl": null,
											"freeTrialPrivilege": {
												"resConsumable": false,
												"userConsumable": false,
												"listenType": null
											},
											"chargeInfoList": [
												{
													"rate": 128000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 0
												},
												{
													"rate": 192000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												},
												{
													"rate": 320000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												},
												{
													"rate": 999000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												},
												{
													"rate": 1999000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												}
											]
										}
									},
									"action": "play_all_song_from_current_index",
									"actionType": "client_customized",
									"valid": true,
									"alg": null,
									"logInfo": null
								}
							],
							"position": 0
						},
						{
							"creativeType": "NEW_SONG_HOMEPAGE",
							"uiElement": {
								"mainTitle": {
									"title": "新歌"
								},
								"button": {
									"action": "orpheus://nm/discovery/newsongalbum?tab=song&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_all",
									"actionType": "orpheus",
									"text": "更多",
									"iconUrl": null
								},
								"rcmdShowType": "DEFAULT"
							},
							"resources": [
								{
									"uiElement": {
										"mainTitle": {
											"title": "己亥杂诗"
										},
										"subTitle": {
											"title": "落红不是无情物"
										},
										"image": {
											"imageUrl": "http://p1.music.126.net/GIGz8K_gTYdKb3N_WDoMuw==/109951167338531101.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "song",
									"resourceId": "1941301325",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "奇然",
												"id": 4873,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
												"img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
												"albumSize": 0,
												"alias": [],
												"trans": "",
												"musicSize": 0,
												"topicPerson": 0
											},
											{
												"name": "沈谧仁",
												"id": 1178207,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
												"img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
												"albumSize": 0,
												"alias": [],
												"trans": "",
												"musicSize": 0,
												"topicPerson": 0
											}
										],
										"alias": "[]",
										"songData": {
											"name": "己亥杂诗",
											"id": 1941301325,
											"position": 0,
											"alias": [],
											"status": 0,
											"fee": 8,
											"copyrightId": 1415874,
											"disc": "01",
											"no": 1,
											"artists": [
												{
													"name": "奇然",
													"id": 4873,
													"picId": 0,
													"img1v1Id": 0,
													"briefDesc": "",
													"picUrl": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"albumSize": 0,
													"alias": [],
													"trans": "",
													"musicSize": 0,
													"topicPerson": 0
												},
												{
													"name": "沈谧仁",
													"id": 1178207,
													"picId": 0,
													"img1v1Id": 0,
													"briefDesc": "",
													"picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"albumSize": 0,
													"alias": [],
													"trans": "",
													"musicSize": 0,
													"topicPerson": 0
												}
											],
											"album": {
												"name": "己亥杂诗",
												"id": 143945944,
												"type": "Single",
												"size": 2,
												"picId": 109951167338531100,
												"blurPicUrl": "http://p3.music.126.net/GIGz8K_gTYdKb3N_WDoMuw==/109951167338531101.jpg",
												"companyId": 0,
												"pic": 109951167338531100,
												"picUrl": "http://p3.music.126.net/GIGz8K_gTYdKb3N_WDoMuw==/109951167338531101.jpg",
												"publishTime": 1650902400000,
												"description": "",
												"tags": "",
												"company": "北京伯音时代文化传媒有限公司",
												"briefDesc": "",
												"artist": {
													"name": "",
													"id": 0,
													"picId": 0,
													"img1v1Id": 0,
													"briefDesc": "",
													"picUrl": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"albumSize": 0,
													"alias": [],
													"trans": "",
													"musicSize": 0,
													"topicPerson": 0
												},
												"songs": [],
												"alias": [],
												"status": 0,
												"copyrightId": 1415874,
												"commentThreadId": "R_AL_3_143945944",
												"artists": [
													{
														"name": "奇然",
														"id": 4873,
														"picId": 0,
														"img1v1Id": 0,
														"briefDesc": "",
														"picUrl": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
														"img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
														"albumSize": 0,
														"alias": [],
														"trans": "",
														"musicSize": 0,
														"topicPerson": 0
													},
													{
														"name": "沈谧仁",
														"id": 1178207,
														"picId": 0,
														"img1v1Id": 0,
														"briefDesc": "",
														"picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
														"img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
														"albumSize": 0,
														"alias": [],
														"trans": "",
														"musicSize": 0,
														"topicPerson": 0
													}
												],
												"subType": "录音室版",
												"transName": null,
												"onSale": false,
												"mark": 0,
												"gapless": 0,
												"picId_str": "109951167338531101"
											},
											"starred": false,
											"popularity": 90,
											"score": 90,
											"starredNum": 0,
											"duration": 182558,
											"playedNum": 0,
											"dayPlays": 0,
											"hearTime": 0,
											"sqMusic": {
												"name": null,
												"id": 7238734388,
												"size": 16778738,
												"extension": "flac",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 735272,
												"playTime": 182558,
												"volumeDelta": -47466
											},
											"hrMusic": {
												"name": null,
												"id": 7238734386,
												"size": 33950901,
												"extension": "flac",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 1487785,
												"playTime": 182558,
												"volumeDelta": -47397
											},
											"ringtone": "",
											"crbt": null,
											"audition": null,
											"copyFrom": "",
											"commentThreadId": "R_SO_4_1941301325",
											"rtUrl": null,
											"ftype": 0,
											"rtUrls": [],
											"copyright": 0,
											"transName": null,
											"sign": null,
											"mark": 0,
											"originCoverType": 0,
											"originSongSimpleData": null,
											"single": 0,
											"noCopyrightRcmd": null,
											"mvid": 0,
											"hMusic": {
												"name": null,
												"id": 7238734391,
												"size": 7304685,
												"extension": "mp3",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 320000,
												"playTime": 182558,
												"volumeDelta": -47400
											},
											"mMusic": {
												"name": null,
												"id": 7238734384,
												"size": 4382829,
												"extension": "mp3",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 192000,
												"playTime": 182558,
												"volumeDelta": -44766
											},
											"lMusic": {
												"name": null,
												"id": 7238734382,
												"size": 2921901,
												"extension": "mp3",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 128000,
												"playTime": 182558,
												"volumeDelta": -43004
											},
											"bMusic": {
												"name": null,
												"id": 7238734382,
												"size": 2921901,
												"extension": "mp3",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 128000,
												"playTime": 182558,
												"volumeDelta": -43004
											},
											"rtype": 0,
											"rurl": null,
											"mp3Url": null
										},
										"songPrivilege": {
											"id": 1941301325,
											"fee": 8,
											"payed": 3,
											"realPayed": 0,
											"st": 0,
											"pl": 999000,
											"dl": 999000,
											"sp": 7,
											"cp": 1,
											"subp": 1,
											"cs": false,
											"maxbr": 999000,
											"fl": 128000,
											"pc": null,
											"toast": false,
											"flag": 256,
											"paidBigBang": false,
											"preSell": false,
											"playMaxbr": 999000,
											"downloadMaxbr": 999000,
											"maxBrLevel": "hires",
											"playMaxBrLevel": "hires",
											"downloadMaxBrLevel": "hires",
											"plLevel": "hires",
											"dlLevel": "hires",
											"flLevel": "standard",
											"rscl": null,
											"freeTrialPrivilege": {
												"resConsumable": false,
												"userConsumable": false,
												"listenType": null
											},
											"chargeInfoList": [
												{
													"rate": 128000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 0
												},
												{
													"rate": 192000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												},
												{
													"rate": 320000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												},
												{
													"rate": 999000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												},
												{
													"rate": 1999000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												}
											]
										}
									},
									"action": "play_all_song_from_current_index",
									"actionType": "client_customized",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "好好说话"
										},
										"subTitle": {
											"title": "到现在我就在你的身旁"
										},
										"image": {
											"imageUrl": "http://p1.music.126.net/WAPFIC0j8SadSjj7OkFxHQ==/109951167319855675.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "song",
									"resourceId": "1939928579",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "马頔",
												"id": 4592,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
												"img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
												"albumSize": 0,
												"alias": [],
												"trans": "",
												"musicSize": 0,
												"topicPerson": 0
											}
										],
										"alias": "[\"电视剧 《好好说话》片头曲\"]",
										"songData": {
											"name": "好好说话",
											"id": 1939928579,
											"position": 0,
											"alias": [
												"电视剧 《好好说话》片头曲"
											],
											"status": 0,
											"fee": 8,
											"copyrightId": 1418106,
											"disc": "01",
											"no": 1,
											"artists": [
												{
													"name": "马頔",
													"id": 4592,
													"picId": 0,
													"img1v1Id": 0,
													"briefDesc": "",
													"picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"albumSize": 0,
													"alias": [],
													"trans": "",
													"musicSize": 0,
													"topicPerson": 0
												}
											],
											"album": {
												"name": "好好说话",
												"id": 143739020,
												"type": "Single",
												"size": 1,
												"picId": 109951167319855680,
												"blurPicUrl": "http://p4.music.126.net/WAPFIC0j8SadSjj7OkFxHQ==/109951167319855675.jpg",
												"companyId": 0,
												"pic": 109951167319855680,
												"picUrl": "http://p4.music.126.net/WAPFIC0j8SadSjj7OkFxHQ==/109951167319855675.jpg",
												"publishTime": 1650902400000,
												"description": "",
												"tags": "",
												"company": "厦门可恩文化传播有限公司",
												"briefDesc": "",
												"artist": {
													"name": "",
													"id": 0,
													"picId": 0,
													"img1v1Id": 0,
													"briefDesc": "",
													"picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"albumSize": 0,
													"alias": [],
													"trans": "",
													"musicSize": 0,
													"topicPerson": 0
												},
												"songs": [],
												"alias": [
													"电视剧 《好好说话》片头曲"
												],
												"status": 0,
												"copyrightId": 1418106,
												"commentThreadId": "R_AL_3_143739020",
												"artists": [
													{
														"name": "马頔",
														"id": 4592,
														"picId": 0,
														"img1v1Id": 0,
														"briefDesc": "",
														"picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
														"img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
														"albumSize": 0,
														"alias": [],
														"trans": "",
														"musicSize": 0,
														"topicPerson": 0
													}
												],
												"subType": "录音室版",
												"transName": null,
												"onSale": false,
												"mark": 0,
												"gapless": 0,
												"picId_str": "109951167319855675"
											},
											"starred": false,
											"popularity": 100,
											"score": 100,
											"starredNum": 0,
											"duration": 229222,
											"playedNum": 0,
											"dayPlays": 0,
											"hearTime": 0,
											"sqMusic": {
												"name": null,
												"id": 7229097983,
												"size": 28623512,
												"extension": "flac",
												"sr": 44100,
												"dfsId": 0,
												"bitrate": 998976,
												"playTime": 229222,
												"volumeDelta": -60362
											},
											"hrMusic": null,
											"ringtone": "",
											"crbt": null,
											"audition": null,
											"copyFrom": "",
											"commentThreadId": "R_SO_4_1939928579",
											"rtUrl": null,
											"ftype": 0,
											"rtUrls": [],
											"copyright": 0,
											"transName": null,
											"sign": null,
											"mark": 0,
											"originCoverType": 0,
											"originSongSimpleData": null,
											"single": 0,
											"noCopyrightRcmd": null,
											"mvid": 0,
											"hMusic": {
												"name": null,
												"id": 7229097981,
												"size": 9171113,
												"extension": "mp3",
												"sr": 44100,
												"dfsId": 0,
												"bitrate": 320000,
												"playTime": 229222,
												"volumeDelta": -60366
											},
											"mMusic": {
												"name": null,
												"id": 7229097986,
												"size": 5502685,
												"extension": "mp3",
												"sr": 44100,
												"dfsId": 0,
												"bitrate": 192000,
												"playTime": 229222,
												"volumeDelta": -57831
											},
											"lMusic": {
												"name": null,
												"id": 7229097980,
												"size": 3668471,
												"extension": "mp3",
												"sr": 44100,
												"dfsId": 0,
												"bitrate": 128000,
												"playTime": 229222,
												"volumeDelta": -56199
											},
											"bMusic": {
												"name": null,
												"id": 7229097980,
												"size": 3668471,
												"extension": "mp3",
												"sr": 44100,
												"dfsId": 0,
												"bitrate": 128000,
												"playTime": 229222,
												"volumeDelta": -56199
											},
											"rtype": 0,
											"rurl": null,
											"mp3Url": null
										},
										"songPrivilege": {
											"id": 1939928579,
											"fee": 8,
											"payed": 3,
											"realPayed": 0,
											"st": 0,
											"pl": 999000,
											"dl": 999000,
											"sp": 7,
											"cp": 1,
											"subp": 1,
											"cs": false,
											"maxbr": 999000,
											"fl": 128000,
											"pc": null,
											"toast": false,
											"flag": 4,
											"paidBigBang": false,
											"preSell": false,
											"playMaxbr": 999000,
											"downloadMaxbr": 999000,
											"maxBrLevel": "lossless",
											"playMaxBrLevel": "lossless",
											"downloadMaxBrLevel": "lossless",
											"plLevel": "lossless",
											"dlLevel": "lossless",
											"flLevel": "standard",
											"rscl": null,
											"freeTrialPrivilege": {
												"resConsumable": false,
												"userConsumable": false,
												"listenType": null
											},
											"chargeInfoList": [
												{
													"rate": 128000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 0
												},
												{
													"rate": 192000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												},
												{
													"rate": 320000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												},
												{
													"rate": 999000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												}
											]
										}
									},
									"action": "play_all_song_from_current_index",
									"actionType": "client_customized",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "纠缠"
										},
										"subTitle": {
											"title": "坠落在深处城市的夜"
										},
										"image": {
											"imageUrl": "http://p1.music.126.net/mWhaRqXa4qZsSSoPzoLrMg==/109951167341870261.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "song",
									"resourceId": "1941575095",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "袁景翔",
												"id": 27889573,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
												"img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
												"albumSize": 0,
												"alias": [],
												"trans": "",
												"musicSize": 0,
												"topicPerson": 0
											}
										],
										"alias": "[]",
										"songData": {
											"name": "纠缠",
											"id": 1941575095,
											"position": 0,
											"alias": [],
											"status": 0,
											"fee": 8,
											"copyrightId": 0,
											"disc": "01",
											"no": 0,
											"artists": [
												{
													"name": "袁景翔",
													"id": 27889573,
													"picId": 0,
													"img1v1Id": 0,
													"briefDesc": "",
													"picUrl": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"albumSize": 0,
													"alias": [],
													"trans": "",
													"musicSize": 0,
													"topicPerson": 0
												}
											],
											"album": {
												"name": "纠缠",
												"id": 144003386,
												"type": "Single",
												"size": 2,
												"picId": 109951167341870260,
												"blurPicUrl": "http://p3.music.126.net/mWhaRqXa4qZsSSoPzoLrMg==/109951167341870261.jpg",
												"companyId": 0,
												"pic": 109951167341870260,
												"picUrl": "http://p3.music.126.net/mWhaRqXa4qZsSSoPzoLrMg==/109951167341870261.jpg",
												"publishTime": 1650902400000,
												"description": "",
												"tags": "",
												"company": "",
												"briefDesc": "",
												"artist": {
													"name": "",
													"id": 0,
													"picId": 0,
													"img1v1Id": 0,
													"briefDesc": "",
													"picUrl": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
													"albumSize": 0,
													"alias": [],
													"trans": "",
													"musicSize": 0,
													"topicPerson": 0
												},
												"songs": [],
												"alias": [],
												"status": 0,
												"copyrightId": -1,
												"commentThreadId": "R_AL_3_144003386",
												"artists": [
													{
														"name": "袁景翔",
														"id": 27889573,
														"picId": 0,
														"img1v1Id": 0,
														"briefDesc": "",
														"picUrl": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
														"img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
														"albumSize": 0,
														"alias": [],
														"trans": "",
														"musicSize": 0,
														"topicPerson": 0
													}
												],
												"subType": "录音室版",
												"transName": null,
												"onSale": false,
												"mark": 0,
												"gapless": 0,
												"picId_str": "109951167341870261"
											},
											"starred": false,
											"popularity": 25,
											"score": 25,
											"starredNum": 0,
											"duration": 192786,
											"playedNum": 0,
											"dayPlays": 0,
											"hearTime": 0,
											"sqMusic": {
												"name": null,
												"id": 7240667123,
												"size": 21904715,
												"extension": "flac",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 908971,
												"playTime": 192786,
												"volumeDelta": -61055
											},
											"hrMusic": {
												"name": null,
												"id": 7240667127,
												"size": 40162154,
												"extension": "flac",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 1666592,
												"playTime": 192786,
												"volumeDelta": -61021
											},
											"ringtone": "",
											"crbt": null,
											"audition": null,
											"copyFrom": "",
											"commentThreadId": "R_SO_4_1941575095",
											"rtUrl": null,
											"ftype": 0,
											"rtUrls": [],
											"copyright": 0,
											"transName": null,
											"sign": null,
											"mark": 0,
											"originCoverType": 0,
											"originSongSimpleData": null,
											"single": 0,
											"noCopyrightRcmd": null,
											"mvid": 0,
											"hMusic": {
												"name": null,
												"id": 7240667121,
												"size": 7713729,
												"extension": "mp3",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 320000,
												"playTime": 192786,
												"volumeDelta": -61029
											},
											"mMusic": {
												"name": null,
												"id": 7240667126,
												"size": 4628289,
												"extension": "mp3",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 192000,
												"playTime": 192786,
												"volumeDelta": -58432
											},
											"lMusic": {
												"name": null,
												"id": 7240667122,
												"size": 3085569,
												"extension": "mp3",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 128000,
												"playTime": 192786,
												"volumeDelta": -56795
											},
											"bMusic": {
												"name": null,
												"id": 7240667122,
												"size": 3085569,
												"extension": "mp3",
												"sr": 48000,
												"dfsId": 0,
												"bitrate": 128000,
												"playTime": 192786,
												"volumeDelta": -56795
											},
											"rtype": 0,
											"rurl": null,
											"mp3Url": null
										},
										"songPrivilege": {
											"id": 1941575095,
											"fee": 8,
											"payed": 3,
											"realPayed": 0,
											"st": 0,
											"pl": 999000,
											"dl": 999000,
											"sp": 7,
											"cp": 1,
											"subp": 1,
											"cs": false,
											"maxbr": 999000,
											"fl": 128000,
											"pc": null,
											"toast": false,
											"flag": 0,
											"paidBigBang": false,
											"preSell": false,
											"playMaxbr": 999000,
											"downloadMaxbr": 999000,
											"maxBrLevel": "hires",
											"playMaxBrLevel": "hires",
											"downloadMaxBrLevel": "hires",
											"plLevel": "hires",
											"dlLevel": "hires",
											"flLevel": "standard",
											"rscl": null,
											"freeTrialPrivilege": {
												"resConsumable": false,
												"userConsumable": false,
												"listenType": null
											},
											"chargeInfoList": [
												{
													"rate": 128000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 0
												},
												{
													"rate": 192000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												},
												{
													"rate": 320000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												},
												{
													"rate": 999000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												},
												{
													"rate": 1999000,
													"chargeUrl": null,
													"chargeMessage": null,
													"chargeType": 1
												}
											]
										}
									},
									"action": "play_all_song_from_current_index",
									"actionType": "client_customized",
									"valid": true,
									"alg": null,
									"logInfo": null
								}
							],
							"position": 0
						},
						{
							"creativeType": "NEW_ALBUM_HOMEPAGE",
							"uiElement": {
								"mainTitle": {
									"title": "新碟"
								},
								"button": {
									"action": "orpheus://nm/discovery/newsongalbum?tab=album&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_all",
									"actionType": "orpheus",
									"text": "更多",
									"iconUrl": null
								},
								"rcmdShowType": "DEFAULT"
							},
							"resources": [
								{
									"uiElement": {
										"mainTitle": {
											"title": "STRANGER EP"
										},
										"subTitle": {
											"title": "MONDO GROSSO新专释出"
										},
										"image": {
											"imageUrl": "http://p1.music.126.net/qiNN9wsLAIPj9W31iVivLg==/109951167320609145.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "album",
									"resourceId": "143743290",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "MONDO GROSSO",
												"id": 14753,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://album/143743290?referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "排除他杀"
										},
										"subTitle": {
											"title": "生活像是一位隐形的拳击手"
										},
										"image": {
											"imageUrl": "http://p1.music.126.net/_TkYu8l20nyMR6Lexcl43A==/109951167315778080.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "album",
									"resourceId": "143707169",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "暴躁的兔子",
												"id": 32645255,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://album/143707169?referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "声生不息 第1期"
										},
										"subTitle": {
											"title": "一部『唱出来的港乐史』"
										},
										"image": {
											"imageUrl": "http://p1.music.126.net/rk7d6mL3Y5NKQ-2v-bQPZw==/109951167333213984.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "album",
									"resourceId": "143883969",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "声生不息",
												"id": 52391958,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://album/143883969?referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								}
							],
							"position": 0
						},
						{
							"creativeType": "NEW_ALBUM_HOMEPAGE",
							"uiElement": {
								"mainTitle": {
									"title": "新碟"
								},
								"button": {
									"action": "orpheus://nm/discovery/newsongalbum?tab=album&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_all",
									"actionType": "orpheus",
									"text": "更多",
									"iconUrl": null
								},
								"rcmdShowType": "DEFAULT"
							},
							"resources": [
								{
									"uiElement": {
										"mainTitle": {
											"title": "Space Boy"
										},
										"subTitle": {
											"title": "进行一场美妙的旅程"
										},
										"image": {
											"imageUrl": "http://p1.music.126.net/PbQ8cE-WCeMU6wXzve5drQ==/109951167214693873.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "album",
									"resourceId": "142649498",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "Rameses B",
												"id": 42898,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											},
											{
												"name": "Laura Brehm",
												"id": 207693,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											},
											{
												"name": "Veela",
												"id": 193221,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											},
											{
												"name": "Feint",
												"id": 93062,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://album/142649498?referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "Pull Up"
										},
										"subTitle": {
											"title": "相爱的人，终会相聚。"
										},
										"image": {
											"imageUrl": "http://p1.music.126.net/u9woLAaXnhAWzDLAsO4Ovw==/109951167289900298.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "album",
									"resourceId": "143478634",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "MC HotDog 热狗",
												"id": 4479,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											},
											{
												"name": "马思唯",
												"id": 1132392,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											},
											{
												"name": "KnowKnow",
												"id": 27868624,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://album/143478634?referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "テディ"
										},
										"subTitle": {
											"title": "《テディ》先行配信发布"
										},
										"image": {
											"imageUrl": "http://p1.music.126.net/RgKYiaCQhvqnPOCSemkoIg==/109951167277332461.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "album",
									"resourceId": "143305454",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "ReoNa",
												"id": 14057051,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://album/143305454?referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								}
							],
							"position": 0
						},
						{
							"creativeType": "DIGITAL_ALBUM_HOMEPAGE",
							"uiElement": {
								"mainTitle": {
									"title": "数字专辑"
								},
								"button": {
									"action": "https://music.163.com/v/m/album/poly/detail",
									"actionType": "orpheus",
									"text": "更多",
									"iconUrl": null
								},
								"rcmdShowType": "DEFAULT"
							},
							"resources": [
								{
									"uiElement": {
										"mainTitle": {
											"title": "咦？"
										},
										"subTitle": {
											"title": "欢迎进入属于范丞丞的音乐世界！"
										},
										"image": {
											"imageUrl": "http://p2.music.126.net/iFeWO9yxsbKkzNdE7xNNiw==/109951166089730540.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "digitalAlbum",
									"resourceId": "129068769",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "范丞丞",
												"id": 13056442,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://openurl?url=https%3a%2f%2fmusic.163.com%2foctave%2fm%2falbum%2fdetail%3fid%3d129068769&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "Slow Ride (兜风)"
										},
										"subTitle": {
											"title": "鹿晗全新单曲"
										},
										"image": {
											"imageUrl": "http://p2.music.126.net/ERgE5fyZmcXCSPuHUP-73g==/109951167262791011.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "digitalAlbum",
									"resourceId": "143198187",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "鹿晗",
												"id": 1038093,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://openurl?url=https%3a%2f%2fmusic.163.com%2foctave%2fm%2falbum%2fdetail%3fid%3d143198187&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "I NEVER DIE"
										},
										"subTitle": {
											"title": "一起来听TOMBOY"
										},
										"image": {
											"imageUrl": "http://p2.music.126.net/J9t-hmMYJMVXpFdMgHMB6A==/109951167149343548.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "digitalAlbum",
									"resourceId": "141688981",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "(G)I-DLE",
												"id": 14055085,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://openurl?url=https%3a%2f%2fmusic.163.com%2foctave%2fm%2falbum%2fdetail%3fid%3d141688981&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								}
							],
							"position": 0
						},
						{
							"creativeType": "DIGITAL_ALBUM_HOMEPAGE",
							"uiElement": {
								"mainTitle": {
									"title": "数字专辑"
								},
								"button": {
									"action": "https://music.163.com/v/m/album/poly/detail",
									"actionType": "orpheus",
									"text": "更多",
									"iconUrl": null
								},
								"rcmdShowType": "DEFAULT"
							},
							"resources": [
								{
									"uiElement": {
										"mainTitle": {
											"title": "MY"
										},
										"subTitle": {
											"title": "MIYEON首张个人迷你专辑上线！"
										},
										"image": {
											"imageUrl": "http://p2.music.126.net/eTM3B9CX8fEvBm7LprSkyA==/109951167346468978.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "digitalAlbum",
									"resourceId": "144008679",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "曺薇娟",
												"id": 15249075,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://openurl?url=https%3a%2f%2fmusic.163.com%2foctave%2fm%2falbum%2fdetail%3fid%3d144008679&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "="
										},
										"subTitle": {
											"title": ""
										},
										"image": {
											"imageUrl": "http://p2.music.126.net/kGSU7wbU2-Pd6kXr7ibrZQ==/109951166567793994.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "digitalAlbum",
									"resourceId": "134453600",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "Ed Sheeran",
												"id": 33184,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://openurl?url=https%3a%2f%2fmusic.163.com%2foctave%2fm%2falbum%2fdetail%3fid%3d134453600&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "幼鸟指南"
										},
										"subTitle": {
											"title": ""
										},
										"image": {
											"imageUrl": "http://p2.music.126.net/mxLEk_AMm0w5gAMThGd14w==/109951166044914127.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "digitalAlbum",
									"resourceId": "127551538",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "毛不易",
												"id": 12138269,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://openurl?url=https%3a%2f%2fmusic.163.com%2foctave%2fm%2falbum%2fdetail%3fid%3d127551538&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								}
							],
							"position": 0
						},
						{
							"creativeType": "DIGITAL_ALBUM_HOMEPAGE",
							"uiElement": {
								"mainTitle": {
									"title": "数字专辑"
								},
								"button": {
									"action": "https://music.163.com/v/m/album/poly/detail",
									"actionType": "orpheus",
									"text": "更多",
									"iconUrl": null
								},
								"rcmdShowType": "DEFAULT"
							},
							"resources": [
								{
									"uiElement": {
										"mainTitle": {
											"title": "Red (Taylor's Version)"
										},
										"subTitle": {
											"title": ""
										},
										"image": {
											"imageUrl": "http://p2.music.126.net/UU1PbEAJgUd-NXw0DDEevw==/109951166611866092.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "digitalAlbum",
									"resourceId": "135521226",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "Taylor Swift",
												"id": 44266,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://openurl?url=https%3a%2f%2fmusic.163.com%2foctave%2fm%2falbum%2fdetail%3fid%3d135521226&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "Butter (Holiday Remix)"
										},
										"subTitle": {
											"title": ""
										},
										"image": {
											"imageUrl": "http://p2.music.126.net/VhJOnma2u5eh5k8SbF05qw==/109951166684245426.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "digitalAlbum",
									"resourceId": "136979600",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "BTS (防弹少年团)",
												"id": 783124,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://openurl?url=https%3a%2f%2fmusic.163.com%2foctave%2fm%2falbum%2fdetail%3fid%3d136979600&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "TAKE ME"
										},
										"subTitle": {
											"title": ""
										},
										"image": {
											"imageUrl": "http://p2.music.126.net/QkuY48WSEZxF1OG2LdCcVQ==/109951165317651805.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "digitalAlbum",
									"resourceId": "95395142",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "SNH48",
												"id": 794014,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://openurl?url=https%3a%2f%2fmusic.163.com%2foctave%2fm%2falbum%2fdetail%3fid%3d95395142&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								}
							],
							"position": 0
						},
						{
							"creativeType": "DIGITAL_ALBUM_HOMEPAGE",
							"uiElement": {
								"mainTitle": {
									"title": "数字专辑"
								},
								"button": {
									"action": "https://music.163.com/v/m/album/poly/detail",
									"actionType": "orpheus",
									"text": "更多",
									"iconUrl": null
								},
								"rcmdShowType": "DEFAULT"
							},
							"resources": [
								{
									"uiElement": {
										"mainTitle": {
											"title": "新世界NEW WORLD"
										},
										"subTitle": {
											"title": ""
										},
										"image": {
											"imageUrl": "http://p2.music.126.net/sY3TVSvagXidLzCOy9WVwg==/109951164881032001.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "digitalAlbum",
									"resourceId": "86286082",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "华晨宇",
												"id": 861777,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://openurl?url=https%3a%2f%2fmusic.163.com%2foctave%2fm%2falbum%2fdetail%3fid%3d86286082&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "庙会之旅Ⅲ"
										},
										"subTitle": {
											"title": ""
										},
										"image": {
											"imageUrl": "http://p2.music.126.net/Y9GFKbCIBktnYyISz344jA==/109951167227610927.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "digitalAlbum",
									"resourceId": "83768670",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "左小祖咒",
												"id": 6467,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://openurl?url=https%3a%2f%2fmusic.163.com%2foctave%2fm%2falbum%2fdetail%3fid%3d83768670&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								},
								{
									"uiElement": {
										"mainTitle": {
											"title": "镜花水月"
										},
										"subTitle": {
											"title": ""
										},
										"image": {
											"imageUrl": "http://p2.music.126.net/tswyrFlqCaziTiZtUOy8UQ==/109951167312581072.jpg"
										},
										"rcmdShowType": "DEFAULT"
									},
									"resourceType": "digitalAlbum",
									"resourceId": "143674914",
									"resourceUrl": null,
									"resourceExtInfo": {
										"artists": [
											{
												"name": "肖荻",
												"id": 31781917,
												"picId": 0,
												"img1v1Id": 0,
												"briefDesc": "",
												"picUrl": null,
												"img1v1Url": null,
												"albumSize": 0,
												"alias": null,
												"trans": null,
												"musicSize": 0,
												"topicPerson": 0
											}
										]
									},
									"action": "orpheus://openurl?url=https%3a%2f%2fmusic.163.com%2foctave%2fm%2falbum%2fdetail%3fid%3d143674914&referLog=HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG_one",
									"actionType": "orpheus",
									"valid": true,
									"alg": null,
									"logInfo": null
								}
							],
							"position": 0
						}
				],
				HOT_TOPIC_List: [],
				moveToNext: '',
				currentTitle: '',
				mainHeight:500,
				videomainHeight:500,
				songIdlist:[],
				
			}
		},
		methods: {
			...mapMutations(['set_audio', 'set_playinfo', 'set_renderIndex', 'set_audiolist']),
			tosonglist(val){
				uni.navigateTo({
					url:'../songlist/songlist?id=' +val.creativeId,
				})
			},
			async getBanner() {
				const res = await this.$http({
					url: 'banner?type=1'
				})
				this.swiperList = res.data.banners
			},
			async gethomeData(timestamp) {
				const res = await this.$http({
					url: 'homepage/block/page',
					data: {
						timestamp: timestamp
					},
				})
				this.recommendList = res.data.data.blocks[1].creatives
				// this.NEW_ALBUM_SONG_List = res.data.data.blocks[3].creatives
				this.HOT_TOPIC_List = res.data.data.blocks[4].creatives[0].resources
				// console.log("rec", res.data.data)
			},
			getmoveNext(val) {
				// console.log('getmove',val)
				this.moveToNext = val;
			},
			handleTitleChange(val) {
				this.currentTitle = val;
			},
			async getreq() {
				const res = await this.$http({
					url: 'hot/topic?limit=30&offset=30',
				})
			},
			handleBarClick(val){
				let title = ''
				switch (val) {
					case 1:
					title = '每日推荐'
					break;
					case 2:
					title = '私人FM'
					break;
					case 3:
					title = '歌单'
					break;
					case 4:
					title = '排行榜'
					break;
					case 5:
					title = '直播'
					break;
					case 6:
					title = '数字专辑'
					break;
					case 7:
					title = '专注冥想'
					break;
					case 8:
					title = '歌房'
					break;
					case 9:
					title = '游戏专区'
					break;
				}
				uni.showToast({
					icon:'none',
					title:'跳转'+title+'页面',
					duration:2000
				})
			},
			playsong(val){
				console.log(val)
				let singername = val.resourceExtInfo.artists.name
				let songdetail={
					src:'http://music.163.com/song/media/outer/url?id=' + val.resourceId + '.mp3',
					title:val.uiElement.mainTitle.title,
					singerid: val.resourceExtInfo.artists[0].id,
					singer:singername,
					singer: singername,
					coverImgUrl:val.uiElement.image.imageUrl,
					id:val.resourceId,
					}
				this.songIdlist = [songdetail]
				this.toSongDetail(val.resourceId,2)
			},
			handlebannertab(index){
				uni.showToast({
					icon:'none',
					title:'点击第'+index+'个banner',
					duration:2000
				})
			}
		},
		computed: {
			...mapGetters(['audiolist', 'playinfo', 'paused'])
		},
		onLoad() {
			let timestamp = Date.parse(new Date());
			this.getBanner()
			this.gethomeData(timestamp)
			this.getreq()
			const Magnification = uni.getSystemInfoSync().windowWidth / 750
			this.mainHeight = uni.getSystemInfoSync().windowHeight + 200 * Magnification
			this.videomainHeight = uni.getSystemInfoSync().windowHeight - 160 * Magnification
		},
	}	
</script>

<style lang="scss" scoped>
	.mainContanier {
		background-color: #F6F6F6;

		.a{
			background-color: #FFFFFF;
			white-space: nowrap;
		}

		.banners {
			width: 100%;
			height: 300rpx;

			.swpier-item {
				position: relative;

				image {
					position: absolute;
					left: 50%;
					transform: translate(-50%, 27rpx);
					width: 702rpx;
					height: 273rpx;
					border-radius: 20rpx;
				}
			}
		}

		.navContainer {
			display: flex;
			justify-content: space-between;
			padding-top: 30rpx;
			width: 1500rpx;
			background-color: #FFFFFF;

			.navItem {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-flow: column nowrap;
				width: 25%;
				margin-bottom: 20rpx;

				.iconfont {
					width: 70rpx;
					height: 70rpx;
					background-color: #FEEEEE;
					border-radius: 50%;
					margin-bottom: 10rpx;
					position: relative;

					image {
						position: absolute;
						left: 0;
						top: 0;
						right: 0;
						bottom: 0;
						margin: auto;
						width: 60%;
						height: 60%;
					}
				}

				.icontxt {
					line-height: 40rpx;
					font-size: 25rpx;
					text-align: center;
				}
			}
		}

		.recommendContanier {
			padding-top: 10rpx;
			display: flex;
			flex-flow: column nowrap;
			background-color: #FFFFFF;
			border-radius: 0rpx 0rpx 25rpx 25rpx;
			box-shadow: 0rpx 0rpx 3rpx 0rpx #555555;

			.item_top {
				display: flex;
				justify-content: center;
				width: 100%;
				height: 60rpx;
				flex-flow: row nowrap;
				position: relative;

				text {
					position: absolute;
					text-align: center;
					top: 10rpx;
					left: 30rpx;
				}

				button {
					width: 160rpx;
					position: absolute;
					width: 120rpx;
					height: 55rpx;
					top: 5rpx;
					right: 30rpx;
					font-size: 15rpx;
					padding: 0;
					margin: 0;
					border-radius: 25rpx;
				}
			}

			.item_bottom {
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-around;
				max-width: 3000rpx;
				white-space: nowrap;
				margin-top: 10rpx;
				padding: 10rpx;

				.item {
					display: flex;
					flex-flow: column nowrap;
					width: 200rpx;
					margin: 0 20rpx;
					display: inline-block;

					image {
						width: 200rpx;
						height: 200rpx;
						border-radius: 20rpx;
					}

					text {
						font-size: 20rpx;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}
				}

			}
		}
	}
</style>
