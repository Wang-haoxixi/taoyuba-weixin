
function getcode(params) {
	return new Promise((resolve, reject) => {
		if( params.code === 0 ){
			resolve(params)
		}else{
			uni.showToast({
				icon: 'none',
			    title: params.msg,
			    duration: 2000
			});
		}
	}).catch(e => {
		reject(e)
	})
}
export default getcode