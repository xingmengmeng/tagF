import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

import Login from './views/login/login.vue';
new Vue({
    el: '#loginApp',
    components: { Login },
})