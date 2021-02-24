<template>
	<view class="report-info-wrapper">
		<view class="search-wrapper" v-show="!form.shipName">
			<view style="border-radius: 40rpx;overflow: hidden;border: 1px solid #dcdfe6;padding-left: 20rpx;">
				<u-input v-model="shipName" trim focus type="number" :maxlength="5" placeholder="请输入渔船名,如:00000"/>
			</view>
			<view class="search-result" v-show="shipNameShow">
				<view class="item" v-for="item in shipNameList" :key="item.shipId" @click="onSearch(item.shipId)">
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
			<!-- <u-search placeholder="渔船编号" focus clearabled shape="square" v-model="shipName" @custom="onSearch" @search="onSearch"></u-search> -->
		</view>
		<view v-show="form.shipName" class="content">
			<u-form ref="uForm" label-width="150">
				<u-form-item label="船名号:"><u-input v-model="form.shipName" disabled placeholder=" "/></u-form-item>
				<u-form-item label="渔船编码:"><u-input v-model="form.shipNo" disabled placeholder=" "/></u-form-item>
				<u-form-item label="船体材质:"><u-input v-model="form.hullMaterial" disabled placeholder=" "/></u-form-item>
				<u-form-item label="作业方式:"><u-input v-model="form.workMode" disabled placeholder=" "/></u-form-item>
				<!-- <u-form-item label="总长:"><u-input v-model="form.value" disabled placeholder=" "/></u-form-item> -->
				<u-form-item label="船长:"><u-input v-model="form.hullLength" disabled placeholder=" "/></u-form-item>
				<u-form-item label="型深:"><u-input v-model="form.mouldedDepth" disabled placeholder=" "/></u-form-item>
				<u-form-item label="型宽:"><u-input v-model="form.mouldedBreadth" disabled placeholder=" "/></u-form-item>
				<u-form-item label="双控功率（KW):" label-width="250"><u-input v-model="form.dualPower" disabled placeholder=" "/></u-form-item>
				<u-form-item label="主机型号:"><u-input v-model="form.mainEngineModel" disabled placeholder=" "/></u-form-item>
				<!-- <u-form-item label="船舶呼号或识别码:" label-width="250"><u-input v-model="form.value" disabled placeholder=" "/></u-form-item> -->
				<u-form-item label="建造完工日期:" label-width="200"><u-input v-model="form.buildDate" disabled placeholder=" "/></u-form-item>
			</u-form>
			<view class="btn-next">
				<u-button @click="onNext">下一步</u-button>
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
				shipNameShow: false,
				form: {
					shipId: '',
					shipName: '', // 船名号
					shipNo: '', // 渔船编码
					hullMaterial: '', // 船体材质
					workMode: '', // 作业方式
					// 总长
					hullLength: '', // 船长
					mouldedDepth: '', // 型深
					mouldedBreadth: '', // 型宽
					dualPower: '', // 双控功率
					mainEngineModel: '', // 主机型号
					// 船舶呼号或识别码
					buildDate: '' // 建造完工日期
				}
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
						if (val.buildDate) {
							let date = +new Date(val.buildDate.replace(/-/g, '/') )
							val.buildDate = this.$tools.timestamp(date / 1000)
						}
						for (let key in this.form) {
							this.form[key] = val[key]
						}
						
						this.$emit('getShip', this.form)
					}
				})
			},
			onNext () {
				if (this.form.shipName) {
					this.$emit('next', 2)
					// console.log('基本信息', this.form)
				}
			},
			onSearch (id) {
				this.shipName = ''
				this.getShipInfo(id)
			}
		}
	}
</script>

<style scoped lang="scss">
	.report-info-wrapper {
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
		.btn-next {
			margin-top: 20rpx;
		}
		.content {
			padding: 20rpx;
		}
	}
</style>
