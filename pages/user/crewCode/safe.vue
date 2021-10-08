<template>
	<view>
		<view class="head">
			<view style="display: flex;">
				<view class="avatar">
					<u-image width="150rpx" height="150rpx" shape="circle" :src="src"></u-image>
				</view>
				<view class="right">
					<view class="name">
						Hi,***
					</view>
					<view class="role">
						角色：职务船员
					</view>
					<view class="role">
						手机号：13333333333
					</view>
				</view>
			</view>
			<u-subsection :list="list" :current="0" active-color="#2979FF"></u-subsection>
			<view class="content" v-for="item in xlist">
				<view class="">
					<view class="title">
						驾驶类职务船员培训
					</view>
					<view class="time">
						驾驶时间：2020-08-08
					</view>
				</view>

				<view class="image">
					<u-icon v-if="item.status==2" size="30rpx" name="https://img.taoyu58.com/upload/202108/197c9af7-3bcd-4401-9202-4ac4c744bffb_证书.png"></u-icon>
					<view class="blue" v-if='item.status==1'>
						未完成
					</view>
					<view class="red" v-if='item.status==2'>
						已完成
					</view>
				</view>

			</view>
		</view>

		<!-- <view class="card">
			<view class="year">
				2021年
			</view>
			<view class="shadow">
				<view class="name">
					<u-tag text="上船" mode="dark" />
					</view>
					船名：浙普渔68102
				</view>
				<view class="bottom">
					<view class="book">
						职务证书：普通船员
					</view>
					<view class="book">
						来源：合同
					</view>
					<view class="right">
						2021-03-02
					</view>
				</view>
			</view>
		</view> -->
	</view>


</template>

<script>
	export default {
		data() {
			return {
				status: "正常",
				time: "2021-08-11 12:00:00",
				src: 'https://cdn.uviewui.com/uview/example/fade.jpg',
				list: [{
						name: '未完成'
					},
					{
						name: '已完成'
					},
					{
						name: '全部'
					}
				],
				xlist: [{
						name: '未完成',
						status: 1
					},
					{
						name: '已完成',
						status: 2
					}
				],
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #E9F3FF;
	}


	.head {

		margin: 32rpx;
		border-radius: 22rpx;
		width: 686rpx;
		background-color: white;
		padding-bottom: 45rpx;

		.avatar {
			padding: 64rpx 64rpx;
		}
	}

	.right {
		padding-top: 64rpx;

		.name {
			font-weight: 700;
			letter-spacing: 3rpx;
			padding-bottom: 10rpx;
		}

		.role {
			padding-top: 12rpx;
			font-size: 24rpx;
			font-weight: 400;
			letter-spacing: 3rpx;
			color: #9F9F9F;
		}
	}

	.content {
		width: 686rpx;
		padding: 32rpx;
		display: flex;
		position: relative;
		align-content: center;
		border-bottom: 1rpx solid #F2F2F2;

		.time {
			font-size: 22rpx;
			color: #9F9F9F;
			margin-top: 16rpx;
		}

		.title {
			letter-spacing: 5rpx;
			font-size: 28rpx;
			font-weight: 500;
		}

		.image {
			top: 50%;
			transform: translate(-50%, -50%);
			position: absolute;
			right: 32rpx;
			display: flex;
			flex-flow: column;
			align-items: center;
			justify-content: center;

			.blue {
				color: #2979FF;
			}

			.red {
				color: #EE2D32;
			}
		}
	}
</style>
