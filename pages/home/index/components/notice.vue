<template>
	<view class="content-wrapper">
		<home-container>
			<u-tabs slot="header" :list="list" inactive-color="#fff" bg-color="transparent" active-color="#fff" :bold="false" :bar-style="{background: '#c29799'}" :is-scroll="false" :current="current" @change="tabsChange"></u-tabs>
			<template>
				<view class="" v-show="current === 0">
					<view v-for="(item, index) in data1" :key="index" @tap="onTo(item)">
						<notice-item :info="item" :type="item.type"></notice-item>
					</view>
				</view>
				<view class="" v-show="current === 1">
					<notice-item v-for="(item, index) in data1" :key="index" :info="item" :type="item.type" @tap="onTo(item)"></notice-item>
				</view>
				<view class="" v-show="current === 2">
					<notice-item v-for="(item, index) in data1" :key="index" :info="item" :type="item.type" @tap="onTo(item)"></notice-item>
				</view>
			</template>
		</home-container>
	</view>
</template>

<script>
	import noticeItem from './notice-item.vue'
	import homeContainer from './container.vue'
	export default {
		components: {
			noticeItem,
			homeContainer
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
					{ id: 1, title: '宁波市海洋环境1', time: '2011-01-01', img: 'https://cdn.uviewui.com/uview/swiper/1.jpg', type: 'largeImg' },
					{ id: 2, title: '宁波市海洋环境与渔业水域污染事故调查处理暂行办法的调查处理暂行办法', time: '2011-01-01', type: 'text' },
					{ id: 3, title: '宁波市海洋环境与渔业水域污染事故调查处理暂行办法的调查处理暂行办法', time: '2011-01-01', type: 'text' },
					{ id: 4, title: '宁波市海洋环境与渔业水域污染事故调查处理暂行办法的调查处理暂行办法', time: '2011-01-01', type: 'text' },
					{ id: 5, title: '宁波市海洋环境与渔业水域污染事故调查处理暂行办法的调查处理暂行办', time: '2011-01-01', type: 'text' },
					{ id: 6, title: '宁波市海洋环境与渔业水域污染事故调查处理暂行办法的调查处理暂行办', time: '2011-01-01', img: 'https://cdn.uviewui.com/uview/swiper/1.jpg', type: 'miniImg' },
				]
			}
		},
		methods: {
			// tabs切换
			tabsChange (index) {
				this.current = index
			},
			onTo (row) {
				console.log('row', row)
				if (row.id) {
					uni.navigateTo({
						url: `/pages/home/news/list/index`
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-wrapper {
	}
</style>
