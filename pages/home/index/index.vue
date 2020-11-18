<template>
	<view class="safe-bottom">
		<view class="home-container page-bottom">
			<!-- 头部 菜单 -->
			<home-header></home-header>
			<!-- 渔业资讯 政策法规 平台公告 -->
			<home-notice ref="homeNotice"></home-notice>
			<!-- 热门招聘 热门简历 禁渔期工作 -->
			<home-job ref="homeJob"></home-job>
			<!-- 培训班 -->
			<!-- 热门视频 -->
			<home-training ref="homeTraining"></home-training>
			<!-- 职务 科目 证书 考场信息 -->
			<home-video ref="homeVideo"></home-video>
			<home-info></home-info>
			<home-autograph v-model="show"></home-autograph>
			<view class="safe-bottom"></view>
			<!-- <u-button @click="open">签名</u-button> -->
			<tyb-tarbar :currentIndex="0"></tyb-tarbar>
		</view>
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
	import userInfoMixin from '@/pages/mixins/user-info.js'
	import homeAutograph from '@/pages/components/autograph/index.vue'
	export default {
		mixins: [dictMapMixin, userInfoMixin],
		components: {
			homeAutograph,
			tybTarbar,
			homeHeader,
			homeNotice,
			homeJob,
			homeTraining,
			homeVideo,
			homeInfo
		},
		// onShow () {
		// 	this.roles = this.$cache.get('roles') || []
		// },
		data () {
			return {
				show: false
			}
		},
		methods: {
			open () {
				this.show = true
			}
		},
		onReady () {
			this.getDicMap().then(() => {
				this.$refs.homeJob.init()
			})
		}
	}
</script>

<style lang="scss" scoped>
	.home-container {
		/* #ifndef APP-NVUE */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
	}
</style>
