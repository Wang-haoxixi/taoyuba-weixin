<template>
	<view class="user-contract-container">
		<view class="">
			<contract-item v-for="item in data" :key="item.id" :info="item"></contract-item>
		</view>
		
	</view>
</template>

<script>
	import contractItem from './components/contract-item.vue'
	export default {
		components: {
			contractItem
		},
		data () {
			return {
				data: [
					{ title: '浙渔K8799', name: '黄某某', company: '国脉海洋', people: '中船通', createTime: '2019.10.20' },
					{ title: '浙渔K8799', name: '黄某某', company: '国脉海洋', people: '中船通', createTime: '2019.10.20' },
					{ title: '浙渔K8799', name: '黄某某', company: '国脉海洋', people: '中船通', createTime: '2019.10.20' },
					{ title: '浙渔K8799', name: '黄某某', company: '国脉海洋', people: '中船通', createTime: '2019.10.20' }
				]
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-contract-container {
		
	}
</style>
