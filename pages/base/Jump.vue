<template>
	<div></div>
</template>

<script>
	import dictMapMixin from '@/pages/mixins/dictMap.js'
	export default {
		data () {
			return {
			}
		},
		mixins: [dictMapMixin],
		onLoad (option) {
			// uni.clearStorage()
			uni.removeStorageSync('taoyuba-token')
			uni.removeStorageSync('refresh_token')
			let params = this.getQueryParams(option.q)
			console.log(params)
			if( params.type === '1' ){
				uni.navigateTo({
					url: `/pages/user/real/signIn/index?id=${ params.id || 0 }&orgId=${ params.orgId || 0 }`
				})
			}else if( params.type === '2' ){
				uni.navigateTo({
					url: `/pages/user/real/faceCollection/index?id=${ params.id || 0 }&orgId=${ params.orgId || 0 }`
				})
			}
		},
		methods: {
			// 获取扫码进来的连接的参数
			getQueryParams (queryString) {
			    // 微信扫码得到的内容进行了一次编码，所以官方要求需要进行decodeURIComponent一次
			    queryString = decodeURIComponent(queryString)
			    let params = {}
			    if (queryString) {
			      let queryArray = queryString.split('?')
			      if (queryArray.length > 1) {
			        let query = queryArray[1]
			        let array = query.split('&')
			        array.map((value) => {
			          let valueArray = value.split('=') 
			          if (valueArray.length > 1) {
			            // 还需要对value进行解码（可能涉及到在value为中文字符，在赋值到二维码前进行encodeURI编码）
			            Object.assign(params, { [valueArray[0]]: decodeURI(valueArray[1]) })
			          }
			        })
			      }
			    }
			    return params
			},
		}
	}
</script>

<style>
</style>
