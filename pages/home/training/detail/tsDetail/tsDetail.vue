<template>
	<view>
		<view class="detail-card">
			<view class="name-sex">
				<view class="name">
					<view class="title">
						{{ detail.teacherName }}
					</view>
					<view class="position">
						{{ detail.title }}  ·  {{ detail.major }}
					</view>
				</view>
				<view class="sex">
					{{ detail.teacherName.substring(0,1) }}
				</view>
			</view>
			<view class="tags">
				<text class="tag-item" v-for="(item,index) in detail.teachType.split('、')" :key='index'>
					{{ item }}
				</text>
			</view>
			<view class="" style="padding: 32rpx 0;color: #333333;font-size: 32rpx;font-weight: 500;">
				个人信息
			</view>
			<view class="item-info">
				<view class="left">
					性别
				</view>
				<view class="right">
					{{ detail.gender == 1 ? '男' : '女' }}
				</view>
			</view>
			<view class="item-info">
				<view class="left">
					教龄
				</view>
				<view class="right">
					{{ detail.teachAge }}
				</view>
			</view>
			<view class="item-info">
				<view class="left">
					出生年月
				</view>
				<view class="right">
					{{ detail.birthdayStr }}
				</view>
			</view>
			<view class="item-info">
				<view class="left">
					最高学历
				</view>
				<view class="right">
					{{ detail.education }}
				</view>
			</view>
			<view class="item-info">
				<view class="left">
					毕业院校
				</view>
				<view class="right">
					{{ detail.school }}
				</view>
			</view>
			<view class="item-info">
				<view class="left">
					船上服务
				</view>
				<view class="right">
					{{ detail.shipAge }}
				</view>
			</view>
			<view class="item-info">
				<view class="left">
					其他证书
				</view>
				<view class="right">
					{{ detail.otherCertificate ? detail.otherCertificate : '无' }}
				</view>
			</view>
			<view class="item-info">
				<view class="left">
					教师资格证编号
				</view>
				<view class="right">
					{{ detail.certificateNo }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				detail:''
			};
		},
		onLoad(opt) {
			this.id = opt.id
			this.getDetail(this.id)
		},
		methods: {
			getDetail(id) {
				this.$http.get(`tmlms/tybTeacherTeam/${id}`).then(res => {
					console.log(123, res)
					this.detail = res.data.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail-card{
		margin: 24rpx;
		padding: 24rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		.name-sex{
			margin-bottom: 32rpx;
			display: flex;
			justify-content: space-between;
			.name{
				width: 440rpx;
				height: 120rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.title{
					font-size: 36rpx;
					font-weight: 500;
				}
				.position{
					color: #666666;
					font-size: 28rpx;
					font-weight: 400;
				}
			}
			.sex{
				width: 112rpx;
				height: 112rpx;
				border-radius: 100%;
				background-color: #E8F1FE;
				color: #1F79F4;
				font-size: 36rpx;
				font-weight: 500;
				text-align: center;
				line-height: 112rpx;
			}
		}
		.tags{
			display: flex;
			flex-wrap: wrap;
			padding-bottom: 16rpx;
			border-bottom: 2rpx solid rgba(237, 237, 237, .5);
			.tag-item{
				margin-right: 16rpx;
				margin-bottom: 16rpx;
				border-radius: 4rpx;
				background: rgba(31, 121, 244, 0.26);
				font-size: 20rpx;
				padding: 4rpx 16rpx;
				color: #1F79F4;
			}
		}
		.item-info{
			margin-bottom: 32rpx;
			display: flex;
			.left{
				width: 232rpx;
				color: #666666;
				font-size: 28rpx;
			}
			.right{
				flex: 1;
				color: #333333;
				font-size: 28rpx;
			}
		}
	}
</style>
