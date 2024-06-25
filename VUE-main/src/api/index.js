import http from '@/utils/http.js'

export const hostUrl = process.env.VUE_APP_BASE_API + '/CCSH/'

//列表
export function requestList() {
	return http.get(hostUrl + 'list.json')
}
