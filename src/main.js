import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue2OrgTree from 'vue2-org-tree'
import 'vue2-org-tree/dist/style.css';
Vue.use(Vue2OrgTree);

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
