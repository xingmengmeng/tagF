<template>
    <div class="container" style="padding-bottom:10px">
        <!--筛选人群-->
        <div class="selectGroup clearfix">
            <span class="grSpan">筛选人群：</span>
            <div class="groupNameWrap">
                <div class="biSpanWrap" v-for="item in resData">
                    <span>{{item.name}}</span>
                </div>
                <!--<div class="biSpanWrap">
                    <span>男，18-21，投资100起</span>
                </div>-->
                <i @click="addGroupFn"></i>
            </div>
        </div>
        <!--地域分布  年龄分布  性别分布 start-->
        <div class="clearfix">
            <div class="left areaWrap">
                <div class="clearfix areas">
                    <h3 class="picH3">地域分布</h3>
                    <div class="clearfix">
                        <div class="left areasWrap">
                            <areas cur-id="areaShow" ref="areaId"></areas>
                        </div>
                        <div class="right areaDetailWrap">
                            <mac-area cur-id="areaDetail" ref="areaDetailId"></mac-area>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right personWrap">
                <div class="agesWrap">
                    <h3 class="picH3">年龄分布</h3>
                    <mac-age cur-id="ageId" ref="agerefId"></mac-age>
                </div>
                <div class="sexWrap">
                    <h3 class="picH3">性别分布</h3>
                    <div>图表</div>
                </div>
            </div>
        </div>
        <!--地域分布  年龄分布  性别分布 end-->

        <div class="lineNav clearfix">
            <span class="active">理财投资 <i>(21,212人)</i></span>
            <span>美易分 <i>(12人)</i></span>
            <span>美借 <i>(212人)</i></span>
        </div>
        <!--下方四块-->
        <div class="fourWrap clearfix">
            <!--客户类型-->
            <div class="left picWrap">
                <div class="wrapMainDiv">
                    <div class="clearfix">
                        <h3 class="left picH3">客户类型</h3>
                    </div>
                    <div class="chartWrap">
                        <mac-age cur-id="picId" ref="picrefId"></mac-age>
                    </div>

                </div>
            </div>
            <!--投资产品类型-->
            <div class="picWrap right">
                <div class="wrapMainDiv">
                    <div class="clearfix">
                        <h3 class="left picH3">投资产品类型</h3>
                        <div class="right">
                            <input type="radio" name="proStyle"><label>类型</label>
                            <input type="radio" name="proStyle"><label>年化率</label>
                            <input type="radio" name="proStyle"><label>期限</label>
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
                        <h3 class="left picH3">充值、提现偏好</h3>
                        <div class="right">
                            <input type="radio" name="ctStyle"><label>充值</label>
                            <input type="radio" name="ctStyle"><label>提现</label>
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
                        <div class="right">
                            <input type="radio" name="laStyle"><label>客户等级</label>
                            <input type="radio" name="laStyle"><label>总资产</label>
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
                <div class="spanWrap">
                    <div class="scroll_wrap">
                        <div class="spanAndClose" v-for="item in proAry">
                            <span @click="selectSpanFn(item.id)" :class="temIds.indexOf(item.id)!=-1?'active':''">{{item.name}}</span>
                            <i v-if="!item.flag" @click="delectGroup(item.id)"></i>
                        </div>
                    </div>
                </div>
            </div>
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
    export default {
        data(){
            return{
                resData:[],
                ids:[],
                temIds:[],
                nameAry:[],
                proAry:[],//可选人群
                addUserRightScroll:null,
                showMarker:0,
            }
        },
        components:{
            'areas':areas,
            'macArea':macArea,
            'macAge':macAge,
        },
        mounted(){
            this.getData();
            this.getSelectPro();
        },
        methods:{
            //初始化  得到当前的id数组、用户群名数组
            getData(){
                this.$http.get('/api/userGroupPortrait/queryDefaultList.gm').then(function (res) {
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
                        this.picData();/*客户类型*/
                        this.proData();/*投资产品类型*/
                        this.ctData();/*充值提现偏好*/
                        this.laData();/*当前客户等级与总资产*/
                    }
                });
            },
            /*得到可选人群*/
            getSelectPro(){
                this.$http.get('/api/userGroupPortrait/queryList.gm').then(function (res) {
                    if(res.data.code==200){
                        this.proAry=res.data.dataInfo;
                        this.addUserRightScroll=new IScroll('.spanWrap',{
                            mouseWheel: true,
                            scrollbars: true,
                            checkDOMChanges:true,
                            bounce: false,
                            interactiveScrollbars:true
                        });
                    }
                })
            },
            /*地域分布*/
            getAreaData(){
                this.$http.get('/api/userGroupPortrait/getAreaChart.gm?ids='+this.ids).then(function (res) {
                    if(res.data.code==200){
                        this.$refs.areaId.$emit('changeData',this.ids,this.resData,res.data.dataInfo);
                        this.$refs.areaDetailId.$emit('changeData',this.ids,this.resData,res.data.dataInfo);
                    }
                })
            },
            /*年龄分布*/
            getAgeData(){
                this.$http.get('/api/userGroupPortrait/getAgeChart.gm?ids='+this.ids).then(function (res) {
                    if(res.data.code==200){
                        this.$refs.agerefId.$emit('changeData',this.ids,this.resData,res.data.dataInfo.age);
                    }
                })
            },
            /*客户类型*/
            picData(){
                //picrefId
                this.$http.get('/api/userGroupPortrait/getCusTypeChart.gm?ids='+this.ids).then(function (res) {
                    if(res.data.code==200){
                        this.$refs.picrefId.$emit('changeData',this.ids,this.resData,res.data.dataInfo.cusType,17);
                    }
                })
            },
            /*投资产品类型*/
            proData(){
                this.$http.get('/api/userGroupPortrait/getInvestProductTypeChart.gm?ids='+this.ids).then(function (res) {
                    if(res.data.code==200){
                        this.$refs.prorefId.$emit('changeData',this.ids,this.resData,res.data.dataInfo.productType,17);
                    }
                })
            },
            /*充值提现偏好*/
            ctData(){
                this.$http.get('/api/userGroupPortrait/getRechargeAndWithdrawChart.gm?ids='+this.ids).then(function (res) {
                    if(res.data.code==200){
                        this.$refs.ctrefId.$emit('changeData',this.ids,this.resData,res.data.dataInfo.recharge,17);
                    }
                })
            },
            /*当前客户等级与总资产*/
            laData(){
                this.$http.get('/api/userGroupPortrait/getCusGradeAndAssetChart.gm?ids='+this.ids).then(function (res) {
                    if(res.data.code==200){
                        this.$refs.larefId.$emit('changeData',this.ids,this.resData,res.data.dataInfo.totalAsset,17);
                    }
                })
            },
            /*点击新增 对比人群 按钮*/
            addGroupFn(){
                this.showMarker=1;
            },
            /*隐藏弹框*/
            hideMark(){
                this.showMarker=0;
            },
            /*点击  新建  跳转*/
            gotoAddNewGorup(){
                window.location.href='/#/userGroup/addUserGroup?flag=new';
            },
            /*点击 弹框中 用户群*/
            selectSpanFn(id){
                var con=this.temIds.filter( (item)=> {
                    return item==id;
                });
                if(con.length==0){
                    if(this.temIds.length>=2){
                        return;
                    }else{
                        this.temIds.push(id);
                    }
                }else {
                    this.temIds=this.temIds.filter( (item)=> {
                        return item!=id;
                    })
                }
                console.log(this.temIds);
            },
            /*删除新增的用户群*/
            delectGroup(id){
                this.$http.delete('/api/userGroupPortrait/delete.gm?id='+id).then(function(res){
                    if(res.data.code==200){
                        this.getSelectPro();
                    }
                })
            },
            /*切换对比*/
            changeIds(){
                this.ids=this.temIds;
                this.getAreaData();/*地域分布模块加载*/
                this.getAgeData();/*年龄分布加载*/
                this.picData();/*客户类型*/
                this.proData();/*投资产品类型*/
                this.ctData();/*充值提现偏好*/
                this.laData();/*当前客户等级与总资产*/
            }
        }
    }
</script>

