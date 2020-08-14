export default {
	data () {
		return {
			share: {
				title:'爱消费',
				path:'',
				imageUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595500268904&di=1510d1051962ddc7e308c37347ca5725&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F10%2F20170710210234_y3Kf5.jpeg',
				desc:'我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！',
				content:'我的内容'
			}
		}
	},
	 onShareAppMessage(res) {
		return {
			title:this.share.title,
			path:this.share.path,
			imageUrl:this.share.imageUrl,
			desc:this.share.desc,
			content:this.share.content,
			scene: 'WXSenceTimeline',
			success(res){
				uni.showToast({
					title:'分享成功'
				})
			},
			fail(res){
				uni.showToast({
					title:'分享失败',
					icon:'none'
				})
			}
		}
	}
}