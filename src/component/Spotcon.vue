<template>
    <div class="spot">
        <div class="spotcon">
            <div class="spotarticle">
                <div class="spotcontitle">{{ article.title }}</div>
                <div class="spotconuser">
                    <img class='uimg' :src="article.pic" alt="">
                    <div class="info">
                        <div><span>{{ article.nick_name }}</span><img class='uicon' :src="article.icon" alt=""></div>
                        <div class="timesrow"><span>{{ article.created_at }}</span><span class="dot"></span><span>阅读{{
                            article.pv
                        }}</span>
                        </div>
                    </div>
                </div>
                <div class="coninfo" v-html="article.info"></div>
            </div>
            <div class="barimg"><img src="/index/img.png" alt=""></div>
            <div class="spotcommit">
                <div class="firstlvcom">
                    <div>评论</div>
                    <div class="inputrow">
                        <img src="/index/wode.png" alt="">
                        <div class="commall">
                            <div contenteditable="true" class="cmtinput" id="div" @click="sonclick" @change="change"
                                @input="change" @blur="getFocus">输入评论（Enter换行，Ctrl + Enter发送）</div>
                            <div class="sendimg">
                                <div id="emorow">
                                    <div>
                                        <img src="/index/biaoqing.png" alt="" @click="embtnClick"
                                            style="margin-right:5px;vertical-align: text-bottom;"><span>表情</span>
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
                                        <el-upload class="upload-demo" action="http://api_devss.wanxikeji.cn/api/savePic"
                                            method="post" name="img" :multiple="true" :limit="3"
                                            :before-upload="beforeAvatarUpload" :on-success="firstLevimg"
                                            :show-file-list="false">
                                            <div style="display:flex"><el-icon size="20">
                                                    <Picture />
                                                </el-icon>
                                                <div style="margin-left:5px;margin-top:-1px">图片</div>
                                            </div>
                                        </el-upload>
                                        <el-button class='send' type="primary" @click="submitUpload">
                                            发表评论
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hotspot">
                    <div><span>热门评论</span><img src="/index/hot.png" alt=""></div>
                    <div class="firstlvcomcon">
                        <div v-for="items, index in commlist">
                            <div class="commentitem">
                        <img src="/index/default.png" alt="" class="comheadimg" v-if="items.icon === null">
                        <img :src="items.icon" alt="" class="comheadimg" v-if="items.icon !== null">
                       <div class="iteminfo">
                          <div class="iteminfotit">{{ items.nick_name }}</div>
                          <div class="timesrow">{{ items.created_at }}</div>
                          <div>
                              <div v-html="nocd[index]" ref="infocon" class="commit"
                              v-show="Array.isArray(nocd[index]) === false"></div>
                              <div v-html="nocd[index][0].info" ref="infocon" class="commit"
                               v-show="Array.isArray(nocd[index]) === true"></div>  
                          </div>
        <div v-if="items.child.length !== 0">
         <div class="secondlvcomcon" v-for="item, iindex in items.child">
             <div class="commentitem">
                 <img src="../../public/index/default.png" alt="" class="comheadimg"
                     v-if="item.icon === null">
                 <img :src="item.icon" alt="" class="comheadimg" v-if="item.icon !== null">
                 <div class="iteminfo">
                                          <div class="iteminfotit">{{ item.nick_name }}</div>
         <div class="timesrow">{{ item.created_at }}</div>
         <div>
             <!-- haschild -->
             <div v-html="hascd[index][iindex].info" ref="infocon" class="commit"
                 v-show="Object.prototype.toString.call(hascd[index][iindex]) === '[object Object]'"></div>
             <!-- <div v-html="hascd[index][iindex][0].info" ref="infocon"
                 class="commit"
                 v-show="Array.isArray(hascd[index][iindex][0]) === true"></div> -->
              <div v-html="hascd[index][iindex]" ref="infocon"
                     class="commit"
                     v-show="Object.prototype.toString.call(hascd[index][iindex])===['object String']"></div>
             <!-- / -->
             <div class="secondreply">
                 <img src="/index/dianzan.png" alt=""><span>2</span><img
                     src="/index/pinglun.png" alt=""><span
                     @click="replyClick2($event, item, iindex)">回复</span>
                 <!-- 二级回复/ -->
                 <div class="inputrow" v-show="item.comment_id === comment_id2">
                     <div class="commall">
            <div contenteditable="true" class="cmtinput cmtinput2"
             :id="'div' + iindex" @click="sonclick"
             @change="change" @input="change" @blur="getFocus">输入评论（Enter换行，Ctrl + Enter发送）</div>
         <div class="sendimg">
             <div id="emorow">
                 <div>
                     <img src="/index/biaoqing.png" alt=""
                         @click="embtnClick2"><span>表情</span>
                     <div class="svgemo" v-if="emoshow2"
                         @click="emoClick2($event, iindex)">
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
               <el-upload class="upload-demo"
                   action="http://api_devss.wanxikeji.cn/api/savePic"
                   method="post" name="img" :multiple="true"
                   :limit="3"
                   :before-upload="beforeAvatarUpload"
                   :on-success="secLevimg1"
                   :show-file-list="false">
                   <div style="display:flex"
                       @click="uploadsecimg1(item, iindex, items)">
                       <el-icon size="20">
                           <Picture />
                       </el-icon>
                       <div
                           style="margin-left:5px;margin-top:-1px">
                           图片</div>
                   </div>
               </el-upload>
               <el-button class='send' type="primary"
                   @click="submitUpload2(iindex, items)">
                   发表评论
                </el-button>
                 </div>
                 </div>
                </div>
             </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
      <div v-if="items.child.length === 0" > 
          <div class="secondlvcomcon">
              <div class="commentitem">
                  <img src="../../public/index/default.png" alt="" class="comheadimg"
                      v-if="items.icon === null">
                  <img :src="items.icon" alt="" class="comheadimg" v-if="items.icon !== null">
                  <div class="iteminfo">
                      <div class="iteminfotit">{{ items.nick_name }}</div>
                      <div class="timesrow">{{ items.created_at }}</div>
                      <div>
                          <!-- nochild -->
                          <div v-html="nocd[index]" ref="infocon" class="commit"
                              v-show="Array.isArray(nocd[index]) === false"></div>
                          <div v-html="nocd[index][0].info" ref="infocon" class="commit"
                              v-show="Array.isArray(nocd[index]) === true"></div>
                          <div class="secondreply">
                              <img src="/index/dianzan.png" alt=""><span>2</span><img
                                  src="/index/pinglun.png" alt=""
                                  @click="replyClick($event, items, index)"><span>回复</span>
                              <!-- 二级回复/ -->
                              <div class="inputrow" v-show="items.comment_id === comment_id">
                                  <div class="commall">
                                      <div contenteditable="true" class="cmtinput cmtinput2"
                                          :id="'div' + index" @click="sonclick" @change="change"
                                          @input="change" @blur="getFocus">输入评论（Enter换行，Ctrl + Enter发送）</div>
                                      <div class="sendimg">
                                          <div id="emorow">
                                              <div>
                                                  <img src="/index/biaoqing.png" alt=""
                                                      @click="embtnClick3"><span>表情</span>
                                                  <div class="svgemo" v-if="emoshow3"
                                                      @click="emoClick2($event, index)">
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
                                              <el-upload class="upload-demo"
                                                  action="http://api_devss.wanxikeji.cn/api/savePic"
                                                  method="post" name="img" :multiple="true"
                                                  :limit="3"
                                                  :before-upload="beforeAvatarUpload"
                                                  :on-success="secLevimg1"
                                                  :show-file-list="false">
                                                  <div style="display:flex"
                                                      @click="uploadsecimg1(items, index)">
                                                      <el-icon size="20">
                                                          <Picture />
                                                      </el-icon>
                                                      <div
                                                          style="margin-left:5px;margin-top:-1px">
                                                          图片</div>
                                                  </div>
                                              </el-upload>
                                              <el-button class='send' type="primary"
                                                  @click="submitUpload2(index, items)">
                                                  发表评论
                                              </el-button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="commentitem spotsecondcommcon" v-for="item in items.child">
          <img :src="item.icon?item.icon:'/index/default.png'" alt="" class="spotseccomcon">
          <div class="">
              <div class="iteminfotit">{{ item.nick_name }}</div>
              <div class="timesrow">{{ item.created_at }}</div>
              <div v-html="item.comment_info"
                  v-show="item.comment_info.includes('info') === false"></div>
          </div>
      </div>
                                </div>
                            </div>
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
import { ref, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { Picture } from '@element-plus/icons-vue'
const { proxy } = getCurrentInstance()
let article = ref({})
let commlist = ref([])
let comment_id = ref('')
let comment_id2 = ref('')
const div = ref(null)
let infoisArray = ref([])
let infoisHtml = ref('')
let hascd = ref([])
let nocd = ref([])
let curritem=ref()
const article_id = proxy.$route.query.article_id
article.value.title = proxy.$route.query.title
article.value.pic = proxy.$route.query.pic
article.value.nick_name = proxy.$route.query.nick_name
article.value.icon = proxy.$route.query.icon
article.value.created_at = proxy.$route.query.created_at
article.value.pv = proxy.$route.query.pv
article.value.info = proxy.$route.query.info
// const div=ref(null)
//评论列表请求
function commentlist() {
    proxy.$reqFunAxios("post", 'api/articleInfo', { article_id: article_id }, function (res) {
        commlist.value = res.data.data.data
        console.log(commlist.value)
        //处理父级评论格式
        let tempcom = []
        commlist.value.forEach((item, index) => {
            tempcom[index] = []
            if (item.comment_info.includes('info')) {
            //console.log(JSON.parse(item.comment_info))
            tempcom[index].push(JSON.parse(item.comment_info))
               
            } else {
                //console.log(item.comment_info)
                tempcom[index] = item.comment_info
            }
        })
 
        nocd.value = tempcom
        //处理子级评论格式
        let tempcd = []
        let tempcd1 = []
        commlist.value.forEach((item, index) => {
            if (item.child !== []) {
                //tempcd[index] = item.child
                tempcd[index] = []
                for (let i = 0; i < item.child.length; i++) {
                    //子评论为数组则转换在添加
                    if (item.child[i].comment_info.includes('info')) {
                         tempcd[index].push(JSON.parse(item.child[i].comment_info))
                       
                    } else {
                        tempcd[index].push(item.child[i].comment_info)
                    }
                }
            }
        })
        console.log(tempcd)
        hascd.value = tempcd

    })
}
commentlist()

// 定义最后光标对象
var range;
let a = 0
let i = 0
function change(e) {
    e.target.style.border = 'solid 1px #649EFF'
    //每次输入获得光标最后位置
    range = getSelection().getRangeAt(0)
    //console.log(e.target)
}
// 编辑框点击事件
function sonclick(e) {
    curritem.value=e.target
    console.log(e.target)
    e.target.style.border = 'solid 1px #649EFF'
    // 获取选定对象
    var selection = getSelection()
    // 设置最后光标对象
    range = selection.getRangeAt(0)
    if( e.target.innerHTML=='输入评论（Enter换行，Ctrl + Enter发送）'){
    e.target.innerHTML=''
   }
}
function getFocus(e) {
    if(e.target===curritem.value){
        console.log(curritem.value)
        e.target.focus()
       }else{
        e.target.blur()
        e.target.style.border = 'none'
        e.target.innerHTML='输入评论（Enter换行，Ctrl + Enter发送）'
        }
}
let emoshow = ref(false)
function embtnClick(e) {
    emoshow.value = !emoshow.value
}
let emoshow2 = ref(false)
function embtnClick2(e) {
    emoshow2.value = !emoshow2.value
}
let emoshow3 = ref(false)
function embtnClick3(e) {
    emoshow3.value = !emoshow3.value
}
function emoClick(e) {
    document.querySelector("#div").focus()
    var selection = getSelection()
    range = selection.getRangeAt(0)
    // 设置最后光标对象
    const uploadimg = document.createElement('img')
    uploadimg.src = `/emopng/${e.target.id}.png`
    uploadimg.id = 'iemo'
   // document.querySelector("#div").appendChild(uploadimg)
   range.insertNode(uploadimg)
}
function emoClick2(e, index) {
    const uploadimg = document.createElement('img')
    uploadimg.src = `/emopng/${e.target.id}.png`
    uploadimg.id = 'iemo3'
    var selection = getSelection()
    // 设置最后光标对象
    range = selection.getRangeAt(0)
    range.insertNode(uploadimg)
    document.querySelector(`#div${index}`).focus()
}
function submitUpload() {
    const token = window.localStorage.getItem('token')
    if (token !== null) {
        const comment_info = document.querySelector("#div").innerHTML
        console.log(article_id)
        proxy.$reqFunAxios('post', 'api/addComment', { token: token, comment_info: comment_info, article_id: article_id, type: 1 }, function (res) {
            if (res.status === 200) {
                commentlist()
                document.querySelector("#div").innerHTML = ''
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
function submitUpload2(index, item) {
    const father_id = item.comment_id
    const token = window.localStorage.getItem('token')
    if (token !== null) {
        console.log(index)
        const comment_info = document.querySelector(`#div${index}`).innerHTML
        proxy.$reqFunAxios('post', 'api/addComment', { token: token, comment_info: comment_info, father_id: father_id, article_id: article_id, type: 1 }, function (res) {
            if (res.status === 200) {
                commentlist()
                console.log(res)
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
function replyClick(e, i) {
    comment_id.value = i.comment_id
}
function replyClick2(e, i) {
    comment_id2.value = i.comment_id
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
function uploadsecimg1(item, index, items) {
    if (isucc.value === true) {
        console.log(index1.value)
        const uploadimg = document.createElement('img')
        uploadimg.src = `${img1.value}`
        uploadimg.id = 'uploadimg'
        console.log(document.querySelector(`#div${index1.value}`))
       // document.querySelector(`#div${index1.value}`).appendChild(uploadimg)
       var selection = getSelection()
    // 设置最后光标对象
    range = selection.getRangeAt(0)
    range.insertNode(uploadimg)
    } else {
        index1.value = index
        console.log(index1.value)
    }
}

</script>
<style>
.spot {
    background-color: #F2F3F5;
    word-break: break-all;
}

.spotarticle,
.spotcommit {
    background-color: #ffffff;
    padding: 20px;
}

.spotcontitle {
    font-weight: bold;
    font-size: 25px;
    margin-bottom: 10px;
}

.spotconuser,
.timesrow,
.commentitem {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-start;
}

.inputrow {
    display: flex;
}

.spotconuser .uimg,
.firstlvcom>div:nth-of-type(2) img,
.commentitem .comheadimg,
.spotseccomcon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;

}

.spotconuser .uicon {
    width: 20px;
    height: 10px;
    margin-left: 5px;
}

.timesrow {
    color: #A6ACB6;
}

.timesrow span:nth-of-type(2) {
    display: block;
    width: 4px;
    height: 4px;
    background-color: #A6ACB6;
    border-radius: 50%;
    margin: 0 10px;
}

.coninfo {
    line-height: 20px;
    word-break: break-word;
    font-weight: 500;
}

.coninfo img {
    width: 100%;
    height: 400px;
    margin: 10px 0;
}

.barimg img {
    width: 100%;
    height: 182px;
    margin-top: 20px;
}

.spotcommit {
    margin-top: 20px;
}

.firstlvcom>div:nth-of-type(1),
.hotspot>div:nth-of-type(1) {
    font-weight: bold;
    margin-bottom: 10px;
}

.cmtinput {
    width: 697px;
    /* height:64px; */
    border: none;
    background-color: #F2F3F5;
    border-radius: 2px;
    padding: 10px;
    box-sizing: border-box;
    line-height: 44px;
}

.hotspot {
    margin-top: 20px;
}

.hotspot>div:nth-of-type(1) img {
    height: 20px;
    width: 20px;
    margin-left: 5px
}

.iteminfotit {
    font-weight: 700;
    margin-bottom: 5px;
}

.sendimg {
    position: relative;
    margin-top: 10px
}

.sendimg #emorow img,
.secondreply>img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 2px;
}

.sendimg #emorow img:nth-of-type(2) {
    margin-left: 20px;
}

.sendimg #emorow {
    position: relative;
}

.el-upload {
    position: absolute;
    margin-left: 20px;
    display: block;
    width: 100%;
    margin-top: 10px;
    top: 0;
    right: -610px;
}

.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.svgemo svg {
    margin-right: 10px;
    margin-top: 10px;
}

.svgemo img #iemo {
    height: 20px;
    width: 20px;
}

.secondreply {
    margin-top: 5px;
}

.secondreply>img {
    vertical-align: text-bottom;
}

.secondreply>img:nth-of-type(2) {
    margin-left: 20px;
}

.cmtinput2 {
    width: 600px;
    min-height: 40px;
}

#iemo,
#iemo3 {
    width: 20px;
    height: 20px;
}

#uploadimg {
    width: 50px;
    height: 50px;
    border-radius: 0%;
    vertical-align: middle;
}</style>

