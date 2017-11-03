<template>
    <div class="container" style="padding-bottom:10px">
        <!--筛选人群-->
        <div class="selectGroup clearfix">
            <span class="grSpan">筛选人群：</span>
            <div class="groupNameWrap">
                <div class="biSpanWrap" v-for="item in nameAry">
                    <span>{{item}}</span>
                    <!--<i v-if="nameAry.length==2" @click="delectGroup(item.id)"></i>-->
                    <i v-if="nameAry.length==2" @click="delectGroupName(item)"></i>
                </div>
                <!--<div class="biSpanWrap">
                    <span>男，18-21，投资100起</span>
                </div>-->
                <span @click="addGroupFn" v-if="!groupId" class="addGroupSapn">添加对比+</span>
            </div>
        </div>
        <!--地域分布  年龄分布  性别分布 start-->
        <div class="clearfix">
            <div class="left areaWrap">
                <div class="clearfix areas">
                    <div class="clearfix">
                        <h3 class="left picH3">地域分布</h3>
                        <div class="left messTsDiv">
                            <i class="left messIcon" @mouseenter="showNext($event)" @mouseleave="hideNext($event)"></i>
                            <ul class="messConUl" style="display:none;">
                                <li>数据显示：已选人群所属哪些地域</li>
                                <li>计算说明：根据用户实名/鉴权上传的身份证数据，进行数据解析，给出用户所属的省份的分布及排名</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="clearfix">
                        <div class="left areasWrap">
                            <areas cur-id="areaShow" ref="areaId"></areas>
                        </div>
                        <div class="right areaDetailWrap">
                            <ul class="changUl clearfix">
                                <li v-for="(item,index) in nameAry" :key="index" @click="changeArea(index)" :class="noActive==index?'noActive':''"><i></i>{{item}}</li>
                            </ul>
                            <mac-area cur-id="areaDetail" ref="areaDetailId"></mac-area>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right personWrap">
                <div class="agesWrap">
                    <div class="clearfix">
                        <h3 class="left picH3">年龄分布</h3>
                        <div class="left messTsDiv">
                            <i class="left messIcon" @mouseenter="showNext($event)" @mouseleave="hideNext($event)"></i>
                            <ul class="messConUl" style="display:none;">
                                <li>数据显示：已选人群年龄情况</li>
                                <li>计算说明：根据用户实名/鉴权上传的身份证数据，进行数据解析，给出用户各年龄段的占比情况</li>
                            </ul>
                        </div>
                    </div>
                    <mac-age cur-id="ageId" ref="agerefId"></mac-age>
                </div>
                <div class="sexWrap">
                    <div class="clearfix">
                        <h3 class="left picH3">性别分布</h3>
                        <div class="left messTsDiv">
                            <i class="left messIcon" @mouseenter="showNext($event)" @mouseleave="hideNext($event)"></i>
                            <ul class="messConUl" style="display:none;">
                                <li>数据显示：已选人群性别情况</li>
                                <li>计算说明：根据用户实名/鉴权上传的身份证数据，进行数据解析，给出用户男女占比情况</li>
                            </ul>
                        </div>
                    </div>
                    <mac-sex ref="sexrefId"></mac-sex>
                </div>
            </div>
        </div>
        <!--地域分布  年龄分布  性别分布 end-->

        <div class="lineNav clearfix">
            <ul>
                <li>美易理财（10/20）</li>
            </ul>
            <div @click="showSetFn" class="right setDiv">自定义设置</div>
        </div>

        <!--理财投资四块 start-->
        <div class="fourWrap clearfix" v-show="showLine==0">
            <!--客户类型-->
            <div class="left picWrap">
                <div class="wrapMainDiv">
                    <div class="clearfix">
                        <h3 class="left picH3">客户类型</h3>
                    </div>
                    <div class="chartWrap"><!--cur-id代表每个图表id  只需唯一即可  agerefId表示图表发射事件  唯一即可-->
                        <mac-age cur-id="picId" ref="picrefId"></mac-age>
                    </div>
                </div>
            </div>
        </div>
        <!--理财投资四块 end-->

        <!--选择对比人群弹框 start-->
        <div class="overlayNew" v-show="showMarker"></div>
        <div class="addMark" v-show="showMarker">
            <div class="markTitle clearfix">
                <h5>添加对比人群（最多勾选2项）</h5>
                <i class="right close" @click="hideMark">关闭</i>
            </div>
            <div class="mainDiv clearfix">
                <span class="newAdd" @click="gotoAddNewGorup">+新建</span>
                <div class="spanWrap clearfix">
                    <div class="scroll_wrap clearfix">
                        <div class="spanAndClose" v-for="item in proAry">
                            <span @click="selectSpanFn(item.id,item.flag)" :class="temIds.indexOf(item.id)!=-1?'active':''">{{item.name}}</span>
                            <!--:title="'一行\n美易分 且 25~34岁 且 天蝎座 且 80后 且 男 且 已婚 且 本科'"-->
                            <i v-if="item.flag!='default'" @click="delectGroup(item.id)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <p class='errorP'>{{error}}</p>
            <div class="btnWrap">
                <input type="button" class="btn" value="取消" @click="hideMark"/>
                <input type="button" class="btn" value="确定" @click="changeIds"/>
            </div>
        </div>
        <!--选择对比人群弹框 end-->
        <mac-map-set v-show="showSet" @hideOverFn="hideMarkWrap" ref="setTag"></mac-map-set>
    </div>
</template>
<script type="text/ecmascript-6">
    const IScroll = require('iscroll');
    require('../../assets/css/groupPic.less');
    import areas from '../../components/echartComponent/areas.vue';//地图
    import macArea from '../../components/echartComponent/macAreaDetail.vue';//地图右侧省份
    import macAge from '../../components/echartComponent/macAge.vue';//年龄分布
    import macSex from '../../components/macSex.vue';/*性别分布*/
    import macMapSet from '../../components/macMapSet.vue';
    export default {
        data(){
            return{
                resData:[],
                ids:[],//用户群id数组
                resNameAry:[],
                temIds:[],
                nameAry:[],//得到的用户群名称数组
                proAry:[],//可选人群
                addUserRightScroll:null,
                showMarker:0,
                error:'',
                showLine:'0',//显示的业务线模块
                groupId:'',//当前用户群id  由用户群列表得来
                personNum:'',
                fNum:'',
                jieNum:'',

                areaData:[],//地域分布的返回值
                noActive:1,//不是当前选择的地域分布的索引
                showSet:false,//是否显示配置弹框
            }
        },
        components:{
            'areas':areas,
            'macArea':macArea,
            'macAge':macAge,
            'macSex':macSex,
            'macMapSet':macMapSet,
        },
        mounted(){
            this.getUrl();
        },
        watch: {
            '$route':'getUrl',//url发生变化从新请求数据并且渲染页面
        },
        methods:{
            showNext(e){
                var cc=e.target.parentNode.getElementsByTagName('ul')[0];
                cc.style.display='block';
            },
            hideNext(e){
                var cc=e.target.parentNode.getElementsByTagName('ul')[0];
                cc.style.display='none';
            },
            //得到url中的参数值  判断是来自用户群页面还是导航直接点击到的
            getUrl(){
                var url=window.location.href,
                        urlReg=/([^?=&#]+)=([^?=&#]+)/g,
                        urlObj={};
                url.replace(urlReg,function ($0,$1,$2) {
                    urlObj[$1]=$2;
                });
                if(urlObj['id']){//来自用户群列表页面
                    this.groupId=urlObj['id'];
                    this.getIdData(urlObj['id']);
                }else{//来自导航点击
                    this.groupId='';
                    this.getData();
                    this.getSelectPro();
                }
            },
            //来自用户群列表页的初始逻辑
            getIdData(id){
                var temAry=[];
                temAry.push(Number(id));
                this.$http.get('/api/userGroupPortrait/queryUserGroupList.gm?ids='+temAry).then(function (res) {
                    this.doneResData(res);
                });
            },
            //初始化  得到当前的id数组、用户群名数组
            getData(){
                this.$http.get('/api/userGroupPortrait/queryDefaultList.gm').then(function (res) {
                    this.doneResData(res);
                });
            },
            //处理初始化得来的数据 函数
            doneResData(res){
                var resData=res.data.dataInfo;
                this.resData=resData;
                if(res.data.code==200){
                    this.ids.length=0;
                    this.nameAry.length=0;
                    /*得到ids 用户群名*/
                    resData.forEach( (item)=> {
                        this.ids.push(item.id);
                        this.temIds.push(item.id);
                        this.nameAry.push(item.name);
                    });
                    this.getAreaData();/*地域分布模块加载*/
                    this.getAgeData();/*年龄分布加载*/
                    this.getSexData();/*性别分布加载*/
                    this.getDetailMap();/*宏观画像自定义配置或默认图表*/
                }
            },
            /*得到可选人群*/
            getSelectPro(){
                this.$http.get('/api/userGroupPortrait/queryList.gm').then(function (res) {
                    if(res.data.code==200){
                        this.error='';
                        this.proAry=res.data.dataInfo;
                        this.addUserRightScroll=new IScroll('.spanWrap',{
                            mouseWheel: true,
                            scrollbars: true,
                            checkDOMChanges:true,
                            bounce: false,
                            interactiveScrollbars:true
                        });
                        this.$nextTick(function () {
                            this.addUserRightScroll.refresh();
                        })
                    }
                })
            },
            /*地域分布*/
            getAreaData(){
                this.$http.get('/api/userGroupPortrait/getAreaChart.gm?ids='+this.ids).then(function (res) {
                    if(res.data.code==200){
                        this.areaData=res.data.dataInfo;
                        if(this.$refs.areaId){
                            this.$refs.areaId.$emit('changeData',this.ids,this.nameAry,res.data.dataInfo);
                        }
                        if(this.$refs.areaDetailId){
                            this.$refs.areaDetailId.$emit('changeData',this.ids[0],this.nameAry[0],res.data.dataInfo,'#6ea1fc');
                        }
                    }
                })
            },
            changeArea(index){
                if(index==0){
                    this.noActive=1;
                    this.$refs.areaDetailId.$emit('changeData',this.ids[0],this.nameAry[0],this.areaData,'#6ea1fc');
                }else{
                    this.noActive=0;
                    this.$refs.areaDetailId.$emit('changeData',this.ids[1],this.nameAry[1],this.areaData,'#2fcacc');
                }

            },
            /*年龄分布*/
            getAgeData(){
                this.$http.get('/api/userGroupPortrait/getAgeChart.gm?ids='+this.ids).then(function (res) {
                    if(res.data.code==200){
                        if(this.$refs.agerefId){
                            this.$refs.agerefId.$emit('changeData',this.ids,this.nameAry,res.data.dataInfo.age);
                        }
                    }
                })
            },
            /*性别分布*/
            getSexData(){
                this.$http.get('/api/userGroupPortrait/getSexChart.gm?ids='+this.ids).then(function (res) {
                    if(res.data.code==200&&this.$refs.sexrefId){
                        this.$refs.sexrefId.$emit('changeData',this.ids,this.nameAry,res.data.dataInfo.sex);
                    }
                })
            },
            /*点击新增 对比人群 按钮*/
            addGroupFn(){
                this.showMarker=1;
                this.error='';
                this.temIds=this.ids.slice(0);
                this.$nextTick(function () {
                    this.addUserRightScroll.refresh();
                })
            },
            /*隐藏弹框*/
            hideMark(){
                this.temIds=this.ids.slice(0);
                this.showMarker=0;
            },
            /*点击  新建  跳转*/
            gotoAddNewGorup(){
                window.location.href='/userGroup/addUserGroup?flag=new';
            },
            /*点击 弹框中 用户群*/
            selectSpanFn(id,curFlag){
                if(curFlag=='invalid'){
                    this.error='提示：当前用户群已失效，建议重新创建。';
                    return;
                }else{
                    this.error='';
                }
                var con=this.temIds.filter( (item)=> {
                    return item==id;
                });
                if(con.length==0){
                    if(this.temIds.length>=2){
                        return;
                    }else{
                        this.error='';
                        this.temIds.push(id);
                    }
                }else {
                    this.temIds=this.temIds.filter( (item)=> {
                        return item!=id;
                    })
                }
            },
            /*删除新增的用户群*/
            delectGroup(id){
                if(this.ids.indexOf(id)!=-1){
                    this.error="不能删除当前展示用户群";
                    return;
                }
                this.$http.delete('/api/userGroupPortrait/delete.gm?id='+id).then(function(res){
                    if(res.data.code==200){
                        this.getSelectPro();
                    }
                }); 
                this.temIds=this.temIds.filter( (item)=> {
                    return item!=id;
                });
                this.ids=this.ids.filter( (item)=> {
                    return item!=id;
                });
            },
            delectGroupName(curName){
                var id='';
                this.proAry.forEach((item)=>{
                    if(item.name==curName){
                        id=item.id;
                    }
                });
                this.temIds=this.temIds.filter( (item)=> {
                    return item!=id;
                });
                this.changeIds();
            },
            /*切换对比*/
            changeIds(){
                //得到新用户群ids及选中的用户群名称nameAry
                if(this.temIds.length==0){
                    this.error='对比人群不能为空';
                    return;
                }else {
                    this.error='';
                }
                this.ids=this.temIds.slice(0);
                this.nameAry.length=0;
                this.ids.forEach( (curId)=> {
                    this.proAry.forEach( (item)=> {
                        if(curId==item.id){
                            this.nameAry.push(item.name);
                        }
                    })
                })
                this.getAreaData();/*地域分布模块加载*/  
                this.noActive=1;
                this.getAgeData();/*年龄分布加载*/
                this.getSexData();/*性别分布加载*/
                this.hideMark();//隐藏弹框
            },
            showLineFn(index){
                this.showLine=index;
            },
            //宏观画像自定义配置或默认图表
            getDetailMap(){
                this.$http.get('/api/userGroupPortrait/queryChartList.gm?ids='+this.ids).then(function(res){
                    if(res.data.code==200){
                       
                    }
                })
            },
            //点击配置  执行
            showSetFn(){
                this.showSet=true;
                this.$refs.setTag.$emit('showSetWrap');
            },
            hideMarkWrap(cur){
                this.showSet=false;
                if(cur){
                    this.getDetailMap();
                }
            },
        }
    }
</script>

