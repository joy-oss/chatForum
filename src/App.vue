<script setup>
import { getCurrentInstance,ref,onMounted } from 'vue';
import { ElMessage } from 'element-plus'
const {proxy} =getCurrentInstance()
let dialogFormVisible=ref(false)
let dialogFormVisible2 = ref(false)
let isquit=ref(false)
let isnull=ref(false)
const form = ref({
name:'',
pw:''
})
let islg=ref(true)
function loginClick(){
     if (form.value.name === '' && form.value.name === '') {
    isnull.value = true
  }else{
    dialogFormVisible.value = false
    proxy.$reqFunAxios('post', '/api/login', { name: form.value.name, pw: form.value.name }, function (res) {
      console.log(res)
      if (res.status === 200) {
      if(res.data.code===2000){
          ElMessage({
            message: '您已成功登录',
            type: 'success',
          })
          islg.value = false
          const token = res.data.data.token
          window.localStorage.setItem('token', token)
          form.value = {
            name: '',
            pw: ''
          }
          }else{
            ElMessage({
            message: '用户不存在',
          })
          }
      }else{
        ElMessage.error("网络请求异常" + res.status)
      }
    })
  }
}
function registerClick(){
   console.log(form.value.name)
   if(form.value.name===''&& form.value.name===''){
     isnull.value=true
   }else{
        dialogFormVisible2.value = false
        proxy.$reqFunAxios('post', '/api/register', { name: form.value.name, pw: form.value.name }, function (res) {
          if (res.status === 200) {
          if(res.data.code===2000){
          ElMessage({
            message: '注册成功请返回登录',
            type: 'success',
          })
          form.value = {
            name: '',
            pw: ''
          }
          }else{
            ElMessage({
            message: '用户已存在',
          })
          }
      }else{
        ElMessage.error("网络请求异常"+res.status)
      }
    })
   }
}
function quitClick(){
  isquit.value=false
  islg.value=true
window.localStorage.removeItem('token')
}
onMounted(()=>{
  const token=localStorage.getItem('token')
  if(token!==null){
    islg.value=false
  }else{
    islg.value =true
  }
})
function jumptocreate(){
  proxy.$router.push({path:'/create'})
}
</script>
<template>
  <div class="nav">
  <img src="/logo.png" alt=""/><span>有聊论坛</span>
  <router-link to="/index"><span>首页</span></router-link><router-link to="/hotSpot"><span>沸点</span></router-link>
  <div class="navnor"><router-link to="/echartst"><span>Echarts</span></router-link></div>
  <div class="navnor">直播</div>
  <div class="navnor">活动</div>
  <div class="navnor">商城</div>
  <div class="navnor">APP</div>
  <div class="navnor">插件</div>
  <img class="discount" src="/nav/nav1.png" alt="">
  <div class="loginbar">
    <div class="navipt"><input type="text" placeholder="探索稀土掘金"><img src="/nav/sousuo.png" alt=""></div>
    <div class="cre"  @click="jumptocreate">创作者中心</div>
    <div class="vip"><img src="/nav/vip.png" alt="" @click="isquit=true">
      <span>会员</span>
      <span v-show="isquit"  @click="quitClick" style="margin-left:20px;">退出</span>
    </div>
    <div class="lgn" v-show="islg">
      <span @click="dialogFormVisible=true">登录</span>
      <span @click="dialogFormVisible2 = true">注册</span>
    </div>
  </div>
</div>
<div class="subnav"><div>综合</div>
<div>后端</div>
<div>Android</div>
<div>IOS</div>
<div>人工智能</div>
<div>开发工具</div>
<div>代码人生</div>
<div>阅读</div>
</div>
  <div class="chtspotcon"><router-view></router-view></div>
  <el-dialog v-model="dialogFormVisible" title="登录掘金享受更多权益" width="30%">
      <el-form :model="form">
        <el-form-item label="昵称">
          <el-input v-model="form.name" autocomplete="off" />
             <span v-show="isnull" type="info">请输入用户名</span>
        </el-form-item>
        <el-form-item label="密码 ">
            <el-input v-model="form.pw" autocomplete="off" />
             <span v-show="isnull">请输入密码</span>
          </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary"   @click="loginClick">
           登录
          </el-button>
        </span>
      </template>
    </el-dialog>
      <el-dialog v-model="dialogFormVisible2" title="登录掘金享受更多权益" width="30%">
        <el-form :model="form">
          <el-form-item label="昵称">
            <el-input v-model="form.name" autocomplete="off" />
            <span v-show="isnull" type="info">请输入用户名</span>
          </el-form-item>
          <el-form-item label="密码 ">
              <el-input v-model="form.pw" autocomplete="off" />
              <span v-show="isnull">请输入密码</span>
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取消</el-button>
            <el-button type="primary"   @click="registerClick">
             注册
            </el-button>
          </span>
        </template>
      </el-dialog>
</template>

<style scoped>
a{
  text-decoration: none;
  color:#746085;
}
a:link{
color:#000000;
}
a:visited{
  /* color:#649EFF; */
}
a:hover{
  color:#649EFF;
}
a:active{
  color:#649EFF;
}
.nav{
  padding:5px 60px 5px 60px;
}
.nav .navnor{
  margin-right:10px;
}
.nav,.loginbar,.subnav{
display:flex;
flex-flow:row nowrap;
justify-content: space-between;
align-items: center;
height:60px;
background-color: #FFFFFF;
border-bottom:solid 1px #F2F3F5;
}
.logo img{
width: 44px;
height: 25px;
vertical-align: middle;
}
.nav .discoun img{
display:block;
margin:3px;
width: 100px;
}
.loginbar{
  margin-left:150px;
  border:none;
}
.loginbar>div{
  margin-right:10px;
}
.navipt{
  position: relative;
  width: 200px;
  background-color: #F2F3F5;
}
.navipt>input{
  width: 160px;
  border:solid 1px #F2F3F5;
  margin:0;
  height:25px;
  padding-left:10px;
  border-radius: 2px;
}
.navipt img{
  position: absolute;
  top:7px;
  right:5px;
  width: 15px;
  height: 15px;
}
.subnav{
  height: 46px;
  padding:5px 200px 5px 290px;
  justify-content: flex-start;
  background-color: #FFFFFF;
}
.subnav>div{
  margin-right:20px
}
.loginbar .cre{
width: 100px;
height: 30px;
background-color: #649EFF;
color:#FFFFFF;
font-size: 12px;
text-align: center;
line-height: 30px;
border-radius: 2px;
}
.loginbar .vip{
  color:#CBCFD5;
}
.loginbar .vip img{
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
.loginbar .lgn{
  padding:3px 10px;
  border:solid 1px #649EFF;
  color:#649EFF;
  background-color: #F3F9FF;
  border-radius: 5px;
  font-size:14px;
}
.loginbar .lgn>span:nth-of-type(1){
padding-right:5px;
  border-right: 1px solid #649EFF;
}
.loginbar .lgn>span:nth-of-type(2){
  padding-left:5px;
}
.chtspotcon{
  width: 800px;
  margin:0 auto;
  margin-top:20px;
  background-color:  #F4F5F5;
  }
.el-form-item__content {
width: 325.3px;
}
</style>
