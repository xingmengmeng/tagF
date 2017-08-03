<template>
<div>
    <header class="container" id="header">
        <a href="http://bipcbdc.gomefinance.com.cn" class="logo left">logo</a>
        <div class="logoF">用户标签管理系统</div>
        <div class="right headRight">
            <router-link to="/setting" class="set-mes" v-if="isAdmin">设置</router-link>
            <div class="ad-center" @mouseenter="toolEnter" @mouseleave="toolLeave">
                <div class="right userMess">
                    <span v-cloak>{{userName}}</span>
                    <i></i>
                </div>
                <ul class="headerTool">
                    <li><a href="javascript:;" @click="logoutFn">注销</a></li>
                </ul>
            </div>
        </div>
        <div class="nav">
            <!--<a v-for="menu in menuData" :href="'.'+menu.href" :class="urlData==menu.href?'active':''">{{menu.name}}</a>-->
            <!--<router-link to="/index">首页</router-link>
            <router-link to="/addUserGroup">用户群</router-link>-->
            <!--macroView 宏观   microView  微观  -->

            <router-link :to="'/'+menu.href" v-for='(menu,index) in menuData' :key="index">{{menu.name}}</router-link>
        </div>
        
    </header>
    <marquee v-if="$store.state.notice!=''&&$store.state.notice!=null"><span class="grollSpan">{{$store.state.notice}}</span></marquee>
</div>
    
</template>
<style lang="less" scoped>
marquee{
    padding-top:5px;
}
.grollSpan{
    display: inline-block;
    height: 25px;
    line-height: 25px;
    padding-left:25px;
    color:#333;
    font-size:12px;
    background: url(../assets/images/ggIcon.png) left top no-repeat;
}
</style>
<script type="text/ecmascript-6">
    require('../assets/css/reset.min.less');
    require('../assets/css/layout.less');

    export default {
        data () {
            return {
                userName:'',
                timer:null,
                menuData:[],
                pageData:[],
                isAdmin:false,
            }
        },
        components:{

        },
        mounted(){
            this.notice=this.$store.state.notice;
            this.getData();
        },
        methods:{
            getData(){
                /*得到公告信息*/
                this.$http.get('/api/notice/get.gm').then(function(res){
                    if(res.data.code=='200'){
                        this.$store.state.notice=res.data.dataInfo;
                    }
                })
                //获取天眼登录过来需要存储的两个值
                this.$http.get('/api/getUserNameAndIsAdmin.gm').then(function(getLocal){
                    if(getLocal.data.code=='200'){
                        localStorage.setItem('userName',getLocal.data.dataInfo.userName.split('@')[0]);
                        localStorage.setItem('isAdmin',getLocal.data.dataInfo.isAdmin);
                        this.userName=localStorage.userName;
                        if(localStorage.isAdmin&&localStorage.isAdmin=='true'){
                            this.isAdmin=true;
                        }
                    }
                })
                this.$http.get('/api/getMenus.gm').then(function (res) {
                    //得到链接
                    res.data.dataInfo.forEach( (item)=> {
                        item.type=='menu'?this.menuData.push(item):this.pageData.push(item);
                    });
                    var hrefReg=/\/(\w+)\./;
                    for(var i=0;i<this.menuData.length;i++){
                        var cur=this.menuData[i];
                        var hrefstr=cur.href;
                        hrefstr.replace(hrefReg,($0,$1)=>{cur.href=$1});
                    }
                });   
            },
            logoutFn(e){
                if(e.target.innerHTML=='注销'){
                    this.$http.get('/api/logout.gm').then(function (res) {
                        if(res.data.code==200){
                            localStorage.removeItem('isAdmin');
                            localStorage.removeItem('userName');
                            window.location.href='http://bipcbdc.gomefinance.com.cn/login.html';
                        }
                    })
                }
            },
            toolEnter(){
                clearTimeout(this.timer);
                var headerTool=document.querySelector('.headerTool');
                headerTool.style.display='block';
            },
            toolLeave(){
                this.timer=setTimeout(function () {
                    var headerTool=document.querySelector('.headerTool');
                    headerTool.style.display='none';
                },100)
            }
        }
    }
</script>

