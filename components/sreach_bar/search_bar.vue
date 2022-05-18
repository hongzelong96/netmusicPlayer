<template>
	<view class="mainContanier">
		<view class="searchBar" :class="show?'searchBar_start':'searchBar_center'" @click="searchClick">
			<icon type="search" class="searchIcon"></icon>
			<input v-if="show" :placeholder="placeholder" :focus="showSync" :maxlength="maxlength" @confirm="confirm" confirm-type="search" v-model="searchVal"/>
			<text v-else class="normalText">{{ placeholder }}</text>
			<icon v-if="show && (clearButton==='always'||clearButton==='auto'&&searchVal!=='')" type="cancel" @click="clear" class="cancelIcon"></icon>
		</view>
		<text @click="cancel" v-if="cancelButton ==='always' || show && cancelButton ==='auto'"> {{cancelText}}</text>
	</view>
</template>

<script>
	export default {
		name: "UniSearchBar",
		props: {
			// 搜索内容输入
			placeholder: {
				type: String,
				default: "请输入搜索内容"
			},
			//圆角
			radius: {
				type: [Number, String],
				default: 5
			},
			clearButton: {
				type: String,
				default: "auto"
			},
			cancelButton: {
				type: String,
				default: "auto"
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			bgColor: {
				type: String,
				default: "#F8F8F8"
			},
			maxlength: {
				type: [Number, String],
				default: 100
			}
		},
		data() {
			return {
				show: false,
				showSync: false,
				searchVal: ""
			}
		},
		watch: {
			searchVal() {
				this.$emit("input", {
					value: this.searchVal
				})
			}
		},
		methods: {
			searchClick() {
				if (this.show) {
					return
				}
				this.searchVal = ""
				this.show = true;
				this.$nextTick(() => {
					this.showSync = true;
				})
			},
			clear() {
				this.searchVal = ""
			},
			cancel() {
				this.$emit("cancel", {
					value: this.searchVal
				});
				this.searchVal = ""
				this.show = false
				this.showSync = false
				// #ifndef APP-PLUS
				uni.hideKeyboard()
				// #endif
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
			},
			confirm() {
				// #ifndef APP-PLUS
				uni.hideKeyboard();
				// #endif
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
				this.$emit("confirm", {
					value: this.searchVal
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.mainContanier{
		display: flex;
		flex-flow: row nowrap;
		height:80rpx;
		margin:15rpx;
		align-items: center;
		.searchBar{
			border-radius: 20rpx;
			border: 3rpx solid #535353;
			background-color: #f6f6f6;
			flex:1;
			display: flex;
			flex-flow: row nowrap;
			
			height: 100%;
			.normalText{
				margin-left: 15rpx;
				height: 100%;
				opacity: 0.5;
				transform: translateY(23%);
			}
			icon{
				height: 100%;
				transform: translateY(23%);
			}
			input{
				margin-left: 15rpx;
				height: 100%;
				flex:1;
			}
			.cancelIcon{
				margin-left: auto;
				margin-right: 15rpx;
			}
		}
		.searchBar_start{
			justify-content: flex-start;
			.searchIcon{
				margin-left: 15rpx;
			}
		}
		.searchBar_center{
			justify-content: center;
		}
		text{
			margin-left: 20rpx;
		}
		
		// &:hover{
		// 	padding-left: 20rpx;
		// 	justify-content: flex-start;
		// }
	}
</style>

