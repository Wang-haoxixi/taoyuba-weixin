<template>
	<view class="content-wrapper">
		<view class="content-header">
			<u-tabs-swiper ref="uTabs" bg-color="tran" inactive-color="#fff" active-color="#fff" :bold="false" :bar-style="{background: '#c29799'}" :list="list" :current="current" @change="tabsChange" :is-scroll="false"></u-tabs-swiper>
		</view>
		<view class="content-body">
			<swiper style="height: 1400rpx;" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<notice-item v-for="(item, index) in data1" :key="index" :data="item" :type="item.type"></notice-item>
				</swiper-item>
				<swiper-item class="swiper-item">
					<notice-item v-for="(item, index) in data1" :key="index" :data="item" :type="item.type"></notice-item>
				</swiper-item>
				<swiper-item class="swiper-item">
					<notice-item v-for="(item, index) in data1" :key="index" :data="item" :type="item.type"></notice-item>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import noticeItem from './notice-item.vue'
	export default {
		components: {
			noticeItem
		},
		data () {
			return {
				current: 0,
				swiperCurrent: 0,
				list: [
					{ name: '渔业资讯' },
					{ name: '政策法规' },
					{ name: '平台公告' },
				],
				data1: [
					{ title: '宁波市海洋环境', time: '2011-01-01', img: 'https://cdn.uviewui.com/uview/swiper/1.jpg', type: 'largeImg' },
					{ title: '宁波市海洋环境与渔业水域污染事故调查处理暂行办法的调查处理暂行办法', time: '2011-01-01', type: 'text' },
					{ title: '宁波市海洋环境与渔业水域污染事故调查处理暂行办法的调查处理暂行办法', time: '2011-01-01', type: 'text' },
					{ title: '宁波市海洋环境与渔业水域污染事故调查处理暂行办法的调查处理暂行办法', time: '2011-01-01', type: 'text' },
					{ title: '宁波市海洋环境与渔业水域污染事故调查处理暂行办法的调查处理暂行办', time: '2011-01-01', type: 'text' },
					{ title: '宁波市海洋环境与渔业水域污染事故调查处理暂行办法的调查处理暂行办', time: '2011-01-01', img: 'https://cdn.uviewui.com/uview/swiper/1.jpg', type: 'miniImg' },
				]
			}
		},
		methods: {
			// tabs通知swiper切换
			tabsChange (index) {
				this.current = index
				this.swiperCurrent = index
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-wrapper {
		width: 100%;
		margin-bottom: 30rpx;
		background: url(../../../../static/image/home/bg1.png) no-repeat;
		background-size: 100%;
		.content-header {
			height: 80rpx;
			width: 500rpx;
		}
		.content-body {
			margin: 10rpx 30rpx 0;
			// padding: 30rpx 30rpx 10rpx;
			box-sizing: border-box;
			background-color: #fff;
			border-radius: 10rpx;
		}
	}
</style>
