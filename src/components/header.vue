<template>
<div>
    <header class="container" id="header">
        <a href="javascript:;" class="logo left">logo</a>
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

            <router-link :to="'/'+menu.href" v-for='menu in menuData'>{{menu.name}}</router-link>
        </div>
        
    </header>
    <marquee><span class="grollSpan">公告：标签工厂2.0上线了！上线内容包含美易理财、美易分业务标签及宏观、微观、标签画像等功能。因每日标签更新时存在部分用户状态发生变化，有可能导致与天眼BI数值有差异，该情况属于正常。</span></marquee>
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
                userName:'index',
                isAdmin:false,
            }
        },
        components:{

        },
        mounted(){
            if(localStorage.isAdmin&&localStorage.isAdmin=='true'){
                this.isAdmin=true;
            }
            this.getData();
        },
        methods:{
            getData(){
                this.userName=localStorage.userName.split('@')[0];
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
                })
            },
            logoutFn(e){
                if(e.target.innerHTML=='注销'){
                    this.$http.get('/api/logout.gm').then(function (res) {
                        if(res.data.code==200){
                            window.location.href='login.html';
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

