<template>
  <div>
    <quill-editor
      v-model:value="state.content"
      :options="state.editorOption"
      :disabled="state.disabled"
      @change="onEditorChange($event)"
    >
    </quill-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
// import { quillEditor, Quill } from 'vue3-quill'
import { quillEditor, Quill } from '@/components/vue3-quill/index.ts'
import ImageUploader from 'quill-image-uploader'
Quill.register('modules/imageUploader', ImageUploader)

export default defineComponent({
  name: 'Editor',
  components: {
    quillEditor
  },
  setup() {
    const state = reactive({
      content: '<p>2333</p><div>hello</div>',
      editorOption: {
        placeholder: 'core',
        modules: {
          toolbar: [
            [{ header: [1, false] }],
            ['image']
          ],
          imageUploader: {
            upload: (file: any) => {
              console.log(file)
              return new Promise((resolve, reject) => {
                console.log(reject)
                // todo 此处需要上传阿里云，然后
                setTimeout(() => {
                  resolve(
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png'
                  )
                }, 3500)
              })
            }
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          }
        }
      },
      disabled: false
    })

    const onEditorChange = ({ quill, html, text }: any) => {
      console.log('editor change!', quill, html, text)
      // state.content = html
    }
    return {
      state,
      onEditorChange
    }
  }
})
</script>
