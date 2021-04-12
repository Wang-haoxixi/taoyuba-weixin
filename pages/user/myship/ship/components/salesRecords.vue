<template>
	<view class="sales-boss">
		<view class="sales-button">
			<u-picker v-model="show" mode="selector" range-key="shipName" :range="selectorObj" @confirm="confirmChange"></u-picker>
			<u-button @click="selling" size="mini" v-if="type === 1">我要卖船</u-button>
			<u-button @click="buy" size="mini" v-else>我要买船</u-button>
		</view>
		<view class="sales-list">
			<view class="content-wrapper" id="contentWrapper">
				<view class="item" v-for="(item, index) in data" :key="index">
					<view class="sales-list-content">
						<!-- sellState 6的時候交易完成 8的時候交易关闭 其他的时候都是交易进行中 -->
						<view v-if="item.auditState === '3'" class="sales-state"><text :style="item.sellState === '6' ? 'color: green' : item.sellState === '8' ? 'color: red' : 'color: #f90' ">{{ item.sellState === '6' ? '交易完成' : item.sellState === '8' ? '交易关闭' : '进行中' }}</text></view>
						<view style="padding-right: 80rpx">渔船名：  {{ item.shipName }}</view>
						<view>渔船编号：  {{ item.shipNo }}</view>
						<view>持证人：  {{ item.certificateHolderName }}</view>
						<view>持证人身份证：  {{ item.certificateHolderIdCard }}</view>
						<view>渔船状态：  <text :style="item.auditState === '3' ? 'color: green' : item.auditState === '4' ? 'color: red' : '' ">{{ getDictLabel(dictMap['audit_state'],item.auditState) }}</text></view>
						<view v-if="item.auditState === '4'">驳回理由：{{ item.rejectReason }}</view>
						<view v-if="item.auditState === '4'">注：出售驳回时,信息将作废,请重新发售！</view>
						<view class="sales-operation">
							<!-- type 代表卖船还是买船 item.auditState 代表審核進度 item.type 代表是否是持证人-->
							<u-button size="mini" @click="edit(item.id)" v-if="type === 1 && item.auditState === '2' && item.type === '1'">编辑</u-button>
							<u-button v-else size="mini" @click="edit(item.id,true)">查看详情</u-button>
							<u-button size="mini" @click="confirmProgress(item.id)" v-if="type === 1 && item.auditState === '3'">查看进度</u-button>
							<u-button size="mini" @click="deleShow(item.id)" v-if="type === 1 && item.auditState === '2'">删除</u-button>
							<u-button size="mini" v-if="type === 1 && item.auditState === '3' && item.type === '1' && item.sellState !== '8' && item.sellState !== '6' " @click="owners(item.id)">推送至共有人</u-button>
							<u-button size="mini" @click="confirmProgress(item.id)" v-if="type !== 1 ">确认信息</u-button>
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
						if( res.data.length === 0 ){
							uni.showToast({
								icon: 'none',
								title: '您还没有渔船!'
							})
						}else{
							this.show = true
							this.selectorObj = res.data
						}
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
						userId: this.$cache.get('userInfo').userId,
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
			edit (id,state) {
				this.$http.get(`/tmlms/tyb_order/getById?id=${id}`).then(({data})=>{
					this.$getCode(data).then(res=>{
						uni.setStorage({
						    key: 'saleShipDetail',
						    data: res.data,
						    success: function () {
						        uni.navigateTo({
						        	url: `/pages/user/myship/ship/shipDetail?disabled=${state}`
						        });
						    }
						});
					})
				})
			},
			// 唤起删除
			deleShow (id) {
				this.active = id
				this.showModel = true
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
			},
			owners (id) {
				uni.navigateTo({
					url: `/pages/user/myship/ship/saleCode?id=${id}`
				})
			},
			// 确认进度
			confirmProgress (id) {
				uni.navigateTo({
					url: `/pages/user/myship/ship/confirmShipDetail?id=${id}`
				})
			},
			// 买船
			buy () {
				uni.navigateTo({
					url: `/pages/user/myship/ship/buyShip`
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.sales-boss {
		padding: 20rpx 30rpx;
		margin: 10rpx 0 0 0;
		.sales-state {
			position: absolute;
			right: 20rpx;
			top: 16rpx;
		}
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
			position: relative;
			view {
				font-size: 28rpx;
				margin: 25rpx 0px;
			}
		}
	}
</style>
