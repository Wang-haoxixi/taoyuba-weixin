export const checkIdCard = (id) => {
    if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(id))){ 

        return false
    }
    return true
}