<template>
	<div>
		<el-button
			@click="
				() => {
					$store.dispatch('data/actionData', { name: 'ccsh' })
					$forceUpdate()
				}
			">
			设置存储信息
		</el-button>
		<el-button
			@click="
				() => {
					$store.commit('data/hanldeData', { name: null })
					$forceUpdate()
				}
			">
			清除存储信息
		</el-button>
		<p>存储内容：{{ saveData.name }}</p>
	</div>
</template>

<script>
export default {
	computed: {
		saveData() {
			return this.$store.state.data.data
		},
	},
}
</script>
