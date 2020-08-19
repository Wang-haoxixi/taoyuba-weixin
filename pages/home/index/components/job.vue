<template>
	<view class="job-wrapper">
		<home-container>
			<u-tabs slot="header" :list="list" inactive-color="#fff" bg-color="transparent" active-color="#fff" :bold="false" :bar-style="{background: '#c29799'}" :is-scroll="false" :current="current" @change="tabsChange"></u-tabs>
			<template>
				<view class="" v-show="current === 0">
					<job-item :info="item" v-for="(item, index) in data1" :key="index"></job-item>
				</view>
				<view class="" v-show="current === 1">
					<job-item :info="item" v-for="(item, index) in data2" :key="index" btnText="查看简历">
						<text slot="right">发布人：{{item.publisher}}</text>
					</job-item>
				</view>
			</template>
		</home-container>
	</view>
</template>

<script>
	import homeContainer from './container.vue'
	import jobItem from './job-item.vue'
	export default {
		components: {
			homeContainer,
			jobItem
		},
		data () {
			return {
				current: 0,
				list: [
					{ name: '热门招聘' },
					{ name: '热门简历' },
				],
				data1: [
					{ title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' },
					{ title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海' }
				],
				data2: [
					{ title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' },
					{ title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' },
					{ title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' },
					{ title: '船舶维修钳工', time: '2019.10.20', price: '5K - 8K', address: '舟山市 - 定海', publisher: '辛弃疾' }
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
