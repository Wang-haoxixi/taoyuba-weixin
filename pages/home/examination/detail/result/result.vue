<template>
	<view class="content">
		<view :style="{ height: systemInfo.statusBarHeight + 'px' }"></view>
		<view class="title"
			:style="{height:menuButton.height +(menuButton.bottom -systemInfo.statusBarHeight -menuButton.height) *2 +'px',width:systemInfo.safeArea.width -(systemInfo.safeArea.width - menuButton.left) +'px',lineHeight: menuButton.height + 'px',}">
			<view class="titleInfo">
				<image :src="`${imgUrl}/icon-arrowleft.png`" style="width: 44rpx;height: 44rpx;margin-left: 20rpx;" @tap="goBack()"></image>
				<view class="titleInfoText">
					考试结果
				</view>
			</view>
		</view>
		<view class="wrap">
			<view class="wrapTitle">
				请再接再厉，努力加油哦～
			</view>
			<view class="examInfo">
				<view class="examInfoItem">
					<view class="examInfoItemTitle">课程</view>
					<view class="examInfoItemInfo">{{data.kind?data.kind:''}}</view>
				</view>
				<view class="examInfoItem">
					<view class="examInfoItemTitle">考试类型</view>
					<view class="examInfoItemInfo">{{data.level?data.level:''}}</view>
				</view>
				<view class="examInfoItem">
					<view class="examInfoItemTitle">考试时间</view>
					<view class="examInfoItemInfo">{{createTime?createTime:''}}</view>
				</view>
				<view class="examInfoItem">
					<view class="examInfoItemTitle">考试分数</view>
					<view class="examInfoItemInfo" style="display: flex;align-items: center;">
						<view style="margin-right: 8rpx;">{{data.score?data.score:'0'}}分</view>
						<view style="color: #FD6565;" v-if="data.result == '不及格'">{{data.result?data.result:''}}</view>
						<view style="color: #2DC9C3;" v-else>{{data.result?data.result:''}}</view>
					</view>
				</view>
				<view class="examInfoItem">
					<view class="examInfoItemTitle">考试用时</view>
					<view class="examInfoItemInfo">{{getAnswerTime(data.alreadyAnswerTime)}}</view>
				</view>
				<view class="examInfoItem">
					<view class="examInfoItemTitle">错误题数</view>
					<view class="examInfoItemInfo" v-if="data.totalType">{{data.totalType.badTotal}}/{{data.totalType.end}}</view>
				</view>
			</view>
		</view>
		<view class="bottomBtn">
			<view class="bottom-view">
				<view class="checkExam" @tap="goBack">
					查看考卷
				</view>
				<view class="backList" @tap="backToList">
					返回首页
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				examId:'',
				data:{},
				imgUrl:this.$IMAGE_URL,
				systemInfo: '',
				menuButton: '',
				timeLabel:'考试结果',
				createTime:''
			};
		},
		onLoad(options) {
			this.examId = options.examId
			this.createTime = options.createTime
			this.menuButton = uni.getMenuButtonBoundingClientRect();
			this.systemInfo = uni.getSystemInfoSync();
			this.getScore()
		},
		methods:{
			getScore() {
				this.$http.get('/tmlms/exam_answer/check_paper/'+this.examId).then(({ data }) => {
					if (data.code === 0) {
						this.data = data.data
					}
				})
			},
			goBack(){
				uni.navigateBack()
			},
			backToList(){
				uni.reLaunch({
					url:'/pages/home/examination/list/index'
				})
			},
			getTime (t) {
				let format = {
					h: '00',
					m: '00',
					s: '00',
				}
				if (t > 0) {
					let h = Math.floor((t / 3600))
					let m = Math.floor((t / 60) % 60)
					let s = Math.floor(t % 60)
					format.h = h < 10 ? '0' + h : h
					format.m = m < 10 ? '0' + m : m
					format.s = s < 10 ? '0' + s : s
				}
				return format
			},
			getAnswerTime(time){
				let answerTime = parseInt(time)
				let format ={
					h: '00',
					m: '00',
					s: '00',
				}
				if (answerTime) {
					let h = Math.floor((answerTime / 3600))
					console.log('h',h)
					let m = Math.floor((answerTime / 60) % 60)
					console.log('m',m)
					let s = Math.floor(answerTime % 60)
					console.log('s',s)
					format.h = h < 10 ? '0' + h : h
					format.m = m < 10 ? '0' + m : m
					format.s = s < 10 ? '0' + s : s
				}
				return format.h +':' + format.m +':'+format.s
			}
		}
	}
</script>

<style lang="scss">
	.bottomBtn{
		position: fixed;
		bottom: 0;
		box-shadow: 0 -4rpx 6rpx rgba(174, 191, 211, 0.13);
		width: 750rpx;
		background-color: #FFFFFF;
		/* iphonex 等安全区设置，底部安全区适配 */
		/* #ifndef APP-NVUE */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
			
		/* #endif */
		.bottom-view{
			padding: 16rpx 32rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.checkExam{
				width: 324rpx;
				height: 80rpx;
				color: #FFFFFF;
				font-size: 28rpx;
				line-height: 80rpx;
				font-weight: bold;
				background-color: #1F79F4;
				border-radius: 60rpx;
				text-align: center;
			}
			.backList{
				width: 324rpx;
				height: 80rpx;
				color: #1F79F4;
				font-size: 28rpx;
				line-height: 80rpx;
				font-weight: bold;
				border: 1px solid #1F79F4;
				border-radius: 60rpx;
				text-align: center;
			}
		}
	}
	.wrap{
		display: flex;
		flex-direction: column;
		align-items: center;
		.wrapTitle{
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: bold;
			line-height: 44rpx;
			margin-top: 314rpx;
			margin-bottom: 60rpx;
		}
		.examInfo{
			width: 686rpx;
			padding: 16rpx 0;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			box-shadow: 0px 0px 16rpx rgba(0, 0, 0, 0.1);
			.examInfoItem{
				display: flex;
				align-items: center;
				padding:20rpx 30rpx;
				font-size: 28rpx;
				line-height: 40rpx;
				.examInfoItemTitle{
					width: 112rpx;
					color:#999999;
					margin-right: 34rpx;
				}
				.examInfoItemInfo{
					flex: 1;
					min-width: 0;
					color:#333333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
.content{
	height: 100vh;
	background: url('#{$img-url}/examBg.png') no-repeat;
	background-size: 100% 750rpx;
}
.title{
	display: flex;
	align-items: center;
}
.titleInfo{
	display: flex;
	align-items: center;
	.titleInfoText{
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
		margin-left: 248rpx;
	}
}
</style>
