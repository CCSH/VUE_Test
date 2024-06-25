<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <common-aside />
      </el-aside>
      <el-container>
        <el-header>
          <common-header />
        </el-header>
        <common-tag />
        <el-main>
          <!-- 路由出口 -->
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </el-main>
        <el-footer style="height: 40px">
          <p>Copyright © {{ year }} CCSH</p>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTag from '@/components/CommonTag.vue'
export default {
  data() {
    return {}
  },
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
  computed: {
    year: function () {
      return new Date().getFullYear()
    },
  },
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}

.el-container {
  background-color: #eee;
}

.el-main {
  padding: 0 20px;
}

.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  margin-top: 20px;
  p {
    line-height: 40px;
  }
}
</style>
