import Vue from 'vue'
//全局方法
Vue.mixin({
	methods: {
		// 获取显示名字（value => label）
		displayName(value, arr) {
			if (arr && arr.length > 0) {
				const item = arr.find(v => v.value == value)
				return item ? item.label : value
			}
			return value
		},
		//表单校验
		formRule(type) {
			switch (type) {
				case 1:
					return {
						pattern: /^\w+$/,
						message: '请输入字母/数字/下划线',
						trigger: 'blur',
					}
					break
				case 2:
					return {
						pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
						message: '请输入中英文/数字/下划线',
						trigger: 'blur',
					}
					break
				case 3:
					return {
						pattern: /(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,2}$)/,
						message: '请输入正确金额',
						trigger: 'blur',
					}
					break
				case 4:
					return {
						pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
						message: '请输入中文/英文',
						trigger: 'blur',
					}
					break
				case 5:
					return {
						pattern: /[^\d]/g,
						message: '不能全是数字',
						trigger: 'blur',
					}
					break
				case 6:
					return {
						pattern: /^[\u4e00-\u9fa5]+$/,
						message: '请输入中文',
						trigger: 'blur',
					}
					break
				case 7:
					return {
						pattern: /^[^\u4e00-\u9fa5]*$/,
						message: '不能输入中文',
						trigger: 'blur',
					}
					break
				case 8:
					return {
						pattern: /^[0-9]*$/,
						message: '请输入字母/数字/下划线',
						trigger: 'blur',
					}
					break
				case 9:
					return {
						pattern: /^\d+$/,
						message: '请输入数字',
						trigger: 'blur',
					}
					break
				case 10:
					return {
						pattern: /^-?[1-9]\d*$/,
						message: '请输入正整数及整数',
						trigger: 'blur',
					}
					break
				case 11:
					return {
						pattern: /^(\-|\+)?\d+(\.\d+)?$/,
						message: '请输入数字(可正负)',
						trigger: 'blur',
					}
					break
				case 12:
					return {
						pattern: /^\d+$|^\d*\.\d+$/,
						message: '请输入数字/小数点',
						trigger: 'blur',
					}
					break
				case 13:
					return {
						pattern: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/,
						message: '请输入大/小写字母+数字+特殊字符',
						trigger: 'blur',
					}
					break
				case 14:
					return {
						pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
						message: '请输入正确号码',
						trigger: 'blur',
					}
					break
				case 15:
					return {
						pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
						message: '请输入正确身份证号',
						trigger: 'blur',
					}
					break
				case 16:
					return {
						pattern: /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,
						message: '请输入正确邮箱',
						trigger: 'blur',
					}
					break
				default:
					break
			}
		},
		//字符串限制
		strRegular(e, type) {
			let pattern = ''
			switch (type) {
				case 1:
					//去除 特殊符号
					pattern = /[^0-9A-Za-z|，。；‘’“”：\u4e00-\u9fa5]*/g
					break
				case 2:
					//只有 数字和英文字符
					pattern = /[^\w_]/g
					break
				case 3:
					//只有 数字
					pattern = /[^\d]/g
					break
				case 4:
					//只有 数字和点
					pattern = /[^\d+(,\d\d\d)*.-\d+$]/g
					break
				case 5:
					//去除 汉字
					pattern = /[\u4E00-\u9FA5]/g
					break
				case 6:
					//价格
					return (
						e
							.replace(/\D*(\d*)(\.?)(\d{0,2})\d*/, '$1$2$3')
							.replace(/^0+(\d)/, '$1')
							.match(/^\d*(\.?\d{0,2})/g)[0] || ''
					)
					break
				case 7:
					//去除 空格
					pattern = /\s+/g
					break
				case 8:
					//首字母大写
					if (e.length > 0) {
						return e.charAt(0).toUpperCase() + e.slice(1)
					}
					break
			}
			return e.replace(pattern, '')
		},
	},
})
