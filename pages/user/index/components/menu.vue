<template>
	<view class="menu-wrapper">
		<u-cell-group>
			<u-cell-item v-for="(item, index) in menu" :title="item.label" :key="index" @click="onTo(item.path)"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		props: {
			// 105 船员 108 船东 
			type: {
				type: Number,
				default: 0
			}
		},
		data () {
			return {
				menu0: [
					{ label: '设置', path: '/pages/user/setting/index' }
				],
				menu105: [
					{ label: '简历管理', path: '/pages/release/resume/edit' },
					{ label: '我的培训', path: '' },
					{ label: '设置', path: '/pages/user/setting/index' },
				],
				menu108: [
					{ label: '我的合同', path: '/pages/user/contract/list/index' },
					{ label: '合同解除', path: '/pages/user/contract/terminat-list/index' },
					{ label: '我的评价', path: '' },
					{ label: '船员招聘', path: '/pages/user/recruit/list/index' },
					{ label: '设置', path: '/pages/user/setting/index' },
				]
			}
		},
		computed: {
			menu () {
				return this.type === 105 ? this.menu105 : (this.type === 108 ? this.menu108 : this.menu0)
			}
		},
		methods: {
			onTo (path) {
				if (path) {
					uni.navigateTo({
						url: path
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.menu-wrapper {
		margin-top: 110rpx;
	}
</style>
