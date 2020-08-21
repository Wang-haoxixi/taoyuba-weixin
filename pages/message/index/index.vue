<template>
	<view class="page-bottom">
		<!-- 菜单 -->
		<message-menu></message-menu>
		<!-- 系统消息 -->
		<message-list title="最新系统消息" :list="data1"></message-list>
		<!-- 审核消息 -->
		<message-list title="最新系统消息" :list="data1"></message-list>
		<!-- 合同消息 -->
		<message-list title="最新合同消息" :list="data1"></message-list>
		<!-- 培训消息 -->
		<message-list title="最新培训消息" :list="data1"></message-list>
		<!-- 考试消息 -->
		<message-list title="最新考试消息" :list="data1"></message-list>
		<!-- 其他消息 -->
		<message-list title="最新其他消息" :list="data1"></message-list>
		<tyb-tarbar :current-index="3"></tyb-tarbar>
	</view>
</template>

<script>
	import tybTarbar from '@/pages/components/tarbar/index.vue'
	import messageList from './components/list.vue'
	import messageMenu from './components/menu.vue'
	export default {
		components: {
			tybTarbar,
			messageMenu,
			messageList
		},
		data () {
			return {
				data1: [
					{ id: 1, content: '您的申请已通过您的申请已通过您的申请已通过', time: '2019.01.01' },
					{ id: 2, content: '您的申请已通过', time: '2019.01.01', dot: true },
					{ id: 3, content: '您的申请已通过', time: '2019.01.01' },
					{ id: 4, content: '您的申请已通过', time: '2019.01.01' },
				]
			}
		}
	}
</script>

<style>
</style>
