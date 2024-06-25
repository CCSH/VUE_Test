```
<template>
	<div>
		<el-button type="primary" @click="dialog = true" size="mini">点击打开 Dialog</el-button>
		<el-dialog title="提示" :visible.sync="dialog" width="1200px" :modal-append-to-body="false">
			<publicForm ref="publicForm" :formObj="formObj" :formData="formData"
				:searchSelectOptionsCb="searchSelectOptionsCb" @selectChange="selectChange" @inputInput="inputInput"
				@inputChange="inputChange" @querySelectValue="querySelectValue" @formSwitchChange="formSwitchChange"
				@buttonClick="buttonClick">
			</publicForm>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogOK">确认</el-button>
				<el-button @click="dialog=false">取 消</el-button>
			</span>
		</el-dialog>
	</div>

</template>

<script>
import CommonForm from '@/components/CommonForm.vue'
export default {
  components: {
    CommonForm,
  },
		data() {
			return {
				dialog: false, //弹出框
				formObj: formJs.formObj,
				formData: formJs.formData,
				searchSelectOptionsCb: [], //form表单搜索select返回值
			};
		},
		watch: {
			dialog(newVal, oldVal) {
				if (!newVal) {
					this.$refs.publicForm.resetForm(); //窗口关闭清空表单
				}
			},
		},
		methods: {
			// select选择框变化
			selectChange(value, index, prop) {
				console.log(value, index, prop)
			},
			// inpuit变化
			inputInput(value, index, prop) {
				console.log(value, index, prop)
			},
			// inpuit Change
			inputChange(value, index, prop) {
				console.log(value, index, prop)
			},
			// select 搜索值
			querySelectValue(value, index, prop) {
				console.log(value, index, prop)
				let arr = [{
					label: '搜索返回1号',
					value: 1
				}, {
					label: '搜索返回2号',
					value: 2
				}];
				this.searchSelectOptionsCb = arr;
			},
			// form表单switch变化
			formSwitchChange(val, index, prop) {
				console.log(val, index, prop)
			},
			// 按钮点击
			buttonClick(index, prop) {
				console.log(index, prop)
			},
			dialogOK() {
				//判断表单验证是否通过
				if (this.$refs.publicForm.submitForm()) {
					console.log("success");
					console.log(this.formData)
				} else {
					console.log("error")
				}
			},
		}
	}
</script>

<style lang="less" scoped>

</style>

```
数据
```

import regex from '../../../../utils/regex.js' // 正则表达式
export default {
	formObj: [{
			input: true, //是input
			label: "input+正则", //字段
			prop: "input", //字段名
			placeholder: "请填写手机号", //提示内容
			width: 12, //参考el-col
			disabled: false, //是否禁用
			unit:'单位',
			rules: [{
				required: true,
				message: '联系方式'
			}, { //可以自己写utils，封装正则验证
				validator: (rule, value, callback) => {
					if (!value || !regex.isPhone(value)) {
						callback(new Error());
					} else {
						callback();
					}
				},
				message: "联系方式不对",
			}] //验证
		}, {
			textarea: true, //是input
			label: "输入框", //字段
			prop: "textearea", //字段名
			placeholder: "请填写输入框", //提示内容
			width: 12, //参考el-col
			disabled: false, //是否禁用
			rules: [{
				required: true,
				message: '输入框'
			}, ] //验证
		},
		{
			select: true,
			label: "选择框",
			prop: "select",
			placeholder: "请选择",
			width: 12, //参考el-col
			disabled: false,
			options: [{
				label: "options1",
				value: "1"
			}, {
				label: "options2",
				value: "2"
			}, ],
			rules: [{
				required: true,
				message: '选择框不能为空！'
			}]
		}, {
			searchSelect: true,
			label: "select搜索框",
			prop: "searchSelect",
			placeholder: "请选择",
			width: 12, //参考el-col
			disabled: false,
			options: [],
			rules: [{
				required: true,
				message: 'select搜索框！'
			}]
		}, {
			dateTimeRange: true,
			label: "年月日时分秒开",
			prop: "dateTimeRange",
			width: 12, //参考el-col
			disabled: false,
			options: {
				selectableRange: '18:30:00 - 20:30:00'
			},
			rules: [{
				required: true,
				message: '年月日时分秒开'
			}, ]
		}, {
			timePicker: true,
			label: "时分秒选择器",
			prop: "timePicker",
			placeholder: "请选择",
			width: 12, //参考el-col
			disabled: false,
			options: "",
			rules: [{
				required: true,
				message: '时分秒选择器'
			}, ]
		}, {
			timePickerIsRange: true,
			label: "时分秒开始结束",
			prop: "timePickerIsRange",
			placeholder: "请选择",
			width: 12, //参考el-col
			disabled: false,
			options: "",
			rules: [{
				required: true,
				message: '时分秒开始结束'
			}, ]
		}, {
			datePicker: true,
			label: "年月日选择器",
			prop: "datePicker",
			placeholder: "请选择",
			width: 12, //参考el-col
			disabled: false,
			options: "",
			rules: [{
				required: true,
				message: '年月日选择器'
			}, ]
		}, {
			datePickerIsRange: true,
			label: "年月日开始结束",
			prop: "datePickerIsRange",
			placeholder: "请选择",
			width: 12, //参考el-col
			disabled: false,
			options: "",
			rules: [{
				required: true,
				message: '年月日开始结束'
			}, ]
		}, {
			dateTime: true,
			label: " 年月日时分秒",
			prop: "dateTime",
			placeholder: "请选择",
			width: 12, //参考el-col
			disabled: false,
			options: "",
			rules: [{
				required: true,
				message: ' 年月日时分秒'
			}, ]
		}, {
			switch: true,
			label: "switch",
			prop: "switch",
			placeholder: "请选择",
			width: 12, //参考el-col
			disabled: false,
			rules: [{
				required: true,
				message: 'switch'
			}, ]
		}, {
			radio: true,
			label: "单选框",
			prop: "radio",
			placeholder: "请选择",
			width: 12, //参考el-col
			disabled: false,
			options: [{
				label: "单选框1",
				value: "1"
			}, {
				label: "单选框2",
				value: "2"
			}, ],
			rules: [{
				required: true,
				message: '单选框不能为空'
			}, ]
		}, {
			checkbox: true,
			label: "复选框",
			prop: "checkbox",
			disabled: false,
			width: 12, //参考el-col
			options: [{
				label: "复选框1",
				value: "1"
			}, {
				label: "复选框2",
				value: "2"
			}, {
				label: "复选框3",
				value: "3"
			}, ],
			rules: [{
				required: true,
				message: '复选框不能为空'
			}, ]
		},
		{
			upload: true,
			label: "文件上传",
			prop: "upload",
			disabled: false,
			uploadObj: {
				fileType: "2001",
				limit: 1, //上传长度限制
				hideUpload: false, //是否隐藏上传框
 
			},
			rules: [{
				required: true,
				message: '文件上传'
			}, ]
		},
		{
			button: true,
			label: "按钮",
			prop: "buttona",
			placeholder:"发送验证码",
			width: 12, //参考el-col
			disabled: false,
		},
		{
			text: true,
			label: "文本",
			prop: "text",
			width: 12, //参考el-col
			disabled: false,
		},
		{
			quillEditor: true,
			label: "富文本",
			prop: "quill",
			disabled: false,
		},
	],
	formData: {
		input: "",
		textearea: "",
		select: "",
		searchSelect: "",
		dateTimeRange: [],
		timePicker: "",
		timePickerIsRange: [],
		datePicker: "",
		datePickerIsRange: [],
		dateTime: "",
		date1: "",
		switch: false,
		radio: "",
		checkbox: [],
		upload: [],
		text:"这是一段文本，用于预览",
		quill:{
			content:""
		}
	},
}
```