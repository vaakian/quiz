<template>
  <div class="quizbody" style="margin-top: 5px">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
    <van-popup v-model="showAnalysis" style="width:100%;height:84%;" position="right" :overlay="false">
      <div style="padding-top: 20px">
        <h3>答对:<a style="color: green">{{(rightCount) }}</a> / {{questionCount}}</h3>
        <h3>得分:<a style="color: green">{{(rightCount/questionCount * 100).toFixed(2) }}</a> / 100</h3>
        <button class="myBtn" @click="again();showAnalysis= !showAnalysis;">继续做题</button>
        <button class="myBtn" @click="showAnalysis= !showAnalysis;">返回</button>
        <h1>本次错题</h1>
        <table>
          <tbody v-for="(answer,key) in userAnswer" :key="key" v-if="answer != questions[key].answer">
            <tr>
              <td colspan="2" style="background-color: rgba(0, 0, 0, 0.075);">
                <a v-html="(key+1) + '、' + questions[key].title"></a>
                <van-button size="small" @click="addfav(questions[key].ID)" plain>
                加入收藏</van-button>
              </td>
            </tr>
            <tr>
              <td>{{ questions[key].A }}</td>
              <td>{{ questions[key].B }}</td>
            </tr>
            <tr>
              <td>{{ questions[key].C }}</td>
              <td>{{ questions[key].D }}</td>
            </tr>
            <tr>
              <td>答案[<strong style="color: green">{{ questions[key].answer }}</strong>]</td>
              <td>我的答案:<span style="color: red;font-weight:bold;">{{ answer ? answer : '未选' }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </van-popup>
    <div id="options">
      <van-progress :percentage="parseFloat(percentage.toFixed(1))" />
      <div id="title">
        <strong>{{ (questionIndex+1) + '、' + questions[questionIndex].title }}<a style="color: green"><br> {{ favTimeFixed }}</a></strong>
      </div>
      <!-- <van-cell title="单元格" is-link /> -->
      <van-button class="options" size="large" :type="btnTypes.A" @click="checkAnswer('A')" :text="questions[questionIndex].A"></van-button>
      <van-button class="options" size="large" :type="btnTypes.B" @click="checkAnswer('B')" :text="questions[questionIndex].B">{{
        questions[questionIndex].B }}</van-button>
      <van-button class="options" size="large" :type="btnTypes.C" @click="checkAnswer('C')" :text="questions[questionIndex].C">{{
        questions[questionIndex].C }}</van-button>
      <van-button class="options" size="large" :type="btnTypes.D" @click="checkAnswer('D')" :text="questions[questionIndex].D">{{
        questions[questionIndex].D }}</van-button>
    </div>
    <div id="btns">
      <template v-if="isFavs">
         <van-button class="myBtn" v-show="showAddFav" size="small" @click="showAddFav=false; showRmFav=true;addfav(questions[questionIndex].ID)" plain>
        <van-icon name="like-o" />我点错了~重新收藏</van-button>
      <van-button class="myBtn" v-show="showRmFav" size="small" @click="showAddFav=true; showRmFav=false; rmFav(questions[questionIndex].ID)" plain>
        <van-icon name="clear" />我会做了~移除这题</van-button>
      </template>
      <template v-else>
        <van-button class="myBtn" size="small" @click="addfav(questions[questionIndex].ID)" plain>
          <van-icon name="like-o" />加入收藏</van-button>
      </template>
      <br>
      <!-- <div id="againBtn" v-show="questionIndex >= questions.length - 1">
        <van-button type="primary" style="width: 96%" @click="again" plain>继续做题</van-button>
        <br>
      </div> -->
      <button class="myBtn" @click="lastQuestion" style="width: 47%" nowrap>上一题</button>
      <button class="myBtn" @click="nextQuestion" style="width: 47%" nowrap>下一题</button>
      <button v-if="!noTips" class="myBtn" @click="showAnswer" style="width: 96%">显示答案</button>
      <van-button type="default" @click="showSetting = !showSetting;" :round="true" style="margin:5px;width: 96%">
        <van-icon name="setting" size="large" />抽题设置
      </van-button>
      <van-popup v-model="showSetting" position="bottom " :overlay="true">
        <van-panel :title="'当前抽题:' + questionCount" :desc="catButton" status="" style="border:2px solid #eee">
          <div>
            <span style="color: #555">滑动选择抽题数（5-100）</span>
            <van-slider v-model="questionCount" :step="5" bar-height="10px" style="padding: 5px;margin: 10px" :max="100"
              :min="5" @change="onChangeCount" />
            <van-button @click="showPop = true" type="default" size="large" plain>{{ catButton }}</van-button>
            <!-- <van-button @click="showPop = true" type="default" size="large" plain>{{ catButton }}</van-button> -->
            <div>
              <van-switch-cell v-model="noTips" title="开启考试模式->" @change="onOpenTips" />
              <van-switch-cell v-model="isFavs" title="从我的收藏抽题->" @change="onOpenFavs" />
            </div>

            <van-popup v-model="showPop" position="bottom">
              <van-picker show-toolbar :columns="categories" @confirm="onSelectCategory" @cancel="showPop = false" />
            </van-popup>
          </div>
          <div slot="footer">
            <van-button @click="questionCount = 10; category_id = 0; again();" type="danger" size="small">恢复默认</van-button>
            <van-button @click="again(); showSetting = !showSetting;" size="small" type="danger">应用设置</van-button>
            <!-- <van-button @click="showSetting = !showSetting;" size="large" type="danger">隐藏我</van-button> -->
          </div>
        </van-panel>
      </van-popup>
      <van-notice-bar :text="message" />
      <!-- <a href="https://jq.qq.com/?_wv=1027&k=5iQT2Hb">点击我加入群聊<br>【计算机技能高考】952346968</a> -->
      <!-- <a href="http://132.232.7.38/old/" type="primary">
        <h3>新版用的不爽？点我使用老版</h3>
      </a> -->
    </div>

  </div>
</template>

<script>
  var loadingIndex
  var username, token
  var toastDuration = 400
  // const mainUrl = location.origin
  const mainUrl = "http://132.232.7.38"
  // const mainUrl = "http://localhost"
  if (localStorage.getItem("username")) {
    username = localStorage.getItem("username")
  }
  if (localStorage.getItem("token")) {
    token = localStorage.getItem("token")
  }
  export default {
    name: 'quizbody',
    data() {
      return {
        message: "答题系统正在逐步完善，有好的建议或意见都可以联系企鹅861729091",
        category_id: 0,
        questionCount: 10,
        showPop: false,
        showAnalysis: false,
        showSetting: false,
        noTips: false,
        q_channel: 1,
        showAddFav: false,
        showRmFav: true,
        isFavs: false,
        categories: ['信息理论', '进制转换', '信息安全', '计算机系统', '计算机硬件', '程序设计', '计算机网络', '多媒体', 'AI、云计算、大数据、IOT', '全部随机'],
        questions: [{
          title: "数据加载中……",
          A: "数据加载中……",
          B: "数据加载中……",
          C: "数据加载中……",
          D: "数据加载中……",
          time: '',
        }],
        userAnswer: [],
        btnTypes: {
          A: 'default',
          B: 'default',
          C: 'default',
          D: 'default'
        },
        questionIndex: 0,
      }
    },
    created: function () {
      this.getQuestions()
      this.getMessage()
      localStorage.setItem('alertCode', '1');
      // if(localStorage.getItem('noTips')) {
      //   this.noTips = true
      // }else{
      //   this.noTips = false
      // }
    },
    computed: {
      favTimeFixed: function() {
        var questions = this.questions
        var questionIndex = this.questionIndex
        if(questions[questionIndex].time){
          return "收藏时间:" + questions[questionIndex].time
          
        }
        return ''
      },
      btnTypesFixed: function () {
        return this.btnTypes
      },
      percentage: function () {
        return parseInt(((this.questionIndex + 1) / this.questions.length) * 100)
      },
      catButton: function () {
        return this.category_id ? "当前考点:" + this.categories[this.category_id - 1] : "（当前默认随机）点击选择考点";
      },
      rightCount: function () {
        var count = 0
        for (let i = 0; i < this.questions.length; i++) {
          if (this.userAnswer[i] == this.questions[i].answer) count++
        }
        return count
      }
    },
    methods: {
      onOpenFavs() {
        if ((!username) || (!token)) {
          this.$toast(`未登录哦，点击下方"我的"登录或注册后使用收藏功能~`)
          this.isFavs = false
          return;
        }
        if(this.isFavs) {
          this.$toast('开启后只会抽自己收藏的题目哦~')
        }else {
          this.$toast('已关闭收藏抽题~')
        }
      },
      onOpenTips: function () {
        if (this.noTips == true) {
          this.$toast( {
            message: `开启考试模式后，将不再提示选项是否正确。\n
                      完成所有题目后，系统将给出本次答题成绩。
                      `,
            duration: 4000
          });
        } else {
          this.$toast({
            message: '已关闭考试模式'
          });
        }
        // this.getQuestions()
        // this.showSetting = false
      },
      getMessage: function () {
        let url = mainUrl + "/msg.php"
        var me = this
        this.axios.get(url).then(function (rsp) {
          me.message = rsp.data
        })
      },
      onChangeCount: function () {
        this.$toast("抽题数：" + this.questionCount);
      },
      onSelectCategory: function (value, index) { //选择章节回调函数
        this.category_id = index + 1
        // console.log(this.)
        this.showPop = false
        // this.again()
      },
      toaster: function (msg, duration) {
        this.$toast({
          duration: duration ? duration : toastDuration,
          message: msg
        })
      },
      getQuestions: function () {
        loadingIndex = this.$toast.loading({
          mask: true,
          message: '加载中...'
        });
        var me = this;
        let url = mainUrl + "/getpro.php"
        this.axios.get(url, {
          params: {
            count: this.questionCount,
            category_id: this.category_id,
            q_channel:  this.q_channel,
            isfavs: this.isFavs ? 1:0,
            username: username
          }
        }).then(function (rsp) {
          me.userAnswer.length = rsp.data.length
          me.questionCount = rsp.data.length
          me.questions = rsp.data
          loadingIndex.clear()
          me.$toast.success({
            message: "载入成功",
            duration: toastDuration
          })
        })
      },
      rmFav: function (id) {
        var me = this
        let url = mainUrl + "/rmfav.php"
        // console.log(this.username)
        this.axios.get(url, {
            params: {
              username: username,
              id: id,
              token: token
            }
          })
          .then(function (rsp) {
            me.toaster('已移除')
          })
      },
      showAnswer: function () {
        let tempIndex = this.questions[this.questionIndex].answer
        this.btnTypes[tempIndex] = 'primary'
      },
      addfav: function (id) {
        if ((!username) || (!token)) {
          this.$toast(`未登录哦，点击下方"我的"登录或注册后使用收藏功能~`)
          return;
        }
        var me = this;
        let favUrl = mainUrl + "/addfav.php"
        this.axios.get(favUrl, {
            params: {
              id: id,
              username: username,
              token: token
            }
          })
          .then(function (rsp) {
            (rsp.data == '1') ?
            me.$toast.success({
              message: '已收藏',
              duration: toastDuration
            }): me.$toast.fail({
              message: '已经收藏过啦',
              duration: toastDuration
            })
          })
      },
      checkAnswer: function (option) {
        let questions = this.questions
        let questionIndex = this.questionIndex
        this.clearOptions()
        this.$set(this.userAnswer, this.questionIndex, option)
        if (this.noTips) {
          console.log(questionIndex)
          this.btnTypes[option] = 'primary'
          // this.nextQuestion()
          return;
        }
        if (this.questionIndex + 1 == this.questionCount) this.showAnalysis = true
        if (option == questions[questionIndex].answer) {
          this.toaster("回答正确")
          this.btnTypes[option] = 'primary'
        } else {
          this.toaster("回答错误")
          this.btnTypes[option] = 'warning'
        }
      },
      nextQuestion: function () {
        this.clearOptions()
        if (this.questionIndex < (this.questions.length - 1)) {
          this.questionIndex++
          this.showUserOptions()
        } else {
          this.showAnalysis = true
          this.toaster("到底啦！想继续做题请点继续做题哦~", 1200)
        }
      },
      lastQuestion: function () {
        if (this.questionIndex > 0) {
          this.questionIndex--
          this.showUserOptions()
        } else {
          this.toaster("到顶啦！", 600)
        }
        if(!this.noTips) {
          this.clearOptions()
        }
      },
      clearOptions: function () {
        this.btnTypes.A = 'default'
        this.btnTypes.B = 'default'
        this.btnTypes.C = 'default'
        this.btnTypes.D = 'default'
        this.showAddFav=false; 
        this.showRmFav=true;
      },
      showUserOptions: function () {
        this.clearOptions()
        let tempIndex = this.userAnswer[this.questionIndex]
        this.btnTypes[tempIndex] = 'primary'
      },
      again: function () {
        this.getQuestions()
        this.clearOptions()
        this.userAnswer = []
        this.questionIndex = 0
      }
    }
  }

</script>
<style scoped>
  .options {
    line-height: 22px;
    transition: 0.1s;
    padding-top: 15px;
    padding-bottom: 15px;
    height: auto;
    word-break: normal;
    overflow: visible;
  }

  button {
    margin: 1px auto;
    /* margin-left: 5%; */

  }

  .van-button--large {
    margin: 0px;
  }

  .van-button--small {
    padding-top: 1px;
    /* padding-bottom: 8px; */
  }

  #btns {
    margin: 0 auto;
    width: 300px;
    margin-bottom: 25%;
  }

  #title {
    text-align: left;
    margin-bottom: 5px;
    margin-top: 10px;
  }

  #options {
    margin-bottom: 5px;
  }

  .van-progress__portion {
    transition: width 2s;
    -moz-transition: width 2s;
    /* Firefox 4 */
    -webkit-transition: width 2s;
    /* Safari and Chrome */
    -o-transition: width 2s;
    /* Opera */
  }

</style>
