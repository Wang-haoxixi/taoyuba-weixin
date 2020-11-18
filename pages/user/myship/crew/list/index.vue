<template>
	<!-- 船员 -->
	<view class="user-my-ship-crew-list-container safe-bottom">
		<list-layout :data="data" empty-text="暂无数据">
			<view class="my-ship-crew-list-wrapper">
				<u-card :show-head="false" box-shadow="0px 0px 5px #d7d7d7" v-for="item in data" :key="item.id">
					<view class="item" slot="body">
						<view class="title">{{item.realName}}</view>
						<view class="text">
							<text>{{getPositionIdLabel(item.positionId)}}</text>
							<text>{{item.phone}}</text>
						</view>
						<view class="text">{{item.idcard}}</view>
						<view class="text">用工状态：{{getWorkStatusLabel(item.workStatus)}}</view>
					</view>
				</u-card>
			</view>
			<u-loadmore :status="status" bg-color="tranparent"/>
		</list-layout>
	</view>
</template>

<script>
	import pageMixin from '@/pages/mixins/page.js'
	import infoMixin from '@/pages/home/recruit/mixins/info.js'
	export default {
		mixins: [pageMixin, infoMixin],
		data () {
			return {
				status: 'loadmore',
				data: [],
				id: '',
			}
		},
		onReachBottom() {
			if (this.page.total > this.page.current * this.page.size) {
				this.status = 'loading'
				this.page.current++
				this.getList()
			} else{
				this.status = 'nomore'
			}
		},
		onPullDownRefresh () {
			this.data = []
			this.page.current = 1
			this.getList()
		},
		onLoad (params) {
			this.id = params.id
			this.getList()
		},
		methods: {
			getWorkStatusLabel (val) {
				let dict = this.dictMap['workStatus'] || []
				return this.getDictLabel(val, dict)
			},
			getPositionIdLabel (val) {
				let dict = this.dictMap['tyb_resume_position'] || []
				return this.getDictLabel(val, dict)
			},
			getList () {
				this.$http.get('/tybship/tybshipcrew/page', {
					params: {
						size: this.page.size,
						current: this.page.current,
						shipId: this.id,
					}
				}).then(({ data }) => {
					if (data.code === 0) {
						let result = data.data
						this.data = this.data.concat(result.records)
						this.page.total = result.total
						if (this.page.total <= this.page.size) {
							this.status = 'nomore'
						}
					}
					uni.stopPullDownRefresh()
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-my-ship-crew-list-container {
		.my-ship-crew-list-wrapper {
			.item {
				.title {
					font-size: 32rpx;
					color: #333;
				}
				.text {
					font-size: 28rpx;
					color: #999;
					margin-top: 15rpx;
				}	
			}
		}
	}
</style>
