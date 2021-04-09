<template>
	<view class="menu-wrapper">
		<view class="tip-wrapper" v-if="text">{{text}}</view>
		<u-cell-group>
			<u-cell-item v-for="(item, index) in menu" :title="item.label" v-if="item.show !== false" :key="index" @click="onTo(item.path)"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	import userInfoMixin from '@/pages/mixins/user-info.js'
	export default {
		mixins: [userInfoMixin],
		props: {
			role: Array,
			text: String,
			// 是否是船东持证人
			isShipOwer: Boolean
		},
		data () {
			return {
				menu0: [
					// { label: '我的合同', path: '/pages/user/contract/list/index' },
					{ label: '设置', path: '/pages/user/setting/index' }
				],
				menu105: [
					{ label: '简历管理', path: '/pages/release/resume/edit' },
					{ label: '我的合同', path: '/pages/user/contract/list/index' },
					{ label: '我的培训', path: '/pages/user/video/list/index' },
					{ label: '设置', path: '/pages/user/setting/index' },
				],
				menu115: [
					{ label: '一船一档查询', path: '/pages/user/search/index/index' },
					{ label: '设置', path: '/pages/user/setting/index' },
				],
				menu117: [
					{ label: '勘验报告', path: '/pages/user/report/index' },
					{ label: '专业性隐患排查', path: '/pages/user/danger/major/index' },
					{ label: '设置', path: '/pages/user/setting/index' },
				],
				arr: [4201,4221,4183,4193,4196],
			}
		},
		computed: {
			menu () {
				let value = uni.getStorageSync('userInfo')
				//他是渔船检验员的时候就直接给他菜单
				if( this.role.includes(this.rolesType.check.type) ){
					return this.menu117
				}
				return [
					{ label: '简历管理', path: '/pages/release/resume/edit', show: this.role.includes(this.rolesType.crew.type) },
					{ label: '我的合同', path: '/pages/user/contract/list/index', show: this.role.includes(this.rolesType.crew.type) },
					{ label: '我的培训', path: '/pages/user/video/list/index', show: true }, // this.role.includes(this.rolesType.crew.type)
					{ label: '我的渔船', path: '/pages/user/myship/index', show: this.role.includes(this.rolesType.shipowner.type) },
					{ label: '渔船交易', path: '/pages/user/myship/ship/index', show: this.arr.includes(value.userId) },
					// { label: '渔船交易', path: '/pages/user/myship/ship/index', show: true },
					{ label: '渔船登记', path: '/pages/release/ship/index?type=1', show: this.role.includes(this.rolesType.shipowner.type) && this.isShipOwer },
					{ label: '船员招聘', path: '/pages/user/recruit/list/index',  show: this.role.includes(this.rolesType.shipowner.type) },
					{ label: '一船一档', path: '/pages/user/ship/list/index', show: this.role.includes(this.rolesType.police.type) }, // this.roles.includes(this.rolesType.police.type)
					// { label: '勘验报告', path: '/pages/user/report/index' },
					{ label: '一般性隐患排查', path: '/pages/user/danger/common/index' },
					// { label: '专业性隐患排查', path: '/pages/user/danger/major/index' },
					{ label: '设置', path: '/pages/user/setting/index' },
				]
			},
			menu108 () {
				return [
					{ label: '我的渔船', path: '/pages/user/myship/index' },
					// { label: '合同解除', path: '/pages/user/contract/terminat-list/index' },
					// { label: '我的评价', path: '' },
					{ label: '渔船登记', path: '/pages/release/ship/index?type=1', show: this.isShipOwer },
					{ label: '船员招聘', path: '/pages/user/recruit/list/index' },
					{ label: '设置', path: '/pages/user/setting/index' },
				]
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
		.tip-wrapper {
			font-size: 28rpx;
			margin: 20rpx 0;
			padding: 20rpx 20rpx;
			color: #c7535a;
			background-color: #fff;
		}
	}
</style>
