<template>
	<view class="user-ship-container safe-padding-bottom">
		<view class="user-ship-title">
			<u-tag :text="item" :mode="active === item ? 'dark' : 'light'" v-for="item in title" @click="tagClick(item)"/>
		</view>
		<view v-show="active === '出售记录'">
			<sales-records ref="records" :type="1"></sales-records>
		</view>
		<view v-show="active === '购买记录'">
			<sales-records ref="records1" :type="2"></sales-records>
		</view>
	</view>
</template>

<script>
import salesRecords from './components/salesRecords.vue'
export default {
	components: {
		salesRecords
	},
	mixins: [],
	data () {
		return {
			active: '出售记录',
			title: ['出售记录','购买记录','交易合同'],
			type: 1
		}
	},
	onLoad () {
	},
	onShow() {
	},
	methods: {
		tagClick (val) {
			this.active = val
		},
		getList () {
			this.$refs.records.data = []
			this.$refs.records.page.current = 1
			this.$refs.records.getList()
		}
	}
}
</script>

<style lang="scss" scoped>
.user-ship-container {
	padding:0 30rpx;
	min-height: 100vh;
	background-color: white;
	.user-ship-title {
		height: 100rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 1px solid rgba($color: #ccc, $alpha: 0.5);
		::v-deep .u-size-default {
			padding: 16rpx 25rpx;
		}
	}
}
</style>
