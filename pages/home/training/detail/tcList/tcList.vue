<template>
	<view>
		<view class="container-warp">
			<view class="tc-item" v-for="(item,index) in data" :key='index' @tap='tsDetail(item)'>
				<view class="l">
					<view class="org">
						{{ item.teacherName.substring(0,1) }}
					</view>
					<view class="info">
						<view class="name">
							{{ item.teacherName }}
						</view>
						<view class="job">
							{{ item.title }} · {{ item.major }}
						</view>
						<view class="sex-age">
							<view class="sex">
								{{ item.gender == 1 ? '男' : '女' }}
							</view>
							<view class="age">
								{{ $tools.jsGetAge(item.birthdayStr) }}岁
							</view>
						</view>
					</view>
				</view>
				<view class="r">
					<image :src="`${imgUrl}/icon-arrowright-t.png`" style="width: 16rpx;height: 44rpx;"></image>
				</view>
			</view>
			<view class="" style="padding: 20rpx 0;">
				<u-loadmore :status="status" />
			</view>
		</view>
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	export default {
		mixins: [pageMixin],
		data() {
			return {
				data: [],
				imgUrl: this.$IMAGE_URL,
				status: 'loadmore',
			};
		},
		onLoad() {
			this.getTcList()
		},
		onReachBottom() {
			console.log('触底..')
			if (this.page.total > this.page.current * this.page.size) {
				this.status = 'loading'
				this.page.current++
				this.getTcList()
			} else {
				this.status = 'nomore'
			}
		},
		methods: {
			getTcList() {
				this.$http.get(`/tmlms/tybTeacherTeam/page`, {
					params: {
						size: this.page.size,
						current: this.page.current,
					}
				}).then(({
					data
				}) => {
					console.log('dara..', data)
					let result = data.data
					this.data = this.data.concat(result.records)
					this.page.total = result.total
					if (this.page.total <= this.page.size) {
						this.status = 'nomore'
					}
					if (this.page.total === this.data.length) {
						this.status = 'nomore'
					}
				})
			},
			tsDetail(item){
				console.log(item)
				uni.navigateTo({
				    url: '/pages/home/training/detail/tsDetail/tsDetail?id=' + item.id
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.container-warp {
		margin: 24rpx;
		background-color: #FFFFFF;
		padding: 0rpx 32rpx 0 22rpx;
		border-radius: 16rpx;

		.tc-item {
			padding-top: 30rpx;
			padding-bottom: 24rpx;
			border-bottom: 2rpx solid rgba(237, 237, 237, .5);
			display: flex;

			.l {
				flex: 1;
				display: flex;

				.org {
					width: 112rpx;
					height: 112rpx;
					border-radius: 50%;
					background-color: #E8F1FE;
					color: #1F79F4;
					font: 500 36rpx PingFang SC;
					text-align: center;
					line-height: 112rpx;
					margin-right: 20rpx;
				}

				.info {
					.name {
						font: 500 32rpx PingFang SC;
					}

					.job {
						font: 400 28rpx PingFang SC;
						color: #666666;
						margin: 12rpx 0 16rpx;
					}

					.sex-age {
						color: #999999;
						font: 500 20rpx PingFang SC;
						display: flex;

						>view {
							padding: 6rpx 16rpx;
							background-color: #F9F9F9;
							border-radius: 8rpx;
						}

						.sex {
							margin-right: 16rpx;
						}
					}
				}
			}

			.r {
				width: 32rpx;
				align-self: center;
			}
		}
	}
</style>
