<template>
	<!-- 船体部分 -->
	<view class="certificate-wrapper">
		<view class="title">
			二、船体部分
		</view>
		<view class="item" v-for="(item, index) in options" :key="item.label">
			<view class="item-title">{{index + 1}}.{{item.title}}</view>
			<view class="">
				<choose-img
					@get-imgs="(img) => { getImgs(img, item.label) }" 
					v-model="form[item.label]"></choose-img>
			</view>
		</view>
		<view class="btn-next">
			<u-button @click="onPrev">上一步</u-button>
			<u-button @click="onNext">下一步</u-button>
		</view>
	</view>
</template>

<script>
	import chooseImg from './chooseImg.vue'
	import imgMixin from './img.js'
	export default {
		mixins: [imgMixin],
		components: {
			chooseImg
		},
		data () {
			return {
				form: {
					shipBoardImage: [], // 左舷或右舷全貌
					shellPlatImage: [], // 船体外板
					deckImage: [], // 主甲板全貌
					fishFacilityImage: [], // 主要捕捞设施
					superstructureImage: [], // 上层建筑
					pilothouseImage: [], // 驾驶室
					pilotDeckImage: [], // 驾驶甲板全貌
					monkeyIslandImage: [], // 罗经甲板全貌
					sternCharacteristicsImage: [], // 船艉特征
					shipBreadthImage: [], // 型宽测量
					shipSizeImage: [], // 总长测量
					kitchenImage: [], // 厨房全貌
					crewCabinImage: [], // 船员舱室
					wallDoorImage: [], // 机舱围壁和门
				},
				options: [
					{ title: '左舷或右舷全貌', label: 'shipBoardImage' },
					{ title: '船体外板', label: 'shellPlatImage' }, 
					{ title: '主甲板全貌', label: 'deckImage' }, 
					{ title: '主要捕捞设施', label: 'fishFacilityImage' }, 
					{ title: '上层建筑', label: 'superstructureImage' },
					{ title: '驾驶室', label: 'pilothouseImage' },
					{ title: '驾驶甲板全貌', label: 'pilotDeckImage' },
					{ title: '罗经甲板全貌', label: 'monkeyIslandImage' },
					{ title: '船艉特征', label: 'sternCharacteristicsImage' },
					{ title: '型宽测量', label: 'shipBreadthImage' },
					{ title: '总长测量', label: 'shipSizeImage' },
					{ title: '厨房全貌', label: 'kitchenImage' },
					{ title: '船员舱室', label: 'crewCabinImage' },
					{ title: '机舱围壁和门', label: 'wallDoorImage' },
				]
			}
		},
		methods: {
			getImgs (url, name) {
				this.concatImg(name, url)
			},
			onNext () {
				this.$emit('next', 4)
			},
			onPrev () {
				this.$emit('prev', 2)
			},
		}
	}
</script>

<style scoped lang="scss">
	.certificate-wrapper {
		padding: 0 20px;
		.title {
			font-size: 34rpx;
			text-align: center;
			padding: 20rpx 0 40rpx;
			font-weight: 700;
		}
		.item {
			margin-bottom: 30rpx;
			.item-title {
				font-size: 30rpx;
				font-weight: 700;
			}
		}
		.btn-next {
			display: flex;
			justify-content: space-around;
			margin: 50rpx 0 30rpx 0;
		}
	}
</style>
