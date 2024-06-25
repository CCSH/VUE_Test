const state = {
	//属性
	data: {
		id: 1,
	},
}

const mutations = {
	//改变
	hanldeData(state, val) {
		let keys = Object.keys(val)
		keys.forEach(element => {
			state.data[element] = val[element]
		})
		console.log('存储数据：', state.data)
	},
	//处理路由
	handleRouter(state, router) {
		let menu = [{ path: '/home', url: 'home' }]
		state.data.menu = menu
		//路由数据
		state.data.menuArr = []
		this.commit('data/routerData', menu)
		//添加路由
		state.data.menuArr.forEach(item => {
			router.addRoute('main', item)
		})
	},
	//路由数据
	routerData(state, menu) {
		//处理路由
		var menuArr = []
		menu.forEach(item => {
			if (item.children) {
				var val = []
				val = item.children.map(item2 => {
					item2.component = () => import('@/views/' + item2.url)
					return item2
				})
				menuArr.push(...val)
			} else {
				item.component = () => import('@/views/' + item.url)
				menuArr.push(item)
			}
		})
		state.data.menuArr = menuArr
	},
}

const actions = {
	//事件
	actionData({ commit }, val) {
		// 可以进行处理
		// 调用commit方法来提交mutation
		commit('hanldeData', val)
	},
}

const getters = {
	//获取
	getData(state) {
		return state.data
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
