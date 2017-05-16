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
                        图表
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
                    <div class="chartWrap">图表</div>
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
                        图表
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>
<script type="text/ecmascript-6">
    require('../../assets/css/groupPic.less');
    import areas from '../../components/echartComponent/areas.vue';//地图
    import macArea from '../../components/echartComponent/macAreaDetail.vue';//地图右侧省份
    import macAge from '../../components/echartComponent/macAge.vue';//年龄分布
    export default {
        data(){
            return{
                resData:[],
                ids:[],
                nameAry:[],
            }
        },
        components:{
            'areas':areas,
            'macArea':macArea,
            'macAge':macAge,
        },
        mounted(){
            this.getData();
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
                            this.nameAry.push(item.name);
                        });

                        this.getAreaData();/*地域分布模块加载*/
                        this.getAgeData();/*年龄分布加载*/
                        this.picData();/*客户类型*/
                        this.proData();/*投资产品类型*/
                        this.ctData();/*充值提现偏好*/
                        this.laData();/*当前客户等级与总资产*/
                    }
                })
            },
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
                        this.$refs.picrefId.$emit('changeData',this.ids,this.resData,res.data.dataInfo.cusType);
                    }
                })
            },
            /*投资产品类型*/
            proData(){
                this.$http.get('/api/userGroupPortrait/getInvestProductTypeChart.gm?ids='+this.ids).then(function (res) {
                    if(res.data.code==200){
                        //this.$refs.picrefId.$emit('changeData',this.ids,this.resData,res.data.dataInfo.cusType);
                    }
                })
            },
            /*充值提现偏好*/
            ctData(){
                this.$http.get('/api/userGroupPortrait/getRechargeAndWithdrawChart.gm?ids='+this.ids).then(function (res) {
                    if(res.data.code==200){
                        //this.$refs.picrefId.$emit('changeData',this.ids,this.resData,res.data.dataInfo.cusType);
                    }
                })
            },
            /*当前客户等级与总资产*/
            laData(){
                this.$http.get('/api/userGroupPortrait/getCusGradeAndAssetChart.gm?ids='+this.ids).then(function (res) {
                    if(res.data.code==200){
                        //this.$refs.picrefId.$emit('changeData',this.ids,this.resData,res.data.dataInfo.cusType);
                    }
                })
            }
        }
    }
</script>

