<template>
	<view>
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<video-list></video-list>
		<!-- <face v-else></face> -->
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

</style>
