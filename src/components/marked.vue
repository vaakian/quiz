<template>
  <div id="marked">
    <div id="container" style="height:">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div id="qs">
          {{ currentQuestions }}
          <table v-if="typeof questions != 'string'">
            <tbody v-for="(question,key) in questions" v-if="key != 0" :key="key">
              <tr>
                <td colspan="2" style="background-color: rgba(0, 0, 0, 0.075);">
                  {{ key + '、' + question.title }}
                  <van-button size="mini" style="float: right" @click="rmFav(question.ID)">删除</van-button>
                </td>
              </tr>
              <tr>
                <td>{{ question.A }}</td>
                <td>{{ question.B }}</td>
              </tr>
              <tr>
                <td>{{ question.C }}</td>
                <td>{{ question.D }}</td>
              </tr>
              <tr>
                <td>答案[<strong style="color: green">{{ question.answer }}</strong>]</td>
                <td style="color: red">{{ question.time }}</td>
              </tr>
            </tbody>
          </table>
          <van-notice-bar text="还没有搜藏任何题目哦~" v-else />
        </div>
      </van-pull-refresh>
    </div>
    <div>
      <!-- <van-stepper v-model="currentPage" /> -->
      <van-button @click="showPop = true" type="primary" size="large" plain>自定义跳转页</van-button>
      <van-popup v-model="showPop" position="bottom">
        <van-picker show-toolbar :columns="PageList" @confirm="onSelectPage" @cancel="showPop = false" />
      </van-popup>
      <van-pagination v-model="currentPage" :page-count="pageCount" mode="simple" style="margin-bottom: 25%" />

    </div>

  </div>
</template>
<style>
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

<script>
// const mainUrl = "http://localhost"
//   const mainUrl = location.origin
const mainUrl = "http://132.232.7.38"
  export default {
    name: 'marked',
    data: function () {
      return {
        showPop: false,
        PageList: [],
        questions: [],
        username: localStorage.getItem("username"),
        currentPage: 1,
        pageCount: 0,
        isLoading: false,
        token: localStorage.getItem("token")
      }
    },
    computed: {
      currentQuestions: function () {
        this.updataQuestions(this.username, this.currentPage)
      }
    },
    created: function () {
      if (this.username) {
        this.$emit("updataTitle", 3)
        let url = mainUrl + "/getfav.php"
        var me = this
      }
    },
    activated: function () {
      this.updataQuestions(this.username, this.currentPage)
    },
    methods: {
      onSelectPage: function (value, index) {
        this.currentPage = index + 1
        this.showPop = false
      },
      onRefresh() {
        this.updataQuestions()

      },
      rmFav: function (id) {
        var me = this
        let url = mainUrl + "/rmfav.php"
        this.axios.get(url, {
            params: {
              username: me.username,
              id: id,
              token: me.token
            }
          })
          .then(function (rsp) {
            me.updataQuestions()
          })
      },
      updataQuestions: function (username, page) {
        var loadingIndex = this.$toast.loading({
          mask: true,
          message: '加载中...'
        });
        var me = this
        let url = mainUrl + "/getfav.php"
        this.axios.get(url, {
          params: {
            username: this.username,
            page: this.currentPage,
            token: this.token
          }
        }).then(function (rsp) {
          // return rsp.data
          me.pageCount = Math.ceil(rsp.data[0] / 15)
          for (let i = 1; i <= me.pageCount; i++) {
            me.PageList.push(i)
          }
          me.questions = rsp.data
          me.isLoading = false
          loadingIndex.clear()
          // me.$toast.success("加载成功")
        })
      }
    }
  }

</script>
