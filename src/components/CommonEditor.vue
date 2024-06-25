<template>
  <div class="editor">
    <quill-editor v-model="editorContent" :options="editorOption">
    </quill-editor>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      editorContent: '',
      editorOption: {
        placeholder: '请输入编辑内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean'],
          ],
        },
      },
    }
  },
  methods: {
    // 暴露给上级组件，获取编辑器内容
    getEditorContent() {
      return this.editorContent
    },
  },
}
</script>
<style lang="less" scoped>

</style>
