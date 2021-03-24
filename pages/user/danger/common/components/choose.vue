<template>
	<view class="choose-danger-wrapper">
		<view class="title">排查要点：{{title}}</view>
		<view class="current-wrapper">
			<view class="sub-title">排查记录：</view>
			<view class="form-radio">
				<u-radio-group v-model="form.flag" @change="onChange">
					<u-radio
						v-for="(item, index) in isNot"
						:key="index"
						:name="item.value"
					>
						{{item.label}}
					</u-radio>
				</u-radio-group>
			</view>
			<view v-show="showUploadImg" class="sub-title">照片：</view>
			<view v-show="showUploadImg">
				<choose-img @close="onClose" @open="onOpen" v-model="form.url" status="update" @get-img="getImg" @delete-img="deleteImg"></choose-img>
			</view>
			<view v-if="showUploadImg">
				<u-form :label-position="'top'" :model="form">
					<u-form-item label="不合格原因：">
						<u-input v-model="form.reason" :type="'textarea'"  :auto-height="true" :maxlength="200" @blur="reasonChange"/>
					</u-form-item>
				</u-form>
			</view>
		</view>
		<view class="history-wrapper" v-if="showHistory">
			<view class="history-title sub-title">历史记录</view>
			<view class="history-content-wrapper">
				<view class="sub-title">
					排查记录：
					<view class="text" :class="historyData.flag === 0 ? 'error' : (historyData.flag === 1 ? 'success' : '')" >{{historyData.flag === 0 ? '不合格' : (historyData.flag === 1 ? '合格' : '')}}</view>
				</view>
				<view class="sub-title" v-show="showHistoryUploadImg">照片：</view>
				<view v-show="showHistoryUploadImg">
					<choose-img @close="onClose" @open="onOpen" status="detail" v-model="imgs"></choose-img>
				</view>
				<view v-show="historyData.flag === 0" class="sub-title">不合格原因：{{ historyData.reason || '' }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import chooseImg from './chooseImg.vue'
	export default {
		components: {
			chooseImg
		},
		props: {
			historyData: Object,
			title: String
		},
		data () {
			return {
				imgs: [],
				showHistory: false,
				showUploadImg: false,
				showHistoryUploadImg: false,
				isNot: [
					{ label: '合格', value: 1 },
					{ label: '不合格', value: 0 }
				],
				form: {
					flag: 2,
					url: [],
					reason: ''
				},
			}
		},
		watch: {
			historyData: {
				handler (newVal) {
					if (newVal && Object.keys(newVal).length > 0) {
						if(newVal.flag === 1) {
							this.showHistory = true
						} else {
							this.showHistory = true
						}
						if (newVal.url && newVal.url) {
							this.imgs = newVal.url.split(',')
							this.showHistoryUploadImg = true
						}
					} else {
						this.showHistory = false
					}
					
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			deleteImg (index) {
				this.form.url.splice(index, 1)
				this.$emit('input', this.form)
			},
			getImg (data) {
				// let obj = Object.assign({}, this.value)
				// obj.url = obj.imgUrl[].split(',') || []
				this.form.url = this.form.url.concat(data)
				let form = Object.assign({}, this.form)
				// form.url = form.url.join(',')
				this.$emit('input', form)
				// obj.imgUrl = obj.url.join(',')
			},
			onClose () {
				this.$emit('close')
			},
			onOpen () {
				this.$emit('open')
			},
			onChange (val) {
				let historyData = this.historyData
				if (historyData && Object.keys(historyData).length > 0 && historyData.flag === 0) {
					this.showUploadImg = true
					this.form.url = []
					let form = Object.assign({}, this.form)
					this.$emit('input', form)
				} else {
					if (val === 1) {
						this.showUploadImg = false
						this.form.url = []
						let form = Object.assign({}, this.form)
						this.$emit('input', form)
					} else{
						this.showUploadImg = true
						let form = Object.assign({}, this.form)
						this.$emit('input', form)
					}
				}
			},
			// 变化
			reasonChange () {
				let form = Object.assign({}, this.form)
				this.$emit('input', form)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.choose-danger-wrapper {
		.title {
			font-size: 30rpx;
			color: #333;
			margin-top: 20rpx;
		}
		.history-wrapper {
			margin-top: 20rpx;
			padding: 30rpx 30rpx;
			border: 1px solid #f6f6f6;
			background-color: #f6f6f6;
			overflow: hidden;
			border-radius: 10rpx;
			.history-title {
				margin-top: 0;
				color: #666;
				font-weight: 700;
			}
			.success {
				color: #19be6b;
			}
			.error {
				color: #FF0000;
			}
			.text {
				display: inline-block;
			}
		}
		.current-wrapper {
			margin-top: 20rpx;
		}
		.sub-title {
			margin: 20rpx 0;
			font-size: 30rpx;
			color: #333;
		}
	}
</style>
