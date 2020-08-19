<template>
	<view class="info-wrapper">
		<home-container>
			<u-tabs slot="header" :list="list" inactive-color="#fff" bg-color="transparent" active-color="#fff" :bold="false" :bar-style="{background: '#c29799'}" :is-scroll="false" :current="current" @change="tabsChange"></u-tabs>
		</home-container>
	</view>
</template>

<script>
	import homeContainer from './container.vue'
	export default {
		components: {
			homeContainer
		},
		data () {
			return {
				current: 0,
				list: [
					{ name: '职务' },
					{ name: '科目' },
					{ name: '证书' },
					{ name: '考场信息' }
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

<style>
</style>
