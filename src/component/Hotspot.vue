<template>
  <div class="hotspot">
<div class="firstdiv">
<div class="inputrow">
    <div id='div' contenteditable="true" @click="sonclick" @change="change" @input="change" @blur="getFocus">快和掘友一起分享新鲜事！告诉你个小秘密，发布沸点时添加圈子和话题会被更多掘友看到哦～</div>
    <div class="tagselect">
        <div @click.stop="tagclick" class="select" id="tagsitem"><span>请选择圈子(最多选十个标签哦)</span></div>
         <div class="tags" v-if="tagshow" >
         <div v-for="item in newtag[0]" @click="tagitemclick(item)">
          <span>{{item}}</span>
         </div>
        </div>
    </div>
</div>
   <div class="emorow">
     <div class="emodiv"><img src="/index/biaoqing.png" alt="" @click="embtnClick"><span>表情</span>
       <div class="svgemo" v-if="emoshow" @click="emoClick">
  <svg class="icon" aria-hidden="false">
               <use xlink:href="#icon-angel"
                   id="1"></use>
           </svg>
           <svg class="icon" aria-hidden="false">
               <use xlink:href="#icon-angry-"
                   id="2"></use>
           </svg>
           <svg class="icon" aria-hidden="false">
               <use xlink:href="#icon-angry-1"
                   id="3"></use>
           </svg>
           <svg class="icon" aria-hidden="false">
               <use xlink:href="#icon-baby-"
                   id="4"></use>
           </svg>
           <svg class="icon" aria-hidden="false">
               <use xlink:href="#icon-bully"
                   id="5"></use>
           </svg>
           <svg class="icon" aria-hidden="false">
               <use xlink:href="#icon-burglar"
                   id="6"></use>
           </svg>
                   <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-confused-"
                       id="7"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-crying-"
                       id="8"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-dazed-"
                       id="9"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-dead"
                       id="10"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-dead-"
                       id="11"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-gentleman"
                       id="12"></use>
               </svg>
                       <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-geek-"
                       id="13"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-goofy"
                       id="14"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-goofy-"
                       id="15"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-goofy-1"
                       id="16"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-happy-"
                       id="17"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-in-love-"
                       id="18"></use>
               </svg>
                       <svg class="icon" aria-hidden="false">
                       <use xlink:href="#icon-joyful-"
                           id="19"></use>
                   </svg>
                   <svg class="icon" aria-hidden="false">
                       <use xlink:href="#icon-laughing-"
                           id="20"></use>
                   </svg>
                   <svg class="icon" aria-hidden="false">
                       <use xlink:href="#icon-nerd-"
                           id="21"></use>
                   </svg>
                   <svg class="icon" aria-hidden="false">
                       <use xlink:href="#icon-sad-"
                           id="22"></use>
                   </svg>
                   <svg class="icon" aria-hidden="false">
                       <use xlink:href="#icon-sick-"
                           id="23"></use>
                   </svg>
                   <svg class="icon" aria-hidden="false">
                       <use xlink:href="#icon-thinking"
                           id="24"></use>
                   </svg>
       </div>
     </div>
     <div><el-upload class="upload-demo"
              action="http://api_devss.wanxikeji.cn/api/savePic"
              method="post"
              name="img"
              :multiple="true"
              :limit="3"
              :before-upload="beforeAvatarUpload"
               :on-success="firstLevimg"
               :show-file-list='false'
            >
                <div style="display:flex"><el-icon size="20">
                      <Picture />
                 </el-icon>
                  <div style="margin-left:5px;margin-top:-1px">图片</div></div>
            </el-upload></div>
     <div><img src="/index/lianjie.png" alt=""><span>链接</span></div>
     <div><img src="/index/huati.png" alt=""><span>话题</span></div>
   </div>
   <div class="publish" @click="publishClick">发布</div>
</div>
<div class="hotspotlist">
 <div v-for="item,index in hotlst" class="hotitem">
<div class="headrow">
  <img src="/index/default.png/" alt="" v-show="item.icon=== null">
   <img :src="item.icon" alt="" v-show="item.icon !== null">
  <div class="spotinfo">
    <div><span>{{ item.nick_name}}</span></div>
    <div><span>{{ item.created_at}}</span></div>
    <div v-html="item.info" class="spotconinfo"></div>
    <div class="spotags">
      <span v-for="item in item.tags">{{ item.tag_name }}</span></div>
  </div>
</div>
   <div class="comtrow" @click="comshowClick(index)">
     <div><img src="/index/fenxiang.png" alt=""><span>分享</span></div>
     <div><img src="/index/pinglun.png" alt=""><span @click="replyClick2(e,item,index)">评论</span></div>
     <div><img src="/index/dianzan.png" alt=""><span>点赞</span></div>
   </div>
    <div class="secondreplay">
   <div class="inputrow" v-show="item.article_id===article_id2">
   <div class="commall">
   <div contenteditable="true" class="cmtinput cmtinput2" :id="'div'+index"  @click="sonclick" @change="change" @input="change" @blur="getFocus">输入评论（Enter换行，Ctrl + Enter发送）</div>
   <div class="sendimg sendimg2">
   <div id="emorow emrow2">
   <div style="margin-left:30px;position: relative;width: 200px;">
   <img src="/index/biaoqing.png" alt="" @click="embtnClick2" class="emo2"><span>表情</span>
      <el-upload class="upload-demo upload-demo2"
       action="http://api_devss.wanxikeji.cn/api/savePic"
       method="post"
       name="img"
       :multiple="true"
       :limit="3"
       :before-upload="beforeAvatarUpload"
       :on-success="secLevimg1"
       :show-file-list="false"
       >
       <div style="display:flex;margin-left:10px" @click="uploadsecimg1(index)"><el-icon size="20">
       <Picture />
      </el-icon>
      <div style="margin-left:5px;margin-top:-1px">图片</div></div>
       </el-upload>
    <div class="svgemo svgmo2" v-if="emoshow2" @click="emoClick2($event,index)">
 <svg class="icon" aria-hidden="false">
  <use xlink:href="#icon-angel"
                   id="1"></use>
           </svg>
           <svg class="icon" aria-hidden="false">
               <use xlink:href="#icon-angry-"
                   id="2"></use>
           </svg>
           <svg class="icon" aria-hidden="false">
               <use xlink:href="#icon-angry-1"
                   id="3"></use>
           </svg>
           <svg class="icon" aria-hidden="false">
               <use xlink:href="#icon-baby-"
                   id="4"></use>
           </svg>
           <svg class="icon" aria-hidden="false">
               <use xlink:href="#icon-bully"
                   id="5"></use>
           </svg>
           <svg class="icon" aria-hidden="false">
               <use xlink:href="#icon-burglar"
                   id="6"></use>
           </svg>
                   <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-confused-"
                       id="7"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-crying-"
                       id="8"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-dazed-"
                       id="9"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-dead"
                       id="10"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-dead-"
                       id="11"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-gentleman"
                       id="12"></use>
               </svg>
                       <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-geek-"
                       id="13"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-goofy"
                       id="14"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-goofy-"
                       id="15"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-goofy-1"
                       id="16"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-happy-"
                       id="17"></use>
               </svg>
               <svg class="icon" aria-hidden="false">
                   <use xlink:href="#icon-in-love-"
                       id="18"></use>
               </svg>
                       <svg class="icon" aria-hidden="false">
                       <use xlink:href="#icon-joyful-"
                           id="19"></use>
                   </svg>
                   <svg class="icon" aria-hidden="false">
                       <use xlink:href="#icon-laughing-"
                           id="20"></use>
                   </svg>
                   <svg class="icon" aria-hidden="false">
                       <use xlink:href="#icon-nerd-"
                           id="21"></use>
                   </svg>
                   <svg class="icon" aria-hidden="false">
                       <use xlink:href="#icon-sad-"
                           id="22"></use>
                   </svg>
                   <svg class="icon" aria-hidden="false">
                       <use xlink:href="#icon-sick-"
                           id="23"></use>
                   </svg>
                   <svg class="icon" aria-hidden="false">
                       <use xlink:href="#icon-thinking"
                           id="24"></use>
                   </svg>
   </div>
   </div>
   <el-button class='send send2' type="primary" @click="submitUpload2(item,index)">
       发表评论
   </el-button>
       </div>
       </div> 
      </div>
      </div>
      </div>
      <div class="hotspotcomment" v-show="showcomment===index">
        <div v-for="item,iidex in item.comment" class="hotcommitem">
        <img :src="item.icon" alt="" class="hotcommhead">
        <div>
          <div>{{item.nick_name}}</div>
          <div>{{item.created_at}}</div>
          <!-- {{ chatlst[index][iidex] }} -->
          <div v-html="chatlst[index][iidex]"  v-show="Object.prototype.toString.call(chatlst[index][iidex]) === '[object String]'"></div>
          <div v-html="chatlst[index][iidex].info"  v-show="Object.prototype.toString.call(chatlst[index][iidex]) === '[object Object]'"></div>
        </div>
        </div>
      </div>
 </div>
  </div>
  </div>
</template>

<script setup>
import '../assets/font/iconfont.js'
import '../assets/font/iconfont.css'
import { getCurrentInstance ,ref,onMounted} from "vue"
import { ElMessage } from 'element-plus'
import { Picture } from '@element-plus/icons-vue'
let { proxy } = getCurrentInstance()
const emoshow=ref(false)
const page = ref(1)
const all = ref(0)
const hotlst=ref([])
let newtag=ref([])
let tags_name=ref([])
let tagshow=ref(false)
let article_id2 =ref('')
let chatlst=ref([])
let showcomment=ref(0)
// 定义最后光标对象
var range;
let  a=0
let isobj=ref(false)
let isary=ref(false)
let ishtml=ref(false)
let curritem=ref()
function  change(){
  //每次输入获得光标最后位置
  range=getSelection().getRangeAt(0)
}
// // 编辑框点击事件
function sonclick(e){
  // 获取选定对象
  curritem.value=e.target
  var selection = getSelection()
  // 设置最后光标对象
  range = selection.getRangeAt(0)
  console.log(e.target.innerHTML)
  if(e.target.innerText=='快和掘友一起分享新鲜事！告诉你个小秘密，发布沸点时添加圈子和话题会被更多掘友看到哦～'){
    e.target.innerHTML=''
    console.log('hello')
  }else if( e.target.innerText==='输入评论（Enter换行，Ctrl + Enter发送）'){
    e.target.innerHTML=''
   }
}
function getFocus(e) {
    if(e.target===curritem.value){
        e.target.focus()
       }else{
        e.target.blur()
        e.target.style.border = 'none'
        if(e.target.id!=='div'){
          e.target.innerHTML='输入评论（Enter换行，Ctrl + Enter发送）'
        }else{
          e.target.innerHTML='快和掘友一起分享新鲜事！告诉你个小秘密，发布沸点时添加圈子和话题会被更多掘友看到哦～'
        }
        }
}
function comshowClick(i){
  showcomment.value=i
}
function embtnClick(){
  emoshow.value=!emoshow.value
}
function emoClick(e) {
  const uploadimg = document.createElement('img')
  uploadimg.src = `/emopng/${e.target.id}.png`
  uploadimg.id = 'iemo'
  //document.querySelector(`#div`).appendChild(uploadimg)
  var selection = getSelection()
    // 设置最后光标对象
    range = selection.getRangeAt(0)
    range.insertNode(uploadimg)
}
function spotlist(){
  proxy.$reqFunAxios('post', 'api/articleList', { page: page.value, size: 10, type: 2 }, function (res) {
    hotlst.value = res.data.data.data
    all.value = res.data.data.count
    console.log(hotlst.value)
   let tempcom=[]
    hotlst.value.forEach((item,index)=>{
      tempcom[index]=[]
      item.comment.forEach((obj,i)=>{
          if (obj.comment_info.includes('info')) {
            //console.log(JSON.parse(obj.comment_info))
          if(Object.prototype.toString.call(JSON.parse(obj.comment_info)) === '[object Array]'){
           tempcom[index].push(JSON.parse(obj.comment_info)[0])
          }else if(Object.prototype.toString.call(JSON.parse(obj.comment_info)) === '[object Object]'){
          tempcom[index].push(JSON.parse(obj.comment_info))
          }else{
            tempcom[index].push(JSON.parse(obj.comment_info))
            console.log(JSON.parse(obj.comment_info))
          }
        }else{
           tempcom[index].push(obj.comment_info)
        }
      })
    })
    chatlst.value=tempcom
    console.log(tempcom)
  })
}
spotlist()
const tags=[]
proxy.$reqFunAxios('post', '/api/tagRanking', '', function (res) {
 if(res.status===200){
   tags.push(res.data.data.map(item => { return item.tag_name })) 
 }
  newtag.value=tags
})
function tagclick(){
  tagshow.value = !tagshow.value
}
const tagstem = []
function tagitemclick(item){
  tagstem.push(item)
  tags_name.value=[...new Set(tagstem)]
  document.querySelector("#tagsitem").innerHTML= tags_name.value
  tagshow.value = !tagshow.value
  
}
function publishClick(){
  console.log('heel')
  const token = window.localStorage.getItem('token')
if(token!==null){
    const info = document.querySelector("#div").innerHTML
    proxy.$reqFunAxios('post', 'api/addModifyArticle', { token: token, info: info, tags_name: tags_name.value, type: 2 }, function (res) {
      console.log(res) 
      if(res.data.code===2000){
        spotlist()
        document.querySelector("#div").innerHTML = '快和掘友一起分享新鲜事！告诉你个小秘密，发布沸点时添加圈子和话题会被更多掘友看到哦～'
      }
    })
    
}else{
   ElMessage({
      message: '请登录账户',
    })
}
}
let emoshow2 = ref(false)
function embtnClick2(e) {
  emoshow2.value = !emoshow2.value
}
function emoClick2(e,i) {
  console.log(e.target)
  const uploadimg = document.createElement('img')
  uploadimg.src = `/emopng/${e.target.id}.png`
  uploadimg.id = 'iemo2'
  //document.querySelector(`#div${i}`).appendChild(uploadimg)
  var selection = getSelection()
    // 设置最后光标对象
    range = selection.getRangeAt(0)
    range.insertNode(uploadimg)
}
function submitUpload2(item,index) {
  console.log('hhh')
  const article_id = item.article_id
   const token = window.localStorage.getItem('token')
   if (token !== null) {
     const comment_info = document.querySelector(`#div${index}`).innerHTML
     console.log(comment_info)
     proxy.$reqFunAxios('post', 'api/addComment', { token: token, comment_info: comment_info, article_id: article_id, type: 2}, function (res) {
       console.log(res)
       if (res.status === 200) {
         spotlist()
         document.querySelector(`#div${index}`).innerHTML = '输入评论（Enter换行，Ctrl + Enter发送）'
       } else {
        alert('接口请求失败')
    }
    })
  } else {
   ElMessage({
      message: '请登录账户',
    })
   }
}
function replyClick2(e, i) {
  article_id2.value = i.article_id
}
function firstLevimg(res, file) {
  if (res.code === 2000) {
    const uploadimg = document.createElement('img')
    uploadimg.src = `http://api_devss.wanxikeji.cn/${res.data}`
    uploadimg.id = 'uploadimg'
    //document.querySelector(`#div`).appendChild(uploadimg)
    var selection = getSelection()
    // 设置最后光标对象
    range = selection.getRangeAt(0)
    range.insertNode(uploadimg)
  } else {
    ElMessage({
      message: res.msg,
    })
  }

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
let img1 = ref('')
let isucc = ref(false)
let index1 = ref()
function secLevimg1(res) {
  if (res.code === 2000) {
    isucc.value = true
    img1.value = `http://api_devss.wanxikeji.cn/${res.data}`
    uploadsecimg1()
  } else {
    ElMessage({
      message: res.msg,
    })
  }
}
function uploadsecimg1(index) {
  if (isucc.value === true) {
    console.log(index1.value)
    const uploadimg = document.createElement('img')
    uploadimg.src = `${img1.value}`
    uploadimg.id = 'uploadimg'
    console.log(document.querySelector(`#div${index1.value}`))
    //document.querySelector(`#div${index1.value}`).appendChild(uploadimg)
    var selection = getSelection()
    // 设置最后光标对象
    range = selection.getRangeAt(0)
    range.insertNode(uploadimg)
  } else {
    index1.value = index
    console.log(index1.value)
  }
}
onMounted(() => {
  window.onscroll = function () {
 // 变量scrollTop是滚动条滚动时，距离顶部的距离
 var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
 // 变量windowHeight是可视区的高度
 var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
 // 变量scrollHeight是滚动条的总高度
 var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
 // 滚动条到底部的条件
 if (scrollTop + windowHeight >= scrollHeight) {
   if (page.value < all.value) {
     page.value += 1 // 页数+1
     // 重新加载数剧
        spotlist()
      }
   // 数据全部加载完成
   if (page.value >= all.value) {
    //  console.log("没有数据啦")
   }
 }
  }
})

</script>
<style>
.firstdiv{
 padding: 20px;
 background-color: #ffffff;
 position: relative;
  }
  #div{
 max-width: 790px;
 height: 116px;
 background-color: #F2F3F5;
 word-break: break-all;
 padding:10px;
 box-sizing: border-box;
 overflow: hidden;
  }
.tagselect{
  background-color: #F2F3F5;
}
  .emorow,.hotcommitem{
 display: flex;
 flex-flow:row nowrap;
 justify-content: flex-start;
 align-items: flex-start;
 margin:20px 0;
  }
 .emorow>div img,.comtrow img{
   width: 20px;
   height: 20px;
   margin-right:5px;
   vertical-align: middle;
 }
  .emorow>div{
   margin-right:10px;
  }
  .hotitem{
    background-color: #ffffff;
    margin-top:20px;
    padding:10px;
  }
  .hotspotlist{
  background-color: #F4F5F5;
  }
  .emodiv{
   position: relative;
  }
  .svgemo{
   position:absolute;
   margin-top:5px;
   width: 1000px;
   height:30px;
  }
 .icon {
   width: 1em;
   height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
   margin-right:10px;
 }
  #create{
  width: 60px;
  height:60px ;
border-radius: 0%;
 }
 .publish{
   position: absolute;
   right:20px;
   bottom:40px;
   width: 92px;
   height: 36px;
   text-align: center;
   line-height: 36px;
   background-color: #1E80FF;
   border-radius: 2px;
   color:#ffffff;
 }
 .headrow{
  display: flex;
 }
 .headrow img,.hotcommhead{
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right:10px;
}
 .spotinfo>div {
   margin-bottom: 5px;
 }
.spotinfo>div:nth-of-type(1){
  font-weight: bold;
}
.spotinfo>div:nth-of-type(2) {
color: #A3B0BC;
}
.spotinfo>div:nth-of-type(3) {
  font-size: 14px;
  font-weight: bold;
  margin-top:6px;
}
.spotags span, .tags span{
padding:4px 5px;
background-color:#E9F2FF ;
color:#1E80FF;
border-radius: 10px;
font-size:13px;
letter-spacing: 1px;
font-weight: 700;
margin-right: 10px;
}

.select{
  /* width: 100px; */
  height:20px;
  padding:5px;
  text-align: center;
  background-color: #ffffff;
  color:#1E80FF;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  font-size:15px;
}
 .comtrow{
   display: flex;
   flex-flow: row nowrap;
   justify-content: space-around;
   align-items: center;
   border-top: 1px solid #F4F5F5;
   padding-top:5px;
 }
/* */
 .tags{
width: 100px;;
height: 50px;
overflow: auto;
 }
 .tags>div{
  margin: 5px;
 }
 .cmtinput2{
    margin:10px auto;
    padding:10px;
    width: 700px;
    border:solid 1px #1E80FF;
    border-radius: 2px;
 }
 #iemo, .emo2,#iemo2{
width: 20px;
height: 20px;
}
.emo2{
  vertical-align: middle;
  margin-right:5px;
}
.send2{
float:right;
margin-top:-30px;
margin-right: 30px;
}
.hotcommitem{
  padding-left:40px;
}
.svgmo2{
  height:20px;
}
#uploadimg{
  width: 60px;
  height: 60px;
  border-radius: 0%;
}

.upload-demo2{
position: absolute;
left:60px;
top:0;
}
#createimg{
  border-radius: 0%;
}
</style>