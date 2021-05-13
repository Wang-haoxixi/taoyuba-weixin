<template>
	<view class="id-boss">
		<u-image height="250rpx" :src="imgUrlHeader"></u-image>
		<view class="page-base">
			<u-form :model="form" ref="uForm" :error-type="errorType" label-width="150">
				<u-form-item label="姓名" prop="name"><u-input v-model="form.name" :disabled="true"/></u-form-item>
				<u-form-item label="性别" prop="sex"><u-input v-model="form.sex" :disabled="true"/></u-form-item>
				<u-form-item label="身份证" prop="idcard"><u-input v-model="form.idcard" :disabled="true"/></u-form-item>
				<u-form-item label="联系地址" prop="address"><u-input v-model="form.address" :disabled="true"/></u-form-item>
				<u-form-item label="手机号" prop="phone"><u-input v-model="form.phone" /></u-form-item>
				<u-form-item label="民族" prop="nation"><u-input v-model="form.nation" :disabled="true"/></u-form-item>
				<u-form-item label="类型" right-icon="arrow-down-fill" v-if="isQD && collectionType === 1">
					<div @click="showTrue('showSelect')">{{ getTypeName(form.positionId,'list') }}</div>
				</u-form-item>
			</u-form>
			<u-select v-model="showSelect" :list="list" mode="mutil-column-auto" :default-value="[0,0]" @confirm="confirmSelect"></u-select>
			<u-button @click="sumbitOne" type="primary">{{ isQD ? '保存并签到' : '保存' }}</u-button>
		</view>
		<u-modal v-model="show" @confirm="sumbit" :show-cancel-button="true" :show-title="false" >
			<view class="slot-content">
				<view class="page-base page-base-nomargin">
					<u-image :src="phoneSrc" height="250rpx" width="250rpx" shape="circle"></u-image>
					<u-form :model="form" ref="uForm" :error-type="errorType" label-width="150">
						<u-form-item label="姓名" prop="name"><u-input v-model="form.name" :disabled="true"/></u-form-item>
						<u-form-item label="性别" prop="sex"><u-input v-model="form.sex" :disabled="true"/></u-form-item>
						<u-form-item label="身份证" prop="idcard"><u-input v-model="form.idcard" :disabled="true"/></u-form-item>
						<u-form-item label="联系地址" prop="address"><u-input v-model="form.address" :disabled="true"/></u-form-item>
						<u-form-item label="手机号" prop="phone"><u-input v-model="form.phone" :disabled="true"/></u-form-item>
						<u-form-item label="民族" prop="nation"><u-input v-model="form.nation" :disabled="true"/></u-form-item>
						<u-form-item label="类型" v-if="isQD && collectionType === 1">
							<div>{{ getTypeName(form.positionId,'list') }}</div>
						</u-form-item>
					</u-form>
				</view>
			</view>
		</u-modal>
		<u-modal v-model="iscontent" :content="content" @confirm="confirmSure"></u-modal>
		<!-- <u-select v-model="shipSelect" :list="listType" @confirm="confirmSelectShip"></u-select> -->
		<u-modal v-model="isSure" :content="isSureContent" @confirm="sumbitSure" :show-cancel-button="true"></u-modal>
	</view>
</template>

<script>
	export default {
		mixins: [],
		components: {
		},
		data () {
			return {
				iscontent: false,
				isSure: false,
				isSureContent: '',
				arrForm: '',
				content: false,
				showSelect: false,
				shipSelect: false,
				// 判断是不是签到进来的 是的话 需要多做几步操作 根据isQD判断
				isQD: this.$cache.get('isQD'),
				errorType: ['message','toast'],
				phoneSrc: '',
				show: false,
				form: {
					name: '',
					idcard: '',
					address: '',
					phone: '',
					sex: '',
					nation: ''
				},
				name: '',
				imgUrlHeader: `${this.$IMAGE_URL}/release-bg.png`,
				rules: {
					name: [
						{ 
							required: true, 
							message: '请输入姓名', 
							trigger: ['change','blur'],
						}
					],
					idcard: [
						{ 
							required: true, 
							message: '请输入身份证', 
							trigger: ['change','blur'],
						}
					],
					sex: [
						{ 
							required: true, 
							message: '请输入性别', 
							trigger: ['change','blur'],
						}
					],
					address: [
						{ 
							required: true, 
							message: '请输入联系地址', 
							trigger: ['change','blur'],
						}
					],
					phone: [
						{ 
							required: true, 
							message: '请输入手机', 
							trigger: ['change','blur'],
						}
					],
					nation: [
						{ 
							required: true, 
							message: '请输入民族', 
							trigger: ['change','blur'],
						}
					],
				},
				list: [
					{
						label: '驾驶',
						value: '1'
					},
					{
						label: '轮机',
						value: '2'
					}
				],
				isName: true,
				listType: [],
				collectionType: 0
			}
		},
		onShow () {
		},
		onLoad (option) {
			// this.name = this.organizationTypeList[uni.getStorageSync('orgId')]
		},
		onReady() {
			this.form = uni.getStorageSync('cardInformation')
			this.phoneSrc = uni.getStorageSync('phoneSrc')
			this.$set(this.form,'phone','')
			this.$refs.uForm.setRules(this.rules)
			this.collectionType = uni.getStorageSync('collectionType')
		},
		watch: {
		},
		methods: {
			// 获取名称
			getTypeName (val,name) {
				if( !val ){
					return '请点击选择'
				}
				let data = ''
				data = '请点击选择'
				this[name].forEach(res=>{
					if( res.value === val ){
						data = res.label
					}
				})
				return data
			},
			sumbitOne () {
				if(!(/^1\d{10}$/.test(this.form.phone))){ 
					uni.showToast({
						icon: 'none',
						title: '请输入正确手机号!'
					}) 
					return false; 
				}
				if( (!this.form.positionId && this.form.positionId !== 0) && this.isQD && uni.getStorageSync('collectionType') === 1){
					uni.showToast({
						icon: 'none',
						title: '请选择类型!'
					})
					return false
				}
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.show = true
					} else {
						console.log('验证失败');
					}
				});
			},
			// 提交信息
			sumbit () {
				// 后端个老禽兽  给我19971106要我给1997-11-06 名字也不对应 我只能一个一个赋值 name-realName sex-gender birth-birthday
				function insertStr(soure, start, newStr){   
				   return soure.slice(0, start) + newStr + soure.slice(start);
				}
				let openIdObj = uni.getStorageSync('openIdObj')
				this.form = { ...this.form,...openIdObj,realName: this.form.name,gender: this.form.sex === '男' ? 1 : 2,birthday: insertStr(insertStr(this.form.birth,4,'-'),7,'-'), idcardPhoto: this.form.facePhoto }
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if( this.arrForm  ){
							this.idQd()
						}else{
							this.$http.upload('/admin/gather/addUser', {
								filePath: uni.getStorageSync('phoneSrc'),
								name: 'file',
								formData: {
									...this.form,
									type: uni.getStorageSync('collectionType'),
									orgId :uni.getStorageSync('orgId')
								}
							}).then(({ data })=>{
								console.log(data)
								this.arrForm = data.data
								this.$getCode(data).then(res=>{
									if( this.isQD ){
										this.idQd()
									}else{
										uni.showToast({
											icon: 'none',
											title: '数据上传成功!'
										})
										setTimeout(()=>{
											uni.switchTab({
												url: '/pages/home/index/index'
											})
										},1000)
									}
								})
							}).catch(({ data })=>{
								uni.showToast({
									icon: 'none',
									title: data.msg,
									duration: 2500
								})
							})
						}
					} else {
						console.log('验证失败');
					}
				});
			},
			showTrue (name) {
				this[name] = true
			},
			// 打开选择
			confirmSelect (e) {
				this.$set(this.form,'positionId',e[0].value)
			},
			confirmSure () {
				uni.switchTab({
					url: '/pages/home/index/index'
				})
			},
			qd () {
				let form = JSON.parse(JSON.stringify(this.form))
				form = { ...this.arrForm,...form }
				form.userType = form.gatherType
				// form.shipName = `${form.shipNamePrefix}${form.shipNameSuffix}`
				this.$http.post('/tmlms/trainMeetSign/signInOut',{ ...form,orgId: uni.getStorageSync('orgId'),trainMeetId: uni.getStorageSync('trainMeetId'),signInImage: form.image,type: uni.getStorageSync('sign') }).then(d=>{
					if( d.data.code === 0 ){
						this.content = d.data.msg
						this.iscontent = true
					}else{
						uni.showToast({
							icon: 'none',
							title: d.data.msg
						})
					}
				})
			},
			idQd () {
				// let form = JSON.parse(JSON.stringify(this.form))
				// this.$http.post(`/tmlms/trainMeetSign/getSignStatus?idcard=${form.idcard}&trainMeetId=${uni.getStorageSync('trainMeetId')}&positionId=${form.positionId}`).then(({data})=>{
				// 	this.$getCode(data).then(res=>{
				// 		let data = ['您还未签到,是否签到？','您已签到,是否签退？','您已签退,是否重新签退？','您已超时未签到,是否签退？','会议已结束','会议未开始','会议未结束,是否提前签退？']
				// 		this.isSureContent = data[res.data]
				// 		this.isSure = true
				// 	})
				// })
				this.sumbitSure()
			},
			// 签到
			sumbitSure () {
				// if( this.isSureContent === '会议已结束' ||  this.isSureContent === '会议未开始'){
				// 	this.isSure = false
				// }else{
					this.qd()
				// }
			},
		}
	}
</script>

<style lang="scss" scoped>
.id-boss {
	.page-base {
		::v-deep .u-form{
			margin: 50rpx 0;
		}
		::v-deep .u-btn{
			margin: 50rpx 0;
		}
	}
	.page-base-nomargin {
		::v-deep .u-form{
			margin: 0;
		}
		::v-deep .u-btn{
			margin: 0;
		}
		::v-deep .u-form-item {
			padding: 0;
		}
		::v-deep .u-image{
			margin: 20rpx auto;
		}
	}
}
</style>
