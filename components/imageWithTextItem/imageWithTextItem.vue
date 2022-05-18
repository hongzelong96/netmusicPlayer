<template>
	<view class="itemcontent">
		<image :src="image"></image>
		<view class="itemTextcontent">
			<text class="title">{{title}}</text>
			<text class="des">{{des}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return
		},
		props:{
			image,
			title,
			des
		}
	}
</script>

<style lang="scss" scoped>
	.itemcontent{
		image{
			
		}
		.itemTextcontent{
			.title{
				
			}
			.des{
				
			}
		}
	}
</style>
