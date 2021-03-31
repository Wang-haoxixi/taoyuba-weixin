<template>
	<view class="sales-boss">
		<view class="sales-button">
			<u-picker v-model="show" mode="selector" range-key="shipName" :range="selectorObj" @confirm="confirmChange"></u-picker>
			<u-button @click="selling" size="mini" v-if="type === 1">我要卖船</u-button>
			<u-button @click="selling" size="mini" v-else>我要买船</u-button>
		</view>
		<view class="sales-list">
			<view class="content-wrapper" id="contentWrapper">
				<view class="item" v-for="(item, index) in data" :key="index">
					<view class="sales-list-content">
						<view>渔船名: {{ item.shipName }}</view>
						<view>渔船编号: {{ item.shipNo }}</view>
						<view>持证人: {{ item.certificateHolderName }}</view>
						<view>持证人身份证: {{ item.certificateHolderIdCard }}</view>
						<view>渔船状态: {{ getDictLabel(dictMap['audit_state'],item.auditState) }}</view>
						<view class="sales-operation">
							<u-button size="mini" @click="edit(item.id)" v-if="type === 1">编辑</u-button>
							<u-button size="mini" @click="active = item.id;showModel = true" v-if="type === 1">删除</u-button>
							<u-button size="mini">推送至共有人</u-button>
							<u-button size="mini">确认进度</u-button>
						</view>
					</view>
				</view>
			</view>
			<view class="loadmore">
				<u-loadmore :status="status"/>
			</view>
		</view>
		<u-modal v-model="showModel" :content="'是否确认删除此数据!'" @confirm="deleShip" :show-cancel-button="true"></u-modal>
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	import dictMap from '@/pages/mixins/dictMap.js'
	export default {
		components: {
		},
		mixins: [pageMixin,dictMap],
		data () {
			return {
				show: false,
				selectorObj: [],
				status: 'loadmore',
				data: [],
				active: 0,
				showModel: false
			}
		},
		props:{
			type: {
				type: Number,
				default: 1
			},
		},
		mounted () {
			this.data = []
			this.getList()
		},
		onPullDownRefresh () {
			if (this.current === 0) {
				this.data = []
				this.page.current = 1
				this.getList()
			}
		},
		onReachBottom() {
			if (this.current === 0) {
				if (this.page.total > this.page.current * this.page.size) {
					this.status = 'loading'
					this.page.current++
					this.getList()
				} else{
					this.status = 'nomore'
				}
			}
		},
		methods: {
			// 获取船只接口
			selling () {
				this.$http.get('/tmlms/tyb_order/my_ship').then(({ data })=>{
					this.$getCode(data).then(res=>{
						this.show = true
						this.selectorObj = res.data
					})
				})
			},
			// 选择卖哪只船
			confirmChange (val) {
				uni.setStorage({
				    key: 'saleShipDetail',
				    data: this.selectorObj[val[0]],
				    success: function () {
				        uni.navigateTo({
				        	url: `/pages/user/myship/ship/shipDetail`
				        });
				    }
				});
			},
			// 获取列表
			getList () {
				this.$http.get('/tmlms/tyb_order/page', {
					params: Object.assign({
						size: this.page.size,
						current: this.page.current,
						userId: this.$store.state.user.userInfo.userId,
						searchType: this.type
					})
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data = this.data.concat(result.records)
						this.page.total = result.total
						if (this.page.total <= this.page.size) {
							this.status = 'nomore'
						}
						if (this.page.total === this.data.length) {
							this.status = 'nomore'
						}
					}
					uni.stopPullDownRefresh()
				})
			},
			// 编辑交易信息
			edit (id) {
				this.$http.get(`/tmlms/tyb_order/getById?id=${id}`).then(({data})=>{
					this.$getCode(data).then(res=>{
						uni.setStorage({
						    key: 'saleShipDetail',
						    data: res.data,
						    success: function () {
						        uni.navigateTo({
						        	url: `/pages/user/myship/ship/shipDetail`
						        });
						    }
						});
					})
				})
			},
			// 删除交易信息
			deleShip () {
				this.$http.post(`/tmlms/tyb_order/delete/${this.active}`).then(({ data })=>{
					this.$getCode(data).then(res=>{
						this.data = []
						this.page.current = 1
						this.getList()
					})
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.sales-boss {
		padding: 0 30rpx;
		margin: 30rpx 0;
		.sales-button {
			width: 150rpx;
		}
		.sales-list {
			width: 100%;
			margin-top: 30rpx;
			.item {
				margin-top: 30rpx;
			}
			.sales-operation {
				display: flex;
				justify-content: space-around;
			}
		}
		.sales-list-content {
			background-color: #f6f6f6;
			box-sizing: border-box;
			padding: 20rpx 30rpx;
			color: #a4a7a8;
			view {
				font-size: 28rpx;
				margin: 25rpx 0px;
			}
		}
	}
</style>
