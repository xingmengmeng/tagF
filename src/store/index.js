import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        notice:'',//公告内容
        setRouteData:[],//设置页面的路由数据,
        authAry:[],
    },
    mutations:{
        changeNotice(state,con){
            state.notice=con;
            //console.log('c:'+con);
        }
    },
    actions:{
        changeNotice({commit},con){
            commit('changeNotice',con);
        }
    }
})