<template>
	<view class="choose-danger-wrapper">
		<view class="title">{{title}}</view>
		<view class="form-radio">
			<u-radio-group v-model="form.flag">
				<u-radio
					v-for="(item, index) in isNot"
					:key="index"
					:name="item.value"
				>
					{{item.label}}
				</u-radio>
			</u-radio-group>
		</view>
		<view>
			<choose-img @get-img="getImg"></choose-img>
		</view>
	</view>
</template>

<script>
	import chooseImg from './chooseImg.vue'
	export default {
		components: {
			chooseImg
		},
		props: {
			data: Array,
			title: String,
		},
		data () {
			return {
				isNot: [
					{ label: '合格', value: 1 },
					{ label: '不合格', value: 0 }
				],
				form: {
					flag: 2,
					url: []
				}
			}
		},
		methods: {
			getImg (data) {
				// let obj = Object.assign({}, this.value)
				// obj.url = obj.imgUrl[].split(',') || []
				this.form.url = this.form.url.concat(data)
				// obj.imgUrl = obj.url.join(',')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.choose-danger-wrapper {
		
	}
</style>
