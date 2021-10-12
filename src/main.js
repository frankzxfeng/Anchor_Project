import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import axios from 'axios'

import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, { size: 'mini', zIndex: 3000 })
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

// 创建.json文件，利用axios的get请求来获取静态配置文件里面的数据
// axios.get("./../config.json", {headers: {"Cache-Control": "no-cache" }}).then((result)=>{
//   //存到localStorage里面，方便在其他页面获取
//   localStorage.setItem('ApiUrl',result.data.ApiUrl);
//   localStorage.setItem('exteranLink',result.data.exteranLink);//外部病例链接
//   localStorage.setItem('shoufeiexteranLink',result.data.shoufeiexteranLink);//外部收费链接
//   //也可以声明成全局变量,在其他页面用this.ApiUrl获取
// //  Vue.prototype.ApiUrl=result.data.ApiUrl
// }).catch((error)=>{console.log(error)});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
