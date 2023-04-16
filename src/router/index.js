import { createRouter, createWebHistory } from "vue-router";
const routerHistory = createWebHistory();
const jsonArrayRoute = [
  {
    path:'/',
    children:[
      {
        path:'',
        component:()=>import('@/component/Index.vue'),
      },
      {
        path:'index',
        component:()=>import('@/component/Index.vue'),
      },
      {
        path:'hotSpot',
        component:()=>import('@/component/Hotspot.vue'),
      },
      {
        path:'spotCon',
        component:()=>import('@/component/Spotcon.vue'),
      },
        {
       path:'create',
       component:()=>import('@/component/Createspot.vue'),
       },
       {
        path:'echartst',
        component:()=>import('@/component/Echartst.vue'),
        },
    ]
  },

];
// 创建路由实例.
const router = createRouter({
  history: routerHistory,
  routes: jsonArrayRoute,
});
// 输出路由实例和菜单数组 (全局变量).
export { router };