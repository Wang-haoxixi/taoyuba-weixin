import CryptoJS from 'crypto-js'
import $http from '@/common/request/index'
import { TOKEN } from '@/common/config/index.js'
import { API_URL } from '@/env.js'
export const encryption = params => {
  let { data, type, param, key } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach(ele => {
      var data = result[ele]
      key = CryptoJS.enc.Latin1.parse(key)
      var iv = key
      // 加密
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      })
      result[ele] = encrypted.toString()
    })
  }
  return result
}

export const openDocument = (url,params = {}) => {
	// console.log(url, 'Bearer ' + uni.getStorageSync(TOKEN))
	// uni.downloadFile({
	// 	url: API_URL + url,
	// 	header: {  
	// 		'Authorization': 'Bearer ' + uni.getStorageSync(TOKEN) 
	// 	},
	// 	success: (res) => {
	// 		consoloe.log('downloadFile', res)
	// 	},
	// 	fail: (err) => {
	// 		console.log('fail', err)
	// 	}
	// })
	// return
	$http.download(url, params).then((data) => {
		console.log('openDocument', data)
		filePath = data.tempFilePath
		uni.openDocument({
			filePath: filePath,
			success: function(res) {
				console.log('打开文档成功')
			},
			fail: function (err) {
				console.log('打开失败')
			}
		})
	})
}