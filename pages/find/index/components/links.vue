<template>
	<view class="links-wrapper">
		<scroll-view scroll-x="true">
			<view class="content-wrapper">
				<view class="item" v-for="(item, index) in data" :key="index" @tap="onTo(item)">
					<view class="iconfont iconziliao"></view>
					<text class="text">{{item.label}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				data: [
					// { label: '台风预报', path: '' }, // http://typhoon.zjwater.gov.cn/default.aspx
					// { label: '潮汐预报', path: '' }, // http://www.chaoxb.com/?choice=1
					// { label: '近岸预报', path: '' }, // http://weather.haishangtong.com/
					// { label: '渔区气象', path: '' }, // http://m.nmc.cn/publish/marine/newcoastal.html
					// { label: '大风预报', path: '' }, // http://m.nmc.cn/publish/marine/sea-wind.htm
					
					{ label: '渔业资讯', path: '/pages/home/news/list/index?type=1' },
					{ label: '政策法规', path: '/pages/home/news/list/index?type=2' },
					{ label: '船东招聘', path: '/pages/home/recruit/list/index' },
					{ label: '企业招聘', path: '/pages/home/recruit/list/index?type=6' },
					{ label: '培训信息', path: '/pages/home/info/index?index=1' },
					{ label: '职业规划', path: '/pages/base/web?src=https://m.taoyu58.com/careerplanning' },
					{ label: '教材订购', path: '/pages/home/info/index?index=3' },
				]
			}
		},
		methods: {
			onTo (item) {
				if (item.path) {
					uni.navigateTo({
						// url: `/pages/base/web?src=${item.path}`
						url: item.path
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.links-wrapper {
		width: 100%;
		overflow: hidden;
		background-color: #fff;
		white-space: nowrap;
		.content-wrapper {
			width: 100%;
			// display: flex;
			// flex-wrap: nowrap;
			padding: 20rpx 20rpx;
			.item {
				display: inline-block;
				width: 25%;
				text-align: center;
				color: #666;
				.iconfont {
					font-size: 60rpx;
				}
				.text {
					display: block;
					margin-top: 10rpx;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
