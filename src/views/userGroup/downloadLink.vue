<template>
    <section class="rightSide">
        <div class="deTail">
            <creat-act></creat-act>
            <section class="clearfix nextWrap">
                <right-menu></right-menu>
                <div class="leftDiv">
                    <div class="con clearfix">
                        <h5 class="listH5">CSV下载</h5>
                        <div class="logScroll">
                            <ul class="logList">
                                <li class="clearfix">
                                    <a href="javascript:;" @click="showDownMark('downloadUserId')">用户系统ID+手机号.csv格式</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!--弹框遮罩 start-->
                    <div class="overlay"></div>
                    <!--下载的弹框-->
                    <div class="markWarp markDown">
                        <div class="markTitle clearfix">
                            <h5>CSV下载</h5>
                            <i class="right close" @click="hideMark">关闭</i>
                        </div>
                        <ul class="clearfix">
                            <li class="clearfix">
                                <span v-cloak class="getPassSpan">当前加载覆盖用户数：{{actCount}}</span>
                                <input type="button" value="角色暂不支持下载" class="right getPassBtn" v-if="!hasAuth">
                                <input type="button" value="点击获取授权密码" id="getPassBtnId" class="right getPassBtn" @click="getPassWord" v-if="hasAuth">
                            </li>
                            <li class="clearfix liN">
                                <label><strong>*</strong>请输入授权密码：</label>
                                <input type="password" v-model="psw" class="txt">
                            </li>
                            <li class="liNext">
                                <span v-cloak>{{downError}}</span>
                            </li>
                            <li class="clearfix btnWrap">
                                <input type="button" value="取消" @click="hideMark">
                                <input type="button" value="确定" @click="downCsv">
                            </li>
                        </ul>
                    </div>
                    <!--弹框遮罩 end-->
                </div>
            </section>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import rightMenu from '../../components/userGroupRightMenu.vue';
    import creatAct from '../../components/userDetailCreatAct.vue';
    import LayOut from '../../assets/js/layout';
    export default {
        data(){
            return{
                groupId:'',
                psw:'',
                downLodeUrl:'',
                actCount:'',
                downError:'',/*下载错误提示*/
                thisGroupName:'',
                selected:'',
                querySystemList:null,/*对接系统列表*/
                counts:'',/*覆盖用户数*/
                status:'',
                hasAuth:true,
            }
        },
        components:{
            'right-menu':rightMenu,
            'creat-act':creatAct,
        },
        mounted(){
            this.getLocal();
            this.getData();
            LayOut.setHeight.init();
        },
        watch: {
            selected: function(val) {
                for(var key in this.querySystemList){
                    if(this.querySystemList[key]==val){
                        this.systemId=key;
                    }
                }
            }
        },
        methods:{
            getData(){
                this.$http.get('/api/userGroup/queryUserCount.gm?id='+this.groupId).then(function (res) {
                    this.actCount=res.data.dataInfo;
                });
                this.$http.get('/api/hasAuth.gm?api=/csv/sendCsvAuth.gm').then(function(res){
                    if(res.data.code=='200'){
                        this.hasAuth=res.data.dataInfo;
                    }
                })
            },
            getLocal(){
                this.groupId=localStorage.thisGroupId;
                this.thisGroupName=localStorage.thisGroupName;
            },
            showDownMark(url){
                this.downError=this.psw='';
                var overlay=document.querySelector('.overlay'),
                        markDown=document.querySelector('.markDown');
                overlay.style.display=markDown.style.display='block';
                this.downLodeUrl=url;
            },
            hideMark(){
                var overlay=document.querySelector('.overlay'),
                        markDown=document.querySelector('.markDown');
                overlay.style.display=markDown.style.display='none';
            },
            downCsv(){
                this.getLocalStatus();
                if(this.status==2){
                    this.downError='该用户群已失效，不支持csv下载。';
                    return;
                }
                if(this.psw==''){
                    this.downError='授权密码不能为空';
                    return;
                }
                this.$http.get('/api/csv/download.gm?authPassword='+this.psw+'&userGroupId='+this.groupId+'&isFirst=true').then(function (res) {
                    if(res.data.status=='error'){
                        this.downError=res.data.msg;
                        var reg=/参数校验不通过:/;
                        this.downError=this.downError.replace(reg,'');
                    }else if(res.data.dataInfo=='true'){
                        window.location.href='/api/csv/download.gm?authPassword='+this.psw+'&userGroupId='+this.groupId+'&isFirst=false';
                        this.hideMark();
                    }
                })
            },
            /*计算活动覆盖用户数*/
            countNum(){
                this.$http.get('/api/userGroup/queryUserCount.gm?id='+this.groupId).then(function (res) {
                    this.counts=res.data.dataInfo;
                })
            },
            //点击获取授权密码事件
            getPassWord(){
                var btnsave=document.querySelector('#getPassBtnId'),
                        timer,
                        n=120;
                this.$http.get('/api/csv/sendCsvAuth.gm?userGroupId='+this.groupId).then(function (res) {
                    console.log('发送成功一次');
                });
                function setBtn() {
                    btnsave.value='重新获取（'+n+'）';
                    btnsave.style.background='#f2f2f2';
                    btnsave.style.cursor='default';
                    btnsave.setAttribute('disabled','true');
                }
                setBtn();
                timer=setInterval(function () {
                    if(n>1){
                        setBtn();
                        n--;
                        btnsave.value='重新获取（'+n+'）';
                    }else{
                        clearInterval(timer);
                        btnsave.style.background='#ddd';
                        btnsave.style.cursor='pointer';
                        btnsave.removeAttribute('disabled');
                        btnsave.value='点击获取授权密码';
                        return;
                    }
                },1000);
            },
            getLocalStatus(){
                this.status=localStorage.thisGroupStatus;
            }
        }
    }
</script>


