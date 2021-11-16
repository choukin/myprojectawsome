import Vue from "vue";
import VueI18n from "vue-i18n"
import enUS  from "./locale/enUS";
import zhCN from "./locale/zhCN";
import qeuryString from 'query-string'
import VueHighLightjs from 'vue-highlightjs'
import 'highlight.js/styles/github.css'
import {Button, 
  Layout, 
  Icon, 
  Drawer, 
  Radio, 
  Menu,
  Form, 
  FormModel, 
  Input, 
  Select,
  ConfigProvider,
  Dropdown,
  DatePicker
} from "ant-design-vue"
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'ant-design-vue/dist/antd.less'
import Authorized from '@/components/Authorized'
import Auth from '@/directives/auth'
Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Radio)
Vue.use(Menu)
Vue.use(FormModel)
Vue.use(Form)
Vue.use(Input)
Vue.component('Authorized', Authorized)
Vue.use(Auth)
Vue.use(Select)
Vue.use(ConfigProvider)
Vue.use(Dropdown)
Vue.use(DatePicker)
Vue.use(VueI18n);
Vue.use(VueHighLightjs)

const i18n = new VueI18n({
  locale: qeuryString.parse(location.search).locale || 'zhCN',
  messages:{
    zhCN:{
      message: zhCN
    },
    enUS:{
      message:enUS
    }
  }
})
console.log(i18n.messages);
const NOTFOUND = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2913554_6nsx3c90uaw.js', // 在 iconfont.cn 上生成
});
Vue.component('NOTFOUND',NOTFOUND)
new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
