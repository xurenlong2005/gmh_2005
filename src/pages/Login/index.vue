<template>
  <div class="login-page">
    <video
      muted="muted"
      src="./../../media/bg_video.d2d602a9.mp4"
      autoplay="autoplay"
      loop="loop"
      preload="auto"
      class="bg-video"
    ></video>
    <div class="login-left"></div>
    <div class="login-right">
      <h1>人龙管理系统</h1>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            @click="submitForm('loginForm')"
            class="tijiao"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api";
import { mapMutations } from "vuex";
export default {
  //登入逻辑的实现
  //1.收集用户输入的username&password传递给后端

  //2.登入通过后,将后端返回的token存到本地,跳转到主页

  //3.每次请求的时候,携带token到请求头authorization

  //4.展示token校验正确的数据

  //5.校验不通过,跳转到登入页

  data() {
    //jsDoc注释方式
    /**
     * @param {Object} rule 就是一个表单验证对象
     * @param {String} rule 输入值
     * @param {Function} callback 检验通过不传参，不通过传参
     */
    var validataUsername = (rule, value, callback) => {
      //用户名正则，4到16位（字母，数字，下划线，减号）
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!value) {
        callback("用户名正则，4到16位（字母，数字，下划线，减号)");
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validataUsername, trigger: "blur" }], //blur失去焦点
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].validate(valid => {
        if (valid) {
          //代表本地校验通过
          //打开登入加载功能
          const loading = this.$loading({
            lock: true,
            text: "正在登入...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          //发送登入请求
          let { username, password } = this.loginForm;
          login(username, password)
            .then(res => {
              //服务器响应，关闭loading框
              loading.close();
              console.log(res);
              if (res.data.state) {
                this.$message.success("登入成功");
                //用户名密码正确
                localStorage.setItem("rl2005-token", res.data.token);
                localStorage.setItem(
                  "rl2005-userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                //更改vuex中state["userInfo"]的值
                this.SET_USERINFO(res.data.userInfo);
                //跳转到主页
                this.$router.push("/");
              } else {
                //用户名或者密码错误
                this.$message.error("错了哦，这是一条错误消息");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.login-page {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.login-page .bg-video {
  margin: auto;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
.login-left {
  width: 50%;
  height: 100%;
  background: url(./../../media/bg2.fc58c850.png) no-repeat;
  background-size: 50%;
  position: absolute;
  background-position: 60% 65%;
  opacity: 0.7;
  /* z-index: 5; */
}
.login-right {
  width: 25rem;
  height: 30.47619048rem;
  position: absolute;
  /* z-index: 9; */
  text-align: center;
  left: 75%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 11px;
  background: rgba(49, 44, 44, 0.2);
  color: #fff;
}
.login-right h1 {
  margin-top: 100px;
  margin-bottom: 50px;
}

.tijiao {
  width: 250px;
  text-align: center;
  background: linear-gradient(90deg, #1596fb, #002dff);
  border: none;
}
/* 表单样式 */
.login-righ .el-form {
  width: 400px;
}
</style>
