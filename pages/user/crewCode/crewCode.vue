<template>
	<view class="content">
		<view class="head">
			<view class="name">
				姓名:<view class="name-real">船老大</view>
			</view>
			<view class="name">
				身份证:<view class="name-real">3333333333333</view>
			</view>
		</view>
		<view class="card">
			<view class="head">
				{{title}}
			</view>
			<view class="time">
				<view class="">
					更新时间：
				</view>
				<view class="real">
					{{time}}
				</view>
			</view>
			<canvas canvas-id="qrcode" id="qrcode" v-if="showCan" />
			<u-line color="info" class="u-line" border-style="dashed" length="624rpx" />
			<view class="bottom">
				<view class="left">
					行程码
				</view>
				<view class="right">
					相关信息
				</view>
			</view>
		</view>
		<view class="table">
			<u-grid :col="3" :border="false"	>
				<u-grid-item v-for="(item, index) in menu" @click="goTo(item.url)">
					<u-icon :name="item.img" :size="88"></u-icon>
					<view class="grid-text">{{item.name}}</view>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	import CODE from '@uni-plugs/uni-code';
	export default {
		data() {
			return {
				menu: [{
						img: "https://img.taoyu58.com/upload/202108/35c69034-cbee-470b-a4ad-3630db108742_base.png",
						name: "基本信息",
						url: "/pages/user/crewCode/certificate"
					},
					{
						img: "https://img.taoyu58.com/upload/202108/9eb35465-39f4-4e24-9733-ff9200c43294_112.png",
						name: "证书情况",
						url: "/pages/user/crewCode/card"
					},
					{
						img: "https://img.taoyu58.com/upload/202108/b3f93d68-2f7d-41c9-86fd-f730459bc3a0_1234.png",
						name: "履历情况",
						url: "/pages/user/crewCode/resume"
					},
					{
						img: "https://img.taoyu58.com/upload/202109/b031b872-e857-484c-8d17-08b1bdc63275_未标题-4.png",
						name: "合同情况",
						url: "/pages/user/crewCode/contract"
					},
					{
						img: "https://img.taoyu58.com/upload/202108/2fd0f3ce-f314-46d2-8799-fe4c49c03759_144.png",
						name: "保险情况",
						url: "/pages/user/crewCode/Insurance"
					},
					{
						img: "https://img.taoyu58.com/upload/202109/a98fefb7-68f2-411c-8b42-ef35229efc0d_safe.png",
						name: "安全教育",
						url: "/pages/user/crewCode/safe"
					}
				],
				showCan: true,
				userInfo: this.$cache.get('userInfo') || {},
				title: "此码符合从业规定",
				time: "2021-08-11 12:00:00",
				config: {
					bar: {
						id: 'barcode', // canvas 的canvas-id
						color: '#000', // 条形码的颜色
						bgColor: '#FFFFFF', // 背景色
						width: 670, // 宽度
						height: 100 // 高度
					},
					qrc: {
						id: 'qrcode', // canvas的canvas-id
						size: 460, // 二维码大小
						level: 3, //等级 0～4
						bgColor: '#FFFFFF', //二维码背景色 默认白色
						// border: {
						// 	color: ['#8A2387', '#F27121'], //边框颜色支持渐变色
						// 	lineWidth: 6, //边框宽度
						// },
						// img: '/static/logo.png', //图片
						// iconSize: 40, //二维码图标的大小
						color: ['#11998e', '#38ef7d'], //边框颜色支持渐变色
					}
				}
			}
		},
		methods: {
			findCan() {
				//条形码
				// CODE.BarCode({
				// 	...this.config.bar,
				// 	code: this.code
				// });
				CODE.QRCode({
					...this.config.qrc,
					code: "https://qr.dingtalk.com/action/joingroup?code=v1,k1,XocI5IDYmBRTQK5vhDPeZlPBLpe9ugvzp2pYK4Uv2fY=&_dt_no_comment=1&origin=11"
				}, this);
			},
			goTo(path) {
				console.log(path)
				if (path) {
					uni.navigateTo({
						url: path
					});
				}
			}
		},
		onReady() {

		},
		onShow() {
			this.findCan()
			console.log(this.userInfo)
			// if (Object.keys(this.userInfo).length === 0) {
			// 	this.getUserInfo().then(() => {
			// 		this.init()
			// 	})
			// } else {
			// 	this.init()
			// }
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #016EFF;
	}

	.u-line {
		margin-top: 65rpx;
	}

	.content {
		.table {
			background-color: white;
			border-radius: 22rpx;
			width: 686rpx;
			height: 460rpx;
			margin-top: 32rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			// flex-flow: column;
			.grid-text {
				margin-top: 20rpx;
			}
		}

		.card {
			position: relative;
			background-color: white;
			border-radius: 22rpx;
			width: 686rpx;
			height: 760rpx;
			display: flex;
			// justify-content: center;
			align-items: center;
			flex-flow: column;

			.head {
				color: #5AAB71;
				margin-top: 70rpx;
				font-size: 35rpx;
				font-weight: 1000;
				letter-spacing: 5rpx
			}

			.time {
				margin-top: 32rpx;
				color: #016EFF;
				display: flex;
				font-weight: 700;
line-height: 22rpx;
				.real {
					margin-left: 16rpx;
				}
			}

			.bottom {
				position: absolute;
				bottom: 32rpx;
				display: flex;
				color: #016EFF;
				font-weight: 600;

				.left {
					width: 300rpx;
					text-align: center;
				}

				.right {
					width: 300rpx;
					text-align: center;

				}
			}
		}

		background-color: #016EFF;
		/* display: flex;
	align-items: center;
	justify-content: center; */
		margin: 32rpx;

		.head {
			.name {
				line-height: 34rpx;
				display: flex;
				color: white;
				margin-bottom: 32rpx;

				.name-real {
					line-height: 34rpx;
					margin-left: 16rpx;
					font-size: 34rpx;
					font-weight: 500;
				}
			}
		}
	}

	#qrcode {
		width: 360rpx;
		height: 360rpx;
		margin-top: 50rpx;
		display: flex;
		background-color: #fff;
		flex-direction: column;
		justify-content: center;
		/*水平方向居中*/
	}
</style>
