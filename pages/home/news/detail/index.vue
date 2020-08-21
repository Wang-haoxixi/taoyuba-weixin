<template>
	<view class="news-detail-wrapper phonex-mb">
		<view class="header-wrapper">
			<image  class="img" src="https://cdn.uviewui.com/uview/swiper/3.jpg"></image>
			<view class="title">广西壮族自治区渔业绿色发展</view>
			<view class="time">2019.10.20</view>
		</view>
		<view class="content-wrapper">
			<u-parse :html="content"></u-parse>
			
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				content: `
					<p style="line-height: 1.5;">2019年4月17日贵港市政府副市长徐育东、副秘书长陈日勇，农业农村局党组书记、水产畜牧兽医局局长潘展雄以及相关区县的分管县区长等一行12人，在湖州市农业农村局副局长陶忠华，市水产技术推广站站长周志金，南浔区农业农村局副局长吴豪，农业农村局水产站站长张超的陪同下，参观考察菱湖渔业绿色发展。</p>
					<p style="line-height: 1.5;">徐育东一行来到勤劳村现代渔业示范园区，张超详细介绍渔业园区的总体规划、“跑道养鱼”建设的基本情况、经济效益。</p>
					<p style="line-height: 1.5;">随后参观了菱湖镇卢介庄村养殖尾水处理示范点，菱湖镇渔业协会，周志金详细介绍了养殖尾水治理的情况、技术、长效管理机制以及通过养殖尾水处理技术，大大改善了水质，减少了病害的发生，提高了生态环境，推动了现代渔业转型升级和绿色发展初步取得的效果。在参观了菱湖渔业协会快速检测中心、鱼病防治中心、先进养殖模式馆、标本展览馆后，吴豪副局长介绍了菱湖镇渔业协会的组织框架布局功能、作用等基本情况。</p>
					<p style="line-height: 1.5;">徐育东副市长一行又来到庆渔堂农业科技公司，了解智慧渔业的相关情况。</p>
					<p style="line-height: 1.5;">陶忠华副局长详细介绍了湖州市渔业发展特别是近年来湖州市政府把渔业作为产业振兴、农民增收致富、渔业绿色发展的重中之重工作，出台了一系列政策，并取得了一定的成效，打造成为全国水产养殖绿色发展的榜样。</p>
					<p style="line-height: 1.5;">徐育东副市长对湖州市的渔业工作充分肯定，值得各地学习，要求贵港市下辖的各区县加强与湖州的沟通，借鉴湖州的经验，努力提升贵港市的渔业绿色发展。</p>
				`
			}
		},
		onLoad (params) {
			console.log('params', params)
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	.news-detail-wrapper {
		padding: 0 30rpx;
		.header-wrapper {
			padding: 30rpx 0;
			border-bottom: 1px solid #f6f6f6;
			.img {
				width: 100%;
			}
			.title {
				padding: 20rpx 0 20rpx;
				font-size: 36rpx;
				color: #666;
			}
			.time {
				font-size: 28rpx;
				color: #999;
				text-align: right;
			}
		}
		.content-wrapper {
			margin: 30rpx 0;
			font-size: 28rpx;
			line-height: 1.5;
			color: #666;
		}
	}
</style>
