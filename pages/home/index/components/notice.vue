<template>
	<view class="content-wrapper">
		<home-container>
			<u-tabs slot="header" :list="list" inactive-color="#fff" bg-color="transparent" active-color="#fff" :bold="false" :bar-style="{background: '#c29799'}" :is-scroll="false" :current="current" @change="tabsChange"></u-tabs>
			<template>
				<view class="" v-show="current === 0">
					<notice-item v-for="(item, index) in data1" :key="index" :data="item" :type="item.type"></notice-item>
				</view>
				<view class="" v-show="current === 1">
					<notice-item v-for="(item, index) in data1" :key="index" :data="item" :type="item.type"></notice-item>
				</view>
				<view class="" v-show="current === 2">
					<notice-item v-for="(item, index) in data1" :key="index" :data="item" :type="item.type"></notice-item>
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
			// tabs切换
			tabsChange (index) {
				this.current = index
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content-wrapper {
	}
</style>
