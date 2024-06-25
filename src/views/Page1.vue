<template>
	<div>Page1{{ name }}</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	computed: {
		name() {
			return this.displayName(1, [{ label: '哈哈', value: 1 }])
		},
	},
}
</script>

<style lang="less" scoped></style>
