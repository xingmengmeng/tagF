import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

import Activity from './views/activity/activityInfo.vue';
new Vue({
    el: '#activity',
    components: { Activity },
})
