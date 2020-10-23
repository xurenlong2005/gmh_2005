import Vue from "vue";
import VueRouter from "vue-router";
import login from "../pages/Login";
import allRoutes from "./allRoutes"
Vue.use(VueRouter);
import dynamicRoutes from "./dynamicRoutes"
//解决路由导航到统一路径重复报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: "/login",
    name: "login",
    component: login
  }
];

const router = new VueRouter({
  routes
});

export default router;
