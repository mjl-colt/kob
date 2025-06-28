import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from "../views/pk/PkIndexView"
import RecordIndexView from "../views/record/RecordIndexView"
import RanklistIndexView from "../views/ranklist/RanklistIndexView"
import UserBotIndexView from "../views/user/bot/UserBotIndexView"
import NotFound from "../views/error/NotFound"

//1.配置路由规则
const routes = [
  {
    path:"/",
    name:"home",
    redirect:"/pk/"
  },
  {
    path:"/pk/",
    name:"pk_index",
    component:PkIndexView,
  },
  {
    path:"/record/",
    name:"record_index",
    component:RecordIndexView,
  },
  {
    path:"/ranklist/",
    name:"ranklist_index",
    component:RanklistIndexView,
  },
  {
    path:"/user/bot/",
    name:"user_bot_index",
    component:UserBotIndexView,
  },
  {
    path:"/404/",
    name:"404",
    component:NotFound,
  },
  {
    path:"/:catchAll(.*)",
    redirect:"/404/"
  }
]

//2.创建路由器
const router = createRouter({
  //路由工作模式
  history: createWebHistory(),
  routes
})

export default router
//3.在main.js中.use(router)加载路由器