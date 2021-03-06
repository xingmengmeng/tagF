import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        notice:'',//公告内容
        setRouteData:[],//设置页面的路由数据,
        tagRouteData:[],//标签页面的路由数据,
        authAry:[],
        hasWhite:false,
        hasTag:false,
        tagTopScroll:null,
        tagBottomScroll:null,
        tagRightScroll:null,
        fourTreeScroll:null,
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