<template>
	<view class="home-container page-bottom">
		<!-- 头部 菜单 -->
		<home-header></home-header>
		<!-- 渔业资讯 政策法规 平台公告 -->
		<home-notice></home-notice>
		<!-- 热门招聘 热门简历 禁渔期工作 -->
		<home-job></home-job>
		<!-- 培训班 -->
		<home-training></home-training>
		<!-- 热门视频 -->
		<home-video></home-video>
		<!-- 职务 科目 证书 考场信息 -->
		<home-info></home-info>
		
		<tyb-tarbar :currentIndex="0"></tyb-tarbar>
	</view>
</template>

<script>
	import homeHeader from './components/header.vue'
	import homeNotice from './components/notice.vue'
	import homeJob from './components/job.vue'
	import homeTraining from './components/training.vue'
	import homeVideo from './components/video.vue'
	import homeInfo from './components/info.vue'
	import tybTarbar from '@/pages/components/tarbar/index.vue'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	export default {
		mixins: [dictMapMixin],
		components: {
			tybTarbar,
			homeHeader,
			homeNotice,
			homeJob,
			homeTraining,
			homeVideo,
			homeInfo
		}
	}
</script>

<style lang="scss" scoped>
	.home-container {
	}
</style>
