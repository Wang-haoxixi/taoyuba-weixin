<template>
	<view class="crew-detail-container safe-bottom">
		<view class="content">
			<view class="text"><text class="name">姓名：</text>{{data.realName}}</view>
			<view class="text"><text class="name">身份证号码：</text>{{data.idcard}}</view>
			<view class="text"><text class="name">民族：</text>{{data.nation}}</view>
			<view class="text"><text class="name">出生日期：</text>{{data.birthday}}</view>
			<view class="text"><text class="name">籍贯：</text>{{data.provinceId}}-{{data.cityId}}-{{data.districtId}}</view>
			<view class="text"><text class="name">地址：</text>{{data.address}}</view>
			<view class="text"><text class="name">联系电话：</text>{{data.phone}}</view>
			<view class="text"><text class="name">家庭联系人：</text>{{data.contactName}}</view>
			<view class="text"><text class="name">家庭联系电话：</text>{{data.contactPhone}}</view>
			<view class="text"><text class="name">现任职位：</text>{{positionIdLabel}}</view>
			<view class="text"><text class="name">用工状态：</text>{{workStatusLabel}}</view>
			<view class="text" v-if="data.photoFront">
				<text class="name">身份证照片：</text>
				<view class="img-wrapper" style="width: 600rpx;overflow: hidden;">
					<u-image width="100%" height="300" :src="data.photoFront" mode="heightFix"></u-image>
				</view>
			</view>
			<view class="text" v-if="data.facePhoto">
				<text class="name">人脸照：</text>
				<view class="img-wrapper" style="width: 600rpx;overflow: hidden;">
					<u-image width="100%"  height="300" :src="data.facePhoto" mode="heightFix"></u-image>
				</view>
			</view>
		</view>
		<view class="other" v-if="data.certList.length">
			<view class="title">船员职务登记证书</view>
			<view class="card-wrapper" v-for="item in data.certList" :key="item.certId">
				<view class="text" v-if="item.certNo"><text class="name">证书编码：</text>{{item.certNo}}</view>
				<view class="text" v-if="item.certType"><text class="name">证书类型：</text>{{getCertTypeLabel(item.certType)}}</view>
				<view class="text" v-if="item.certLevel"><text class="name">证书等级：</text>{{getCertLevelLabeL(item.certLevel)}}</view>
				<view class="text" v-if="item.certTitle"><text class="name">证书职务：</text>{{getCertTitleLabel(item.certTitle)}}</view>
				<view class="text" v-if="item.certDateIssue"><text class="name">证书起始--结束日期：</text>{{getTime(item.certDateIssue)}}-{{getTime(item.certDateExpire)}}</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import infoMixin from '@/pages/home/recruit/mixins/info.js'
	export default {
		mixins: [infoMixin],
		data () {
			return {
				data: {}
			}
		},
		onLoad (params) {
			if (params.idcard) {
				this.getList(params.idcard)
			}
		},
		computed: {
			workStatusLabel () {
				let dict = this.dictMap['workStatus'] || []
				return this.getDictLabel(this.data.workStatus, dict)
			},
			certTypeLabel () {
				let dict = this.dictMap['tyb_crew_cert_type'] || []
				return this.getDictLabel(this.data.certType, dict)
			}
		},
		methods: {
			getCertTypeLabel (value) {
				let dict = this.dictMap['tyb_crew_cert_type'] || []
				return this.getDictLabel(value, dict)
			},
			getCertLevelLabeL (value) {
				let dict = this.dictMap['certLevel'] || []
				return this.getDictLabel(value, dict)
			},
			getCertTitleLabel (value) {
				let dict = this.dictMap['tyb_crew_cert_title'] || []
				return this.getDictLabel(value, dict)
			},
			getTime (value) {
				if (value) {
					return value.split(' ')[0]
				}
				return ''
			},
			getList (idcard) {
				this.$http.get(`/tmlms/crew/getCrewByidcard`, {
					params: {
						idcard: idcard
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						this.data = data.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.crew-detail-container {
		.content {
			padding: 30rpx;
			background-color: #fff;
			.text {
				line-height: 2;
				font-size: 30rpx;
				color: #333;
				.name {
					color: #999;
				}
			}
		}
		.other {
			padding: 30rpx;
			margin-top: 20rpx;
			background-color: #fff;
			.title {
				font-size: 36rpx;
				padding-bottom: 20rpx;
				border-bottom: 1px solid #f6f6f6;
				color: #333;
			}
			.card-wrapper {
				line-height: 2;
				font-size: 30rpx;
				color: #333;
				padding: 30rpx 0;
				.name {
					color: #999;
				}
				border-bottom: 1px solid #f6f6f6;
			}
		}
	}
</style>
