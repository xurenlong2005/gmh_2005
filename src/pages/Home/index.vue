<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200">
        <h1 class="logo"></h1>
        <!-- 解决侧边栏展开和收起的问题 -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :router="true"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <qf-sub-menu :sideMenu="menuList"></qf-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 顶部栏 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="grid-content hh">
                <i
                  :class="['iconfont',isCollapse ? 'icon-shouqi1':'icon-shouqi']"
                  @click="isCollapse=!isCollapse"
                ></i>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content biaoti">人龙管理系统</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-avatar
                  :size="40"
                  fit="fit"
                  src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3366333070,3860151167&fm=26&gp=0.jpg"
                ></el-avatar>
                <span>欢迎您:</span>
                <b class="nickname">{{userInfo.nickname}}</b>
                <span class="quit iconfont icon-tuichu" @click="quit">退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <!-- 主体区域 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: crumbs.path}" v-for="crumb in crumbs">
              {{crumb.meta.name}}
            </el-breadcrumb-item>
            
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  </div>
</template>


<script>
import { getLoginLog } from "@/api";
import { mapState } from "vuex";
// vuex中的东西一刷新没有了怎么办，存一份放到本地存储里
export default {
  computed: {
    ...mapState(["userInfo", "menuList","crumbs"])
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    quit() {
      //退出登入
      //1.清除token和userInfo
      //2.跳转到登入页
      localStorage.removeItem("rl2005-token");
      localStorage.removeItem("rl2005-userInfo");

      this.$router.push("/login");
      //刷新页面
      window.location.reload();
    }
  },
  mounted() {
    //获取登录日志
    
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/* 侧边栏 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}


/* 顶部布局 */
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  height: 80px;
  margin: 0px -21px;
  padding: 10px 0;
  background-color: #fff;
}
/* 收起按钮外面的盒子 */
.hh {
  position: relative;
}
/* 收起按钮 */
.icon-shouqi,
.icon-shouqi1 {
  position: absolute;
  left: 0px;
  color: yellowgreen;
  font-size: 30px;
  cursor: pointer;
}
/*标题 */
.biaoti {
  font-weight: 600;
  font-size: 30px;
  letter-spacing: 5px;
}
/* 头像 */
.el-avatar {
  vertical-align: middle;
  margin-right: 10px;
}
/* 用户名 */
.nickname {
  margin-left: 10px;
}
/* 退出按钮 */
.quit {
  margin-left: 10px;
  cursor: pointer;
  color: yellowgreen;
  font-size: 25px;
}
/* 面包屑 */
.el-breadcrumb{
  margin-top: 10px;
}
</style>


