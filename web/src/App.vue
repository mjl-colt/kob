<template>
  <NavBar />
    <!-- 
      路由出口

      在前面的main.js文件中，一旦 app.use(router) 执行：Vue Router 就会向全局注入两个组件：
      <router-view>：显示当前路由匹配的组件  <router-link>：跳转用的标签（替代 <a>） 

      <router-link> 负责触发“路由跳转”，然后 Vue Router 监听到地址变化，把对应组件渲染到 <router-view /> 中
        
      当你跳转到 /pk/ 时，<router-view /> 就会渲染 PkIndexView.vue 
      当你跳转到 /ranklist/ 时，<router-view /> 就会渲染 RankListIndex.vue
      
    -->
  <router-view/>
</template>

<script>
// 导入组件
import NavBar from './components/NavBar.vue';
// 导入bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
export default{
  components: {
    NavBar
  } 
}
</script>

<style>
body {
  background-image: url("@/assets/images/background.png");
  background-size: cover;
}
</style>
