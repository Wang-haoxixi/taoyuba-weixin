// .env.js 文件
// 不同环境访问不同的路径
const ENV_API_URL = {
	development: 'https://dev.7wpp.com/addons/shopro/', //开发环境
	production: 'https://www.baidu.com/', //生产环境
}
const ENV_BASE_URL = {
	development: 'https://www.baidu.com/', //开发环境
	production: 'https://www.baidu.com/', //生产环境
}

export const IMAGE_URL = 'https://woneng-oss.oss-cn-hangzhou.aliyuncs.com/ygl/' // 图片地址系统维护
export const BASE_URL = ENV_BASE_URL[process.env.NODE_ENV || 'development']; //后台根域名
export const API_URL = ENV_API_URL[process.env.NODE_ENV || 'development']; //后台接口域名