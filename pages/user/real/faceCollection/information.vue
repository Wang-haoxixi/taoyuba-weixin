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
				<u-form-item label="船名号" v-if="isQD"><u-input v-model="form.shipName" /></u-form-item>
				<u-form-item label="类型" right-icon="arrow-down-fill" v-if="isQD">
					<div @click="showTrue">{{ getTypeName(form.userType,true) }} {{ getTypeName(form.positionId) }}</div>
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
						<u-form-item label="船名号" v-if="isQD"><u-input v-model="form.shipName"/></u-form-item>
						<u-form-item label="类型" v-if="isQD">
							<div>{{ getTypeName(form.userType,true) }} {{ getTypeName(form.positionId) }}</div>
						</u-form-item>
					</u-form>
					<view style="padding: 20rpx" v-if="!isQD"> 注：{{ ispeo ? '此信息为本人信息' : '此信息为非本人信息' }} </view>
				</view>
			</view>
		</u-modal>
		<u-modal v-model="content" :content="content" @confirm="confirmSure"></u-modal>
	</view>
</template>

<script>
	export default {
		mixins: [],
		components: {
		},
		data () {
			return {
				arrForm: '',
				content: false,
				showSelect: false,
				// 判断是不是签到进来的 是的话 需要多做几步操作 根据isQD判断
				isQD: this.$cache.get('isQD'),
				ispeo: false,
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
						label: '船东',
						value: 0,
						children: [{
							label: '',
							value: 0,
						}]
					},{
						label: '职务船员',
						value: 1,
						children: this.$cache.get('dictMap')['tyb_resume_position']
					},{
						label: '家属',
						value: 2,
						children: [{
							label: '',
							value: 0,
						}]
					}
				]
			}
		},
		onShow () {
		},
		onLoad (option) {
		},
		onReady() {
			this.form = uni.getStorageSync('cardInformation')
			this.phoneSrc = uni.getStorageSync('phoneSrc')
			this.ispeo = uni.getStorageSync('openIdObj').realWxOpenid
			this.$set(this.form,'phone','')
			this.$refs.uForm.setRules(this.rules)
			this.$http.get(`/tmlms/crew/getShipByIdcard?idcard=${ this.form.idcard }`).then(({data})=>{
				this.form.shipName = data.data
			})
		},
		watch: {
		},
		methods: {
			sumbitOne () {
				if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.form.phone))){ 
					uni.showToast({
						icon: 'none',
						title: '请输入正确手机号!'
					}) 
					return false; 
				} 
				if( !this.form.shipName && this.isQD ){
					uni.showToast({
						icon: 'none',
						title: '渔船名称不能为空!'
					})
					return false
				}
				if( (!this.form.userType && this.form.userType !== 0) && this.isQD ){
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
				this.form = { ...this.form,...openIdObj,realName: this.form.name,gender: this.form.sex === '男' ? 1 : 2,birthday: insertStr(insertStr(this.form.birth,4,'-'),7,'-') }
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if( this.arrForm  ){
							let form = JSON.parse(JSON.stringify(this.form))
							form = { ...this.arrForm,...form }
							this.$http.post('/tmlms/trainMeetSign/signInOut',{ ...form,trainMeetId: uni.getStorageSync('trainMeetId'),signInImage: form.image }).then(d=>{
								if( d.data.code === 0 ){
									this.content = d.data.msg
								}else{
									uni.showToast({
										icon: 'none',
										title: d.data.msg
									})
									this.arrForm = form
								}
							})
						}else{
							console.log({
									...this.form,
									type: uni.getStorageSync('openIdObj').realWxOpenid ? 1 : 2,
									orgId :uni.getStorageSync('orgId')
								})
							this.$http.upload('/admin/gather/addUser', {
								filePath: uni.getStorageSync('phoneSrc'),
								name: 'file',
								formData: {
									...this.form,
									type: uni.getStorageSync('openIdObj').realWxOpenid ? 1 : 2,
									orgId :uni.getStorageSync('orgId')
								}
							}).then(({ data })=>{
								this.$getCode(data).then(res=>{
									if( this.isQD ){
										let form = JSON.parse(JSON.stringify(this.form))
										form = { ...res.data,...form }
										this.$http.post('/tmlms/trainMeetSign/signInOut',{ ...form,trainMeetId: uni.getStorageSync('trainMeetId'),signInImage: form.image }).then(d=>{
											if( d.data.code === 0 ){
												this.content = d.data.msg
											}else{
												uni.showToast({
													icon: 'none',
													title: d.data.msg
												})
												this.arrForm = form
											}
										})
									}else{
										uni.showToast({
											icon: 'none',
											title: '数据上传成功!'
										})
										setTimeout(()=>{
											uni.switchTab({
												url: '/pages/user/index/index'
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
			showTrue () {
				this.showSelect = true
			},
			// 打开选择
			confirmSelect (e) {
				this.$set(this.form,'userType',e[0].value)
				if( e[0].value === 1 ){
					this.$set(this.form,'positionId',e[1].value)
				}else{
					this.$set(this.form,'positionId','')
				}
			},
			confirmSure () {
				uni.switchTab({
					url: '/pages/user/index/index'
				})
			},
			// 获取名称
			getTypeName (val,status) {
				let data = ''
				if( status ){
					data = '请点击选择'
					this.list.forEach(res=>{
						if( res.value === val ){
							data = res.label
						}
					})
				}else{
					this.list[1].children.forEach(res=>{
						if( res.value === val ){
							data = res.label
						}
					})
				}
				return data
			}
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
