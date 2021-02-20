<template>
	<!-- 船舶主要设备 -->
	<view class="certificate-wrapper">
		<view class="title">
			三、船舶主要设备
		</view>
		
		<view class="item">
			<view class="item-title">1.主机</view>
			<view class="item-sub-title">实船型号：</view>
			<view class="form-input form-wrapper"><u-input border v-model="form.shipMark" /></view>
			<view class="item-sub-title">铭牌：</view>
			<view class="form-wrapper">
				<u-radio-group v-model="form.shipMarkFlag">
					<u-radio
						v-for="(item, index) in dicData.isNot"
						:key="index"
						:name="item.value"
					>
						{{item.label}}
					</u-radio>
				</u-radio-group>
			</view>
			<view class="item-sub-title">照片：</view>
			<view class="">
				<choose-img
					@get-imgs="(img) => { getImgs(img, 'shipMarkImage') }" 
					v-model="form.shipMarkImage"></choose-img>
			</view>
		</view>
		
		<view class="item">
			<view class="item-title">2.发电机</view>
			<view class="item-sub-title">型号：</view>
			<view class="form-input form-wrapper"><u-input border v-model="form.dynamo" /></view>
			<view class="item-sub-title">数量：</view>
			<view class="form-input form-wrapper"><u-input border v-model="form.dynamoQuantity" type="number"/></view>
			<view class="item-sub-title">照片：</view>
			<view class="">
				<choose-img
					@get-imgs="(img) => { getImgs(img, 'dynamoImage') }" 
					v-model="form.dynamoImage"></choose-img>
			</view>
		</view>
		
		<view class="item">
			<view class="item-title">3.控制电箱</view>
			<view class="">
				<choose-img
					@get-imgs="(img) => { getImgs(img, 'electricBoxImage') }" 
					v-model="form.electricBoxImage"></choose-img>
			</view>
		</view>
		
		<view class="item">
			<view class="item-title">4.齿轮箱</view>
			<view class="item-sub-title">型号：</view>
			<view class="form-input form-wrapper"><u-input border v-model="form.gearBoxMark" /></view>
			<view class="item-sub-title">铭牌：</view>
			<view class="form-wrapper">
				<u-radio-group v-model="form.gearBoxFlag">
					<u-radio
						v-for="(item, index) in dicData.isNot"
						:key="index"
						:name="item.value"
					>
						{{item.label}}
					</u-radio>
				</u-radio-group>
			</view>
			<view class="item-sub-title">照片：</view>
			<view class="">
				<choose-img
					@get-imgs="(img) => { getImgs(img, 'gearBoxImage') }" 
					v-model="form.gearBoxImage"></choose-img>
			</view>
		</view>
		
		<view class="item">
			<view class="item-title">5.防污染设备</view>
			<view class="item-sub-title">滤油设备型号：</view>
			<view class="form-input form-wrapper"><u-input border v-model="form.oilEquipmentMark" /></view>
			<view class="item-sub-title">滤油设备铭牌：</view>
			<view class="form-wrapper">
				<u-radio-group v-model="form.oilEquipmentFlag">
					<u-radio
						v-for="(item, index) in dicData.isNot"
						:key="index"
						:name="item.value"
					>
						{{item.label}}
					</u-radio>
				</u-radio-group>
			</view>
			<view class="item-sub-title">滤油设备：</view>
			<view class="">
				<choose-img
					@get-imgs="(img) => { getImgs(img, 'oilEquipmentImage') }" 
					v-model="form.oilEquipmentImage"></choose-img>
			</view>
			<view class="item-sub-title">残油舱：</view>
			<view class="">
				<choose-img
					@get-imgs="(img) => { getImgs(img, 'residualOilTank') }" 
					v-model="form.residualOilTank"></choose-img>
			</view>
			<view class="item-sub-title">污油水柜(舱)：</view>
			<view class="">
				<choose-img
					@get-imgs="(img) => { getImgs(img, 'dirtyOilTank') }" 
					v-model="form.dirtyOilTank"></choose-img>
			</view>
		</view>
		
		<!-- <view class="item">
			<view class="item-title">6.安全设备</view>
		</view>
		
		<view class="item">
			<view class="item-title">7.冷藏设备</view>
		</view> -->
		<view class="btn-next">
			<u-button @click="onPrev">上一步</u-button>
			<u-button @click="onSubmit">提交</u-button>
		</view>
	</view>
</template>

<script>
	import chooseImg from './chooseImg.vue'
	import reportMixin from './mixin.js'
	export default {
		mixins: [reportMixin],
		components: {
			chooseImg
		},
		data () {
			return {
				form: {
					shipMark: '', // 主机-实船型号
					shipMarkFlag: 0, // 主机-铭牌
					shipMarkImage: [], // 主机-照片
					dynamo: '', // 发电机-型号
					dynamoQuantity: '', // 发电机-数量
					dynamoImage: [], // 发电机-照片
					electricBoxImage: [], // 控制电箱
					gearBoxMark: '', // 齿轮箱-型号
					gearBoxFlag: 0, // 齿轮箱-铭牌
					gearBoxImage: [], // 齿轮箱-照片
					oilEquipmentMark: '', // 滤油设备型号
					oilEquipmentFlag: 0, // 滤油设备铭牌
					oilEquipmentImage: [], // 滤油设备照片
					residualOilTank: [], // 残油舱
					dirtyOilTank: [], // 污油水柜(舱)
				},
				dicData: {
					isNot: [
						{ label: '有', value: 1 },
						{ label: '无', value: 0 }
					],
					isOk: [
						{ label: '有', value: 1 },
						{ label: '无', value: 0 }
					],
				}
			}
		},
		methods: {
			getImgs (url, name) {
				this.concatImg(name, url)
			},
			onPrev () {
				this.$emit('prev', 3)
			},
			onSubmit () {
				// this.form.dynamoQuantity = 1
				this.$emit('submit')
			},
			getForm () {
				let form = this.form
				let value = Object.assign({}, this.value)
				for (let key in form) {
					if (Array.isArray(form[key])) {
						form[key] = value[key] || []
					} else {
						if (['shipMarkFlag', 'gearBoxFlag', 'oilEquipmentFlag'].indexOf(key) > -1) {
							form[key] = value[key] || 0
						} else {
							form[key] = value[key] || ''
						}
						
					}
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.certificate-wrapper {
		padding: 0 20px;
		.title {
			font-size: 34rpx;
			text-align: center;
			padding: 20rpx 0 40rpx;
			font-weight: 700;
		}
		.item {
			margin-bottom: 30rpx;
			.item-title {
				font-size: 30rpx;
				font-weight: 700;
			}
			.item-sub-title {
				font-size: 28rpx;
				margin: 20rpx 0 20rpx;
			}
		}
		.btn-next {
			display: flex;
			justify-content: space-around;
			margin: 50rpx 0 30rpx 0;
		}
	}
</style>
