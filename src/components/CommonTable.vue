<template>
  <div class="z-table-div">
    <!-- 表格 -->
    <el-table
      :data="tableData"
      :height="tableObj.height"
      :max-height="tableObj.maxHeight"
      :stripe="tableObj.stripe"
      :border="tableObj.border"
      :size="tableObj.size"
      :fit="tableObj.fit"
      :show-header="tableObj.showHeader"
      :highlight-current-row="tableObj.highlightCurrentRow"
      :current-row-key="tableObj.currentRowKey"
      :row-class-name="tableObj.rowClassName || rowClassName"
      :row-style="tableObj.rowStyle"
      :cell-class-name="tableObj.cellClassName"
      :cell-style="tableObj.cellStyle"
      :header-row-class-name="tableObj.headerRowClassName"
      :header-row-style="tableObj.headerRowStyle"
      :header-cell-class-name="tableObj.headerCellClassName"
      :header-cell-style="tableObj.headerCellStyle || headerCellStyle"
      :row-key="tableObj.rowKey"
      :empty-text="tableObj.emptyText"
      :default-expand-all="tableObj.defaultExpandAll"
      :expand-row-keys="tableObj.expandRowKeys"
      :default-sort="tableObj.defaultSort"
      :tooltip-effect="tableObj.tooltipEffect"
      :show-summary="tableObj.showSummary"
      :sum-text="tableObj.sumText"
      :summary-method="tableObj.summaryMethod"
      :span-method="tableObj.spanMethod"
      :select-on-indeterminate="tableObj.selectOnIndeterminate"
      :indent="tableObj.indent"
      :lazy="tableObj.lazy"
      :load="tableObj.load"
      :tree-props="tableObj.treeProps"
      v-loading="tableObj.loading"
      @row-click="rowClick"
    >
      <!-- 选择框是否开启，selectable控制是否单行禁止选中 -->
      <el-table-column
        v-if="columnObj.selection"
        type="selection"
        :selectable="columnObj.selectable"
        width="50px"
      />
      <!-- 序号 -->
      <el-table-column v-if="columnObj.index" type="index"> </el-table-column>
      <!-- 普通列 -->
      <el-table-column
        v-for="(column, columIndex) in columnObj.columnData"
        :key="columIndex"
        :index="columIndex"
        :column-key="column.columnKey"
        :label="column.label"
        :prop="column.prop"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :render-header="column.renderHeader"
        :sortable="column.sortable"
        :sort-method="column.sortMethod"
        :sort-by="column.sortBy"
        :sort-orders="column.sortOrders"
        :resizable="column.resizable"
        :formatter="column.formatter"
        :show-overflow-tooltip="column.showOverflowTooltip || true"
        :align="column.align || 'center'"
        :header-align="column.headerAlign"
        :class-name="column.className"
        :label-class-name="column.labelClassName"
        :reserve-selection="column.reserveSelection"
        :filters="column.filters"
        :filter-placement="column.filterPlacement"
        :filter-multiple="column.filterMultiple"
        :filter-method="column.filterMethod"
        :filtered-value="column.filteredValue"
      >
        <template slot-scope="{ row, $index }">
          <!-- 默认展示 -->
          <span v-if="column.text && column.editRow != $index">{{
            row[column.prop]
          }}</span>
          <!-- 自定义内容 -->
          <template v-if="column.ownDefined">
            <slot
              :name="column.prop || 'default'"
              :index="$index"
              :row="row"
              :column="column"
            >
              <span>
                {{ column.ownDefinedReturn(row, $index) }}
              </span>
            </slot>
          </template>
          <!-- 状态对象展示 -->
          <span v-if="column.status && row[column.prop]">{{
            row[column.prop].msg
          }}</span>
          <!-- switch开关 -->
          <el-switch
            v-if="column.switch"
            v-model="row[column.prop]"
            :inactive-text="
              row[column.prop] ? column.openText : column.closeText
            "
            @change="switchChange(row, $index, column.prop)"
          />
          <!-- 图片展示 -->
          <el-popover trigger="hover" placement="top" popper-class="popper">
            <img v-if="column.image" :src="row[column.prop]" />
            <el-image
              slot="reference"
              v-if="column.image"
              :src="row[column.prop]"
            />
          </el-popover>
          <!-- 图片数组 -->
          <el-popover
            v-if="column.imageArr"
            trigger="hover"
            placement="top"
            popper-class="popper"
          >
            <img
              v-if="row[column.prop].length > 0"
              :src="row[column.prop][0]"
            />
            <el-image
              slot="reference"
              v-if="row[column.prop].length > 0"
              :src="row[column.prop][0]"
              :preview-src-list="row[column.prop]"
            />
          </el-popover>
          <!-- 可编辑input，仅在text默认展示类型才可编辑-->
          <el-input
            v-focus
            v-if="column.editRow == $index"
            v-model="row[column.prop]"
            @blur="editInputBlur(row, $index, column.prop, columIndex)"
          />
          <!-- 操作按钮 -->
          <template v-if="column.isOperation">
            <span v-for="(operations, index) in column.operation" :key="index">
              <el-button
                v-if="operations.isShow(row, $index)"
                :icon="operations.icon"
                :type="operations.type"
                @click="operations.buttonClick(row, $index)"
                :style="operations.style"
                :size="operations.size || 'mini'"
              >
                {{ operations.label }}
              </el-button>
            </span>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div
      class="z-page-div"
      :style="{ textAlign: pageObj.position || 'center' }"
    >
      <el-pagination
        :small="pageObj.small"
        :background="pageObj.background"
        :page-size="pageObj.pageData.size"
        :total="pageObj.total"
        :page-count="pageObj.page"
        :pager-count="pageObj.page"
        :current-page="pageObj.pageData.page"
        :layout="pageObj.layout || layout"
        :page-sizes="pageObj.pageSizes || [10, 15, 20, 30, 50]"
        :popper-class="pageObj.popperClass"
        :prev-text="pageObj.prevText"
        :next-text="pageObj.nextText"
        :disabled="pageObj.disabled"
        :hide-on-single-page="pageObj.hideOnSinglePage"
        @size-change="sizeChange"
        @current-change="currentChange"
        @prev-click="prevClick"
        @next-click="nextClick"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'z-el-table',
  directives: {
    // 自定义指令,用于可编辑input自动获取焦点
    focus: {
      inserted: function (e) {
        e.querySelector('input').focus()
      },
    },
  },
  props: {
    tableData: {
      type: Array,
      required: true,
    },

    // tableObj是table所有配置，集成了element自身所有配置，以及新增了一些个性化配置
    tableObj: {
      type: Object,
      default: () => {
        return {}
      },
    },

    // columnObj列配置选项，继承了element自身的所有配置，将选择框操作提出来在columnObj属性上，其他依然保留各自列
    //columnObj.type(如果为""空，就不会加载多选框，或者index编号),lazy(是否支持懒加载)
    //columnData.columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
    //prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
    //如果为操作列,则需要填写需要的操作按钮,类型为Object。type(按钮样式,参考el—botton类型),label(按钮文字)icon(参考el-icon),color(字体颜色),buttonClick为点击后调用的方法名称
    columnObj: {
      type: Object,
      required: true,
    },

    pageObj: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      headerCellStyle: {
        background: '#f5f7fa',
      },
      layout: 'total, sizes, prev, pager, next, jumper',
    }
  },
  methods: {
    // 设置默认行样式
    rowClassName({ row, rowIndex }) {
      row.rowIndex = rowIndex
      // if ((rowIndex + 3) % 3 == 0) {
      //   return 'success-row'
      // } else if ((rowIndex + 3) % 3 == 1) {
      //   return 'warning-primary'
      // } else if ((rowIndex + 3) % 3 == 2) {
      //   return 'warning-row'
      // }
    },
    // switchChange调用
    switchChange(row, $index, prop) {
      this.$emit('switchChange', row, $index, prop)
    },
    // 点击行
    rowClick(row, column, event) {
      this.$emit('rowClick', row, column, event)
    },
    // 可编辑input失去焦点
    editInputBlur(row, $index, prop, columIndex) {
      this.$emit('editInputBlur', row, $index, prop, columIndex)
    },
    // 条数变化,params每页条数
    sizeChange(e) {
      this.$emit('sizeChange', e)
    },
    // 页码变化,params当前页
    currentChange(e) {
      this.$emit('currentChange', e)
    },
    // 用户点击上一页按钮改变当前页后触发,params当前页
    prevClick(e) {
      this.$emit('prevClick', e)
    },
    // 用户点击下一页按钮改变当前页后触发	,params当前页
    nextClick(e) {
      this.$emit('nextClick', e)
    },
  },
}
</script>
<style lang="less" scoped>
// 列表div
.z-table-div {
  border: 1px #ebeef5 solid;
  .el-table__body-wrapper {
    height: calc(50% - 48px) !important; // 表格高度减去表头的高度
  }

  // 分页div
  .z-page-div {
    padding: 10px;
    background-color: white;
  }

  // table按钮间距
  .el-button {
    margin: 0 6px;
  }

  // 斑马纹颜色
  /deep/.el-table .warning-primary {
    background: #ecf5ff;
  }

  // 斑马纹颜色
  /deep/.el-table .warning-row {
    background: #fdf6ec;
  }

  // 斑马纹颜色
  /deep/.el-table .success-row {
    background: #f0f9eb;
  }

  // table图片高度
  /deep/.el-image__inner {
    height: 50px;
  }

  // switch左边文字颜色
  /deep/.el-switch__label--left {
    color: #606266;
  }

  // 预览图片高度
  img {
    height: 400px;
  }
}
</style>
