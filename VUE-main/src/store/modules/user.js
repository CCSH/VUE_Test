import Cookie from 'js-cookie'

export default {
	state: {
		uploadFileUrl: '',
		userInfo: { info: '' },
		isCollapse: false,
		tabList: [{ path: '/', name: 'home', label: '首页', url: 'Home/Home' }],
		menu: [],
		menuArr: [],
	},

	mutations: {
		collapseMenu(state) {
			state.isCollapse = !state.isCollapse
		},
		selectMenu(state, val) {
			if (val.name !== 'home') {
				const index = state.tabList.findIndex(item => item.name === val.name)
				if (index < 0) {
					state.tabList.push(val)
				}
			}
		},
		closeMenu(state, val) {
			state.tabList.forEach((item, index) => {
				if (item.name === val.name) {
					state.tabList.splice(index, 1)
				}
			})
		},
		saveUserInfo(state, val) {
			state.userInfo = val
			Cookie.set('userInfo', JSON.stringify(val))
		},
		handleRouter(state, router) {
			if (!Cookie.get('userInfo')) {
				return
			}
			var userInfo = JSON.parse(Cookie.get('userInfo'))
			//处理菜单
			var menu = []
			switch (userInfo.info) {
				case 'admin':
					{
						menu = [
							{ path: '/home', name: 'home', label: '首页', url: 'Home' },
							{ path: '/mall', name: 'mall', label: '商品管理', url: 'Mall' },
							{ path: '/user', name: 'user', label: '用户管理', url: 'User' },
							{
								label: '其他',
								children: [
									{
										path: '/page1',
										name: 'page1',
										label: '页面1',
										url: 'Page1',
									},
									{
										path: '/page2',
										name: 'page2',
										label: '页面2',
										url: 'Page2',
									},
								],
							},
						]
					}
					break
				default:
					{
						menu = [
							{ path: '/home', name: 'home', label: '首页', url: 'Home' },
							{ path: '/mall', name: 'mall', label: '商品管理', url: 'Mall' },
						]
					}
					break
			}
			state.menu = menu
			//存起来
			Cookie.set('menu', JSON.stringify(menu))

			//路由数据
			state.menuArr = []
			this.commit('routerData', menu)

			//添加路由
			state.menuArr.forEach(item => {
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
			state.menuArr = menuArr
		},
	},
}
