<template>
<div class="create">
        <div class="richtextf">
         <richtext class="richtext" @richcons="richconf"/>
        </div>
        <div class="richtextright" v-html="richcon">
        </div>
   <el-popover
        placement="bottom"
        title="发布文章"
        :width="600"
        trigger="click"
        :visible="visible"
       >
      <template #default>
           <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        size="default"
        status-icon
      >
      <el-form-item prop="type" label="分类">
          <el-radio-group v-model="ruleForm.type">
            <el-radio label='帖子' ></el-radio>
            <el-radio label='沸点'></el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item prop="tags"  label="添加标签">
          <el-select v-model="ruleForm.tags" class="m-2" placeholder="请搜索添加标签" size="large" multiple :change="selecTags">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      </el-form-item>
      <el-form-item label="文章封面">
          <el-upload
         class="avatar-uploader"
         action="http://api_devss.wanxikeji.cn/api/savePic"
         method="post"
         name="img"
        :multiple="true"
        :limit="3"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      </el-form-item>
      <el-form-item label='编辑摘要' prop="tips" >
        <textarea name="" id="" cols="30" rows="10" v-model="title"></textarea>
      </el-form-item>
          <el-form-item>
          <el-button @click="visible = false" >取消</el-button>
          <el-button @click="onSubmit" type="primary">确认并发布</el-button>
        </el-form-item>
    </el-form>
      </template>
        <template #reference>
           <el-button type="primary" @click="visible = true">发布</el-button>
        </template>
     </el-popover>
</div>
</template>

<script setup>
import {ref,getCurrentInstance} from 'vue'
import richtext from '../component/Richtext.vue'
import { Plus } from '@element-plus/icons-vue'
const {proxy}=getCurrentInstance()
let richcon=ref()
const value = ref('')
let type=ref(1)
let imageUrl=ref('')
let title=ref('')
const visible = ref(false)
function richconf(e){
richcon.value=e
}
const ruleForm=ref({
    type:'帖子',
    tags:[],
    tips:''
})
const rules = ref({
    type: [
        { required: true, message: 'Please select type', trigger: 'blur' },
    ],
    tags: [
        {
            type:'array',
            required: true,
            trigger: 'change',
        },
    ],
        tips: [
        {
            required: true,
            message: 'Please input tips',
            trigger: 'change',
        },
    ],
})
let options = []
proxy.$reqFunAxios('post','/api/tagRanking','',function(res){
const tagsres=res.data.data.map(item=>{return item.tag_name })
for(let i=0;i<tagsres.length;i++){
let obj={}
obj.value= tagsres[i]
obj.label = tagsres[i]
options.push(obj)
}
})
function handleAvatarSuccess(res) {
    console.log(res)
    imageUrl.value=res.data
    imageUrl.value = `http://api_devss.wanxikeji.cn/${res.data}`
}
console.log(value.value)
function onSubmit(){
    visible.value = false
    const info=richcon.value
    const token=window.localStorage.getItem('token')
    const type=ruleForm.value.type==='帖子'?1:2
      console.log(ruleForm.value.tags)
    if(token!==null){
        proxy.$reqFunAxios('post', 'api/addModifyArticle', { token: token, info: info, tags_name: ruleForm.value.tags, type: type,title:title.value },function(res){
            if(res.status===200){
                if(type==1){
                window.location.href='http://127.0.0.1:5173/index'
                }else if(type==2){
                window.location.href='http://127.0.0.1:5173/hotSpot'
                }
            ruleForm .value={
                    type: 1,
                    tags: [],
                    tips: ''
                }
          }  
        })
    }else{
        ElMessage({
            message: '请登录账户',
        })
    }
   
}
function selecTags(val){
    console.log(tags)
    ruleForm.value.tags=val
}

function beforeAvatarUpload(rawFile) {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
</script>

<style scoped>
.create{
    width: 1300px !important;
    padding:20px;
    margin-left:-250px;
    background-color: #ffffff;
    display: flex;
}
.richtextf{
    width: 700px;
    height:900px;
    background-color: #F4F5F5;
}
.richtext{
       height:800px
}
.richtextright{
    padding:0 10px;
    width:500px;
    word-break: break-all;
}
.el-button-group button{
    border:0;
    padding:5px 10px;
    background-color: #F4F5F5;
    border-radius: 2px;
    width: 80px;
    margin:0 5px;
}
.avatar-uploader,.avatar {
    width: 178px;
    height: 178px;
    display: block;
    border:solid 1px black;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
