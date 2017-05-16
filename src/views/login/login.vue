<template>
    <div>
        <section id="login" class="loginContainer">
            <i></i>
            <div class="loginWrap">
                <img src="../../assets/images/ls_6.png" alt="" class="lsImg">
                <ul class="loginUl">
                    <li>
                        <h2>国美金控用户标签管理系统</h2>
                    </li>
                    <li>
                        <input type="text" name="username" id="username" class="txt" placeholder="请输入账号" @keyup.enter="toNextText">
                    </li>
                    <li>
                        <input type="password" name="password" id="password" class="txt" placeholder="请输入密码" @keyup.enter="saveInfo">
                    </li>
                    <li class="remLi clearfix">
                        <span :class="isSaveCheck?'selectIcon':'noSelectIcon'"></span>
                        <input type="checkbox" name="rememberPass" id="rememberPass" v-model="isSaveCheck">
                        <label for="rememberPass" class="left">记住密码</label>
                    </li>
                    <li class="redF" v-cloak>
                        {{errorMessage}}
                    </li>
                    <li>
                        <input type="button" value="登  录" id="loginBtn" @click="saveInfo">
                    </li>
                </ul>
            </div>
        </section>
        <img src="../../assets/images/ls_1.png" alt="" class="flowImg img1">
        <img src="../../assets/images/ls_2.png" alt="" class="flowImg img2">
        <img src="../../assets/images/ls_3.png" alt="" class="flowImg img3">
        <img src="../../assets/images/ls_4.png" alt="" class="flowImg img4">
        <img src="../../assets/images/ls_5.png" alt="" class="flowImg img5">
    </div>

</template>
<script type='text/ecmascript-6'>
    require('../../assets/css/reset.min.less')
    require('../../assets/css/animate.less')
    require('../../assets/css/login.less')
    export default{
        data(){
            return {
                errorMessage: '',
                isCookerLogin:false,
                cookieNm:'',
                cookiePsd:'',
                isSaveCheck:null,
            }
        },
        mounted(){
            this.getCookie();
        },
        methods:{
            setCookie(usern,psw){
                var Then = new Date()
                Then.setTime(Then.getTime() + 1866240000000);
                document.cookie ="username=" + usern + "%%"+psw+";expires="+ Then.toGMTString();
                console.log('设置cookie')
            },
            toNextText(){
                var passTxt=document.querySelector('#password');
                passTxt.focus();
            },
            getCookie(){
                var nm,psd;
                var cookieString = new String(document.cookie);
                var cookieHeader = "username="
                var beginPosition = cookieString.indexOf(cookieHeader);
                cookieString = cookieString.substring(beginPosition);
                var ends=cookieString.indexOf(";");
                console.log(ends,beginPosition);
                if (ends!=-1){
                    cookieString = cookieString.substring(0,ends);
                    this.isCookerLogin=false;
                }
                if (beginPosition>-1){
                    var nmpsd = cookieString.substring(cookieHeader.length);
                    if (nmpsd!=""){
                        beginPosition = nmpsd.indexOf("%%");
                        nm=nmpsd.substring(0,beginPosition);
                        psd=nmpsd.substring(beginPosition+2);
                        document.getElementById('username').value=this.cookieNm=nm;
                        /*document.getElementById('password').setAttribute("type","password");*/
                        document.getElementById('password').value=this.cookiePsd=psd;
                        if(nm!="" && psd!=""){
                            document.getElementById('rememberPass').checked = true;
                            this.isSaveCheck=true;
                        }
                    }
                }
            },
            saveInfo(){
                try{
                    console.log('按钮点击')
                    var isSave = document.getElementById('rememberPass').checked;   //保存按键是否选中
                    var usernm = document.getElementById('username').value;
                    var userpsw = document.getElementById('password').value;
                    this.isSaveCheck=isSave;
                    localStorage.userName=usernm;
                    if(usernm==''||userpsw==''){
                        this.errorMessage='用户名、密码不能为空'
                    }else{
                        if(usernm==this.cookieNm&&userpsw==this.cookiePsd){
                            this.isCookerLogin=true;
                        }else{
                            this.isCookerLogin=false;
                        }
                        if (isSave) {
                            console.log(usernm,userpsw);
                            /*{'userName':usernm,'userPwd':userpsw,'isRemember':true,'isCookerLogin':false}*/
                            /*登录接口*/
                            this.$http.post('/api/dologin.gm',{"userName":usernm,"userPwd":userpsw,"isRemember":true,"isCookerLogin":this.isCookerLogin},{emulateJSON:true}).then(function (response) {
                                if(response.data.code!='200'){
                                    this.errorMessage=response.data.msg;
                                    return;
                                }
                                if(this.isCookerLogin==false){
                                    userpsw=response.data.dataInfo.uuid;
                                }
                                if(response.data.dataInfo.responseCode&&(response.data.dataInfo.responseCode=='10000')){
                                    //console.log(usernm,userpsw);
                                    this.setCookie(usernm,userpsw);
                                    window.location.href='/#/index';
                                }else{

                                    console.log(response.data.dataInfo.responseMsg);
                                    this.errorMessage=response.data.dataInfo.responseMsg
                                }
                            })

                        }else {
                            this.$http.post('/api/dologin.gm',{"userName":usernm,"userPwd":userpsw,"isRemember":true,"isCookerLogin":this.isCookerLogin},{emulateJSON:true}).then(function (response) {
                                if(response.data.code!='200'){
                                    this.errorMessage=response.data.msg;
                                    return;
                                }
                                if(response.data.dataInfo.responseCode&&(response.data.dataInfo.responseCode=='10000')){
                                    this.setCookie(usernm,userpsw);
                                    window.location.href='/#/index';
                                }else{
                                    console.log(response.data.dataInfo.responseMsg);
                                    this.errorMessage=response.data.dataInfo.responseMsg;
                                }
                                this.setCookie("","");
                            })

                        }
                    }



                }catch(e){

                }
            }
        }
    }
</script>
