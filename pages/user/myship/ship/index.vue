<template>
	<!-- 渔船 -->
	<view class="user-ship-container phonex-mb">
		<list-layout :data="data" empty-text="数据为空">
			<u-card :show-head="false" box-shadow="0px 0px 5px #d7d7d7" v-for="item in data" :key="item.shipId">
				<view class="ship-item-wrapper" slot="body">
					<view class="left-wrapper">
						<view class="title">{{item.shipName}}</view>
						<view class="text">渔船编号：{{item.shipNo}}</view>
						<view class="text">持证人：{{item.shipowner}}</view>
					</view>
				</view>
				<view slot="foot">
					<view class="btn-wrapper">
						<u-button size="medium" @click="onToContract(item)" class="btn">合同</u-button>
						<u-button size="medium" @click="onTo(item)">船员</u-button>
					</view>
				</view>
			</u-card>
		</list-layout>
	</view>
</template>

<script>
	import userInfoMixin from '@/pages/mixins/user-info.js'
	import listLayout from '@/pages/components/list-layout/index.vue'
	export default {
		components: {
			listLayout
		},
		mixins: [userInfoMixin],
		data () {
			return {
				data: [],
			}
		},
		onLoad () {
			this.getList()
		},
		methods: {
			getList () {
				this.$http.get(`/tmlms/tybshiphaver/getMyShip/${this.userInfo.userId}`).then(({ data }) => {
					if (data.code === 0) {
						this.data = data.data
					}
				})
			},
			onToContract (row) {
				if (row.shipNo) {
					uni.navigateTo({
						url: `/pages/user/contract/ship-list/index?shipNo=${row.shipNo}`
					})
				}
			},
			onTo (row) {
				if (row.shipId) {
					uni.navigateTo({
						url: `/pages/user/myship/crew/list/index?id=${row.shipId}`
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-ship-container {
		.ship-item-wrapper {
			background-color: #fff;
			display: flex;
			align-items: center;
			.left-wrapper {
				flex: 1 1 auto;
				.title {
					font-size: 32rpx;
					color: #333;
				}
				.text {
					margin-top: 15rpx;
					color: #999;
					font-size: 28rpx;
				}
			}
			
		}
		.btn-wrapper {
			display: flex;
			justify-content: flex-end;
			.btn {
				display: inline-block;
				margin-right: 10rpx;
			}
		}
	}
</style>
