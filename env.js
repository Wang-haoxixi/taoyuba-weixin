// .env.js 文件
// 不同环境访问不同的路径
const ENV_API_URL = {
	// development: 'https://m.taoyu58.com/api', //开发环境
	// production: 'https://m.taoyu58.com/api', //生产环境
	development: 'http://testpc.taoyu58.com:6888/api', //开发环境 
	production: 'https://m.taoyu58.com/api', //生产环境
}
// const ENV_BASE_URL = {
// 	development: 'http://m.taoyu58.com/api', //开发环境
// 	production: 'http://m.taoyu58.com/api', //生产环境
// }

export const IMAGE_URL = 'https://mini.taoyu58.com/' // 图片地址系统维护
// export const BASE_URL = ENV_BASE_URL[process.env.NODE_ENV || 'development']; //后台根域名
export const API_URL = ENV_API_URL[process.env.NODE_ENV || 'development']; //后台接口域名