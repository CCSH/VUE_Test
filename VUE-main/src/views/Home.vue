<template>
	<div class="home">
		<el-row>
			<el-col :span="8" style="padding-right: 10px">
				<el-card class="box-card" shadow="hover">
					<div class="user">
						<img src="http://i.pravatar.cc/150" alt="" />
						<div class="user-info">
							<p class="name">{{ userInfo.info }}</p>
							<p class="access">
								{{ userInfo.info === 'admin' ? '超级管理员' : '普通用户' }}
							</p>
						</div>
					</div>
					<div class="login-info">
						<p>
							上次登录时间：
							<span>2022-02-02</span>
						</p>
						<p>
							上次登录地点：
							<span>北京</span>
						</p>
					</div>
				</el-card>

				<el-card class="table">
					<el-table :data="tableData" style="width: 100%">
						<el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val" />
					</el-table>
				</el-card>
			</el-col>
			<el-col :span="16" style="padding-left: 10px">
				<div class="num">
					<el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: '0px' }">
						<i class="el-icon-star-on icon" :style="{ background: item.color }" />
						<div class="detail">
							<p class="price">¥{{ item.value }}</p>
							<p>{{ item.name }}</p>
						</div>
					</el-card>
				</div>
				<el-card shadow="always" :body-style="{ padding: '10px' }" style="height: 280px">
					<div ref="echarts1" style="height: 260px"></div>
				</el-card>
				<div class="graph">
					<el-card shadow="always" :body-style="{ padding: '10px' }">
						<div ref="echarts2" style="height: 240px"></div>
					</el-card>
					<el-card shadow="always" :body-style="{ padding: '10px' }">
						<div ref="echarts3" style="height: 240px"></div>
					</el-card>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { requestList } from '@/api'
import * as echarts from 'echarts'
import Cookie from 'js-cookie'

export default {
	data() {
		return {
			tableData: [
				{
					name: '手机1',
					todayBuy: 100,
					monthBuy: 300,
					totalBuy: 800,
				},
				{
					name: '手机2',
					todayBuy: 200,
					monthBuy: 500,
					totalBuy: 800,
				},
				{
					name: '手机3',
					todayBuy: 100,
					monthBuy: 300,
					totalBuy: 800,
				},
				{
					name: '手机4',
					todayBuy: 100,
					monthBuy: 300,
					totalBuy: 800,
				},
				{
					name: '手机5',
					todayBuy: 100,
					monthBuy: 300,
					totalBuy: 800,
				},
				{
					name: '手机6',
					todayBuy: 100,
					monthBuy: 300,
					totalBuy: 800,
				},
			],
			tableLabel: {
				name: '品牌',
				todayBuy: '日销量',
				monthBuy: '月销量',
				totalBuy: '总销量',
			},
			countData: [
				{
					name: '名字1',
					value: 100,
					color: '#2ec7c9',
				},
				{
					name: '名字2',
					value: 300,
					color: '#2ec779',
				},
				{
					name: '名字3',
					value: 110,
					color: '#2e37c9',
				},
				{
					name: '名字4',
					value: 103,
					color: '#2ec766',
				},
				{
					name: '名字5',
					value: 150,
					color: '#24c7c9',
				},
				{
					name: '名字6',
					value: 180,
					color: '#1ec7c9',
				},
			],
		}
	},
	mounted() {
		requestList()
			.then(res => {
				// 折线图
				// 基于准备好的dom，初始化echarts实例
				var echarts1 = echarts.init(this.$refs.echarts1)
				// 指定图表的配置项和数据
				var echarts1Option = {}

				const info = this.tableData
				var xAxis = []
				info.forEach((item, index) => {
					xAxis.push(item['name'])
				})
				var xAxisData = { data: xAxis }
				echarts1Option.series = []
				xAxis.forEach(key => {
					var series = []
					for (let index = 0; index < info.length; index++) {
						series.push(Math.floor(Math.random() * 100))
					}
					echarts1Option.series.push({
						type: 'line',
						name: key,
						data: series,
					})
				})
				echarts1Option.yAxis = {}
				echarts1Option.xAxis = xAxisData
				echarts1Option.legend = xAxisData

				// 使用刚指定的配置项和数据显示图表。
				echarts1.setOption(echarts1Option)

				// 柱状图
				// 基于准备好的dom，初始化echarts实例
				var echarts2 = echarts.init(this.$refs.echarts2)
				// 指定图表的配置项和数据
				var echarts1Option = {}

				var xAxis = []
				for (let index = 0; index < 4; index++) {
					xAxis.push('名字' + Math.floor(Math.random() * 10))
				}
				var xAxisData = { data: xAxis }
				echarts1Option.series = []
				xAxis.forEach(key => {
					var series = []
					for (let index = 0; index < 4; index++) {
						series.push(Math.floor(Math.random() * 100))
					}
					echarts1Option.series.push({
						type: 'bar',
						name: key,
						data: series,
					})
				})
				echarts1Option.yAxis = {}
				echarts1Option.xAxis = xAxisData
				echarts1Option.legend = xAxisData

				// 使用刚指定的配置项和数据显示图表。
				echarts2.setOption(echarts1Option)

				// 饼状图
				// 基于准备好的dom，初始化echarts实例
				var echarts3 = echarts.init(this.$refs.echarts3)
				// 指定图表的配置项和数据
				var echarts1Option = {}
				echarts1Option.series = []
				var series = []
				for (let index = 0; index < 4; index++) {
					series.push({
						value: 20 + Math.floor(Math.random() * 100),
						name: '产品' + Math.floor(Math.random() * 4),
					})
				}
				echarts1Option.series.push({
					type: 'pie',
					data: series,
				})

				// 使用刚指定的配置项和数据显示图表。
				echarts3.setOption(echarts1Option)
			})
			.catch(err => {
				console.log('ccsh', err)
			})
	},
	methods: {},
	computed: {
		userInfo() {
			return JSON.parse(Cookie.get('userInfo')) || this.$store.state.user.userInfo
		},
	},
}
</script>

<style lang="less" scoped>
@content-height: calc(100vh - (60px + 64px + 20px + 40px));
.home {
	overflow: auto;
	height: @content-height;
}
.user {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	margin-bottom: 20px;
	border-bottom: 1px solid #ccc;
	img {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		margin-right: 40px;
	}
	.user-info {
		.name {
			font-size: 32px;
			margin-bottom: 10px;
		}
		.access {
			color: #999;
		}
	}
}

.login-info {
	line-height: 28px;
	font-size: 14px;
	color: #999;
	span {
		margin-left: 60px;
		color: #666;
	}
}

.table {
	margin-top: 20px;
	height: 460px;
}

.num {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	i {
		width: 80px;
		height: 80px;
		font-size: 30px;
		color: white;
		line-height: 80px;
		text-align: center;
	}
	.detail {
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #999;
		font-size: 14px;
		margin-left: 15px;
		.price {
			font-size: 30px;
			margin-bottom: 10px;
			color: black;
			line-height: 30px;
			height: 30px;
		}
	}
	.el-card {
		width: 32%;
		margin-bottom: 20px;
	}
}

.graph {
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
	.el-card {
		height: 260px;
		width: 48%;
	}
}
</style>
