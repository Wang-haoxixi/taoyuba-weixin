<template>
	<view class="sales-boss">
		<u-form :model="form" ref="uForm" label-width="220" :disabled="disabled">
			<u-form-item label="交易金额(元)"><u-input v-model="form.sellPrice" :type="'number'" :disabled="disabled" /></u-form-item>
			<u-form-item label="渔船名"><u-input v-model="form.shipName" :disabled="disabled" /></u-form-item>
			<u-form-item label="渔船编号"><u-input v-model="form.shipNo" :disabled="disabled" /></u-form-item>
			<u-form-item label="捕捞许可证编号"><u-input v-model="form.licensesFishingNo" :disabled="disabled"/></u-form-item>
			<u-form-item label="渔船所有权登记证书"><u-input v-model="form.licensesOwnerShip" :disabled="disabled"/></u-form-item>
			<u-form-item label="国籍证书编号"><u-input v-model="form.licensesNationalNo" :disabled="disabled"/></u-form-item>
			<u-form-item label="船舶检验证书编号"><u-input v-model="form.licensesInspectionNo" :disabled="disabled"/></u-form-item>
			<u-form-item label="主机总功率(千瓦)"><u-input v-model="form.engineTotalPower" :disabled="disabled"/></u-form-item>
			<u-form-item label="主机功率(千瓦)"><u-input v-model="form.mainEnginePower" :disabled="disabled"/></u-form-item>
			<u-form-item label="双控功率(千瓦)"><u-input v-model="form.dualPower" :disabled="disabled"/></u-form-item>
			<u-form-item label="主机型号"><u-input v-model="form.grossTonnage" :disabled="disabled"/></u-form-item>
			<u-form-item label="总吨位（吨）"><u-input v-model="form.mainEngineModel" :disabled="disabled"/></u-form-item>
			<u-form-item label="船长(米)"><u-input v-model="form.hullLength" :disabled="disabled"/></u-form-item>
			<u-form-item label="船体材料"><view @click="disabled ? '' :setLabel(dictMapList['tyb_ship_material'],'hullMaterial')" class="label-width">{{ getDictLabel(dictMapList['tyb_ship_material'],form.hullMaterial) }}</view></u-form-item>
			<u-form-item label="船籍港"><view @click="disabled ? '' :setLabel(dictMapList['tyb_ship_port'],'portRegister')" class="label-width">{{ getDictLabel(dictMapList['tyb_ship_port'],form.portRegister) }}</view></u-form-item>
			<u-form-item label="渔具名称"><view @click="disabled ? '' :setLabel(dictMapList['tyb_fishing_gear'],'fishingGear')" class="label-width">{{ getDictLabel(dictMapList['tyb_fishing_gear'],form.fishingGear)}}</view></u-form-item>
			<u-form-item label="建造完工日期"><u-input v-model="form.buildDate" :disabled="disabled"/></u-form-item>
			<u-form-item label="许可作业类型"><view @click="disabled ? '' :setLabel(dictMapList['tyb_resume_worktype'],'activityType')" class="label-width">{{ getDictLabel(dictMapList['tyb_resume_worktype'],form.activityType) }}</view></u-form-item>
			<u-form-item label="许可作业方式"><view @click="disabled ? '' :setLabel(dictMapList['tyb_work_mode'],'workMode')" class="label-width">{{ getDictLabel(dictMapList['tyb_work_mode'],form.workMode) }}</view></u-form-item>
			<u-form-item label="实际作业方式"><view @click="disabled ? '' :setLabel(dictMapList['tyb_work_mode'],'workMode2')" class="label-width">{{ getDictLabel(dictMapList['tyb_work_mode'],form.workMode2) }}</view></u-form-item>
			<u-form-item label="型宽（米）"><u-input v-model="form.mouldedBreadth" :disabled="disabled"/></u-form-item>
			<u-form-item label="型深（米）"><u-input v-model="form.mouldedDepth" :disabled="disabled"/></u-form-item>
			<u-form-item label="净吨位（吨）"><u-input v-model="form.netTonnage" :disabled="disabled"/></u-form-item>
			<u-form-item label="造船厂"><u-input v-model="form.buildFactory" :disabled="disabled"/></u-form-item>
			<u-form-item label="所有权证书">
				<get-img v-model="form.licensesOwnerShipUrlList" @getImg="(url) => getUrl(url, 'licensesOwnerShipUrlList')" :url="form.licensesOwnerShipUrlList" :disabled="disabled" @delImg="(index) => delImg(index, 'licensesOwnerShipUrlList')"></get-img>
			</u-form-item>
			<u-form-item label="国籍证(增加照片)">
				<get-img v-model="form.licensesNationalNoUrlList" @getImg="(url) => getUrl(url, 'licensesNationalNoUrlList')" :url="form.licensesNationalNoUrlList" :disabled="disabled" @delImg="(index) => delImg(index, 'licensesNationalNoUrlList')"></get-img>
			</u-form-item>
			<u-form-item label="捕捞许可证(增加照片)">
				<get-img v-model="form.licensesFishingNoUrlList" @getImg="(url) => getUrl(url, 'licensesFishingNoUrlList')" :url="form.licensesFishingNoUrlList" :disabled="disabled" @delImg="(index) => delImg(index, 'licensesFishingNoUrlList')"></get-img>
			</u-form-item>
			<u-form-item label="船舶检验证">
				<get-img v-model="form.licensesInspectionNoUrlList" @getImg="(url) => getUrl(url, 'licensesInspectionNoUrlList')" :url="form.licensesInspectionNoUrlList" :disabled="disabled" @delImg="(index) => delImg(index, 'licensesInspectionNoUrlList')"></get-img>
			</u-form-item>
		</u-form>
		<view class="sumbit-button" v-if="!disabled">
			<u-button type="primary" @click="sumbit" >提交出售渔船信息</u-button>
		</view>
		<u-picker v-model="show" mode="selector" range-key="label" :range="selectorObj" @confirm="confirmChange"></u-picker>
		<u-modal v-model="showModal" :content="content">
			<view slot="confirm-button" @click="sumbitUpload">
				我知道了
			</view>
		</u-modal>
	</view>
</template>

<script>
	import dictMap from '@/pages/mixins/dictMap.js'
	import getImg from './components/getImg.vue'
	export default {
		components: {
			getImg
		},
		mixins: [ dictMap ],
		data () {
			return {
				dictMapList: this.$cache.get('dictMap'),
				form: {},
				active: '',
				selectorObj: [],
				show: false,
				showModal: false,
				content: '该渔船出售信息已提交,请您耐心等待审核!',
				disabled: false
			}
		},
		onLoad (option) {
			let value = uni.getStorageSync('saleShipDetail')
			this.form = value
			if( option.disabled === 'true' ){
				this.disabled = true
			}else{
				this.disabled = false
			}
		},
		methods: {
			// 获取图片地址
			getUrl (url,row) {
				if( this.form[row] ){
					this.form[row].push(url)
				}else{
					this.$set(this.form,row,[url])
				}
			},
			delImg (index,row) {
				this.form[row].splice(index,1)
			},
			// 有字典项的重新选择
			setLabel (list,name) {
				this.active = name
				this.selectorObj = list
				this.show = true
			},
			confirmChange (val) {
				this.form[this.active] = this.selectorObj[val[0]].value
			},
			// 提交修改
			sumbit () {
				var regPos = /^\d+(\.\d+)?$/;
				if(!regPos.test(this.form.sellPrice)){
					uni.showToast({
						icon: 'none',
						title: '请输入正确交易金额!'
					})
					return false
				}
				if( this.form.licensesOwnerShipUrlList.length !== 0 && this.form.licensesNationalNoUrlList.length !== 0 && this.form.licensesFishingNoUrlList.length !== 0 && this.form.licensesInspectionNoUrlList.length !== 0 ){
					let url = this.form.id  ? '/tmlms/tyb_order/update' : '/tmlms/tyb_order/sell'
					this.$http.post(url,this.form).then(({ data })=>{
						this.$getCode(data).then(res=>{
							this.showModal = true
						})
					})
				}else{
					uni.showToast({
						icon: 'none',
						title: '请完善图片信息!'
					})
				}
			},
			// 完成后返回上一页并且刷新上一页的东西
			sumbitUpload() {
				this.showModal = false
				uni.showToast({
					icon: 'none',
					title: '操作成功!'
				})
				let pages = getCurrentPages();//获取页面栈
				let beforePage = pages[pages.length - 2];//上一页
				beforePage.$vm.getList();//直接调用上一页的方法
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sales-boss {
		background: white;
		padding: 30rpx;
	}
	.sumbit-button {
		margin-top: 30rpx;
	}
	.label-width {
		min-width: 100rpx;
		min-height: 35rpx;
	}
</style>
