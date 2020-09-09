<script>
import dictMapMixin from '@/pages/mixins/dictMap.js'
export default {
	mixins: [dictMapMixin],
	onLaunch: function() {
		this.getDicMap()
		// console.log('App Launch');
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
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
	font-family: NotoSansHans-Bold;
	color: #333;
}
::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
	display: none;
}
</style>
