<template>
	<div class="manage">
		<!--  头部操作 -->
		<div class="manage-header">
			<el-button type="primary" @click="addOperation" icon="el-icon-plus" size="mini">新建</el-button>
			<!-- 表单 -->
			<el-form :model="form" :inline="true" ref="searchForm" style="display: flex; justify-content: flex-end; width: 100%; height: 41px">
				<el-form-item>
					<el-input v-model="form.keyWord" placeholder="请输入关键字" size="mini" clearable style="width: 150px; margin-right: 10px"></el-input>
				</el-form-item>
			</el-form>
			<!-- 操作 -->
			<div style="display: flex; justify-content: flex-end">
				<el-button type="primary" @click="handleSearch" size="mini">搜索</el-button>
				<el-button size="mini" @click="handleReset">重置</el-button>
			</div>
		</div>
		<!-- 表格 -->
		<common-table :tableData="tableData" :columnObj="columnObj" :tableObj="tableObj" :pageObj="pageObj" @currentChange="currentChange" @sizeChange="sizeChange"></common-table>
		<!-- 弹窗 -->
		<el-dialog :title="modalType === 0 ? '新增数据' : '编辑数据'" :visible.sync="dialog" width="50%">
			<common-form ref="addForm" :formObj="formAddObj" :formData="formAddData" />
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialog = false">取 消</el-button>
				<el-button type="primary" @click="dialogOK">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import CommonForm from '@/components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
import Vue from 'vue'
import { sex_data } from '@/utils/static_data.js'
import { static_config, user_add_config } from '@/utils/static_config.js'
import { displayName } from '@/utils/tool.js'

export default {
	components: {
		CommonTable,
		CommonForm,
	},

	data() {
		return {
			dialog: false, //弹出框
			modalType: 0, // 0 新增、1 编辑
			// 添加 form 配置项
			formAddObj: user_add_config,
			// 添加 表单内容
			formAddData: {},
			// 搜索 表单内容
			form: {},
			// page 配置项
			pageObj: {
				position: 'right',
				total: 0,
				pageData: {
					page: 1,
					size: 10,
				},
			},
			// table配置选项
			tableObj: {
				rowKey: 'id',
				fit: true,
			},
			// 列配置选项
			columnObj: {
				// 选择框
				// selection: true,
				// index: true,
				//column列,columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
				//prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
				columnData: [
					{
						text: true,
						prop: 'name',
						label: '姓名',
						width: '',
						align: 'center',
					},
					{
						text: true,
						prop: 'age',
						label: '年龄',
						width: '',
						align: 'center',
					},
					{
						text: true,
						prop: 'date',
						label: '生日',
						width: '',
						align: 'center',
					},
					{
						ownDefined: true,
						prop: 'sex',
						label: '性别',
						width: '',
						align: 'center',
						sortable: false,
						ownDefinedReturn: (row, $index) => {
							return this.displayName(row.sex, sex_data)
						},
					},
					{
						text: true,
						prop: 'address',
						label: '地区',
						width: '',
						align: 'center',
						sortable: false,
						ownDefinedReturn: (row, $index) => {
							return row.address
						},
					},
					{
						isOperation: true,
						label: '操作',
						width: '180',
						align: 'center',
						sortable: false,
						operation: [
							{
								label: '编辑',
								icon: '',
								buttonClick: this.editOperation,
								isShow: (row, $index) => {
									return true
								},
							},
							{
								type: 'danger',
								label: '删除',
								icon: '',
								buttonClick: this.deleteOperation,
								isShow: (row, $index) => {
									return true
								},
							},
						],
					},
				],
			},
			tableData: [],
		}
	},
	mounted() {
		//初始化
		this.handleReset()
	},
	watch: {
		//dialog监听
		dialog(newVal, oldVal) {
			if (!newVal) {
				this.$refs.addForm.resetForm() //窗口关闭清空表单
			}
		},
	},
	methods: {
		//初始化form
		initForm() {
			//form默认值
			this.form = {}
		},
		//搜索
		handleSearch() {
			this.pageObj.pageData.page = 1
			this.pageObj.total = Math.floor(Math.random() * 100)
			this.tableData = this.requestData()
		},
		//重置
		handleReset() {
			this.initForm()
			this.pageObj.pageData.page = 1
			this.pageObj.total = 100
			this.tableData = this.requestData()
		},
		//页码变化
		currentChange(val) {
			this.pageObj.pageData.page = val
			//请求
			this.tableData = this.requestData()
		},
		//条数变化
		sizeChange(val) {
			this.pageObj.pageData.size = val
			this.pageObj.pageData.page = 1
			//请求
			this.tableData = this.requestData()
		},
		//dialog确认
		dialogOK() {
			//判断表单验证是否通过
			if (this.$refs.addForm.submitForm()) {
				if (this.modalType === 0) {
					this.addData(this.formAddData)
				} else {
					this.editData(this.formAddData)
				}
				this.dialog = false
			} else {
				console.log('error')
			}
		},
		//添加操作
		addOperation() {
			this.formAddData = {}
			this.modalType = 0
			this.dialog = true
		},
		//编辑操作
		editOperation(row, $index) {
			var item = JSON.parse(JSON.stringify(row))
			this.formAddData = item
			this.modalType = 1
			this.dialog = true
		},
		//删除操作
		deleteOperation(row, $index) {
			console.log(row, $index)
			let newSet = new Set(this.tableData)
			newSet.delete(row)
			this.tableData = [...newSet]
		},
		//添加数据
		addData(data) {
			data.id = 'add' + this.tableData.length
			var item = JSON.parse(JSON.stringify(data))
			this.tableData.unshift(item)
		},
		//编辑数据
		editData(data) {
			const index = this.tableData.findIndex(item => item.id === data.id)
			data.id = 'edit' + this.tableData.length
			var item = JSON.parse(JSON.stringify(data))
			Vue.set(this.tableData, index, item)
		},
		//模拟获取数据
		requestData() {
			var list = []
			var name = this.form.keyWord ? '搜索：' + this.form.keyWord + '_' : ''
			let count = this.pageObj.total >= this.pageObj.pageData.page * this.pageObj.pageData.size ? this.pageObj.pageData.size : this.pageObj.total % this.pageObj.pageData.size
			for (let index = 0; index < count; index++) {
				var data = {
					id: index,
					name: name + '第' + this.pageObj.pageData.page + '页-名字' + index,
					date: '201' + Math.floor(Math.random() * 10) + '-05-02',
					address: '地址' + Math.floor(Math.random() * 2000) + '号',
					sex: Math.floor(Math.random() * 2),
					age: 10 + Math.floor(Math.random() * 90),
				}
				list.push(data)
			}
			console.log("ccsh",list);
			return list
		},
	},
}
</script>

<style lang="less" scoped>
.manage {
	overflow: auto;
	margin-bottom: -100%;
	.manage-header {
		display: flex;
		align-items: center;
	}
}
</style>
