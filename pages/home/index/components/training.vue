<template>
	<view class="class-wrapper">
		<home-container>
			<u-tabs slot="header" :list="list" inactive-color="#fff" bg-color="transparent" active-color="#fff" :bold="false" :bar-style="{background: '#c29799'}" is-scroll :current="current" @change="tabsChange"></u-tabs>
			<template>
				<view class="" v-show="current === 0">
					<trainning-item :info="item" btn-text="查看详情" v-for="(item, index) in data1" :key="index"></trainning-item>
				</view>
				<view class="" v-show="current === 1">
					<trainning-item :info="item" btn-text="报名" v-for="(item, index) in data2" :key="index">
						<text slot="right">培训天数：{{item.count}}天</text>
					</trainning-item>
				</view>
				<view class="" v-show="current === 2">
					<trainning-item :info="item" btn-text="签到" v-for="(item, index) in data3" :key="index">
						<text slot="right">培训天数：{{item.count}}人</text>
					</trainning-item>
				</view>
				<view class="" v-show="current === 3">
					<trainning-item :info="item" btn-text="查看详情" v-for="(item, index) in data4" :key="index">
						<text slot="right">联系人：{{item.publisher}}</text>
					</trainning-item>
				</view>
			</template>
		</home-container>
	</view>
</template>

<script>
	import homeContainer from './container.vue'
	import trainningItem from './training-item.vue'
	export default {
		components: {
			homeContainer,
			trainningItem
		},
		data () {
			return {
				current: 0,
				list: [
					{ name: '培训机构' },
					{ name: '培训信息' },
					{ name: '职业规划' },
					{ name: '教程订购' }
				],
				data1: [
					{ id: 1, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！！！！' },
					{ id: 2, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！！！！' },
					{ id: 3, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！！！！' },
					{ id: 4, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！！！！' },
					{ id: 5, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！！！！' },
				],
				data2: [
					{ id: 1, title: '东方培训机构', address: '舟山市 - 定海', count: '30', time: '2019.10.01 - 2019.11.01', text: '培养专业的钳工、维修工，选我，准没错！！' },
					{ id: 2, title: '东方培训机构', address: '舟山市 - 定海', count: '30', time: '2019.10.01 - 2019.11.01', text: '培养专业的钳工、维修工，选我，准没错！！' },
					{ id: 3, title: '东方培训机构', address: '舟山市 - 定海', count: '30', time: '2019.10.01 - 2019.11.01', text: '培养专业的钳工、维修工，选我，准没错！！' },
					{ id: 4, title: '东方培训机构', address: '舟山市 - 定海', count: '30', time: '2019.10.01 - 2019.11.01', text: '培养专业的钳工、维修工，选我，准没错！！' },
				],
				data3: [
					{ id: 1, title: '东方培训机构', address: '舟山市 - 定海', count: '30', time: '2019.10.01 - 2019.11.01', text: '培养专业的钳工、维修工，选我，准没错！！' },
					{ id: 2, title: '东方培训机构', address: '舟山市 - 定海', count: '30', time: '2019.10.01 - 2019.11.01', text: '培养专业的钳工、维修工，选我，准没错！！' },
					{ id: 3, title: '东方培训机构', address: '舟山市 - 定海', count: '30', time: '2019.10.01 - 2019.11.01', text: '培养专业的钳工、维修工，选我，准没错！！' },
					{ id: 4, title: '东方培训机构', address: '舟山市 - 定海', count: '30', time: '2019.10.01 - 2019.11.01', text: '培养专业的钳工、维修工，选我，准没错！！' },
					{ id: 5, title: '东方培训机构', address: '舟山市 - 定海', count: '30', time: '2019.10.01 - 2019.11.01', text: '培养专业的钳工、维修工，选我，准没错！！' }
				],
				data4: [
					{ id: 1, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' },
					{ id: 2, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' },
					{ id: 3, title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' },
					{ id: 4,title: '东方培训机构', address: '舟山市 - 定海', phone: '2020999', text: '培养专业的钳工、维修工，选我，准没错！！', publisher: '辛弃疾' }
				]
			}
		},
		methods: {
			// tabs切换
			tabsChange (index) {
				if (index === 2) {
					uni.navigateTo({
						url: '/pages/home/plan/index'
					})
				} else{
					this.current = index
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>
