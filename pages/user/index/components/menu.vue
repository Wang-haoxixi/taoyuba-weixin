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
			// 1 船员 2 船东 3 培训机构
			type: {
				type: Number,
				default: 1
			}
		},
		data () {
			return {
				menu1: [
					{ label: '简历管理', path: '/pages/user/resume/list/index' },
					// { label: '发送的简历', path: '' },
					// { label: '我的报名', path: '' },
					{ label: '我的培训', path: '' },
					// { label: '我要签到', path: '' },
					// { label: '我的办证', path: '' },
					{ label: '我的合同', path: '' },
					{ label: '合同解除', path: '' },
					{ label: '我的评价', path: '' },
					// { label: '教材订购', path: '' },
					// { label: '我的订单', path: '' }
				],
				menu2: [
					{ label: '招聘管理', path: '' },
					{ label: '收到的简历', path: '' },
					{ label: '禁渔期工作管理', path: '' },
					{ label: '收到的简历（禁渔期）', path: '' }
				],
				menu3: [
					{ label: '培训开班', path: '' },
					{ label: '培训报名', path: '' },
					{ label: '签到记录', path: '' }
				]
			}
		},
		computed: {
			menu () {
				return this.type === 1 ? this.menu1 : (this.type === 2 ? this.menu2 : (this.type === 3 ? this.menu3 : []))
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
