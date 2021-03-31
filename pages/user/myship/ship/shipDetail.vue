<template>
	<view class="sales-boss">
		<u-form :model="form" ref="uForm" label-width="220">
			<u-form-item label="渔船名"><u-input v-model="form.shipName" /></u-form-item>
			<u-form-item label="渔船编号"><u-input v-model="form.shipNo" /></u-form-item>
			<u-form-item label="捕捞许可证编号"><u-input v-model="form.licensesFishingNo" /></u-form-item>
			<u-form-item label="渔船所有权登记证书"><u-input v-model="form.licensesOwnerShip" /></u-form-item>
			<u-form-item label="国籍证书编号"><u-input v-model="form.licensesNationalNo" /></u-form-item>
			<u-form-item label="船舶检验证书编号"><u-input v-model="form.licensesInspectionNo" /></u-form-item>
			<u-form-item label="主机总功率(kw)"><u-input v-model="form.engineTotalPower" /></u-form-item>
			<u-form-item label="主机功率(kw)"><u-input v-model="form.mainEnginePower" /></u-form-item>
			<u-form-item label="双控功率(kw)"><u-input v-model="form.dualPower" /></u-form-item>
			<u-form-item label="主机型号"><u-input v-model="form.grossTonnage" /></u-form-item>
			<u-form-item label="总吨位"><u-input v-model="form.mainEngineModel" /></u-form-item>
			<u-form-item label="船长(m)"><u-input v-model="form.hullLength" /></u-form-item>
			<u-form-item label="船体材料"><view @click="setLabel(dictMapList['tyb_ship_material'],'hullMaterial')">{{ getDictLabel(dictMapList['tyb_ship_material'],form.hullMaterial) }}</view></u-form-item>
			<u-form-item label="船籍港"><view @click="setLabel(dictMapList['tyb_ship_port'],'portRegister')">{{ getDictLabel(dictMapList['tyb_ship_port'],form.portRegister) }}</view></u-form-item>
			<u-form-item label="渔具名称"><view @click="setLabel(dictMapList['tyb_fishing_gear'],'fishingGear')">{{ getDictLabel(dictMapList['tyb_fishing_gear'],form.fishingGear)}}</view></u-form-item>
			<u-form-item label="建造完工日期"><u-input v-model="form.buildDate" /></u-form-item>
			<u-form-item label="许可作业类型"><view @click="setLabel(dictMapList['tyb_resume_worktype'],'activityType')">{{ getDictLabel(dictMapList['tyb_resume_worktype'],form.activityType) }}</view></u-form-item>
			<u-form-item label="许可作业方式"><view @click="setLabel(dictMapList['tyb_work_mode'],'workMode')">{{ getDictLabel(dictMapList['tyb_work_mode'],form.workMode) }}</view></u-form-item>
			<u-form-item label="实际作业方式"><view @click="setLabel(dictMapList['tyb_work_mode'],'workMode2')">{{ getDictLabel(dictMapList['tyb_work_mode'],form.workMode2) }}</view></u-form-item>
			<u-form-item label="型宽"><u-input v-model="form.mouldedBreadth" /></u-form-item>
			<u-form-item label="型深"><u-input v-model="form.mouldedDepth" /></u-form-item>
			<u-form-item label="净吨位"><u-input v-model="form.netTonnage" /></u-form-item>
			<u-form-item label="造船厂"><u-input v-model="form.buildFactory" /></u-form-item>
			<u-form-item label="所有权证书">
				<get-img v-model="form.licensesOwnerShipUrl" @getImg="(url) => getUrl(url, 'licensesOwnerShipUrl')" :url="form.licensesOwnerShipUrl"></get-img>
			</u-form-item>
			<u-form-item label="国籍证(增加照片)">
				<get-img v-model="form.licensesNationalNoUrl" @getImg="(url) => getUrl(url, 'licensesNationalNoUrl')" :url="form.licensesNationalNoUrl"></get-img>
			</u-form-item>
			<u-form-item label="捕捞许可证(增加照片)">
				<get-img v-model="form.licensesFishingNoUrl" @getImg="(url) => getUrl(url, 'licensesFishingNoUrl')" :url="form.licensesFishingNoUrl"></get-img>
			</u-form-item>
			<u-form-item label="船舶检验证">
				<get-img v-model="form.licensesInspectionNoUrl" @getImg="(url) => getUrl(url, 'licensesInspectionNoUrl')" :url="form.licensesInspectionNoUrl"></get-img>
			</u-form-item>
		</u-form>
		<view class="sumbit-button">
			<u-button type="primary" @click="sumbit">提交出售渔船信息</u-button>
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
				content: '该渔船出售信息将于72小时内自动关闭,请尽快联系共有人确认出售信息!'
			}
		},
		onLoad () {
			let value = uni.getStorageSync('saleShipDetail')
			this.form = value
		},
		methods: {
			// 获取图片地址
			getUrl (url,row) {
				this.$set(this.form,row,url)
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
				if( this.form.licensesOwnerShipUrl && this.form.licensesNationalNoUrl && this.form.licensesFishingNoUrl && this.form.licensesInspectionNoUrl ){
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
</style>
