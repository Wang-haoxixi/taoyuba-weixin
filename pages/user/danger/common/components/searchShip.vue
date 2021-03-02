<template>
	<view class="search-wrapper">
		<view style="border-radius: 40rpx;overflow: hidden;border: 1px solid #dcdfe6;padding-left: 20rpx;">
			<u-input v-model="shipName" trim focus type="number" :maxlength="5" placeholder="请输入渔船名,如:00000"/>
		</view>
		<view class="search-result" v-show="shipNameShow">
			<view class="item" v-for="item in shipNameList" :key="item.shipId" @click="onSearch(item.shipId)">
				<text>{{item.shipName}}</text>
				<i class="iconfont iconicon-"></i>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				shipName: '',
				shipNameList: [],
				shipNameShow: false
			}
		},
		watch: {
			'shipName': {
				handler (newVal) {
					if (newVal.length === 5) {
						this.getShip()
					} else {
						this.shipNameList = []
						this.shipNameShow = false
					}
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			getShip () {
				this.$http.get(`/tybship/tybship/findshipWithOutOrg/${this.shipName}`).then(({ data }) => {
					this.shipNameShow = true
					if (data.data) {
						this.shipNameList = data.data
					} else {
						this.shipNameShow = false
					}
				})
			},
			getShipInfo (id) {
				if (!id) {
					return
				}
				this.$http.get(`/tybship/tybship/${id}`).then(({ data }) => {
					if (data.code === 0) {
						let val = data.data
						this.$emit('getShip', val)
					}
				})
			},
			onSearch (id) {
				this.shipName = ''
				this.getShipInfo(id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-wrapper {
		// padding-top: 10rpx;
		// background-color: #f6f6f6;
		padding: 20rpx 10rpx;
		margin-bottom: 20rpx;
		.search-result {
			position: absolute;
			top: 94rpx;
			background-color: #f6f6f6;
			left: 0;
			right: 0;
			height: calc(100vh - 100rpx);
			background-color: #fff;
			z-index: 1000;
			.item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				width: 100%;bottom-top: 1px solid #dcdfe6;
				font-size: 28rpx;
				.iconfont {
					color: #999;
					font-size: 40rpx;
				}
			}
		}
	}
</style>
