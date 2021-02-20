<template>
	<view class="repore-container user-contract-container safe-padding-bottom">
		<page-info ref="pageInfo" v-model="form" @next="onStep" v-show="current === 1" @get-ship="getShipInfo"></page-info>
		<page-certificate ref="pageCertificate" v-model="form" v-show="current === 2" @next="onStep" @prev="onStep"></page-certificate>
		<page-ship ref="pageShip" v-model="form" v-show="current === 3" @next="onStep" @prev="onStep"></page-ship>
		<page-equipment ref="pageEquipment" v-model="form" v-show="current === 4" @prev="onStep" @submit="onSubmit"></page-equipment>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import pageInfo from './component/info.vue'
	import pageCertificate from './component/certificate.vue'
	import pageShip from './component/ship.vue'
	import pageEquipment from './component/equipment.vue'
	export default {
		components: {
			pageInfo,
			pageCertificate,
			pageShip,
			pageEquipment
		},
		data () {
			return {
				current: 1,
				form: {},
				status: 'create'
			}
		},
		methods: {
			onStep (index) {
				uni.pageScrollTo({
		　　　　　　duration: 0,//过渡时间必须为0，uniapp bug，否则运行到手机会报错
		　　　　　　scrollTop: 0,//滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
		　　　　})
				this.current = index
			},
			getReult (value) {
				return value ? value.split(',') : []
			},
			getList (shipName) {
				if (!shipName) {
					return
				}
				this.$http.get('/tmlms/investigationReport/page', {
					params: {
						shipName
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						this.status = data.data.records.length === 0 ? 'create' : 'update'
						if (this.status === 'update') {
							let form = data.data.records[0]
							form = this.setForm(form)
							this.form = form
						}
					}
					// console.log('getList', data)
				})
			},
			setForm (form) {
				// 证书部分
				let arr1 = ['fishLicenceImage', 'ownershipRegistrationImage', 'nationalityRegistrationImage', 'fishVesselImage']
				// 船体部分
				let arr2 = ['shipBoardImage', 'shellPlatImage', 'deckImage', 'fishFacilityImage', 'superstructureImage', 'pilothouseImage', 'pilotDeckImage', 'monkeyIslandImage', 'sternCharacteristicsImage', 'shipBreadthImage', 'shipSizeImage', 'kitchenImage', 'crewCabinImage', 'wallDoorImage']
				// 船舶主要设备
				let arr3 = ['shipMarkImage', 'dynamoImage', 'electricBoxImage', 'gearBoxImage', 'oilEquipmentImage', 'residualOilTank', 'dirtyOilTank']
				let arr = arr1.concat(arr2).concat(arr3)
				arr.forEach(name => {
					form[name] = this.getReult(form[name])
				})
				return form
			},
			onSubmit () {
				let obj1 = this.$refs.pageInfo.form
				let obj2 = this.$refs.pageCertificate.form
				let obj3 = this.$refs.pageShip.form
				let obj4 = this.$refs.pageEquipment.form
				let obj = Object.assign(obj1, obj2, obj3, obj4)
					
				for (let key in obj) {
					if (Array.isArray(obj[key])) {
						obj[key] = obj[key].join(',')
					}
				}
				console.log('结果', obj)
				obj.id = this.form.id ? this.form.id : undefined
				let type = this.status === 'create' ? 'save' : 'update'
				this.$http.post(`/tmlms/investigationReport/${type}`, obj).then(({ data }) => {
					if (data.data) {
						let title = this.status === 'create' ? '保存成功' : '更新成功'
						this.$refs.uToast.show({
							title: title,
							duration: 1000,
							callback: () => {
								uni.switchTab({
									url: '/pages/user/index/index'
								})
							}
						})
					} else {
						let title = this.status === 'create' ? '保存失败' : '更新失败'
						this.$refs.uToast.show({
							title: title
						})
					}
				})
			},
			getShipInfo (data) {
				this.getList(data.shipName)
			}
		}
	}
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	.repore-container {
		background-color: #fff;
	}
</style>
