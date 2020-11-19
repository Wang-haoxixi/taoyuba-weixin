<template>
	<view class="user-contract-container safe-padding-bottom">
		<!-- <template v-if="data.length > 0">
			<view class="">
				<contract-item v-for="item in data" :key="item.id" :info="item" :dictMap="dictMap"></contract-item>
			</view>
		</template>
		<template v-else>
			<view class="empty-wrapper">
				<u-empty text="暂无合同" mode="list"></u-empty>
			</view>
		</template> -->
		<view class="dropdown-wrapper">
			<u-tabs active-color="#ff9999" :bar-style="{background: '#ff9999'}" :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<list-layout :data="data1" empty-text="暂无合同成立数据" v-show="current === 0">
			<view class="">
				<contract-item v-for="item in data1" :key="item.id" :info="item" :dictMap="dictMap"></contract-item>
			</view>
		</list-layout>
		<list-layout :data="data4" empty-text="暂无合同解除数据" v-show="current === 1">
			<view class="">
				<contract-item v-for="item in data4" :key="item.id" :info="item" :dictMap="dictMap"></contract-item>
			</view>
		</list-layout>
		<list-layout :data="data5" empty-text="暂无合同过期数据" v-show="current === 2">
			<view class="">
				<contract-item v-for="item in data5" :key="item.id" :info="item" :dictMap="dictMap"></contract-item>
			</view>
		</list-layout>
		<list-layout :data="data6" empty-text="暂无无纸质合同数据" v-show="current === 3">
			<view class="">
				<contract-item v-for="item in data6" :key="item.id" :info="item" :dictMap="dictMap"></contract-item>
			</view>
		</list-layout>
	</view>
</template>

<script>
	import contractItem from '../list/components/contract-item.vue'
	import pageMixin from '@/pages/mixins/page.js'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	import listLayout from '@/pages/components/list-layout/index.vue'
	export default {
		mixins: [pageMixin, dictMapMixin],
		components: {
			contractItem,
			listLayout
		},
		data () {
			return {
				status: 'loadmore',
				current: 0,
				data1: [],
				data4: [],
				data5: [],
				data6: [],
				form: {
					status: '',
					shipNo: ''
				},
				shipNo: '',
				list: [
					{ name: '合同成立', value: 1 },
					{ name: '合同解除', value: 4 },
					{ name: '合同过期', value: 5 },
					{ name: '无纸质合同', value: 6 },
				]
			}
		},
		onLoad (params) {
			this.form.shipNo = params.shipNo
			this.getList(1)
			this.getList(4)
			this.getList(5)
			this.getList(6)
		},
		methods: {
			getList (status = '') {
				this.$http.get('/tmlms/tybcontract/listByShipName', {
					params: {
						shipNo: this.form.shipNo,
						status: status
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this[`data${status}`] = result
					}
				})
			},
			change(index) {
				this.current = index;
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-contract-container {
	}
</style>
