<template>
	<view class="sales-code">
		<view class="sales-back">
			<view class="orderCode">
				交易码: {{ shipDetail.orderCode || '需卖方共有人全部同意后生成!' }}
			</view>
			<view class="sales-code-h" v-if="show">
				<painter
				    @imgOK="onImgOk"
				    @imgErr="onImgErr"
				    :palette="json"
				/>
			</view>
			<view class="sales-button">
				<u-button @click="setImg">保存到相册</u-button>
				<u-button open-type="share">分享</u-button>
			</view>
		</view>
	</view>
</template>

<script>
import uQRCode from '@/common/utils/uqrcode.js'
import temeple from './components/temeple.js'
	export default {
		components: {
		},
		mixins: [ temeple ],
		data () {
			return {
				shipDetail: {},
				url: '',
				show: false,
			}
		},
		onShareAppMessage() {
			return {
				title: '出售信息',
				path: 'pages/pages/user/myship/ship/shipDetail',
				imageUrl: this.url
			}
		},
		onLoad (option) {
			uni.showLoading()
			this.$http.get(`/tmlms/tyb_order/getById?id=${option.id}`).then(({data})=>{
				this.$getCode(data).then(res=>{
					this.shipDetail = res.data
					// 改变二维码的携带参数
					this.json.views[1].content = `http://testpc.taoyu58.com:6888?id=${option.id}`
					this.json.views[4].text = this.shipDetail.shipName
					this.json.views[5].text = this.shipDetail.tybOrderCertificateHolder.name
					this.show = true
					uni.hideLoading()
				})
			})
		},
		methods: {
			onImgOk(e) {
				this.url = e.detail.path
			},
			onImgErr() {},
			setImg () {
				uni.saveImageToPhotosAlbum({
					filePath: this.url,
					success: function() {
						uni.showToast({
							title: "保存成功",
							icon: "none"
						});
					},
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.orderCode {
		padding-bottom: 40rpx;
	}
	.sales-code {
		background: white;
		padding: 30rpx;
		min-height: 100vh;
		box-sizing: border-box;
		padding-top: 50rpx;
	}
	.sumbit-button {
		margin-top: 30rpx;
	}
	.sales-back {
		width: 700rpx;
	}
	.sales-code-h {
		text-align: center;
		painter {
			display: flex;
			justify-content: center;
		}
	}
	.sales-button {
		display: flex;
		justify-content: space-around;
		width: 700rpx;
		margin: 0 auto;
		background: rgba(242, 242, 242, 1);
		padding: 0 30rpx 30rpx;
		::v-deep .u-size-default {
			background-color: rgba(255, 114, 114, 1)!important;
			color:white!important;
		}
	}
</style>
