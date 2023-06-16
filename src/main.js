import App from '@/App.vue';
import PrimeVue from 'primevue/config';
import Vue from 'vue';
import store from './store';

Vue.config.productionTip = false
Vue.use(PrimeVue);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
