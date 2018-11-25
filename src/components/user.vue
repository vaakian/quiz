<template>
  <div id="user">
    <van-cell-group>

      <van-field :value="username" label="用户名" left-icon="contact" disabled />
      <van-cell value="查看" icon="like-o" to="/marked" is-link>
        <template slot="title">
          <span class="van-cell-text">我的收藏</span>
          <van-tag type="danger"> {{ totalRecords }}</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- <van-button @click="fillGraph">asd</van-button> -->
    <!-- <van-button size="large" type="default" @click="logout"  style="bottom:0;width: 95%">@alva</van-button> -->
    <br><span>我的收藏情况</span>
    <div id="chart" style="width:95%;height: 400px;"></div>
    <button class="myBtn" @click="logout" style="width: 95%">注销登录</button>
    <br><span>懒得写修改密码功能了~<br>修改密码或找回密码请联系：<br>作者<a href="http://wpa.qq.com/msgrd?v=3&amp;uin=861729091&amp;menu=yes">@alva</a></span>
    <br><img src="../assets/logo.jpg" style="width:90px; border-radius:50%; margin-bottom: -3px">
  </div>
</template>
<script>
  // import regPage form "/regpage"
  // const mainUrl = "http://localhost"
  // const mainUrl = location.origin

  const mainUrl = "http://132.232.7.38"
  export default {
    name: "user",
    props: ['totalRecords'],
    data: function () {
      return {
        username: localStorage.getItem("username"),
      }
    },
    mounted: function () {
      this.$emit("updataTitle", 3)
      this.fillGraph()
    },
    methods: {
      logout: function () {
        localStorage.clear()
        location.reload()
      },
      fillGraph: function () {
        // var d = [{"value":"13","name":"\u4eba\u5de5\u667a\u80fd\u3001\u4e91\u8ba1\u7b97\u3001\u5927\u6570\u636e\u3001\u7269\u8054\u7f51"},{"value":"12","name":"\u4fe1\u606f\u5b89\u5168"},{"value":"12","name":"\u4fe1\u606f\u7406\u8bba"},{"value":"4","name":"\u591a\u5a92\u4f53"},{"value":"1","name":"\u7a0b\u5e8f\u8bbe\u8ba1\u7406\u8bba"},{"value":"15","name":"\u8ba1\u7b97\u673a\u786c\u4ef6"},{"value":"7","name":"\u8ba1\u7b97\u673a\u7cfb\u7edf"},{"value":"33","name":"\u8ba1\u7b97\u673a\u7f51\u7edc"},{"value":"8","name":"\u8fdb\u5236\u8f6c\u6362"}]
        // console.log(document.getElementById('chart'));
        let url = mainUrl + "./ratio.php"
        this.axios.get(url, {
          params: {
            username: this.username,
            token: localStorage.getItem("token")
          }
        }).then(function (rsp) {
          var myChart = echarts.init(document.getElementById('chart'));
          var options = {
            //定义一个标题
            title: {
              text: '我的收藏情况',
              x: 'center'
            },
            
            series: [{
              name: '销量',
              type: 'pie',
              radius: '43%',
              data: rsp.data,
              label: {
                normal: {
                  show: true,
                  formatter: '{c}#{b}'
                }
              },
            }]
          };
          myChart.setOption(options);
        }).catch(function (rsp) {
          console.log("网络错误!")
        })

      }
    }
  }

</script>
