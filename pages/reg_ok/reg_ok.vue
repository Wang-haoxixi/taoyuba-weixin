<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="YmContent">
			<view class="main">
				<view class="tip">
					<image v-on:click="icon_19_click()"  src="https://img.taoyu58.com/upload/202109/143cf310-2b1b-44ad-a3a7-54ad44100c6d_reg_ok_19_19.jpg" mode="scaleToFill" border="0"    class="icon"></image>
					<text decode="true" class="reg_ok_20">提交成功</text>
				</view>
				<button v-on:click="btOk_27_click()" class="btOk">完成
				</button>
			</view>
		

		<view class="loading">{{loadingText}}</view>
		<view class="ymBbottom"></view>
	</view>
</template>

<script>
import reg_ok from "./reg_ok.js";
export default reg_ok;
</script>

<style lang="scss" scoped>
   @import './reg_ok.scss'
</style>