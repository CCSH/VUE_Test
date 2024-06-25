import { sex_data } from "./static_data.js";

export const user_add_config = [
  {
    input: true, //是input
    label: '姓名', //字段
    prop: 'name', //字段名
    placeholder: '请输入姓名', //提示内容
    width: 12, //参考el-col
    disabled: false, //是否禁用
    rules: [
      {
        required: true,
        message: '请输入姓名',
      },
    ],
  },
  {
    input: true, //是input
    label: '年龄', //字段
    prop: 'age', //字段名
    placeholder: '请输入年龄', //提示内容
    width: 12, //参考el-col
    disabled: false, //是否禁用
    rules: [
      {
        required: true,
        message: '请输入年龄',
      },
    ],
  },
  {
    select: true,
    label: '性别',
    prop: 'sex',
    placeholder: '选择性别',
    width: 12, //参考el-col
    disabled: false,
    options: sex_data,
    rules: [
      {
        required: true,
        message: '请选择性别',
      },
    ],
  },
  {
    datePicker: true,
    label: '生日',
    prop: 'date',
    placeholder: '请选择',
    width: 12, //参考el-col
    disabled: false,
    options: '',
    rules: [
      {
        required: true,
        message: '请选择生日',
      },
    ],
  },
  {
    input: true, //是input
    label: '地址', //字段
    prop: 'address', //字段名
    placeholder: '请输入', //提示内容
    // width: 24, //参考el-col
    disabled: false, //是否禁用
    rules: [
      {
        required: true,
        message: '请输入地址',
      },
    ],
  },
]