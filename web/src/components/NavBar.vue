<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }"
        >King of Bot</router-link>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <!-- 

         这里的路由链接有个知识点，有三种写法：
         <RouterLink to="/home'>首页</RouterLink>              字符串跳转
         <RouterLink :to="{path:'/about'}">关于</RouterLink>   对象跳转
         <RouterLink :to="{name:'news'}">新闻</RouterLink>     具名跳转
        
         我们这里用的是具名跳转，动态绑定的
        -->

          <li class="nav-item">
            <router-link
              :class="route_name == 'pk_index' ? 'nav-link active' : 'nav-link'"
              :to="{ name: 'pk_index' }"
              >对战</router-link>
          </li>
          <li class="nav-item">
            <router-link
              :class="
                route_name == 'record_index' ? 'nav-link active' : 'nav-link'
              "
              :to="{ name: 'record_index' }"
              >对局记录</router-link>
          </li>
          <li class="nav-item">
            <router-link
              :class="
                route_name == 'ranklist_index' ? 'nav-link active' : 'nav-link'
              "
              :to="{ name: 'ranklist_index' }"
              >排行榜</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              mjl
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'user_bot_index' }"
                  >我的Bot</router-link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li><a class="dropdown-item" href="#">退出</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  setup() {
    //获取当前“正在使用的路由信息”对象
    //举个例子：当你访问 /pk/ 路径时，这个 route 对象就会包含pk的route信息
    const route = useRoute();
    // Vue 会偷偷记下这个函数用了route.name，如果route.name变了，就重新执行这个函数，并把结果更新给 route_name
    let route_name = computed(() => route.name);
    return {
      route_name,
    };
  },
};
</script>


<style scoped>
</style>