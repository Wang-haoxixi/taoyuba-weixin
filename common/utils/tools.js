import { API_URL } from '@/env'
import cache from './cache.js'
export default {
	/**
	 * fn：检测图片协议，主要用于检测海报图片协议。
	 * param(imgPath): 图片地址。
	 */

	checkImgHttp(imgPath) {
		let newPath = '';
		if (imgPath.indexOf('data:image/svg+xml') !== -1) {
			newPath = '/static/imgs/base_avatar.png'
		} else {
			let pathArr = imgPath.split('://');
			// #ifdef H5
			let ishttps = 'https:' == window.location.protocol ? true : false;
			ishttps ? (pathArr[0] = 'https') : (pathArr[0] = 'http');
			// #endif
			newPath = pathArr.join('://');
		}
		return newPath;
	},
	// 打电话
	callPhone(phoneNumber = '') {
		let num = phoneNumber.toString()
		uni.makePhoneCall({
			phoneNumber: num,
			fail(err) {
				console.log('makePhoneCall出错', err)
			},
		});
	},
	// 图片处理-选择图片
	chooseImage(count = 1) {
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count: count, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					resolve(res.tempFilePaths);
				}
			});
		}).catch(e => {
			reject(e)
		})
	},
	// 图片处理-上传图片
	uploadImage(api, url) {
		let config_url = API_URL;
		uni.showLoading({
			title: '上传中'
		});
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: config_url + api,
				filePath: url,
				name: 'file',
				success: res => {
					res = JSON.parse(res.data);
					if (res.code === 1) {
						uni.hideLoading()
						uni.showToast({
							title: '上传成功',
							icon: 'none'
						});
						resolve(res.data)
					} else {
						uni.hideLoading()
						uni.showModal({
							title: '上传失败',
							content: res.msg
						});
					}
				}
			});
		}).catch(e => {
			reject(e)
		})
	},
	// 图片处理-预览图片
	previewImage(urls = [], current = 0) {
		uni.previewImage({
			urls: urls,
			current: current,
			indicator: 'default',
			loop: true,
			fail(err) {
				console.log('previewImage出错', urls, err)
			},
		})
	},
	// 图片处理-获取图片信息
	getImageInfo(src = '') {
		return new Promise((resolve, reject) => {
			uni.getImageInfo({
				src: src,
				success: (image) => {
					resolve(image)
				},
				fail(err) {
					console.log('getImageInfo出错', src, err)
				},
			})
		}).catch(e => {
			reject(e)
		})

	},
	/**
	 * 格式化时间
	 */
	//时间格式化 天时分秒
	format(t) {
		let format = {
			d: '00',
			h: '00',
			m: '00',
			s: '00',
		}
		if (t > 0) {
			let d = Math.floor(t / 86400)
			let h = Math.floor((t / 3600) % 24)
			let m = Math.floor((t / 60) % 60)
			let s = Math.floor(t % 60)
			format.d = d < 10 ? '0' + d : d
			format.h = h < 10 ? '0' + h : h
			format.m = m < 10 ? '0' + m : m
			format.s = s < 10 ? '0' + s : s
		}
		return format
	},
	//时间格式化(格式化最大为小时)
	formatToHours(t) {
		let format = {
			d: '00',
			h: '00',
			m: '00',
			s: '00',
		}
		if (t > 0) {
			let h = Math.floor(t / 3600)
			let m = Math.floor((t / 60) % 60)
			let s = Math.floor(t % 60)

			format.h = h < 10 ? '0' + h : h
			format.m = m < 10 ? '0' + m : m
			format.s = s < 10 ? '0' + s : s
		}
		return format
	},
	// 年月日
	timestamp(timestamp) {
		let date = new Date(timestamp * 1000); //根据时间戳生成的时间对象
		let y = date.getFullYear();
		let m = date.getMonth() + 1;
		let d = date.getDate();

		m = m < 10 ? '0' + m : m;
		d = d < 10 ? '0' + d : d
		
		let dateText = y + "-" + m + "-" + d
		return dateText
	},
	// 年月日，时分秒
	// "YYYY-mm-dd HH:MM"
	dateFormat(fmt, date) {
		let ret;
		const opt = {
			"Y+": date.getFullYear().toString(), // 年
			"m+": (date.getMonth() + 1).toString(), // 月
			"d+": date.getDate().toString(), // 日
			"H+": date.getHours().toString(), // 时
			"M+": date.getMinutes().toString(), // 分
			"S+": date.getSeconds().toString() // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		};
		for (let k in opt) {
			ret = new RegExp("(" + k + ")").exec(fmt);
			if (ret) {
				fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
			};
		};
		return fmt;
	},
	/** 文字隐藏部分 如131****1111
	 * @param {Object} content 内容
	 */
	textEncryption (content, start = 3, end = 7, replaceText = '*') {
		let result = (content + '').split('')
		let reg = /^(\d{3})\d{4}(\d{4})$/
		result.forEach((item, index) => {
			if (index >= start && index < end) {
				result[index] = replaceText
			}
		})
		return result.join('')
	},
	/**提示框
	 *title(标题)
	 *icon(图标):  success，loading，none
	 *duration(延时): 0为不关闭, 毫秒数
	 *options(其它参数)
	 */
	toast(title, icon = 'none', options) {
		wx.showToast({
			title: title || '',
			icon: icon,
			duration: (options && options.duration) || 1500,
			image: (options && options.image) || '',
			mask: (options && options.mask) || true,
		});
	},
	// 获取字典内容
	getDictItem (value, data, valueName = 'value') {
		let result = {}
		for (let i = 0, len = data.length; i < len; i++) {
			if (data[i][valueName] === value) {
				result = data[i]
				break
			}
		}
		return result
	},
	jsonForm (obj) {
		return Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&')
	},
	clear () {
		cache.remove('dictMap')
		cache.remove('taoyuba-token')
		cache.remove('refresh_token')
		cache.remove('userInfo')
		cache.remove('roles')
	},
	// 判断是否是数字
	isRealNum (val){
	　　if(val === "" || val ==null){
	        return false
	　　}
	   if(!isNaN(val)){　　　　
	　　　 return true;
	　　} else{ 
	　　　　return false;
	　　} 
	},
	transTimeString(time) {
		if(typeof(time)=='string'){ //字符串格式需要转化 "-" 为 "/" ios端才能生效
			return time.replace(/-/g,'/')
		}else{
			return time
		}
	},
	// 根据生日计算出年龄
	jsGetAge(strBirthday) { // 1996-06-22
		var returnAge;
		var strBirthdayArr = strBirthday.split("-");
		var birthYear = strBirthdayArr[0];
		var birthMonth = strBirthdayArr[1];
		var birthDay = strBirthdayArr[2];
	
		var d = new Date();
		var nowYear = d.getFullYear();
		var nowMonth = d.getMonth() + 1;
		var nowDay = d.getDate();
	
		if (nowYear == birthYear) {
			returnAge = 0; //同年 则为0岁
		} else {
			var ageDiff = nowYear - birthYear; //年之差
			if (ageDiff > 0) {
				if (nowMonth == birthMonth) {
					var dayDiff = nowDay - birthDay; //日之差
					if (dayDiff < 0) {
						returnAge = ageDiff - 1;
					} else {
						returnAge = ageDiff;
					}
				} else {
					var monthDiff = nowMonth - birthMonth; //月之差
					if (monthDiff < 0) {
						returnAge = ageDiff - 1;
					} else {
						returnAge = ageDiff;
					}
				}
			} else {
				returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
			}
		}
		return returnAge; //返回周岁年龄
	}
}

