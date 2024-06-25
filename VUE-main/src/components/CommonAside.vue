<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.name"
      :index="item.name"
      @click="actionMenu(item)"
    >
      <i class="el-icon-s-home"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="item.label"
    >
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="obj in item.children" :key="obj.path">
        <el-menu-item :index="obj.path" @click="actionMenu(obj)">{{
          obj.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from 'js-cookie'
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    actionMenu(item) {
      console.log(item)
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === '/home' && item.path === '/')
      ) {
        this.$router.push(item.path)
        this.$store.commit('selectMenu', item)
      }
    },
  },

  computed: {
    ...mapState({
      isCollapse: (state) => state.user.isCollapse,
    }),
    noChildren() {
      return this.menuData.filter((item) => !item.children)
    },
    hasChildren() {
      return this.menuData.filter((item) => item.children)
    },
    menuData() {
      return JSON.parse(Cookie.get('menu')) || this.$store.state.user.menu
    },
  },
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu {
  height: 100vh;
  border-width: 0;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
