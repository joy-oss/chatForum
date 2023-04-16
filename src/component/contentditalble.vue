<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <el-button type="primary">Primary</el-button>-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->

    <div ref="div" contenteditable="true" @click="sonclick" @change="change" @input="change">6544</div>
    <button @click="submit">按钮</button>
  </div>
</template>

<script setup>
// @ is an alias to /src
import {getCurrentInstance} from "vue"
let {proxy}=getCurrentInstance()
const div=ref(null)
// // 定义最后光标对象
// var range;
// let  a=0
// function  change(){
//   //每次输入获得光标最后位置
//   range=getSelection().getRangeAt(0)
// }
// // 编辑框点击事件
// function sonclick(){
//   // 获取选定对象
//   var selection = getSelection()
//   // 设置最后光标对象
//   range = selection.getRangeAt(0)
// }

// function submit(){
//   let node=range.createContextualFragment(`<b>${a}</b>`)
//   a++
//   range.insertNode(node)
// // 使光标开始和光标结束重叠
//   range.collapse()
//   // 清除选定对象的所有光标对象
//   getSelection().removeAllRanges()
//   // 插入新的光标对象
//   getSelection().addRange(range)
//   //插入后光标获得焦点
//   proxy.$refs.div.focus()
//   range=getSelection().getRangeAt(0)

// }
onMounted(() => {
  console.log(div.value.innerHTML)
}),
</script>
