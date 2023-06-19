import App from '@/App.vue';
import PrimeVue from 'primevue/config';
import Vue from 'vue';

Vue.config.productionTip = false;
Vue.use(PrimeVue);

new Vue({
  render: h => h(App)
}).$mount('#app')
