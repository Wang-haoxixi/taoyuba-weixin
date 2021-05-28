<template>
	<view class="face-detail">
		<view>
			<u-image width="100%" height="400rpx" :src="imgUrl"></u-image>
			<view class="face-main">
				<view class="face-meetName">{{ info.meetName }}</view>
				<view class="face-time"><u-icon name="clock" size="28" color="#999999" style="margin-right: 10rpx"></u-icon>{{ info.meetStartTime || '暂无' }} - {{ info.meetEndTime || '暂无' }}</view>
				<view class="face-address">
					<view>
						<u-icon name="map" size="28" color="#999999" style="margin-right: 10rpx"></u-icon>
						{{ info.address }}
					</view>
				</view>
				<view v-if="!type">
					<view class="face-detail-time">签到时间: {{ info.signInTime || '暂无' }}</view>
					<view class="face-detail-time">签退时间: {{ info.signOutTime || '暂无' }}</view>
				</view>
			</view>
			<view class="face-meetName" style="padding: 30rpx 0">
				培训内容
			</view>
			<view>
				<u-parse :html="info.content"></u-parse>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		mixins: [],
		data () {
			return {
				imgUrl: `${this.$IMAGE_URL}/shipBanner.png`,
				info: {},
				type: '',
				arr: [],
			}
		},
		onLoad (option) {
			if( option.type ){
				this.type = option.type
				this.$http.get(`/tmlms/trainMeet/${option.id}`).then(({data})=>{
					this.info = data.data
					// this.info.list.forEach(res=>{
					// 	console.log(res)
					// 	if( res.status ){
					// 		this.arr.push(res.userType)
					// 	}
					// })
				})
			}else{
				this.$http.get(`/tmlms/trainMeetSign/${option.id}`).then(({data})=>{
					this.info = data.data
				})
			}
		},
		methods: {
		}
	}
</script>

<style scoped lang="scss">
	.face-detail {
		min-height: 100vh;
		background-color: white;
		padding: 0 30rpx;
	}
	.face-address {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #999999;
		font-weight: 300;
		view {
			width: 100%;
		}
	}
	.face-main {
		width: 100%;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #f6f6f6;
	}
	.face-meetName {
		font-size: 38rpx;
		padding-top: 30rpx;
	}
	.face-time {
		color: #999999;
		padding: 30rpx 0;
		font-weight: 300;
	}
	.face-detail-time {
		display: inline-block;
		color: #1864B1;
		margin-right: 20rpx;
		padding-top: 30rpx;
		font-size: 22rpx;
	}
</style>
