<template>
	<view class="sales-boss" v-if="audito">
		<view v-if="!showModel">
			<u-form :model="form" ref="uForm" label-width="220">
				<u-form-item label="交易金额(元)"><u-input v-model="form.sellPrice" :disabled="true"/></u-form-item>
				<u-form-item label="渔船名"><u-input v-model="form.shipName" :disabled="true"/></u-form-item>
				<u-form-item label="渔船编号"><u-input v-model="form.shipNo" :disabled="true"/></u-form-item>
				<u-form-item label="捕捞许可证编号"><u-input v-model="form.licensesFishingNo" :disabled="true"/></u-form-item>
				<!-- <u-form-item label="渔船所有权登记证书"><u-input v-model="form.licensesOwnerShip" :disabled="true"/></u-form-item> -->
				<u-form-item label="国籍证书编号"><u-input v-model="form.licensesNationalNo" :disabled="true"/></u-form-item>
				<!-- <u-form-item label="船舶检验证书编号"><u-input v-model="form.licensesInspectionNo" :disabled="true"/></u-form-item> -->
				<u-form-item label="主机总功率(千瓦)"><u-input v-model="form.engineTotalPower" :disabled="true"/></u-form-item>
				<u-form-item label="主机功率(千瓦)"><u-input v-model="form.mainEnginePower" :disabled="true"/></u-form-item>
				<u-form-item label="双控功率(千瓦)"><u-input v-model="form.dualPower" :disabled="true"/></u-form-item>
	<!-- 		<u-form-item label="主机型号"><u-input v-model="form.grossTonnage" /></u-form-item>
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
				<u-form-item label="造船厂"><u-input v-model="form.buildFactory" /></u-form-item> -->
			</u-form>
			<!-- 卖手发起人的时候 可以查看买受人的进度 -->
			<template v-if="form.orderUserRole === '4'">
				<view class="agree-button agree-content" v-for="(item,index) in listBuy" :key="index">
					<view class="agree-name">
						<view>{{ item.name }} {{ arrType[Number(item.type)] }}</view>
						<view>联系电话: {{ item.phone }}</view>
						<view>身份证号: {{ item.idCard }}</view>
					</view>
					<view :class="item.agreeState === '1' ? 'agree-gr' : item.agreeState === '0' ? 'agree-re' :'agree-df'" v-if="item.isEffective === '1'">
						{{ item.agreeState === '1' ? '同意' : item.agreeState === '0' ? '反对' :'未操作' }}
					</view>
					<view class="agree-yes" v-else>
						<u-button size="mini" @click="sureBuy(item.id)">确认为买受人</u-button>
					</view>
				</view>
			</template>
			<!-- 出售合伙人可以进行同意和拒绝 -->
			<view class="agree-button" v-if="(form.orderUserRole !== '2') && !form.agreeState && form.sellState !== '8'">
				<u-button type="success" size="medium" @click="agree(1)">同意</u-button>
				<u-button type="error" size="medium" @click="agree(0)">拒绝</u-button>
				<u-button type="primary" size="medium" @click="sureBuy('')" :disabled="form.canAgree === '1'" v-if="form.orderUserRole === '4'">{{ form.canAgree === '1' ? '已确认买入人' : '确认买入人'}}</u-button>
			</view>
			<!-- 同意或者拒绝后的状态 -->
			<view v-if="form.orderUserRole !== '2' && form.agreeState" class="agree-button">
				<u-button :type=" form.agreeState === '1' ? 'success' : 'error' "> {{ form.agreeState === '1' ? '您已同意' : '您已拒绝' }} </u-button>
				<u-button type="primary" size="medium" @click="sureBuy('')" :disabled="form.canAgree === '1'" v-if="form.orderUserRole === '4'">{{ form.canAgree === '1' ? '已确认买入人' : '确认买入人'}}</u-button>
			</view>
			<!-- 持证人可以看所有人的记录 -->
			<view class="agree-button" v-if="form.orderUserRole === '2'">
				<u-button :type="active ? 'primary' : ''" @click="selectType(1)" size="medium">出售方进度</u-button>
				<u-button :type="!active ? 'primary' : ''" @click="selectType(0)" size="medium">买受方进度</u-button>
			</view>
			<template v-if="form.orderUserRole === '2'">
				<view class="agree-button agree-content" v-for="(item,index) in list" :key="index">
					<view class="agree-name">
						<view>{{ item.name }} {{ arrType[Number(item.type)] }}</view>
						<view>联系电话: {{ item.phone }}</view>
						<view>身份证号: {{ item.idCard }}</view>
					</view>
					<view :class="item.agreeState === '1' ? 'agree-gr' : item.agreeState === '0' ? 'agree-re' :'agree-df'">
						{{ item.agreeState === '1' ? '同意' : item.agreeState === '0' ? '反对' :'未操作' }}
					</view>
				</view>
			</template>
			<!-- 确认提示窗 -->
			<u-modal v-model="show" :content="`此操作将确认${ agreeVal ? '' : '不' }同意`" @confirm="confirmAg" @cancel="show = false" :show-cancel-button="true"></u-modal>
			<u-modal v-model="showSure" :content="agreeVal ? `此操作将确认该用户为买方合伙人,是否确定!` : `此操作将确认所有买方合伙人,是否确定!`" @confirm="confirmSure" @cancel="showSure = false" :show-cancel-button="true"></u-modal>
		</view>
		<view v-else class="agree-input">
			<u-message-input mode="bottomLine" :breathe="true" :maxlength="6" :disabled-keyboard="true" :value="value"></u-message-input>
			<u-keyboard ref="uKeyboard" mode="number" v-model="showModel" :mask="false" @change="keyboard" :cancel-btn="false" @backspace="backspace" @confirm="confirmCode"></u-keyboard>
		</view>
	</view>
	<view class="sales-boss sales-loading" v-else>
		<view style="text-align: center;">
			<u-icon name="error-circle-fill"></u-icon>
			<view>正在审核中!</view>
		</view>
	</view>
</template>

<script>
	import dictMap from '@/pages/mixins/dictMap.js'
	import { isLogin } from '@/common/utils/login.js'
	export default {
		components: {
		},
		mixins: [ dictMap ],
		data () {
			return {
				dictMapList: this.$cache.get('dictMap'),
				form: {},
				params: 0,
				active: 1,
				show: false,
				agreeVal: 0,
				showModel: false,
				value: '',
				audito: true,
				list: [],
				listBuy: [],
				arrType: ['管理员','持证人','卖方共有人','买方发起人','买方合伙人'],
				showSure: false,
				isBuy: false
			}
		},
		onLoad (option) {
			// 判断是从哪里进来的 一般是扫码 有的时候是自己进来
			if( option.isBuy ){
				this.isBuy = true
			}
			this.params = this.getQueryParams(option.q).id || option.id
			// 判断是否登录 没登录去登录
			isLogin().then(data => {
				if (data) {
					this.getList()
				} else {
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					})
					setTimeout(res=>{
						uni.navigateTo({
							url: `/pages/base/login?id=${this.params}`
						})
					},1000)
				}
			})
		},
		methods: {
			// 获取扫码进来的连接的参数
			getQueryParams (queryString) {
			    // 微信扫码得到的内容进行了一次编码，所以官方要求需要进行decodeURIComponent一次
			    queryString = decodeURIComponent(queryString)
			    let params = {}
			    if (queryString) {
			      let queryArray = queryString.split('?')
			      if (queryArray.length > 1) {
			        let query = queryArray[1]
			        let array = query.split('&')
			        array.map((value) => {
			          let valueArray = value.split('=') 
			          if (valueArray.length > 1) {
			            // 还需要对value进行解码（可能涉及到在value为中文字符，在赋值到二维码前进行encodeURI编码）
			            Object.assign(params, { [valueArray[0]]: decodeURI(valueArray[1]) })
			          }
			        })
			      }
			    }
			    return params
			},
			// 打开窗口
			agree (val) {
				this.agreeVal = val
				this.show = true
			},
			// 点击确认
			confirmAg () {
				this.$http.post('/tmlms/tyb_order_agree/agree',{ id: this.params,agreeState: this.agreeVal }).then(({data})=>{
					this.$getCode(data).then(res=>{
						this.show = false
						this.getList()
					})
				})
			},
			getList (code) {
				uni.showLoading({
					icon: 'none'
				})
				this.$http.get(`/tmlms/tyb_order/getById?id=${this.params}&code=${code || ''}`).then(({data})=>{
					uni.hideLoading({
						icon: 'none'
					})
					if( data.code === 0 ){
						if( this.isBuy ){
							uni.navigateTo({
								url: `/pages/user/myship/ship/saleCode?id=${this.params}`
							})
						}
						this.form = data.data
						this.active = 1
						this.list = this.form.sellers
						this.listBuy = this.form.buyers
						this.showModel = false
					}else{
						uni.showToast({
							icon: 'none',
							title: data.msg
						})
						// 根据中文判断
						if( data.msg === '请先进行实名认证'){
							setTimeout(res=>{
								uni.switchTab({
									url: '/pages/user/index/index'
								})
							},2000)
						}else if( data.msg === '请输入交易码' || data.msg === '交易码错误' ) {
							if( !this.showModel ){
								this.showModel = true
							}
						}else if(data.msg === '您是购买方,出售方未全部同意出售,无法查看此条信息' || data.msg === '此交易购买人员已经全部确认完毕,您无法查看') {
							setTimeout(res=>{
								uni.switchTab({
									url: '/pages/user/index/index'
								})
							},2000)
						}else if(data.msg === '需要您的购买发起人授权您查看信息'){
							this.audito = false
						}
					}
				})
			},
			keyboard (val) {
				if(this.value.length < 6){
					this.value += val
				}
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if(this.value.length) this.value = this.value.substr(0, this.value.length - 1);
			},
			confirmCode () {
				this.getList(this.value)
			},
			// 切换TAB
			selectType (val) {
				this.active = val
				if(val){
					this.list = this.form.sellers
				}else{
					this.list = this.form.buyers
				}
			},
			// 确定为买受人弹窗
			sureBuy (id) {
				this.agreeVal = id
				this.showSure = true
			},
			confirmSure () {
				if( this.agreeVal ){
					this.$http.get(`/tmlms/tyb_order_participant/buy_agree/${this.agreeVal}`).then(({data})=>{
						this.$getCode(data).then(res=>{
							this.showSure = false
							this.getList()
						})
					})
				}else{
					this.$http.get(`/tmlms/tyb_order/buyer_ready/${this.form.id}`).then(({data})=>{
						this.$getCode(data).then(res=>{
							this.showSure = false
							this.getList()
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sales-boss {
		background: white;
		padding: 30rpx;
		min-height: 100vh;
		.agree-content {
			padding: 30rpx;
			border: 1px solid rgba($color: #ccc, $alpha: 0.4);
			justify-content: space-between;
			font-size: 26rpx;
		}
		.agree-input {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.sumbit-button {
		margin-top: 30rpx;
	}
	.agree-button {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 50rpx 0;
		::v-deep .u-size-medium {
			padding: 0 40rpx;
		}
	}
	.agree-name {
		view {
			margin: 15rpx 0;
			color: #808080;
		}
	}
	.agree-gr {
		color: $color-green;
	}
	.agree-re {
		color: $color-red;
	}
	.agree-de {
		color: $bg-page;
	}
	.sales-loading {
		display: flex;
		justify-content: center;
		padding-top: 80rpx;
		font-size: 50rpx;
		::v-deep .u-icon {
			font-size: 60px;
			color: $color-red;
		}
	}
</style>
