<template>
	<view class="">
		<scroll-view :scroll-x="true">
			<view class="menu-wrapper">
				<view class="item" v-for="(item, index) in menu" :key="index" @tap="onTo(item)" :class="(index + 1) === current ? 'active' : ''">
					<view class="ic-wrapper" :style="{background: item.color}">
						<u-icon :name="item.icon" size="40" color="#fff"></u-icon>
					</view>
					<view class="text">{{item.label}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				menu: [
					{ id: 1, type: 1, name: 'message', label: '系统', color: '#e9b174', icon: `${this.$IMAGE_URL}/home-kaoshi.png`, path: '/pages/message/list/index?type=1' },
					// { type: 2, label: '审核', color: '#e3797d', icon: `${this.$IMAGE_URL}/home-zhaopin.png`, path: '/pages/message/list/index?type=2' },
					{ id: 2, type: 2, name: 'message', label: '合同', color: '#77b4e3', icon: `${this.$IMAGE_URL}/home-kaoshi.png`, path: '/pages/message/list/index?type=3' },
					// { type: 4, label: '培训', color: '#8dc7af', icon: `${this.$IMAGE_URL}/home-peixunban.png`, path: '/pages/message/list/index?type=4' },
					// { type: 5, label: '考试', color: '#bfc78c', icon: `${this.$IMAGE_URL}/home-kaoshi.png`, path: '/pages/message/list/index?type=5' },
					{ id: 3, type: 9, name: 'message', label: '其他', color: '#8dc7af', icon: `${this.$IMAGE_URL}/home-kaoshi.png`, path: '/pages/message/list/index?type=6' },
					// { id: 4, type: 3, name: 'notification', label: '我的通报', color: '#bfc78c', icon: `${this.$IMAGE_URL}/home-kaoshi.png`, path: '/pages/message/list/index?type=3' },
					// { id: 5, label: '通报', name: 'notification', color: '#e9b174', icon: `${this.$IMAGE_URL}/home-kaoshi.png`, path: '/pages/message/notification/detail/index' },
				],
				type: 1,
				current: 1,
			}
		},
		methods: {
			onTo (row) {
				this.current = row.id
				this.type = row.type
				this.$emit('choose', row)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu-wrapper {
		display: flex;
		flex-wrap: nowrap;
		background-color: #fff;
		color: #666;
		padding: 20rpx 0;
		// width: 1200rpx;
		justify-content: space-between;
		.item {
			width: 200rpx;
			text-align: center;
			&.active {
				.text {
					color: $color-blue;
				}
			}
			.ic-wrapper {
				height: 90rpx;
				width: 90rpx;
				overflow: hidden;
				border-radius: 50%;
				text-align: center;
				line-height: 90rpx;
				justify-content: center;
				display: flex;
				align-items: center;
				margin: 0 auto;
			}
			.text {
				display: block;
				margin-top: 18rpx;
				font-size: 28rpx;
			}
		}
	}
</style>
