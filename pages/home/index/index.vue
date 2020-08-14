<template>
	<view class="home-container">
		<!-- 头部 菜单 -->
		<home-header></home-header>
		<!-- 渔业资讯 政策法规 平台公告 -->
		<home-notice></home-notice>
		<!-- 热门招聘 热门简历 禁渔期工作 -->
		<!-- 培训班 -->
		<!-- 热门视频 -->
		<!-- 职务 科目 证书 考场信息 -->
		<tyb-tarbar :currentIndex="0"></tyb-tarbar>
	</view>
</template>

<script>
	import homeHeader from './components/header.vue'
	import homeNotice from './components/notice.vue'
	import tybTarbar from '@/pages/components/tarbar/index.vue'
	export default {
		components: {
			tybTarbar,
			homeHeader,
			homeNotice
		}
	}
</script>

<style lang="scss" scoped>
	.home-container {
		margin-bottom: 150rpx;
		
	}
</style>
