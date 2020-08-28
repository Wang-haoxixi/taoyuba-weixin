<template>
	<view class="video-list-container">
		<view class="static-search-wrapper">
			<static-search placeholder="搜索你感兴趣的视频"></static-search>
		</view>
		<view class="list-wrapper">
			<u-row gutter="40">
				<u-col span="6" v-for="item in list" :key="item.id" @click="onTo(item.id)">
					<view class="item">
						<video-item textPosition="bottom" :title="item.title" :imageUrl="item.url" :videoStyle="{height: '200rpx'}"></video-item>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	import staticSearch from '@/pages/home/index/components/search.vue'
	import videoItem from '@/pages/home/index/components/video-item.vue'
	export default {
		components: {
			staticSearch,
			videoItem
		},
		data () {
			return {
				list: [
					{ id: 1, title: '[最新] 船员岗位培训进阶教学', url: 'https://cdn.uviewui.com/uview/swiper/1.jpg' },
					{ id: 2, title: '[最新] 船员岗位培训进阶教学', url: 'https://cdn.uviewui.com/uview/swiper/1.jpg' },
					{ id: 3, title: '[最新] 船员岗位培训进阶教学', url: 'https://cdn.uviewui.com/uview/swiper/1.jpg' },
					{ id: 4, title: '[最新] 船员岗位培训进阶教学', url: 'https://cdn.uviewui.com/uview/swiper/1.jpg' },
					{ id: 5, title: '[最新] 船员岗位培训进阶教学船员岗位培训进阶教学', url: 'https://cdn.uviewui.com/uview/swiper/1.jpg' }
				]
			}
		},
		methods: {
			onTo (id) {
				if (id) {
					uni.navigateTo({
						url: `/pages/home/video/detail/index?id=${id}`
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.video-list-container {
		.static-search-wrapper {
			padding: 20rpx 20rpx;
			background-color: #f8f8f8;
		}
		.list-wrapper {
			background-color: #fff;
			padding: 30rpx 10rpx;
			.item {
				margin-bottom: 40rpx;
			}
		}
	}
	
</style>
