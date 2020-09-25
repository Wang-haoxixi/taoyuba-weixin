<template>
	<view class="list-layout-container">
		<template v-if="data.length">
			<slot></slot>
		</template>
		<template v-else>
			<view class="empty-container">
				<u-empty :text="emptyText" :mode="mode"></u-empty>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		props: {
			emptyText: {
				type: String,
				default: '数据为空'
			},
			mode: {
				type: String,
				default: 'list'
			},
			data: Array
		}
	}
</script>

<style scoped lang="scss">
	.list-layout-container {
		.empty-container {
			padding-top: 100rpx;
		}
	}
</style>
