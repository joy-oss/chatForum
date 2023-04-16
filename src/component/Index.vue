<template>
    <div class="index" ref="indexself" id="index">
        <div class="indextitle"><span>推荐</span><span>最新</span><span>热榜</span></div>
         <div v-for="item in commt" @click="postClick($event, item)" class="artice">
         <div class="articinfo">
            <span class="indexname">{{  item.nick_name}}</span>
            <span>{{item.created_at}}</span>
            <span v-for="item in item.tags">{{ item.tag_name }}</span></div>
         <div class="spotitle">{{ item.title }}</div>
         <div ><span class="spotcon">{{ item.describe }}</span></div>
              <!-- <div ><span class="spotcon" v-html="item.info"></span></div> -->
        <div class="commit">
         <div><img src="/index/read.png" alt=""><span>{{ item.pv }}</span></div>
         <div><img src="/index/like.png" alt=""><span>{{ item.pv }}</span></div>
         <div><img src="/index/comment.png" alt=""><span>{{ item.comment_num }}</span></div>
        </div>
    </div>
    </div>
</template>
<script setup>
import {ref,getCurrentInstance,onMounted,nextTick} from 'vue'
const {proxy} = getCurrentInstance()
const commt=ref([])
const page=ref(1)
const size=ref(10)
const all=ref(0)
const title=ref('')
const indexself=ref(null)
proxy.$reqFunAxios("post",'api/articleList','',function(res){
    commt.value=res.data.data.data
    all.value=res.data.data.count
    console.log(res)
})
function postClick(e, item){
    const article_id = item.article_id
    console.log(item)
    const info=item.info
    const title=item.title
    const pic=item.pic
    const nick_name=item.nick_name
    const icon=item.icon
    const created_at=item.created_at
    const pv=item.pv
 proxy.$router.push({ path: '/spotCon', query: { article_id: article_id ,info:info,title:title,pic:pic,nick_name:nick_name,icon:icon,created_at:created_at,pv:pv}})
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
                proxy.$reqFunAxios("post", 'api/articleList', {page:page.value,size:size.value}, function (res) {
                    commt.value = res.data.data.data
                    all.value = res.data.data.count
                })
            }
            // 数据全部加载完成
            if (page.value>=all.value) {
                console.log("没有数据啦")
            }
        }
    }
})
</script>
<style>
.index{
    padding:20px;
    background-color: #ffffff;
    }
.indextitle{
    border-bottom:solid 1px #F4F5F5;
    padding-bottom: 10px;
}
.indextitle>span{
margin-right:10px;
padding-right:10px;
border-right: solid 1px #F4F5F5;
}
.indextitle>span:hover{
    color:#649EFF;
}
.artice{
    margin-bottom:10px;
    padding:10px 0;
    border-bottom:solid 1px #F4F5F5;
}
.artice:hover{
    background-color: #FAFAFA;
}
.articinfo span{
    border-right:solid 1px #F4F5F5;
}
.articinfo span:not(.indexname){
    color:#8D929F;
    font-size:14px;
    padding:0 10px;
}
.articinfo .indexname{
color:#53403E;
font-size:16px;
padding-right:10px;
}
.spotcon,.spotitle{
    display:block;
    word-break:keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
    padding-bottom: 10px ;
}
.spotitle{
    font-weight: bold;
    font-size:20px;
    padding:10px 0 ;
}
.commit{
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
}
.commit>div{
    margin-right:30px;
}
.commit img{
    width: 20px;
    height: 20px;
    vertical-align:text-bottom;
    margin-right:3px;
}
</style>