```
<template>
	<div>
		<el-card class="red">
			<!-- <z-el-table :tableData="tableData" :columObj="columObj" :pageObj="pageObj" @switchChange="switchChange" @editInputBlur="editInputBlur" @rowClick="rowClick"
				@handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
			</z-el-table> -->
			<commonTable :tableData="tableData"
				:columnObj="columnObj"
				:tableObj="tableObj"
				:pageObj="pageObj"
				@switchChange="switchChange"
				@editInputBlur="editInputBlur"
				@rowClick="rowClick"
				@handleSizeChange="handleSizeChange"
				@handleCurrentChange="handleCurrentChange">
				<template #sex="{ row, column, index }">
       		自定义插槽 {{ column.ownDefinedReturn(row, index) }}
      	</template>
			</commonTable>
		</el-card>
	</div>
</template>
<script>
  import CommonTable from '@/components/CommonTable.vue'

  export default {
    components: {
      CommonTable,
    },
		data() {
			return {
				pageObj: { //分页对象
					position: "left", //分页组件位置
					total: 100,
					pageData: {
						page: 1,
						size: 10
					}
				},
				tableData: [{
					id: '1',
					date: '2016-05-02',
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					switchs: true,
					img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
					objmsg: {
						msg: '啊啊啊啊啊啊啊啊'
					}
				}, {
					id: '2',
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
					switchs: true,
					img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
					objmsg: {
						msg: '啊啊啊啊啊啊啊啊'
					}
				}, {
					id: '3',
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
					switchs: true,
					img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
					objmsg: {
						msg: '啊啊啊啊啊啊啊啊'
					}
				}, {
					id: '4',
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					switchs: true,
					img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
					objmsg: {
						msg: '啊啊啊啊啊啊啊啊'
					}
				}, {
					id: '5',
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					switchs: true,
					img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
					objmsg: {
						msg: '啊啊啊啊啊啊啊啊'
					}
				}, {
					id: '6',
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					switchs: true,
					img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
					objmsg: {
						msg: '啊啊啊啊啊啊啊啊'
					}
				}, {
					id: '7',
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					switchs: true,
					img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
					objmsg: {
						msg: '啊啊啊啊啊啊啊啊'
					}
				}, {
					id: '8',
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					switchs: true,
					img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
					objmsg: {
						msg: '啊啊啊啊啊啊啊啊'
					},
					children: [{
						id: 31,
						date: '2016-05-01',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1519 弄'
					}, {
						id: 32,
						date: '2016-05-01',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1519 弄'
					}]
				}, {
					id: '9',
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					switchs: true,
					img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
					objmsg: {
						msg: '啊啊啊啊啊啊啊啊'
					}
				}, {
					id: '10',
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					switchs: true,
					img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
					objmsg: {
						msg: '啊啊啊啊啊啊啊啊'
					}
				}, {
					id: '11',
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					switchs: true,
					img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
					objmsg: {
						msg: '啊啊啊啊啊啊啊啊'
					}
				}, {
					id: '12',
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					switchs: true,
					img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
					objmsg: {
						msg: '啊啊啊啊啊啊啊啊'
					}
				}, {
					id: '13',
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					switchs: true,
					img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
					objmsg: {
						msg: '啊啊啊啊啊啊啊啊'
					}
				}, ],
				// table配置选项
				tableObj: {
					rowKey: "id",
					defaultExpandAll: true,
					indent: 50
				},
				// 列配置选项，将选择框操作提出来了，其他依然保留各自列
				columnObj: {
					// 选择框
					selection: true,
					// 选择框根据条件是否可选
					selectable: (row, index) => {
						if (row.switchs) {
							return true;
						}
					},
					//column列,columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
					//prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
					columnData: [{
							text: true,
							prop: "date",
							label: "默认样式",
							width: "",
							align: "center",
						}, {
							text: true,
							prop: "id",
							label: "可以排序",
							width: "",
							align: "center",
							sortable: true, //开启排序

						},
						{
							status: true,
							prop: "objmsg",
							label: "obj类型（mesage）",
							width: "",
							align: "center",
							sortable: false,
						},
						{
							ownDefined: true,
							prop: "address",
							label: "自定义返回内容",
							width: "",
							align: "center",
							sortable: false,
							ownDefinedReturn: (row, $index) => {
								return row.address
							}
						},
						{
							switch: true,
							prop: "switchs",
							label: "switch开关",
							width: "",
							align: "center",
							openText: "打开",
							closeText: "关闭",
							sortable: false,
						},
						{
							image: true,
							prop: "img",
							label: "图片",
							width: "",
							align: "center",
							sortable: false,
						},
						{
							text: true,
							editRow: null,
							prop: "name",
							label: "点击可编辑",
							width: "",
							align: "center",
							sortable: false,
						},
						//如果为操作列,则需要填写需要的操作按钮,类型为Object。operation(操作类型,可选edit,delete,see),type(按钮样式,参考el—botton类型),label(按钮文字)icon(参考el-icon),style(样式)
						{
							isOperation: true,
							label: "操作",
							width: "180",
							align: "center",
							sortable: false,
							operation: [{
								type: "text",
								label: "编辑",
								icon: "",
								style: 'coloer:red;',
								buttonClick: this.rowOperation,
								isShow: (row, $index) => {
									return true;
								}
							}, {
								type: "text",
								label: "删除",
								icon: "",
								color: 'blue',
								buttonClick: undefined,
								isShow: (row, $index) => {
									return true;
								}
							}, {
								type: "primary",
								label: "查看",
								icon: "",
								color: '',
								buttonClick: undefined,
								isShow: (row, $index) => {
									return true;
								}
							}]
						},

					],
				},
			}
		},
		methods: {
			rowOperation(row, $index) {
				console.log(row, $index)
			},
			switchChange(row, $index, prop) {
				console.log(row, $index, prop)
			},
			rowClick(row, column, event) {
				// 点击行触发，编辑点击的所在列，排除selection选择框
				if (column && this.columnObj.columnData[column.index].editRow === null) {
					this.columnObj.columnData[column.index].editRow = row.rowIndex;
				}
			},
			editInputBlur(row, $index, prop, columIndex) {
				this.columnObj.columnData[columIndex].editRow = null;
			},
			//页码变化
			handleCurrentChange(e) {
				this.pageObj.pageData.page = e;
			},
			//条数变化
			handleSizeChange(e) {
				this.pageObj.pageData.size = e;
				this.pageObj.pageData.page = 1;
			},
		},
	}
</script>
<style lang="scss">
</style>
```
