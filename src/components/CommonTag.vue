<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="actionMenu(item)"
      @close="actionClose(item, index)"
      size="small"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CommonTag',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      tags: (state) => state.user.tabList,
    }),
  },
  methods: {
    ...mapMutations(['closeMenu']),
    actionMenu(data) {
      this.$router.push(data)
    },
    actionClose(item, index) {
      const length = this.tags.length - 1
      this.closeMenu(item)

      if (item.name !== this.$route.name) {
        return
      }
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        })
      } else {
        this.$router.push({
          name: this.tags[index].name,
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.tabs {
  display: flex;
  padding: 20px;
  overflow: auto;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
