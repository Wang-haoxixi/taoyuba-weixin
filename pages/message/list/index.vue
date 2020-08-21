<template>
	<view class="phonex-mb">
		<message-list :list="data"></message-list>
	</view>
	
</template>

<script>
	import messageList from '../index/components/list.vue'
	export default {
		components: {
			messageList
		},
		data () {
			return {
				data: [
					{ id: 1, content: '您的申请已通过您的申请已通过您的申请已通过', time: '2019.01.01' },
					{ id: 2, content: '您的申请已通过', time: '2019.01.01', dot: true },
					{ id: 3, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 4, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 5, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 6, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 7, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 8, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 9, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 10, content: '您的申请已通过', time: '2019.01.01' },
				]
			}
		},
		onLoad (params) {
			console.log(params)
		}
	}
</script>

<style scoped lang="scss">
</style>
