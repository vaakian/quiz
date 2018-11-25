// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios';
import { Button, Cell, CellGroup, Dialog, Field, Icon, NavBar, Pagination, Progress, PullRefresh, Tabbar, TabbarItem, Tag, Toast, NoticeBar, Stepper, Search, Popup, Picker, Panel, Slider, SwitchCell, Tab, Tabs } from 'vant';
import 'vant/lib/vant-css/index.css';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router';
// import echarts from 'echarts';
// import '@/components/SysConf.js';
Vue.use(VueAxios, axios)
Vue.use(Button).use(Toast).use(Tabbar).use(TabbarItem).use(Field).use(CellGroup).use(Cell).use(Tag).use(NavBar).use(Icon);
Vue.use(Dialog).use(Progress).use(Pagination).use(PullRefresh).use(NoticeBar).use(Stepper);
Vue.use(Search).use(Popup).use(Picker).use(Panel).use(Slider).use(SwitchCell);
Vue.use(Tab).use(Tabs);
Vue.config.productionTip = false

// var mainUrl = "http://localhost"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
