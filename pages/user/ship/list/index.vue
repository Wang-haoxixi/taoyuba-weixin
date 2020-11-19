<template>
	<view class="user-search-container safe-padding-bottom">
		<view class="search-wrapper">
			<view style="border-radius: 40rpx;overflow: hidden;border: 1px solid #dcdfe6;padding-left: 20rpx;">
				<u-input v-model="shipName" trim focus type="number" :maxlength="5" placeholder="请输入渔船名,如:00000"/>
			</view>
			<view class="search-result" v-show="shipNameShow">
				<view class="item" v-for="item in shipNameList" :key="item.shipId" @click="onSearch(item.shipName)">
					<text>{{item.shipName}}</text>
					<i class="iconfont iconicon-"></i>
				</view>
				<!-- <template v-if="shipNameList.length">
					<view class="item" v-for="item in shipNameList" :key="item.shipId" @click="onSearch(item.shipName)">
						<text>{{item.shipName}}</text>
						<i class="iconfont iconicon-"></i>
					</view>
				</template>
				<template v-else>
					<view class="empty item">
						查无此船
					</view>
				</template> -->
				
			</view>
			<!-- <u-search placeholder="请输入渔船名,如:11001" focus :maxlength="5" :show-action="false" clear v-model="shipName"></u-search> -->
		</view>
		
		<view class="content-wrapper">
			<list-layout :data="data" empty-text="暂无数据">
				<view class="item" v-for="item in data" :key="item.id">
					<view class="text"><text class="name">渔船名：</text>{{item.shipName}}</view>
					<view class="text"><text class="name">持证人：</text>{{item.shipowner}}</view>
					<view class="text"><text class="name">持证人身份证：</text>{{item.shipownerIdcard}}</view>
					<view class="text"><text class="name">地址：</text>{{item.address}}</view>
					<view class="text"><text class="name">渔船编码：</text>{{item.shipNo}}</view>
					<view class="text"><text class="name">主机总功率(kw)：</text>{{item.engineTotalPower}}</view>
					<view class="text"><text class="name">船长(m)：</text>{{item.hullLength}}</view>
					<view class="text"><text class="name">作业类型：</text>{{item.activityType}}</view>
					<view class="text"><text class="name">合同/人数：</text>{{item.contractCount || 0}}/{{item.crewCount || 0}}</view>
					<view class="text" v-if="item.licensesOwnerShip"><text class="name">所有权登记证：</text>{{item.licensesOwnerShip}}</view>
					<view class="text" v-if="item.licensesFishingNo"><text class="name">捕捞许可证：</text>{{item.licensesFishingNo}}</view>
					<view class="text" v-if="item.licensesNationalNo"><text class="name">国籍证：</text>{{item.licensesNationalNo}}</view>
					<view class="text" v-if="item.licensesInspectionNo"><text class="name">船舶检验证：</text>{{item.licensesInspectionNo}}</view>
					<view class="btn-wrapper">
						<u-button style="margin-right: 20rpx;" @click="onTo(item)">船员</u-button>
						<u-button @click="onToContract(item)">合同</u-button>
					</view>
				</view>
				<!-- <u-loadmore :status="status" /> -->
			</list-layout>
		</view>
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	import listLayout from '@/pages/components/list-layout/index.vue'
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	import cloneDeep from 'lodash/cloneDeep'
	export default {
		components: { listLayout },
		mixins: [dictMapMixin, pageMixin],
		data () {
			return {
				status: 'loadmore',
				shipName: '',
				shipNameList: [],
				shipNameShow: false,
				data: []
			}
		},
		// onReachBottom() {
		// 	if (this.page.total > this.page.current * this.page.size) {
		// 		this.status = 'loading'
		// 		this.page.current++
		// 		this.getList()
		// 	} else{
		// 		this.status = 'nomore'
		// 	}
		// },
		computed: {
			activityTypeList () {
				return cloneDeep(this.dictMap)['tyb_resume_worktype'] || []
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
				this.$http.get(`/tybship/tybship/findship/${this.shipName}`).then(({ data }) => {
					this.shipNameShow = true
					if (data.data) {
						this.shipNameList = data.data
					} else {
						this.shipNameShow = false
					}
				})
			},
			getList () {
				let shipName = this.shipName
				this.shipName = ''
				this.$http.get('/tybship/tybship/newpage', {
					params: {
						shipName: shipName,
						size: this.page.size,
						current: this.page.current,
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						this.data = []
						let result = data.data
						this.data = result.records
						this.page.total = result.total
						// if (this.page.total <= this.page.size) {
						// 	this.status = 'nomore'
						// }
					}
					console.log(this.data)
					// uni.stopPullDownRefresh()
				})
			},
			trim (value) {
				return value.replace(/^\s+/, '').replace(/\s+$/, '');
			},
			onSearch (shipName) {
				this.shipNameShow = false
				this.shipNameList = []
				this.shipName = shipName
				this.getList()
			},
			onToContract (row) {
				if (row.shipNo) {
					uni.navigateTo({
						url: `/pages/user/ship/contract/list/index?shipNo=${row.shipNo}`
					})
				}
			},
			onTo (row) {
				if (row.shipId) {
					uni.navigateTo({
						url: `/pages/user/ship/crew/list/index?id=${row.shipId}`
					})
				}
			}
		}
	}
</script>


<style scoped lang="scss">
	.user-search-container {
		.search-wrapper {
			background-color: #fff;
			padding: 10rpx 20rpx;
			position: relative;
			.search-result {
				position: absolute;
				top: 94rpx;
				background-color: #fff;
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
				// .empty {
				// 	text-align: center;
				// 	font-size: 30rpx;
				// 	display: block;
				// 	width: 100%;
				// 	color: #999;
				// }
			}
		}
		.content-wrapper {
			.item {
				background-color: #fff;
				padding: 20rpx;
				margin-bottom: 20rpx;
				.text {
					font-size: 30rpx;
					line-height: 1.8;
					// margin-bottom: 20rpx;
					.name {
						color: #999;
					}
				}
				.btn-wrapper {
					display: flex;
					justify-content: flex-end;
				}
			}
		}
	}
</style>
