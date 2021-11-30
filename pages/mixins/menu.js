export default {
	data () {
		return {
			menu: [
				{ path: '/pages/home/video/list/index', color: '#8dc7af', icon: `${this.$IMAGE_URL}/home-peixunban.png`, label: '渔民学院' },
				{ label: '渔业资讯', color: '#8dc7af', icon: `${this.$IMAGE_URL}/home-peixunban.png`, path: '/pages/home/news/list/index?type=1' },
				{ path: '/pages/home/examination/list/index', color: '#e9b174', icon: `${this.$IMAGE_URL}/home-kaoshi.png`, label: '模拟考试',  },
				{ path: '/pages/home/recruit/list/index', color: '#e3797d', icon: `${this.$IMAGE_URL}/home-zhaopin.png`, label: '招聘' },
				{ path: '/pages/home/jobRegistration/index', color: '#bfc78c', icon: `${this.$IMAGE_URL}/home-jianli.png`, label: '求职' },
				{ path: '', path2: '/pages/user/contract/list/index', path1: '/pages/user/myship/index', color: '#8dc7af', icon: `${this.$IMAGE_URL}/home-hetong.png`, label: '合同' },
				{ path: '', outreach: true, color: '#e9b174', icon: `${this.$IMAGE_URL}/home-jinyuqi.png`, label: '进出港报告' },
				{ path: '/pages/release/ship-registration/index', color: '#e3797d', icon: `${this.$IMAGE_URL}/home-peixunban.png`, label: '上船登记' },
				{ path: '/pages/home/info/index', color: '#bfc78c', icon: `${this.$IMAGE_URL}/home-peixunjigou.png`, label: '培训服务' },
			],
			findMenu: [
				{ path: '/pages/home/video/list/index', color: '#8dc7af', icon: `${this.$IMAGE_URL}/home-peixunban.png`, label: '渔民学院' },
				{ path: '/pages/home/examination/list/index', color: '#e9b174', icon: `${this.$IMAGE_URL}/home-kaoshi.png`, label: '模拟考试',  },
				{ path: '/pages/home/recruit/list/index', color: '#e3797d', icon: `${this.$IMAGE_URL}/home-zhaopin.png`, label: '招聘' },
				{ path: '/pages/home/jobRegistration/index', color: '#bfc78c', icon: `${this.$IMAGE_URL}/home-jianli.png`, label: '求职' },
				{ path: '', path2: '/pages/user/contract/list/index', path1: '/pages/user/myship/index', color: '#8dc7af', icon: `${this.$IMAGE_URL}/home-hetong.png`, label: '合同' },
				{ path: '', outreach: true, color: '#e9b174', icon: `${this.$IMAGE_URL}/home-jinyuqi.png`, label: '进出港报告' },
				{ path: '/pages/release/ship-registration/index', color: '#e3797d', icon: `${this.$IMAGE_URL}/home-peixunban.png`, label: '上船登记' },
				{ path: '/pages/home/info/index', color: '#bfc78c', icon: `${this.$IMAGE_URL}/home-peixunjigou.png`, label: '培训服务' },
				{ label: '渔业资讯', color: '#8dc7af', icon: `${this.$IMAGE_URL}/home-peixunban.png`, path: '/pages/home/news/list/index?type=1' },
				{ label: '政策法规', color: '#e9b174', icon: `${this.$IMAGE_URL}/home-kaoshi.png`, path: '/pages/home/news/list/index?type=2' },
				// { label: '船东招聘', color: '#e3797d', icon: `${this.$IMAGE_URL}/home-zhaopin.png`, path: '/pages/home/recruit/list/index' },
				{ label: '企业招聘', color: '#e3797d', icon: `${this.$IMAGE_URL}/home-jianli.png`, path: '/pages/home/news/list/index?type=6' },
				{ label: '培训信息', color: '#bfc78c', icon: `${this.$IMAGE_URL}/home-hetong.png`, path: '/pages/home/info/index?index=1' },
				{ label: '职业规划', color: '#8dc7af', icon: `${this.$IMAGE_URL}/home-jinyuqi.png`, path: '/pages/base/web?src=https://m.taoyu58.com/careerplanning' },
				{ label: '教材订购', color: '#e9b174', icon: `${this.$IMAGE_URL}/home-peixunban.png`, path: '/pages/home/info/index?index=3' },
			]
		}
	}
}