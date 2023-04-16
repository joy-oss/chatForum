<template>
    <div>  <!-- 富文本编辑器, 容器 -->
        <div id="J_quillEditor">
       </div>
    <el-upload
    :show-file-list="false"
    class="upload-demo"
    action="http://api_devss.wanxikeji.cn/api/savePic"
       method="post"
       name="img"
       :multiple="true"
       :limit="3"
    :before-upload="beforeAvatarUpload"
    :on-success="uploadImgSuccess"
  >
  <el-button type="primary" id="btn" v-show="false"></el-button>
  </el-upload>
</div>
</template>

<script>
import Quill from "quill";              //引入模块
import 'quill/dist/quill.snow.css'      //引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'

export default {
    name: "Quill",
    data() {
        return {
            reason: '',
            img:'',
            quillEditor: null,
            quillEditorToolbarOptions: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block", "image"],
                [
                    {
                        header: 1,
                    },
                    {
                        header: 2,
                    },
                ],
                [
                    {
                        list: "ordered",
                    },
                    {
                        list: "bullet",
                    },
                ],
                [
                    {
                        script: "sub",
                    },
                    {
                        script: "super",
                    },
                ],
                [
                    {
                        indent: "-1",
                    },
                    {
                        indent: "+1",
                    },
                ],
                [
                    {
                        direction: "rtl",
                    },
                ],
                [
                    {
                        size: ["small", false, "large", "huge"],
                    },
                ],
                [
                    {
                        header: [1, 2, 3, 4, 5, 6, false],
                    },
                ],
                [
                    {
                        color: [],
                    },
                    {
                        background: [],
                    },
                ],
                [
                    {
                        font: [],
                    },
                ],
                [
                    {
                        align: [],
                    },
                ],
                ["clean"],
            ],
        }
    },
    mounted() {
        this.quillEditorHandle();
    },
    methods: {
        // 富文本编辑器
        quillEditorHandle() {
            this.quillEditor = new Quill("#J_quillEditor", {
                modules: {
                    toolbar: this.quillEditorToolbarOptions,
                },
                theme: "snow",
            });
            // 自定义上传图片功能 (使用element upload组件)
            this.quillEditor.getModule("toolbar").addHandler("image", () => {
                // 自定义上传图片事件
                console.log('点击上传图片触发')
                document.querySelector("#btn").click()
            });

            // 监听内容变化，动态赋值
            this.quillEditor.on("text-change", () => {
                this.reason = this.quillEditor.root.innerHTML;
                 this.$emit('richcons', this.reason)
            });
        },
     beforeAvatarUpload(rawFile) {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
},
uploadImgSuccess(res){
console.log(res)
const imgnode=document.createElement('img')
imgnode.id='createimg'
imgnode.src=`http://api_devss.wanxikeji.cn/${res.data}`
imgnode.style.width='600px'
imgnode.style.height='500px'
this.quillEditor.root.append(imgnode)
}
}
}
</script>

<style scoped>
.ql-editor #createimg{
width: 100px;
height: 100px;
}
</style>

