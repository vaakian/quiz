<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->

    <van-nav-bar :title="navTitle[tabActive]" @click-left="onClickLeft" @click-right="gotoUser">
      <van-icon name="wap-home" slot="left" />
      <!-- <span slot="left">首页</span> -->
      <van-icon name='contact' slot="right" />
    </van-nav-bar>
    <transition>
      <keep-alive>
        <router-view @updataTitle="updataTitle" :totalRecords="totalRecords" style="margin-bottom: 25%"></router-view>
      </keep-alive>
    </transition>
    <van-tabbar v-model="tabActive">
      <van-tabbar-item icon="aim" to="/">做题</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">题目搜索</van-tabbar-item>
      <van-tabbar-item icon="records" to="/info">高考数据</van-tabbar-item>
      <van-tabbar-item icon="contact" :info="totalRecords" to="/user" @click="getTotalRecords">我的</van-tabbar-item>
      <!-- <van-tabbar-item icon="gold-coin" info="20">标签</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script>
  const mainUrl = "http://132.232.7.38"
  // const mainUrl = location.origin
  // const mainUrl = "http://localhost"
//import test from "./components/test"
  export default {
    name: 'App',
    data: function () {
      return {
        tabActive: 0,
        username: localStorage.getItem('username'),
        token: localStorage.getItem("token"),
        navTitle: ["计算机&应知刷题", "题目搜索", "高考数据", "个人中心"],
        totalRecords: 0
      }
    },
    created: function () {
      if (this.username) {
        this.getTotalRecords()
      }
    },
    beforeUpdate: function () {

      // this.updataActive()
    },
    methods: {
      getTotalRecords: function () {
        console.log(mainUrl)
        if (!this.username) {
          return;
        }
        let username = this.username
        let url = mainUrl + "/getfav.php"
        var me = this
        this.axios.get(url, {
          params: {
            records: true,
            username: this.username,
            token: this.token
          }
        }).then(function (rsp) {
          me.totalRecords = rsp.data
        })
      },
      updataTitle: function (index) {
        //   const hash  = {
        //   "#/": 0,
        //   "#/search": 1,
        //   "#/user": 2,
        //   "#/marked": 2
        // }
        // this.tabActive = hash[location.hash]
        this.tabActive = index
        console.log(index)
      },
      onClickLeft: function () {
        location.href = "#/"
        this.tabActive = 0
      },
      gotoUser: function () {
        location.href = "#/user"
        this.tabActive = 3
      }
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 10px;
  }

  .myBtn {
    background-color: rgb(0, 123, 255);
    border-bottom-color: rgb(0, 123, 255);
    border-bottom-left-radius: 4.8px;
    border-bottom-right-radius: 4.8px;
    border-bottom-style: solid;
    border-bottom-width: 0.8px;
    border-image-repeat: stretch stretch;
    border-image-slice: 100%;
    border-image-source: none;
    border-image-width: 1;
    /* border-left-color: rgb(0, 123, 255);
border-left-style: solid;
border-left-width: 0.8px; */
    border-right-color: rgb(0, 123, 255);
    border-left-color: rgb(0, 123, 255);
    border-right-style: solid;
    border-right-width: 0.8px;
    border-top-color: rgb(0, 123, 255);
    border-top-left-radius: 4.8px;
    border-top-right-radius: 4.8px;
    border-top-style: solid;
    border-top-width: 0.8px;
    box-sizing: border-box;
    color: rgb(255, 255, 255);
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
    padding-bottom: 8px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 8px;
    position: relative;
    text-align: center;
  }

  .van-button--primary {
    background-color: rgb(0, 123, 255);
    border-color: rgb(0, 123, 255);
    font-size: 16px;
  }

  table {
    table-layout: fixed;
    word-break: break-all;
  }

  table,
  table td,
  table th {
    text-align: left;
    border: 1px solid #dee2e6;
    padding: 0.75rem;
    border-collapse: collapse;
  }

  tr {
    width: 100px;
  }

</style>
