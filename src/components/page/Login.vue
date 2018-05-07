<template>
    <div class="login-wrap">
        <div class="bg"></div>
        <div class="ms-title">和火 商户中心</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input ref="mark" v-model="ruleForm.username" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="verification">
                    <el-input class="verificationInput" placeholder="验证码" v-model="ruleForm.verification" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    <img class="verificationImg" src="static/img/loadverify.gif" alt="验证码">
                </el-form-item>
                <el-checkbox v-model="checked">记住</el-checkbox>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登 录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      ruleForm: {
        username: "",
        password: "",
        verification: ""
      },
      url: "/mockjsdata/12/merchantPlatformLoginAjax",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        verification: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ]
      },
      checked: true
    };
  },

  created() {
    //   初始化检测用户是否登录过
    this.$axios.get("/mockjsdata/12/loginStatusAjax").then(res => {
      if (res.data.success) {
        //   this.$router.push("/finance");
      }
    });
  },
  mounted(){
      this.$refs.mark.$el.querySelector('input').focus();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //表单验证
          this.$axios
            .get(this.url, {
              params: {
                telphone: this.ruleForm.username,
                password: this.ruleForm.password,
                msgCode: this.ruleForm.verification
              }
            })
            .then(res => {
              if (res.data.code == "200" && res.data.success) {
                localStorage.setItem("ms_username", this.ruleForm.username);
                this.$router.push("/deal");
              }
            });
        } else {
          console.log("登录失败!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../../static/img/login.jpg") no-repeat;
  background-size: 100%;
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../../../static/img/login.jpg") no-repeat;
  background-size: 100%;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #a24f4f;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 220px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  font-size: 16px;
}
.login-btn {
  margin-top: 20px;
}
.verificationImg {
  position: absolute;
  top: 0;
  right: 0;
  height: 32px;
  cursor: pointer;
}
.verificationInput {
  width: 190px;
}
</style>