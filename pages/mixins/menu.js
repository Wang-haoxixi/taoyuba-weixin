export default {
	data () {
		return {
			menu: [
				{ path: '/pages/home/video/list/index', color: '#8dc7af', icon: `${this.$IMAGE_URL}/home-peixunban.png`, label: '渔民学院' },
				{ path: '/pages/home/examination/list/index', color: '#e9b174', icon: `${this.$IMAGE_URL}/home-kaoshi.png`, label: '模拟考试',  },
				{ path: '/pages/home/recruit/list/index', color: '#e3797d', icon: `${this.$IMAGE_URL}/home-zhaopin.png`, label: '招聘' },
				{ path: '/pages/home/resume/list/index', color: '#e9b174', icon: `${this.$IMAGE_URL}/home-jianli.png`, label: '求职' },
				{ path: '', path2: '/pages/user/contract/list/index', path1: '/pages/user/myship/ship/index', color: '#8dc7af', icon: `${this.$IMAGE_URL}/home-hetong.png`, label: '合同' },
				{ path: '', color: '#d7d7d7', icon: `${this.$IMAGE_URL}/home-jinyuqi.png`, label: '进出港报告' },
				{ path: '/pages/release/register/index', color: '#bfc78c', icon: `${this.$IMAGE_URL}/home-peixunban.png`, label: '船员登记' },
				{ path: '/pages/home/training/list/index', color: '#e3797d', icon: `${this.$IMAGE_URL}/home-peixunjigou.png`, label: '培训机构' },
			]
		}
	}
}