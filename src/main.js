import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

Vue.use(VueResource);
Vue.use(VueRouter);

import store from './store';/*vuex 状态引入*/

import App from './views/app.vue'

import Index from './views/index/indexMain.vue';
/*宏观*/
import macroView from './views/macroView/macroView.vue';
import groupPic from './views/macroView/groupPic.vue';
import trend from './views/macroView/trend.vue';
import needs from './views/macroView/needs.vue';
import customer from './views/macroView/customer.vue';
/*微观*/
import microView from './views/microView/microView.vue';
import micDetail from './views/microView/micDetail.vue';
import micSearch from './views/microView/micSearch.vue';

/*设置*/
import setting from './views/setting/setting.vue';
import setUser from './views/setting/setUser.vue';
import loginHistory from './views/setting/loginHistory.vue';
import notice from './views/setting/notice.vue';
import ideaList from './views/setting/ideaList.vue';
import auth from './views/setting/auth.vue';
import authList from './views/setting/authList.vue';
import authSet from './views/setting/authSet.vue';
import versionSet from './views/setting/versionSet.vue';
import tagProSet from './views/setting/tagProSet.vue';
import setAPI from './views/setting/setAPI.vue';
import apiDetail from './views/setting/apiDetail.vue';

import tagView from './views/tagView/tagMain.vue';
import tagMap from './views/tagView/tagView.vue';
import tagSet from './views/tagView/tagSet.vue';
import tagw from './views/tagView/tagw.vue';
import whiteListSet from './views/tagView/whiteListSet.vue';

import addUserGroup from './views/userGroup/addUserGroup.vue';
import userGroup from './views/userGroup/userGroup.vue';
import userDetail from './views/userGroup/userDetail.vue';
import userDetailMain from './views/userGroup/userDetailMain.vue';
import userLabel from './views/userGroup/userLabel.vue';
import downloadLink from './views/userGroup/downloadLink.vue';
import liabry from './views/userGroup/liabry.vue';
import userList from './views/userGroup/userList.vue';
import pushActivities from './views/activity/pushActivities.vue';

const router = new VueRouter({
    //hashbang:true,//路径已#/开头  防止刷新报404
    //history:true,
    mode:'history',
    linkActiveClass:'active',//当前页的选中状态
    routes: [
        { path: '/', redirect:'/index'},
        { path: '/index', component: Index}, 
        { path: '/pushActivities', component: pushActivities},
        { path: '/macroView',component:macroView,redirect:'macroView/groupPic',/*宏观*/
            children:[
                { path:'groupPic',component:groupPic},/*人群画像*/
                { path: 'trend', component: trend},/*趋势研究*/
                { path:'needs',component:needs},/*需求洞察*/
                { path:'customer',component:customer},/*客户关系*/
            ]
        },
        { path: '/microView',component:microView,redirect:'microView/micSearch',/*微观搜索页面*/
            children:[
                { path:'micSearch',component:micSearch},/*微观详情页面*/
                { path:'micDetail',component:micDetail}
            ]
        },
        { path: '/tagView',component:tagView,redirect: to => {
                //to 为参数  是一个对象
                return localStorage.getItem('tagRoute');
            },
            children:[
                { path:'tagMap',component:tagMap},
                { path:'tagw',component:tagw,redirect:'/tagView/tagw/tagSet',
                    children:[
                        { path:'tagSet',component:tagSet},
                        { path:'tagSet/whiteListSet',component:whiteListSet},
                    ]
                },
            ]
        },
        { path: '/userGroup', component: userGroup,
            children:[
                { path:'',component:userList},
                { path: 'addUserGroup', component: addUserGroup},
                { path:'userDetail',component:userDetail,
                    children:[
                        { path:'groupMain',component:userDetailMain},
                        { path:'userLabel',component:userLabel},
                        { path:'downloadLink',component:downloadLink},
                        { path:'liabry',component:liabry},
                    ]
                },
            ]
        },
        { path: '/setting', component: setting,redirect: to => {
                //to 为参数  是一个对象
                return '/setting/'+localStorage.getItem('settingRoute');
            },
            children:[
                { path:'setUser',component:setUser},/*用户*/
                { path:'loginHistory',component:loginHistory},/*登录历史*/
                { path:'notice',component:notice},/*公告*/
                { path:'ideaList',component:ideaList},/*意见反馈*/
                { path:'auth',component:auth,redirect:'auth/authList',
                    children:[
                        { path:'authList',component:authList},/*权限管理*/
                        { path:'authSet',component:authSet},
                    ]
                },
                { path:'versionSet',component:versionSet},/*版本说明*/
                { path:'tagProSet',component:tagProSet},/*标签加工*/
                { path:'api',component:auth,redirect:'api/apiAdd',
                    children:[
                        { path:'apiAdd',component:setAPI},/*api新增  首页*/
                        { path:'apiDetail',component:apiDetail},
                    ]
                },/*API接口*/
            ]
        },
        /*{ path: "*", redirect: '/index' },*/
    ]
})

Vue.http.interceptors.push(function(request, next) {
    next(function(response) {
        if(response.status==200){
            if(response.body.code==203||response.body.code==undefined){
                window.location.href='/login.html';
            }
        }
        return response;
    });
});

new Vue({
    el: '#app',
    router:router,
    store:store,
    components: { App },
    watch:{
        $route(){
            this.$store.state.fourTreeScroll=null;
            this.$store.state.tagTopScroll=null;
            this.$store.state.tagBottomScroll=null;
        }
    }
})