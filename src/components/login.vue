<template>
  <div id="login">
    <h4>未登录，请登录或注册~</h4>
    <van-cell-group>

      <van-field label="账号" left-icon="contact" v-model="username" @keyup.enter="login" type="text" placeholder="请输入账号"
        error-message="" border />
      <van-field label="密码" left-icon="idcard" v-model="password" @keyup.enter="login" type="password" placeholder="请输入密码"
        border />
      <van-button size="large" type="primary" style="width: 98%" @click="login" v-if="!isLogin">登录</van-button>
      <van-dialog v-model="isLogin" confirm-button-text="注册" show-cancel-button :before-close="beforeClose">
        <van-field v-model="username" label="用户名" :error-message="usrErr" placeholder="请输入用户名" />
        <van-field v-model="password" type="password" :error-message="pwdErr" label="密码" placeholder="请输入密码" />
        <van-field v-model="passwordConfirm" type="password" :error-message="pwdConfirm" label="密码" placeholder="再次确认密码" />
      </van-dialog>
      <div style="text-align: auto">
        <a @click="isLogin = !isLogin;" style="float: left">没有账号？点我注册</a>
        <a style="float: right" @click="$toast('联系作者QQ:861729091，下面有按钮可直达~')">忘记密码？</a>
      </div>
      <br>
    </van-cell-group>
      <span id="msg" style="text-align: left; bottom: 0px"><br>
        题库来源于<strong style="color: blue">万维考试系统</strong>，
				于18年3月更新，非网传旧题库，如有侵权请
				<a style="color: blue" href="http://wpa.qq.com/msgrd?v=3&uin=861729091&menu=yes">联系作者。</a>
				<br>
				作者是一名2018计算机技能高考考生，技能总分487，现就读于湖北理工学院。
				本人绝非炫耀，只是提醒你，题目<strong>来之不易。</strong>
        <br>
        没有万维考试系统的同学，用这套系统做题也没差别。
        <br>
        <img style="width:150px;height:150px;" src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=ca5bbf21c4cec3fd9f33af27b7e1bf5a/72f082025aafa40f38b28c30ac64034f79f019e2.jpg">
      </span>
  </div>
</template>
<script>
  // const mainUrl = location.origin
  const mainUrl = "http://132.232.7.38"
  // const mainUrl = "http://localhost"
  export default {
    name: 'login',
    data: function () {
      return {
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
        token: localStorage.getItem("token"),
        passwordConfirm: null,
        isLogin: false
      }
    },
    activated: function() {
      this.$emit("updataTitle",3)
    },
    computed: {
      pwdConfirm: function(){
        if(this.password != this.passwordConfirm) return "两次输入的密码不一致！"
        return null
      },
      pwdErr: function(){
        var pwd = this.password
        if(!pwd){
          return '请输入密码'
        }
        if(pwd.length < 6) return "密码长度必须大于6位！"
        return null;
      },
      usrErr: function () {
        var usr = this.username
        if (!usr) {
          return '请输入用户名'
        }
        var msg = null
        if (usr.includes(' ')) {
          this.username = this.username.replace(" ", "")
          return "用户名不允许出现空格！"

        }
        if (usr.length < 6) return "用户名长度至少6位！"

        return msg
      }
    },
    methods: {
      login: function () {
        let username = this.username
        let password = this.password
        if (!username) {
          this.$toast.fail({
            message: "请输入用户名",
            duration: 600
          })
          return;

        }
        if (!username) {
          this.$toast.fail({
            message: "请输入密码",
            duration: 600
          })
          return;
        }
        var me = this
        this.axios.get(mainUrl + "/login.php", {
          params: {
            username: this.username,
            password: this.password
          }
        }).then(function (rsp) {
          let info = rsp.data.info
          let code = rsp.data.code
          let token = rsp.data.token
          if (info == "success") {
            me.saveUserInfo(username, password, token)
            me.$toast.success("登录成功")
            location.reload()
          } else {
            me.$toast.fail("登录失败")
          }
        })

      },
      reg: function () {

      },
      saveUserInfo: function (username, password, token) {
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
        localStorage.setItem("token", token)
      },
      beforeClose: function (action, done) {
        console.log("before")
        if (action == "cancel")
        {
          done();
        }
        if (!this.username) {
          this.$toast.fail("请输入账号！");
          done(false);
          return;
        }
        if (this.username.length < 6) {
          this.$toast.fail("账号长度最少6位！");
          done(false);
          return;
        }
        if (!this.password) {
          this.$toast.fail("请输入密码！");
          done(false);
          return;
        }
        if (this.password.length < 6) {
          this.$toast.fail("密码最少6位！");
          done(false);
          return;
        }
        if (this.password != this.passwordConfirm) {
          this.$toast.fail("两次输入密码不一致！");
          done(false);
          return;
        }

        var me = this
        if (action === 'confirm') {
          let url = mainUrl + "/reg.php"
          this.axios.get(url, {
            params: {
              username: me.username,
              password: me.password
            }
          }).then(function (rsp) {
            if (rsp.data == '1') {
              me.$toast.success("注册成功，请登录~")
            } else {
              me.$toast.fail("注册失败，用户名可能已存在。")
            }
          }).catch(function (rsp) {
            me.$toast.fail("网络错误！")
          })
          done()
        } else {
          done()
        }
      }
    }
  }

</script>
<style>
  button {
    transition: 1s;
  }

</style>
