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
                                <li v-for="(item,index) in nameAry"><i></i>{{item}}</li>
                            </ul>
                            <!--<mac-area cur-id="areaDetail" ref="areaDetailId"></mac-area>-->
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
            <span class="left active">理财投资 <i class="spanI">({{personNum}})</i></span>
            <!--<span>美易分 <i>(12人)</i></span>
            <span>美借 <i>(212人)</i></span>-->
            <div class="left messTsDiv">
                <i class="left messIcon" @mouseenter="showNext($event)" @mouseleave="hideNext($event)"></i>
                <ul class="messConUl" style="display:none;">
                    <li>数据显示：已选人群中包含美易理财的人数</li>
                    <li>交互说明：当前选中时，页面以下显示已选人群的美易理财业务画像。</li>
                </ul>
            </div>
        </div>
        <!--下方四块-->
        <div class="fourWrap clearfix">
            <!--客户类型-->
            <div class="left picWrap">
                <div class="wrapMainDiv">
                    <div class="clearfix">
                        <h3 class="left picH3">客户类型</h3>
                        <div class="left messTsDiv">
                            <i class="left messIcon" @mouseenter="showNext($event)" @mouseleave="hideNext($event)"></i>
                            <ul class="messConUl" style="display:none;">
                                <li>数据显示：已选人群在美易理财业务中所处阶段</li>
                                <li>计算说明：根据美易理财业务数据，进行数据解析，给出用户在美易理财办理只注册/只实名/只充值/有投资类型占比情况；投资失败的用户不属于投资客户</li>
                            </ul>
                        </div>
                    </div>
                    <div class="chartWrap">
                        <mac-age cur-id="picId" ref="picrefId"></mac-age>
                    </div>

                </div>
            </div>
            <!--投资产品偏好-->
            <div class="picWrap right">
                <div class="wrapMainDiv">
                    <div class="clearfix">
                        <h3 class="left picH3">投资产品偏好</h3>
                        <div class="left messTsDiv">
                            <i class="left messIcon" @mouseenter="showNext($event)" @mouseleave="hideNext($event)"></i>
                            <ul class="messConUl" style="display:none;">
                                <li>数据显示：已选人群在理财投资中对产品的喜好</li>
                                <li>计算说明：根据用户购买某类产品次数/所有产品购买次数，占比最高即为偏好该产品</li>
                            </ul>
                        </div>
                        
                        <div class="right">
                            <input type="radio" id="productType" value="productType" v-model="proStyle" @click="proData('changeStyle')"><label for="productType">类型</label>
                            <input type="radio" id="annualRate" value="annualRate" v-model="proStyle" @click="proData('changeStyle')"><label for="annualRate">年化率</label>
                            <input type="radio" id="term" value="term" v-model="proStyle" @click="proData('changeStyle')"><label for="term">期限</label>
                        </div>
                    </div>
                    <div class="chartWrap">
                        <mac-age cur-id="proId" ref="prorefId"></mac-age>
                    </div>
                </div>

            </div>
            <!--充值、提现偏好-->
            <div class="left picWrap">
                <div class="wrapMainDiv">
                    <div class="clearfix">
                        <h3 class="left picH3">单次充值、提现最高</h3>
                        <div class="left messTsDiv">
                            <i class="left messIcon" @mouseenter="showNext($event)" @mouseleave="hideNext($event)"></i>
                            <ul class="messConUl" style="display:none;">
                                <li>数据显示：已选人群在理财中充值、提现情况</li>
                                <li>计算说明：根据用户单次充值、提款金额最大值，显示人群所属的占比。</li>
                            </ul>
                        </div>
                        <div class="right">
                            <input type="radio" id="recharge" value="recharge" v-model="ctStyle" @click="ctData('changeStyle')"><label for="recharge">充值</label>
                            <input type="radio" id="withdraw" value="withdraw" v-model="ctStyle" @click="ctData('changeStyle')"><label for="withdraw">提现</label>
                        </div>
                    </div>
                    <div class="chartWrap">
                        <mac-age cur-id="ctId" ref="ctrefId"></mac-age>
                    </div>
                </div>
            </div>
            <!--当前客户等级与总资产-->
            <div class="picWrap right">
                <div class="wrapMainDiv">
                    <div class="clearfix">
                        <h3 class="left picH3">当前客户等级与总资产</h3>
                        <div class="left messTsDiv">
                            <i class="left messIcon" @mouseenter="showNext($event)" @mouseleave="hideNext($event)"></i>
                            <ul class="messConUl" style="display:none;">
                                <li>数据显示：已选人群在美易理财所属等级情况</li>
                                <li>计算说明：根据用户理财等级、总资产情况，显示人群所属的占比。</li>
                            </ul>
                        </div>
                        <div class="right">
                            <input type="radio" id="cusGrade" value="cusGrade" v-model="laStyle" @click="laData('changeStyle')"><label for="cusGrade">客户等级</label>
                            <input type="radio" id="totalAsset" value="totalAsset" v-model="laStyle" @click="laData('changeStyle')"><label for="totalAsset">总资产</label>
                        </div>
                    </div>
                    <div class="chartWrap">
                        <mac-age cur-id="laId" ref="larefId"></mac-age>
                    </div>
                </div>

            </div>
        </div>

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
    </div>
</template>
<script type="text/ecmascript-6">
    const IScroll = require('iscroll');
    require('../../assets/css/groupPic.less');
    import areas from '../../components/echartComponent/areas.vue';//地图
    import macArea from '../../components/echartComponent/macAreaDetail.vue';//地图右侧省份
    import macAge from '../../components/echartComponent/macAge.vue';//年龄分布
    import macSex from '../../components/macSex.vue';/*性别分布*/
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
                proStyle:'productType',//投资产品类型
                proResData:[],//接口返回值
                ctStyle:'recharge',//充值、提现偏好
                ctResData:[],//接口返回值
                laStyle:'cusGrade',//当前客户等级与总资产
                laResData:[],//接口返回值
                groupId:'',//当前用户群id  由用户群列表得来
                personNum:'',
            }
        },
        components:{
            'areas':areas,
            'macArea':macArea,
            'macAge':macAge,
            'macSex':macSex,
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
                    this.getPersonNum();/*得到理财投资 计算的人数*/
                    this.getAreaData();/*地域分布模块加载*/
                    this.getAgeData();/*年龄分布加载*/
                    this.getSexData();/*性别分布加载*/
                    this.picData();/*客户类型*/
                    this.proData();/*投资产品类型*/
                    this.ctData();/*充值提现偏好*/
                    this.laData();/*当前客户等级与总资产*/
                }
            },
            /*得到理财投资 共有人数*/
            getPersonNum(){
                this.$http.get('/api/userGroupPortrait/getLineTotal.gm?ids='+this.ids).then(function(res){
                    if(res.data.code==200){
                        this.personNum='';
                        if(res.data.dataInfo){
                            this.ids.forEach( (curId)=> {
                                for(var item in res.data.dataInfo){
                                    if(curId==item){
                                        this.personNum+=res.data.dataInfo[item][0].valueStr+' / ';
                                    }  
                                }
                            })
                        }
                        this.personNum=this.personNum.replace(/\s\/\s$/,'');
                    }
                })
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
                        if(this.$refs.areaId){
                            this.$refs.areaId.$emit('changeData',this.ids,this.nameAry,res.data.dataInfo);
                        }
                        if(this.$refs.areaDetailId){
                            this.$refs.areaDetailId.$emit('changeData',this.ids,this.nameAry,res.data.dataInfo);
                        }
                    }
                })
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
            /*客户类型*/
            picData(){
                //picrefId
                this.$http.get('/api/userGroupPortrait/getCusTypeChart.gm?ids='+this.ids).then(function (res) {
                    if(res.data.code==200){
                        if(this.$refs.picrefId){
                            this.$refs.picrefId.$emit('changeData',this.ids,this.nameAry,res.data.dataInfo.cusType,17);
                        }
                    }
                })
            },
            /*投资产品类型*/
            proData(changeStyle){
                if(!changeStyle){
                    this.$http.get('/api/userGroupPortrait/getInvestProductTypeChart.gm?ids='+this.ids).then(function (res) {
                        if(res.data.code==200){
                            this.proResData=res.data.dataInfo;
                            if(this.$refs.prorefId){
                                this.$refs.prorefId.$emit('changeData',this.ids,this.nameAry,this.proResData[this.proStyle],17);
                            }
                        }
                    })
                }else{
                    this.$refs.prorefId.$emit('changeData',this.ids,this.nameAry,this.proResData[this.proStyle],17);
                }

            },
            /*充值提现偏好*/
            ctData(changeStyle){
                if(!changeStyle){
                    this.$http.get('/api/userGroupPortrait/getRechargeAndWithdrawChart.gm?ids='+this.ids).then(function (res) {
                        if(res.data.code==200){
                            this.ctResData=res.data.dataInfo;
                            if(this.$refs.ctrefId){
                                this.$refs.ctrefId.$emit('changeData',this.ids,this.nameAry,this.ctResData[this.ctStyle],17);
                            }
                        }
                    })
                }else{
                    this.$refs.ctrefId.$emit('changeData',this.ids,this.nameAry,this.ctResData[this.ctStyle],17);
                }
            },
            /*当前客户等级与总资产*/
            laData(changeStyle){
                if(!changeStyle){
                    this.$http.get('/api/userGroupPortrait/getCusGradeAndAssetChart.gm?ids='+this.ids).then(function (res) {
                        if(res.data.code==200){
                            this.laResData=res.data.dataInfo;
                            if(this.$refs.larefId){
                                this.$refs.larefId.$emit('changeData',this.ids,this.nameAry,this.laResData[this.laStyle],17);
                            }
                        }
                    })
                }else{
                    this.$refs.larefId.$emit('changeData',this.ids,this.nameAry,this.laResData[this.laStyle],17);
                }
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
                window.location.href='/#/userGroup/addUserGroup?flag=new';
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
                
                this.getPersonNum();/*得到理财投资 计算的人数*/
                this.getAreaData();/*地域分布模块加载*/
                this.getAgeData();/*年龄分布加载*/
                this.getSexData();/*性别分布加载*/
                this.picData();/*客户类型*/
                this.proData();/*投资产品类型*/
                this.ctData();/*充值提现偏好*/
                this.laData();/*当前客户等级与总资产*/
                this.hideMark();//隐藏弹框
            }
        }
    }
</script>

