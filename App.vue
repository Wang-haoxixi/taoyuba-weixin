<script>
import dictMapMixin from '@/pages/mixins/dictMap.js'
export default {
	mixins: [dictMapMixin],
	onLaunch: function() {
		this.getDicMap()
		this.getUserSystem()
		// console.log('App Launch');
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	},
	methods: {
		//获取用户版本信息
		getUserSystem() {
			let res = uni.getSystemInfoSync();    //获取系统信息(里面包含微信版本号)
			console.log('手机信息：', res);
			let system = res.system.split(' ');
			console.log('手机系统：', system);
			let version;
			if (system[0] == "iOS") {		//如果是ios系统
				version = this.compareVersion(res.version, '7.0.4');
			} else {
				version = this.compareVersion(res.version, '7.0.4');
			}
			if (version < 0) {
				uni.showModal({
					title: '提示',
					content: '当前微信版本过低，部分功能可能无法使用，请及时更新',
				})
			}
		},
		//判断版本号
		compareVersion(v1, v2) {
			v1 = v1.split('.')
			v2 = v2.split('.')
			const len = Math.max(v1.length, v2.length)
			while (v1.length < len) {
				v1.push('0')
			}
			while (v2.length < len) {
				v2.push('0')
			}
			for (let i = 0; i < len; i++) {
				const num1 = parseInt(v1[i])
				const num2 = parseInt(v2[i])
				if (num1 > num2) {
					return 1    //大于限定版本
				} else if (num1 < num2) {
					return -1    //小于限定版本
				}
			}
			return 0      //等于限定版本
		},
	}
};
</script>

<style lang="scss">
@import url('./static/font/iconfont.css');
@import 'uview-ui/index.scss';
page {
	background-color: $bg-page;
	-webkit-overflow-scrolling: touch; //ios滑动不流畅
	height: 100%;
	background: #f6f6f6;
	width: 100%;
	font-size: 30upx;
	font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
	color: #333;
}
::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
	display: none;
}
</style>
