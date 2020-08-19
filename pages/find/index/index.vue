<template>
	<view class="page-bottom">
		<!-- 菜单 -->
		<find-menu></find-menu>
		<!-- 一系类预报 -->
		<find-links></find-links>
		<!-- 证书 -->
		<find-content></find-content>
		<tyb-tarbar :currentIndex="1"></tyb-tarbar>
	</view>
</template>

<script>
	import tybTarbar from '@/pages/components/tarbar/index.vue'
	import findMenu from './components/menu.vue'
	import findLinks from './components/links.vue'
	import findContent from './components/content.vue'
	export default {
		components: {
			tybTarbar,
			findMenu,
			findLinks,
			findContent
		}
	}
</script>

<style>
</style>
