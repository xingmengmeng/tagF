<template>
    <section class="container" id="mainWrap">
        <!--left side start-->
        <section class="leftSide">
            <ul id="leftMenu">
                <li>
                    <a href="javascript:;" class="active">营销活动</a>
                </li>
            </ul>
            <div class="show-hide" id="show-hide">
                显示隐藏按钮
            </div>
        </section>
        <!--left side end-->
        <!--右侧大块 start-->
        <section class="rightSide">
            <div class="deTail">
                <section class="clearfix nextWrap" style="padding:0">
                    <div class="">
                        <div class="con clearfix">
                            <div class="group-tool">
                                <div class="left">
                                    <a @click="showMark">+ 添加活动</a>
                                </div>
                                <!--分页-->
                                <div class="right clearfix" @click="getPageData">
                                    <span class="allPage" v-cloak>1-{{pageCount}}</span>
                                    <span id="prev">上一页</span>
                                    <input type="text" class="goTo" v-model="gotoPage" @keyup.enter="gotoPageFn">
                                    <span id="next">下一页</span>
                                </div>
                                <!--搜索-->
                                <div class="center">
                                    <div class="searchWrap">
                                        <input type="text" v-model="shContent" placeholder="输入活动主题名称/用户群名称/创建人" @keyup.enter="searchFun(shContent)">
                                        <button class="searchBtn" @click="searchFun(shContent)"></button>
                                    </div>
                                </div>
                            </div>
                            <table class="table" width="100%">
                                <thead>
                                <tr>
                                    <th>活动ID</th>
                                    <th>用户群名称</th>
                                    <th>对接系统</th>
                                    <th>主题名称</th>
                                    <th>覆盖用户数</th>
                                    <th>状态</th>
                                    <th>OA审核</th>
                                    <th>使用情况</th>
                                    <th>使用时间</th>
                                    <th width="12%">&nbsp;</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in list" @click="showActDetail(item,$event)">
                                    <td v-cloak>{{item.sno}}</td>
                                    <td v-cloak title="用户群名称" :data-status="item.status" class="groupName" :class="item.status!=2?'active':''">{{item.userGroupName}}</td>
                                    <td v-cloak>{{item.systemName}}</td>
                                    <td v-cloak>{{item.subject}}</td>
                                    <td v-cloak>{{item.coverUserCount}}</td>
                                    <td v-cloak>{{item.status==0?'禁用':(item.status==2?'失效':'启用')}}</td>
                                    <td v-cloak>{{item.approvalResult}}</td>
                                    <td v-cloak>{{item.useStatus}}</td>
                                    <td v-cloak>{{item.useTime}}</td>
                                    <td>
                                        <a href="javascript:;" class="listDetailLink">详情</a>
                                        <a href="javascript:;" class="resDetailLink" @click="showResDetail(item.id)" v-show="item.isEffect=='1'">短信发送结果</a>
                                        <a :href="'activity.html?sno='+item.sno" target="_blank" class="actInfoLink" style="display:none">活动分析</a>
                                        <a href="javascript:;" @click="deleteUserGroup(item.id)" class="listDeleteBtn" v-if="item.createrId&&item.createrId=='canDel'">删除</a>
                                    </td>

                                </tr>
                                </tbody>
                            </table>
                            <!--弹框遮罩 start-->
                            <div class="overlay"></div>
                            <!--新增活动的弹框-->
                            <div class="markWarp markAddAct">
                                <div class="markTitle clearfix">
                                    <h5>新增活动</h5>
                                    <i class="right close" @click="hideMark">关闭</i>
                                </div>
                                <ul class="clearfix">
                                    <li class="clearfix">
                                        <label><strong>*</strong>用户群：</label>
                                        <select v-model="selectedGroup" class="left" style="width: 180px">
                                            <option v-for="op in groupData" :value="op.code" v-cloak>{{op.name}}</option>
                                        </select>
                                        <!--<a href="addUserGroup.html" class="creatNew" style="font-size: 12px">想创建新的用户群？</a>-->
                                        <router-link to="/userGroup/addUserGroup" class="creatNew" style="font-size: 12px">想创建新的用户群？</router-link>
                                    </li>
                                    <li class="clearfix">
                                        <label><strong>*</strong>对接系统：</label>
                                        <select v-model="selected" class="left">
                                            <option v-for="op in querySystemList" :value="op">{{op}}</option>
                                        </select>
                                    </li>
                                    <li class="clearfix">
                                        <label><strong>*</strong>短信业务：</label>
                                        <select v-model="selectedSer" class="left">
                                            <option v-for="(op,index) in selectedSerList" :value="index" :key="index">{{op}}</option>
                                        </select>
                                    </li>
                                    <li class="clearfix">
                                        <label><strong>*</strong>主题名称：</label>
                                        <input type="text" v-model="subject" class="txt" placeholder="最多输入20个字符">
                                    </li>
                                    <li class="clearfix">
                                        <label><strong>*</strong>覆盖用户数：</label>
                                        <span class="left countNum" v-cloak>{{counts}}</span>
                                        <!--<button @click="countNum" class="countBtn">刷新</button>-->
                                    </li>
                                    <li class="clearfix">
                                        <label><strong>*</strong>对接字段：</label>
                                        <div class="tabWrap">
                                            <table width="100%">
                                                <thead>
                                                    <tr>
                                                        <th width="10%">&nbsp;</th>
                                                        <th width="60%">字段内容</th>
                                                        <th width="30%">数量（条）</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(cur,index) in serviceList" :key="index">
                                                        <td><input type="radio" :value="cur.code" name="serviceCode" v-model="servicCode"></td>
                                                        <td>{{cur.name}}</td>
                                                        <td>{{cur.value}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </li>
                                    <li class="clearfix">
                                        <strong style="margin-left:50px;">*</strong><input type="checkbox" v-model="agreeOa">
                                       同意系统自动发起OA工作流审批
                                    </li>
                                    <li class="clearfix saveErrorLi">
                                        <span class="errorSpan">{{saveError}}</span>
                                    </li>
                                    <li class="clearfix btnWrap fixBtn">
                                        <input type="button" value="取消" @click="hideMark">
                                        <input type="button" value="确定" @click="addUserGroupFn" id="addAct">
                                    </li>
                                </ul>
                            </div>

                            <!--详情弹框 start-->
                            <div class="markWarp markActDetail">
                                <div class="markTitle clearfix">
                                    <h5>活动详情</h5>
                                    <i class="right close" @click="hideMark">关闭</i>
                                </div>
                                <ul class="clearfix">
                                    <li class="clearfix">
                                        <label>对接系统：</label>
                                        <span class="actSpan" v-cloak>{{actDetail.systemName}}</span>
                                    </li>
                                    <li class="clearfix">
                                        <label>短信业务：</label>
                                        <span class="actSpan" v-cloak>{{actDetail.systemServiceName}}</span>
                                    </li>
                                    <li class="clearfix">
                                        <label>主题名称：</label>
                                        <span class="actSpan" v-cloak>{{actDetail.subject}}</span>
                                    </li>
                                    <li class="clearfix">
                                        <label>覆盖用户数：</label>
                                        <span class="actSpan" v-cloak>{{actDetail.coverUserCount}}</span>
                                    </li>
                                    <li class="clearfix">
                                        <label>对接字段：</label>
                                        <span class="actSpan" v-cloak>{{actDetail.pushFieldName}} &nbsp; {{actDetail.pushFieldCount}}</span>
                                    </li>
                                    <li class="clearfix">
                                        <label>状态：</label>
                                        <div v-if="getStatus==2" class="actSpan">失效</div>
                                        <select v-if="actDetail.status==0||actDetail.status==1" v-model="actDetail.status" @change="saveAct(actDetail.id,actDetail.status)">
                                            <option value="0">禁用</option>
                                            <option value="1">启用</option>
                                        </select>
                                    </li>
                                    <li class="clearfix">
                                        <label>创建人：</label>
                                        <span class="actSpan" v-cloak>{{actDetail.creater}}</span>
                                    </li>
                                    <li class="clearfix">
                                        <label>所属部门：</label>
                                        <span class="actSpan" v-cloak>{{actDetail.createrLine}}</span>
                                    </li>
                                    <li class="clearfix">
                                        <label>创建时间：</label>
                                        <span class="actSpan" v-cloak>{{actDetail.createTime}}</span>
                                    </li>
                                    <li class="clearfix">
                                        <label>使用情况：</label>
                                        <span class="actSpan" v-cloak>{{actDetail.useStatus}}</span>
                                    </li>
                                    <li class="clearfix">
                                        <label>使用时间：</label>
                                        <span class="actSpan" v-cloak>{{actDetail.useTime}}</span>
                                    </li>
                                </ul>
                            </div>
                            <!--详情弹框  end-->
                            
                            <!--效果报告弹框 start-->
                            <div class="markWarp resDetail">
                                <div class="markTitle clearfix">
                                    <h5 class="resD">效果报告</h5>
                                    <i class="right close" @click="hideMark">关闭</i>
                                </div>
                                <div class="resDetailScroll">
                                    <div>
                                        <div class="everyRes" v-for="(item,index) in effectData" :key="index">
                                            <span>推送记录{{index+1}}</span>
                                            <table width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td class="hasBg" width="99">推送开始时间</td>
                                                        <td>{{item.beginTime}}</td>
                                                        <td class="hasBg" width="99">推送结束时间</td>
                                                        <td>{{item.endTime}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="hasBg" width="99">推送用户人数</td>
                                                        <td>{{item.userCount}}</td>
                                                        <td class="hasBg" width="99">推送手机号</td>
                                                        <td>{{item.mobileCount}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="hasBg" width="99">成功发送短信</td>
                                                        <td>{{item.successCount}}</td>
                                                        <td class="hasBg" width="99">失败发送短信</td>
                                                        <td>{{item.failCount}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="hasBg" width="99">短信内容</td>
                                                        <td colspan="3">{{item.pushContent}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--效果报告弹框  end-->

                            <!--删除弹框-->
                            <div class="markDelet">
                                <p>您确定要删除这个活动吗？</p>
                                <div class="btnWrap">
                                    <input type="button" value="否" @click="deletFalse">
                                    <input type="button" value="是" @click="deleteTrue">
                                </div>
                            </div>

                            <!--弹框遮罩 end-->
                        </div>
                    </div>
                </section>
            </div>
        </section>
        <!--右侧大块 end-->
        <my-foot></my-foot>
    </section>
</template>
<style lang="less" scoped>
    .fixBtn{
        position: absolute;
        bottom: 10px;
        left:160px;
    }
    .markWarp ul li.saveErrorLi span.errorSpan{
        padding-left: 0;
        text-align: center;
    }
    .groupName{
        &.active:hover{
            text-decoration: underline;
        }
    }
    .tabWrap{
        float: left;
        width: 270px;
        th{
            padding:5px 0;
            background: #F7FAFE;
            border: 1px solid #ECECEC;
            text-align: center;
        }
        td{
            padding:5px 0;
            border: 1px solid #ECECEC;
            text-align: center;
        }
    }
    .resDetailScroll{
        margin-top:10px;
        position: relative;
        padding:0px 20px;
        width: 100%;
        height: 380px;
        overflow: hidden;
        box-sizing: border-box;
        table{
            margin:10px 0;
            td{
                padding:5px 0;
                border: 1px solid #DDEDFF;
                text-align: center;
                &.hasBg{
                    background: #F7FAFE;
                }
            }
        }
    }
</style>

<script type="text/ecmascript-6">
    import LayOut from '../../assets/js/layout';
    import Footer from '../../components/footer.vue';
    const IScroll = require('iscroll');
    export default {
        data(){
            return{
                list:[],
                gropId:'',/*用户群id*/
                pageNum:'1',
                gotoPage:'1',
                pageCount:'',
                querySystemList:null,/*对接系统列表*/
                groupData:null,/*用户群列表*/
                activeName:'',
                selected:'',/*选中的对接系统*/
                selectedGroup:'',/*选中的用户群*/
                selectedSer:'',/*短信业务下拉 选中*/
                selectedSerList:null,/*短信业务下拉*/
                serviceList:null,/*对接字段数据*/
                servicCode:'',

                systemId:'',/*对接系统id*/
                subject:'',/*活动主题*/
                counts:0,/*覆盖用户数*/
                subject:'',
                actDetail:{

                },/*活动详情*/
                shContent:'',/*搜索内容*/
                saveError:'',
                resDetailScroll:null,
                agreeOa:false,//是否同意发OA
                getStatus:2,//弹框失效
                effectData:[],//短信结果
            }
        },
        components:{
            'my-foot':Footer,
        },
        mounted(){
            this.getLocal();
            this.getTabList();
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
            },
            selectedGroup:function (val) {
                if(val){
                    this.gropId=val;
                    this.countNum();
                }
            },
        },
        methods:{
            getData(){
                /*计算得到的对接系统列表*/
                this.$http.get('/api/marketActivity/querySystemList.gm').then(function (response) {
                    this.querySystemList=response.data.dataInfo;
                })
                this.$http.get('/api/marketActivity/queryServiceList.gm').then(function (response) {
                    this.selectedSerList=response.data.dataInfo;
                })
            },
            /*得到列表信息*/
            getTabList(){
                var reg=/\s+/g;
                var searchContent=this.shContent.replace(reg,'');
                if(this.shContent==''){
                    var url='/api/marketActivity/queryList.gm?pageNum='+this.pageNum+'&date='+Date.now();
                }else{
                    var url='/api/marketActivity/queryList.gm?pageNum='+this.pageNum+'&searchContent='+searchContent+'&date='+Date.now();
                }
                this.$http.get(url).then(function (response) {
                    this.list=response.data.dataInfo.dataList;
                    this.pageCount=response.data.dataInfo.pageCount;
                    this.gotoPage=this.pageNum;
                });
            },
            /*从localstorage里拿到当前的用户群id*/
            getLocal(){
                this.gropId=localStorage.thisGroupId;
            },
            /*通过监听select框变化  得到用户群id*/
            getGroupId(){

            },
            //活动启用禁用保存
            saveAct(id,curstatus){
                this.$http.post('/api/marketActivity/update.gm',{"id":id,"status":curstatus},{emulateJSON:true}).then(function(res){
                    if(res.data.code==200){
                        this.getTabList();
                        this.hideMark();
                    }
                })
            },
            /*显示弹框*/
            showMark(){
                this.selected='';
                this.selectedGroup='';
                this.subject='';
                this.counts=0;
                this.saveError='';
                this.serviceList=null;
                this.agreeOa=false;
                this.changeBtn();
                var overlay=document.querySelector('.overlay'),
                        markWarp=document.querySelector('.markAddAct');
                overlay.style.display=markWarp.style.display='block';
                document.body.style.overflow='hidden';
                this.$http.get('/api/userGroup/querySelectList.gm').then(function (response) {
                    this.groupData=response.data.dataInfo;
                });
                this.$http.get('/api/marketActivity/queryPushFieldList.gm').then(function (response) {
                    this.serviceList=response.data.dataInfo;
                })
            },
            /*关闭按钮 隐藏弹框*/
            hideMark(){
                var overlay=document.querySelector('.overlay'),
                        markWarp=document.querySelector('.markAddAct'),
                        markActDetail=document.querySelector('.markActDetail'),
                        markDelet=document.querySelector('.markDelet'),
                        resDetail=document.querySelector('.resDetail');
                overlay.style.display=markWarp.style.display=markActDetail.style.display=markDelet.style.display=resDetail.style.display='none';
                document.body.style.overflow='scroll';
            },
            changeBtn(unclicks){
                var addAct=document.querySelector('#addAct');
                if(unclicks){
                    addAct.style.background='#ddd';
                    addAct.style.color='#333';
                    addAct.style.cursor='default';
                    addAct.setAttribute('disabled','true');
                }else{
                    addAct.style.background='#1078f5';
                    addAct.style.color='#fff';
                    addAct.style.cursor='pointer';
                    addAct.removeAttribute('disabled');
                }
            },
            /*提交事件*/
            addUserGroupFn(){
                var subjectLength=this.subject.gblen();
                if(subjectLength>20){
                    this.saveError='主题最多输入20个字符';
                    return false;
                }
                if(!this.agreeOa){
                    this.saveError='勾选项为空，请勾选后再提交';
                    return false;
                }
                this.changeBtn('unclicks');
                this.$http.post('/api/marketActivity/save.gm',{"systemCode":this.systemId,"userGroupId":this.gropId,"subject":this.subject,"systemService":this.selectedSer,"pushField":this.servicCode},{emulateJSON:true}).then(function (res) {
                    this.changeBtn();
                    if(res.data.code==200){
                        var overlay=document.querySelector('.overlay'),
                                markWarp=document.querySelector('.markAddAct');
                        overlay.style.display=markWarp.style.display='none';
                        document.body.style.overflow='scroll';
                        this.getTabList();
                    }else{
                        this.saveError=res.data.msg.replace('参数校验不通过:','');
                    }
                })
            },
            /*计算活动覆盖用户数*/
            countNum(){
                this.$http.get('/api/userGroup/queryUserCount.gm?id='+this.gropId).then(function (res) {
                    this.counts=res.data.dataInfo;
                })
                this.$http.get('/api/marketActivity/queryPushFieldList.gm?userGroupId='+this.gropId).then(function (response) {
                    this.serviceList=response.data.dataInfo;
                })
            },
            getPageData(e){
                if(e.target.innerHTML=='上一页'){
                    if(this.pageNum<=1) return;
                    this.pageNum--;
                    this.getTabList();/*ajax后台获取要显示数据*/
                }else if(e.target.innerHTML=='下一页'){
                    if(this.pageNum>=this.pageCount) return;
                    this.pageNum++;
                    this.getTabList();/*ajax后台获取要显示数据*/
                }
            },
            gotoPageFn(){
                if(this.gotoPage<1||this.gotoPage>this.pageCount||this.gotoPage==this.pageNum){
                    this.gotoPage=this.pageNum;
                    return;
                }else{
                    this.pageNum=this.gotoPage;
                    this.getTabList();/*ajax后台获取要显示数据*/
                }
            },
            /*活动详情*/
            showActDetail(item,e){
                var event=window.event||e;
                if(event.target.innerHTML!='活动分析'&&event.target.innerHTML!='删除'&&e.target.title!='用户群名称'&&e.target.innerHTML!='短信发送结果'){
                    var overlay=document.querySelector('.overlay'),
                            markActDetail=document.querySelector('.markActDetail');
                    overlay.style.display=markActDetail.style.display='block';
                    document.body.style.overflow='hidden';
                    this.$http.get('/api/marketActivity/getById.gm?id='+item.id).then(function (res) {
                        this.actDetail=res.data.dataInfo;
                        this.getStatus=this.actDetail.status;
                    })
                }
                if(e.target.title=='用户群名称'&&e.target.dataset.status!=2){
                    this.$router.push({path:'userGroup/userDetail/groupMain'});
                    localStorage.thisGroupId=item.userGroupId;
                    localStorage.thisGroupName=item.userGroupName;
                }
            },
            /*短信发送结果弹框*/
            showResDetail(id,e){
                this.effectData=null;
                var overlay=document.querySelector('.overlay'),
                    markRes=document.querySelector('.resDetail');
                overlay.style.display=markRes.style.display='block';
                document.body.style.overflow='hidden';
                this.$http.get('/api/marketActivity/queryEffectList.gm?id='+id).then(function(res){
                    if(res.data.code==200){
                        this.effectData=res.data.dataInfo;
                        this.$nextTick(function(){
                            if(this.resDetailScroll==null){
                                this.resDetailScroll=new IScroll('.resDetailScroll',{
                                    mouseWheel: true,
                                    scrollbars: true,
                                    checkDOMChanges:true,
                                    bounce: false,
                                    interactiveScrollbars:true
                                });
                            }else{
                                setTimeout(()=>{
                                    this.resDetailScroll.refresh();
                                    this.resDetailScroll.scrollTo(0, 0);
                                },0)
                            }
                        });
                    }
                })
                
            },
            deleteUserGroup(id){
                /*显示弹框  确定否  然后点确定  则删除*/
                var overlay=document.querySelector('.overlay'),
                        markDelet=document.querySelector('.markDelet');
                overlay.style.display=markDelet.style.display='block';
                localStorage.actDeleteId=id;
                document.body.style.overflow='hidden';
            },
            deletFalse(){
                /*取消  关弹框*/
                var overlay=document.querySelector('.overlay'),
                        markDelet=document.querySelector('.markDelet');
                overlay.style.display=markDelet.style.display='none';
                document.body.style.overflow='scroll';
            },
            deleteTrue(){
                /*确定  删除  关弹框*/
                var id=localStorage.actDeleteId;
                this.$http.delete('/api/marketActivity/delete.gm?id='+id).then(function (res) {
                    if(res.data.code==200){
                        this.deletFalse();
                        /*前台页面列表数组删除此条数据  或者再走一次接口*/
                        this.list=this.list.filter( (item)=> {
                            return id!=item.id;
                        })
                    }
                })
            },
            /*搜索*/
            searchFun(){
                this.gotoPage=this.pageNum=1;
                this.getTabList();
            },
        }
    }
</script>

