<template>
	<view>
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change" class="u-tab-face"></u-tabs>
		<video-list v-if="current === 1"></video-list>
		<face v-else></face>
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	import videoList from './videoList.vue'
	import face from './faceToFace.vue'
	export default {
		components: {
			videoList,
			face,
		},
		mixins: [pageMixin],
		data () {
			return {
				current: 0,
				list: [{name: '面对面教育培训'},{name: '视频学习记录'}]
			}
		},
		onReady () {
		},
		onReachBottom() {
		},
		onPullDownRefresh () {
		},
		methods: {
			change (index) {
				this.current = index;
			}
		}
	}
</script>

<style scoped lang="scss">
.u-tab-face {
	position: fixed;
	top: 0;
	z-index: 11;
	width: 100%;
}
</style>
