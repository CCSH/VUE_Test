<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
import hlw_tracking_point from "./utils/hlw_tracking.min.js"
export default {
  name: 'App',
  data() {
    return {}
  },
  /**
   * Executes before the instance is created. Intended for advanced initialization.
   *
   * @return {void} Nothing is returned from this function
   */
  beforeCreate() {
    //在创建实例之前执行。用于高级初始化。
  },
  /**
   * Initialize component properties and APIs, and render the view on page load.
   *
   * @return {void}
   */
  created() {
    //初始化组件属性和api，并在页面加载时呈现视图。
  },
  /**
   * Called before the component is mounted. This is the last time to modify
   * the component before rendering. Generally, it is used to initialize
   * third-party libraries and similar tasks. It is not recommended to modify
   * the component's DOM structure at this point.
   *
   * @param {type} N/A - No parameters.
   * @return {type} N/A - No return value.
   */
  beforeMount() {
    //在组件安装前调用。这是最后一次修改渲染前的组件。通常，它用于初始化第三方库和类似任务。不建议修改此时组件的DOM结构。
  },
  /**
   * Executes when the page is mounted and ready to be inserted into the DOM.
   * This is a lifecycle method that is called during its corresponding lifecycle.
   * For example: it can be used for data initialization.
   *
   * @param {type} N/A - no parameters.
   * @return {type} N/A - no return value.
   */
  mounted() {
    console.log("##############mounted##########")
    let params = {
      tenant_id: '000',
      isAuto: true,
      touch_id: 'LYH',
      login_num: '15145090813',
      action: 'view',
      obj_type: 'item',
    }
    //被动埋点调⽤
    hlw_tracking_point.listenPath(params);
    //当页面被挂载并准备插入DOM时执行。这是一个生命周期方法，在其相应的生命周期中被调用。例如:可用于数据初始化。
    this.requestList()
  },
  /**
   * Updates the component with new data before rendering.
   *
   * This function is called before the component is re-rendered with updated data.
   *
   * @return {void}
   */
  beforeUpdate() {
    //在渲染前用新数据更新组件。此函数在用更新后的数据重新渲染组件之前调用。
  },
  /**
   * Executes when the component is updated.
   *
   * @param None
   * @return None
   */
  updated() {
    //在组件更新时执行。
  },
  /**
   * Executes before the component is destroyed.
   *
   * @param none
   * @return none
   */
  beforeDestroy() {
    //在组件被销毁之前执行。
  },
  /**
   * Called after the component is destroyed.
   *
   * @param None
   * @return None
   */
  destroyed() {
    //在组件销毁后调用。
  },
  computed: {
    //计算属性，在HTML DOM加载后立即执行。例如，当分配数据时，计算属性立即执行。计算属性是自动的。
    //tableData(){return []}
  },
  watch: {
    //绑定到Vue实例的监视程序。它必须具有触发条件才能执行，例如属性更改。
    //tableData(newVal, oldVal) {},
  },
  methods: {
    //方法是Vue实例对象上绑定的方法。methods必须要有一定的触发条件才能执行。例如按钮点击。接口请求。
    requestList() {
    },
  },
}
</script>

<style lang="less">
html,
body,
h3,
p {
  margin: 0;
  padding: 0;
}
</style>
