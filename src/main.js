import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/base.css";
import "@/assets/styles/el-reset.css";

// Vue.config.productionTip = false;
Vue.use(ElementUI);

//路由前置钩子(导航守卫)
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  //用户登录之后，localstorage中有token
  let token = localStorage.getItem("rl2005-token");
  if (token) {
    //如果是注册页面或者是登入页面，直接放行
    next();
  } else {
    //没token
    if (to.path === "/login") {
      next();
    } else {
      //访问的不是登入页，就要跳转到登入页
      next({ path: "/login" });
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
