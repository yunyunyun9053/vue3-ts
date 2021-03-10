### 使用方法
> 模版
``` html
  <quill-editor
    v-model:value="state.content"
    :options="state.editorOption"
    :disabled="state.disabled"
    @change="onEditorChange($event)"
  />
```

``` ts
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { quillEditor, Quill } from '@/components/vue3-quill'
import ImageUploader from "quill-image-uploader"
Quill.register("modules/imageUploader", ImageUploader)

export default defineComponent({
  name: 'Editor',
  components: {
    quillEditor
  },
  setup() {
    const state = reactive({
      content: '<p>2333</p><div>hello</div>', // 初始内容在这里填入，然后外部获取也是获取改字段
      editorOption: {
        placeholder: 'core',
        modules: {
          toolbar: [ // 这里可以定制工具栏，下面的例子里，是允许h1标签和p（就是header那行），还有选择图片
            [{ header: [1, false] }],
            ['image']
          ],
          imageUploader: { // 这里是处理选完图图片上传的
            upload: (file: any) => {
              console.log(file)
              return new Promise((resolve, reject) => {
                console.log(reject)
                // todo 此处需要上传阿里云，然后
                setTimeout(() => {
                  resolve(
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
                  );
                }, 3500);
              });
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
```