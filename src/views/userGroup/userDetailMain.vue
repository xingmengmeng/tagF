<template>
    <section class="rightSide">
        <div class="deTail">
            <creat-act ref="creatActId"></creat-act>
            <section class="clearfix nextWrap">
                <right-menu></right-menu>
                <div class="leftDiv">
                    <div class="con clearfix">
                        <div class="wid48">
                            <ul class="groupUl">
                                <li>
                                    <label>用户群名称</label>
                                    <!--<span v-cloak>{{resData.name}}</span>-->
                                    <input type="text" v-model="resData.name" disabled id="editInput" :class="editing?'editClss':'uneditclass'">
                                    <i @click="changeStatus" v-show="!editing"></i>
                                    <button class="saveBtn" v-show="editing" @click="editMess">保存</button>
                                    <button class="saveBtn" v-show="editing" @click="editBack">取消</button>
                                </li>
                                <li>
                                    <label>序列号</label>
                                    <span v-cloak>{{resData.sno}}</span>
                                </li>
                                <li>
                                    <label>状态</label>
                                    <!--<select id="stateControl" v-model="selectedStatus" @change="selectChange">
                                        <option>启用</option>
                                        <option>禁用</option>
                                    </select>-->
                                    <span v-cloak>{{selectedStatus}}</span>
                                </li>
                                <li>
                                    <label>创建人</label>
                                    <span v-cloak>{{resData.updater}}</span>
                                </li>
                                <li>
                                    <label>所属部门</label>
                                    <span v-cloak>{{resData.createrLine}}</span>
                                </li>
                            </ul>

                            <div class="libray">
                                <div class="labels">
                                    <h5>操作日志</h5>
                                </div>
                                <ul>
                                    <li class="clearfix" v-for="evLibray in librayData">
                                        <p class="left" v-cloak>{{evLibray.operator}}&nbsp;&nbsp;&nbsp;&nbsp;{{evLibray.operationType}}&nbsp;&nbsp;&nbsp;&nbsp;{{evLibray.operationContent}}</p>
                                        <span class="right times" v-cloak>{{evLibray.operationTimeStr}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="wid37">
                            <div class="userLabelWrap">
                                <div class="labels clearfix" v-cloak>
                                    <h5>用户标签（{{labelNum}}个）</h5>
                                    <a href="userLabel.html" class="detailsLink">详情</a>
                                </div>
                                <div class="messDivGoup clearfix" v-cloak>
                                    <span v-for="everyMess in messData">{{everyMess.tagName}}</span>
                                </div>
                            </div>


                            <div class="downCsv">
                                <div class="labels clearfix">
                                    <h5>CSV下载</h5>
                                </div>
                                <ul class="logList">
                                    <!--<li class="clearfix">
                                        <a href="javascript:;" @click="showDownMark('downloadUserId')">用户user ID.csv格式</a>
                                    </li>
                                    <li class="clearfix">
                                        <a href="javascript:;" @click="showDownMark('downloadCusId')">用户customer_ID.csv格式</a>
                                    </li>
                                    <li class="clearfix">
                                        <a href="javascript:;" @click="showDownMark('downloadPhoneNo')">用户手机号.csv格式</a>
                                    </li>-->

                                    <li class="clearfix">
                                        <a href="javascript:;" @click="showDownMark('downloadUserId')">用户系统ID+手机号.csv格式</a>
                                    </li>
                                </ul>
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
                                        <span v-cloak class="getPassSpan">当前加载覆盖用户数：{{counts}}</span>
                                        <input type="button" value="点击获取授权密码" class="right getPassBtn" @click="getPassWord">
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
                            <!--弹框遮罩 start-->
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>

<script type='text/ecmascript-6'>
    import rightMenu from '../../components/userGroupRightMenu.vue';
    import creatAct from '../../components/userDetailCreatAct.vue';
    import LayOut from '../../assets/js/layout';

    require('../../assets/css/reset.min.less');
    require('../../assets/css/layout.less');
    require('../../assets/css/detail.less');

    export default{
        data(){
            return{
                resData:[],
                librayData:[],
                messData:[],
                gropId:'',
                curName:'',/*当前用户群名*/
                selected:'',
                selectedStatus:'',
                status:'',
                psw:'',/*下载密码*/
                downLodeUrl:'',/*下载地址*/
                selectedGroup:'',/*选中的用户群*/
                groupData:null,/*用户群列表*/
                querySystemList:null,/*对接系统列表*/
                subject:'',/*活动主题*/
                counts:'',/*覆盖用户数*/
                downError:'',/*下载错误提示*/
                saveError:'',/*创建活动错误提示*/
                labelNum:'',
                editing:false,//是否编辑状态
                editTem:'',
            }
        },
        watch: {
            /*selectedStatus: function(val) {
             this.status = val == "启用" ? 1 : 0;
             console.log(this.status);
             },*/
            selectedGroup:function (val) {
                this.gropId=val;
                this.countNum();
            },
            selected: function(val) {
                for(var key in this.querySystemList){
                    if(this.querySystemList[key]==val){
                        this.systemId=key;
                    }
                }
            }
        },
        mounted(){
            this.getLocal();
            this.getData();
            LayOut.setHeight.init();
            this.status=this.selectedStatus=='禁用'?0:(this.selectedStatus=='启用'?1:2);
        },
        components:{
            'right-menu':rightMenu,
            'creat-act':creatAct,
        },
        methods:{
            getData(){
                /*标签具体信息*/
                this.$http.get('/api/userGroup/getById.gm?id='+this.gropId).then(function (response) {
                    this.resData=response.data.dataInfo;
                    this.selectedStatus=this.resData.status==0?'禁用':(this.resData.status==1?'启用':'失效');
                    localStorage.thisGroupName=this.resData.name;
                    localStorage.thisGroupStatus=this.resData.status;
                });

                /*用户标签*/
                this.$http.get('/api/userGroup/tagRelation/queryList.gm?userGroupId='+this.gropId).then(function (response) {
                    this.messData=response.data.dataInfo;
                    this.labelNum=this.messData.length;
                    if(this.messData.length>10){
                        this.messData.length=10;
                    }
                });

                this.getLib();
            },
            /*点击编辑  变为可编辑状态*/
            changeStatus(){
                this.editing=true;
                this.editTem=this.resData.name;
                var editInput=document.querySelector('#editInput');
                editInput.removeAttribute('disabled');
            },
            /*改变状态*/
            /*selectChange(){
                this.status=this.selectedStatus=='启用'?1:2;
                this.editMess();
            },*/
            /*点击保存  修改并改状态*/
            editMess(){
                var val=this.resData.name;
                console.log(val);
                localStorage.thisGroupStatus=this.status;
                this.$http.post('/api/userGroup/update.gm',{"id":this.gropId,"name":val},{emulateJSON:true}).then(function (response) {
                    /*操作日志*/
                    this.editing=false;
                    var editInput=document.querySelector('#editInput');
                    editInput.setAttribute('disabled',true);

                    localStorage.thisGroupName=this.resData.name;
                    this.$refs.creatActId.$emit('changeName');
                    this.getLib();
                });
            },
            /*点击编辑 取消*/
            editBack(){
                this.resData.name=this.editTem;
                this.editing=false;
                var editInput=document.querySelector('#editInput');
                editInput.setAttribute('disabled',true);
            },
            /*从localstorage里拿到当前的用户群id*/
            getLocal(){
                this.gropId=localStorage.thisGroupId;
                this.curName=localStorage.thisGroupName;
            },
            getLib(){
                /*操作日志*/
                this.$http.get('/api/operationLog/queryLastFive.gm?userGroupId='+this.gropId).then(function (response) {
                    this.librayData=response.data.dataInfo;
                });
            },
            /*下载弹框*/
            showDownMark(url){
                this.downError=this.psw='';
                var overlay=document.querySelector('.overlay'),
                        markDown=document.querySelector('.markDown');
                overlay.style.display=markDown.style.display='block';
                this.countNum();
                this.downLodeUrl=url;
            },
            hideMark(){
                var overlay=document.querySelector('.overlay'),
                        markDown=document.querySelector('.markDown'),
                        markAddAct=document.querySelector('.markAddAct');
                overlay.style.display=markDown.style.display=markAddAct.style.display='none';
            },
            /*计算活动覆盖用户数*/
            countNum(){
                this.$http.get('/api/userGroup/queryUserCount.gm?id='+this.gropId).then(function (res) {
                    this.counts=res.data.dataInfo;
                })
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
                this.$http.get('/api/csv/download.gm?authPassword='+this.psw+'&userGroupId='+this.gropId+'&isFirst=true').then(function (res) {
                    if(res.data.status=='error'){
                        this.downError=res.data.msg;
                        var reg=/参数校验不通过:/;
                        this.downError=this.downError.replace(reg,'');
                    }else if(res.data.dataInfo=='true'){
                        window.location.href='/api/csv/download.gm?authPassword='+this.psw+'&userGroupId='+this.gropId+'&isFirst=false';
                        this.getLib();
                        this.hideMark();
                    }
                })
            },
            //点击获取授权密码事件
            getPassWord(){
                var btnsave=document.querySelector('.getPassBtn'),
                        timer,
                        n=120;
                this.$http.get('/api/csv/sendCsvAuth.gm?userGroupId='+this.gropId).then(function (res) {
                    console.log('发送成功一次');
                });
                function setBtn() {
                    btnsave.value='发送邮箱成功（'+n+'）';
                    btnsave.style.background='#f2f2f2';
                    btnsave.style.cursor='default';
                    btnsave.setAttribute('disabled','true');
                }
                setBtn();
                timer=setInterval(function () {
                    if(n>1){
                        setBtn();
                        n--;
                        btnsave.value='发送邮箱成功（'+n+'）';
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