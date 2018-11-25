<template>
  <div id="search">
    <van-search v-model="keyword" placeholder="关键词两位最佳~" show-action @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <div id="qs" style="transition: height 5">
        <table v-if="questions.length > 0" name="fade">
          <tbody v-for="(question,key) in questions" :key="key">
            <tr>
              <td colspan="2" style="background-color: rgba(0, 0, 0, 0.075);" v-html="(key+1) + '、' + question.title">
                <!-- <van-button size="mini" style="float: right" @click="rmFav(question.ID)">删除</van-button> -->
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
              <td>难度:<span style="color: green;font-weight:bold;">{{ question.hard }}</span></td>
            </tr>
          </tbody>
        </table>
        <van-notice-bar text="还没有搜到任何题目哦~" v-else />
      
    </div>
    <!-- <van-button type="primary" size="large" style="width: 90%">搜素</van-button> -->
    <!-- <hr> -->
  </div>
</template>
<script>
  const mainUrl = "http://132.232.7.38"
  export default {
    name: 'search',
    data: function () {
      return {
        keyword: null,
        questions: []
      }
    },
    created: function () {
      this.$emit("updataTitle", 1)
    },
    methods: {
      onSearch: function () {
        if (!this.keyword) {
          this.$toast.fail("请输入搜索关键词~")
          return;
        }
        var onLoading = this.$toast.loading({
          mask: true,
          message: '加载中...'
        });
        let keyword = this.keyword
        let url = mainUrl + "/qsearch.php"
        var me = this
        this.axios.get(url, {
          params: {
            keyword: keyword
          }
        }).then(function (rsp) {
          var data = rsp.data.questions
          var totalRecords = rsp.data.totalRecords
          for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            data[i].title = data[i].title.replace(me.keyword,
              '<span style="color:red;font-style:oblisque;font-weight:bold;">' + me.keyword + '</span>')
          }
          me.questions = data
          var len = me.questions.length
          onLoading.clear()
          if (len > 0) {
            if (totalRecords > 50)
              me.$toast("匹配到" + totalRecords + "题，考虑到性能，只显示前50个结果~")
            else {
              me.$toast.success("匹配到" + totalRecords + "题~")
            }
            return;
          }
          me.$toast.fail("没搜到哦，关键词两位最佳~")
        })
      }
    }

  }

</script>

<style>

</style>
