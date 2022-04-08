import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './app.vue'
import { isDev } from './config'

const id = `app_vue_${Date.now()}`
const root = document.createElement('div')
root.id = id

if (isDev) {
  document.body.appendChild(root)
} else {
  const header = document.getElementById('my-reports-heading')
  header.after(root)
}
Vue.use(VueAxios, axios)
new Vue({
  el: `#${id}`,
  render: h => h(App),
})
