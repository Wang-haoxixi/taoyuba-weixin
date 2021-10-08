<template>
	<view>
		<u-picker v-model="show" mode="selector" :range="range" range-key="shipName" @confirm="confirm"></u-picker>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="topBox">
			<u-field @blur="change" v-model="shipName" label="船名号" placeholder="请填写船名号" input-align="right" right-icon="arrow-right">
			</u-field>
			<view class="field">
			</view>
			<u-field v-model="shipowner" label="船东姓名" placeholder="请填写船东姓名" input-align="right" right-icon="arrow-right">
			</u-field>
			<view class="field">
			</view>
			<u-field v-model="phone" label="联系电话" placeholder="请填写联系电话" input-align="right" right-icon="arrow-right">
			</u-field>
		</view>
		<view class="topBox">
			<u-cell-group>
				<u-cell-item title="普通船员" :arrow="false">
					<u-number-box v-model="normalQuantity" slot="right-icon"></u-number-box>
				</u-cell-item>
				<u-cell-item title="轮机类" :arrow="false">
					<u-number-box v-model="engineQuantity" slot="right-icon"></u-number-box>
				</u-cell-item>
				<u-cell-item title="驾驶类" :arrow="false">
					<u-number-box v-model="driverQuantity" slot="right-icon"></u-number-box>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view class="bottom">
			<view class="bottom-view">
				<u-button type="primary" @click="submit">立即招人</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				normalQuantity: 0,
				engineQuantity: 0,
				driverQuantity: 0,
				phone: "",
				shipName: "",
				shipowner: "",
				range:[],
				show:false
			}
		},
		methods: {
			confirm(e){
				this.shipName=this.range[e[0]].shipName
				this.shipowner = this.range[e[0]].shipowner,
				this.phone = this.range[e[0]].mobile
				this.shipId = this.range[e[0]].shipId
			},
			change() {
				this.find()
			},
			find() {
				this.$http.get('/tmlms/tybship/allPage?orgId=36&shipName=' + this.shipName, {

				}).then(({
					data
				}) => {
					if(data.data.total==0){
						this.shipName=''
						this.$refs.uTips.show({
							title: '无此渔船信息',
							type: 'error'		
						}) 
					}else if(data.data.total==1){
						this.shipName=data.data.records[0].shipName
						this.shipowner = data.data.records[0].shipowner,
						this.phone = data.data.records[0].mobile
						this.shipId = data.data.records[0].shipId
						this.range=data.data.records
						// this.show=true
					}else if(data.data.total>1){
						this.range=data.data.records
						this.show=true
					}
					// this.shipowner = data.data.shipowner,
					// this.phone = data.data.mobile
					// this.shipId = data.data.shipId
				})
			},
			submit() {
				if(!this.phone){
					this.$refs.uTips.show({
						title: '请填写联系电话',
						type: 'error'
					})
					return
				}
				if(!this.shipowner){
					this.$refs.uTips.show({
						title: '请填写船东姓名',
						type: 'error'
					})
					return
				}
				if(this.shipId&&this.mobile&&this.shipowner){
					
			
				this.$http.post('/tmlms/shipownerRecruit/create', {
					normalQuantity: this.normalQuantity,
					engineQuantity: this.engineQuantity,
					driverQuantity: this.driverQuantity,
					phone: this.phone,
					shipName: this.shipName,
					shipowner: this.shipowner,
					shipId: this.shipId
				}).then(({
					data
				}) => {
					if (data.msg == 'success') {
						this.$refs.uTips.show({
							title: '提交成功',
							type: 'success'
						})
						uni.reLaunch({
						    url: '/pages/reg_ok/reg_ok'
						});
					}else{
						this.$refs.uTips.show({
							title: '提交失败',
							type: 'error'
						
						})
					}
				})
				}else{
					this.$refs.uTips.show({
						title: '无此渔船信息，请填写正确的渔船号',
						type: 'error'
					})
					return
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F9F9F9;
	}

	.u-field {
		height: 112rpx !important;
		line-height: 72rpx !important;
	}

	.field {
		height: 22rpx;
	}

	.topBox {
		width: 686rpx;
		margin: 32rpx;
		// height: 373rpx;
		background: #FFFFFF;
	}

	.bottom {
		box-shadow: 0 -4rpx 6rpx rgba(174, 191, 211, 0.13);
		width: 750rpx;
		position: fixed;
		bottom: 0rpx;
		background-color: #FFFFFF;
		/* iphonex 等安全区设置，底部安全区适配 */
		/* #ifndef APP-NVUE */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		/* #endif */
		.bottom-view {
			padding: 32rpx;
		}
	}
</style>
