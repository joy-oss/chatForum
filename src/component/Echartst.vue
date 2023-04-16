<template>
    <div class="ec">
<div  id="ecs" style="width:500px;height:500px">
   
</div>
    </div>
</template>

<script setup>
import {onMounted,ref,watch} from 'vue'
import * as  echarts from 'echarts'
let ECharts=echarts
let bw=ref(17)
const options=ref({
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  //改颜色
  color:['red','yellow','blue','purple','orange'],
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      //radius更改大小
      radius: '50%',
      data: [
        { value: 100, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
function initechart(){
const ecs=document.querySelector('#ecs')
var myChart = ECharts.init(ecs);
options.value && myChart.setOption(options.value,true);
}
onMounted(()=>{
  //第一次初始化组件要在onMounted内否则报错
    initechart()
})
setTimeout(()=>{
options.value.series[0].radius ="100%"
//销毁实例 数据更新重新挂载实例
},2000)
setTimeout(() => {
  options.value.series[0].radius = "40%"
}, 4000)
//使用watchdeep侦听数据更新重新挂载数据
watch(
  options,
  ()=>{
  //销毁实例 数据更新重新挂载实例
   if(document.querySelector('#ecs')!=null){
      echarts.dispose(document.querySelector('#ecs'))
     initechart()
   }
},
{deep:true}
)
</script>

<style>
.ec{
    width: 1000px;
    height: 1000px;
    margin-left:-50px;
    background-color: #fff;
}
</style>
