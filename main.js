// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import store from '@/store/store.js'
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
import {
  $http
} from '@escook/request-miniprogram'

export function createApp() {
  uni.$http = $http
  uni.$showMsg = function(title = '数据请求失败', duration = 1500) {
    uni.showToast({
      title: title,
      duration: duration,
      icon: 'none'
    })
  }
  // 配置请求根路径
  $http.baseUrl = 'https://api-hmugo-web.itheima.net'

  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
// #endif
