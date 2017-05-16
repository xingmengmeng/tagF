<template>
    <div>
        <activity-header></activity-header>
        <section class="container" id="activityWrap">
            <div class="actHeader clearfix">
                <span v-cloak>编号：{{taHeadData.sno}}</span>
                <span v-cloak>活动主题：{{taHeadData.subject}}</span>
                <span v-cloak>覆盖用户数：{{taHeadData.coverUserCount}}</span>
                <span class="right" v-cloak>活动开始时间：{{taHeadData.startTime}}</span>
            </div>
            <section class="tabWrap">
                <table class="acttable" width="100%">
                    <thead>
                    <tr>
                        <th> </th>
                        <th>客户数</th>
                        <th> </th>
                        <th> </th>
                        <th> </th>
                        <th>投资笔数</th>
                        <th> </th>
                        <th> </th>
                        <th>投资额</th>
                        <th> </th>
                    </tr>
                    <tr>
                        <th>日期</th>
                        <th>使用红包客户数</th>
                        <th>投资平台客户数</th>
                        <th>占比</th>
                        <th>使用红包客户投资笔数</th>
                        <th>平台投资笔数</th>
                        <th>占比</th>
                        <th>红包带来的投资金额</th>
                        <th>平台投资金额</th>
                        <th>占比</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="curData in tabData">
                        <td v-cloak>{{curData.dateTime}}</td>
                        <td v-cloak>{{curData.useRedCusCount}}</td>
                        <td v-cloak>{{curData.cusCount}}</td>
                        <td v-cloak>{{curData.cusRate}}%</td>
                        <td v-cloak>{{curData.useRedInvestCount}}</td>
                        <td v-cloak>{{curData.investCount}}</td>
                        <td v-cloak>{{curData.countRate}}%</td>
                        <td v-cloak>{{curData.useRedInvestAmount}}</td>
                        <td v-cloak>{{curData.investAmount}}</td>
                        <td v-cloak>{{curData.amountRate}}%</td>
                    </tr>
                    </tbody>
                </table>
                <div class="tabFoot clearfix">
                    <div class="leftS">
                        <div class="left">总计</div>
                        <div class="leftSpanWrap clearfix">
                            <p>
                                <span style="margin-right: 40px" v-cloak>使用红包数:{{taFootData.useRedCount}} ,使用红包客户数:{{taFootData.useRedCusCount}},投资平台客户数:{{taFootData.cusCount}},占比 {{taFootData.cusRate}}%</span>
                                <span v-cloak>使用红包客户投资笔数:{{taFootData.useRedInvestCount}},平台投资笔数:{{taFootData.investCount}}, 占比:{{taFootData.countRate}}% </span>
                            </p>
                            <span v-cloak>红包带来的投资金额：{{taFootData.useRedInvestAmount}},平台投资金额:{{taFootData.investAmount}},占比:{{taFootData.amountRate}}%</span>
                        </div>
                    </div>
                    <div class="right rightPage">
                        <!--分页-->
                        <div class="page clearfix" @click="getPageData">
                            <span class="allPage" v-cloak>1-{{pageCount}}</span>
                            <span id="prev">上一页</span>
                            <input type="text" class="goTo" v-model="gotoPage" @keyup.enter="gotoPageFn">
                            <span id="next">下一页</span>
                        </div>
                        <a :href="'/api/activity/download.gm?sno='+sno" class="downLink">下载</a>
                    </div>
                </div>
            </section>
            <!--下方分析图-->
            <section class="chartDiv clearfix">
                <div class="leftWrap">
                    <h5 class="titleName">参与活动使用情况统计</h5>
                    <div class="chartWrap">
                        <use-red cur-id="ch6" :cur-url="'/api/activity/getUseRedPackStat.gm?sno='+sno"></use-red>
                    </div>
                </div>
                <div class="rightWrap">
                    <h5 class="titleName">参与活动的客户数量</h5>
                    <div class="chartWrap">
                        <child cur-id="ch1" :cur-url="'/api/activity/getCustCountChart.gm?sno='+sno"></child>
                    </div>
                </div>
                <div class="leftWrap">
                    <h5 class="titleName">参与活动的客户投资金额</h5>
                    <div class="chartWrap">
                        <invest-amount cur-id="ch2" :cur-url="'/api/activity/getInvestAmountChart.gm?sno='+sno"></invest-amount>
                    </div>
                </div>
                <div class="rightWrap">
                    <h5 class="titleName">参与活动的客户人均投资</h5>
                    <div class="chartWrap">
                        <per-invest-amount cur-id="ch3" :cur-url="'/api/activity/getPerInvestAmountChart.gm?sno='+sno"></per-invest-amount>
                    </div>
                </div>
                <div class="leftWrap">
                    <h5 class="titleName">客户投资产品情况</h5>
                    <div class="chartWrap">
                        <invest-product cur-id="ch4" :cur-url="'/api/activity/getInvestProductChart.gm?sno='+sno"></invest-product>
                    </div>
                </div>
                <div class="rightWrap">
                    <h5 class="titleName">标签客户转化占比</h5>
                    <div class="chartWrap">
                        <tag-cus-trans cur-id="ch5" :cur-url="'/api/activity/getTagCusTransChart.gm?sno='+sno"></tag-cus-trans>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    ~function (pro) {
        //->queryURLParameter:get url parameter or hash  获取url参数
        function queryURLParameter() {
            var reg = /([^?=&#]+)=([^?=&#]+)/g,
                    obj = {};
            this.replace(reg, function () {
                obj[arguments[1]] = arguments[2];
            });

            //->HASH
            reg = /#([^?=&#]+)/g;
            this.replace(reg, function () {
                obj['HASH'] = arguments[1];
            });
            return obj;
        }
        pro.queryURLParameter = queryURLParameter;
    }(String.prototype);

    let urlStr=window.location.href;
    let _sno='';
    _sno=urlStr.queryURLParameter().sno;

    import activityHeader from '../../components/activityHeader.vue';
    import useRed from '../../components/echartComponent/use-red';
    import child from '../../components/echartComponent/child';
    import investAmount from '../../components/echartComponent/invest-amount';
    import perInvestAmount from '../../components/echartComponent/per-invest-amount.vue';
    import investProduct from '../../components/echartComponent/invest-product.vue';
    import tagCusTrans from '../../components/echartComponent/tag-cus-trans.vue';

    require('../../assets/css/reset.min.less');
    require('../../assets/css/activityInfo.less');

    export default {
        data(){
            return{
                sno:_sno,
                taHeadData:[],
                tabData:[],
                taFootData:[],
                pageCount:'',/*总页数*/
                gotoPage:'1',
                pageNum:'1',
            }
        },
        components:{
            'activity-header':activityHeader,
            'use-red':useRed,
            'child':child,
            'invest-amount':investAmount,
            'per-invest-amount':perInvestAmount,
            'invest-product':investProduct,
            'tag-cus-trans':tagCusTrans
        },
        mounted(){
            this.getHeadData();
            this.getTabData();
            this.getTabFoot();
        },
        methods:{
            getHeadData(){
                this.$http.get('/api/activity/getBaseInfo.gm?sno='+this.sno).then(function (res) {
                    this.taHeadData=res.data.dataInfo;
                })
            },
            getTabData(){
                this.$http.get('/api/activity/queryStatList.gm?sno='+this.sno+'&pageNum='+this.pageNum).then(function (res) {
                    this.pageCount=res.data.dataInfo.pageCount;
                    this.tabData=res.data.dataInfo.dataList;
                    this.gotoPage=this.pageNum;
                })
            },
            getTabFoot(){
                this.$http.get('/api/activity/getStatBaseInfo.gm?sno='+this.sno).then(function (res) {
                    this.taFootData=res.data.dataInfo;
                })
            },
            getPageData(e){
                if(e.target.innerHTML=='上一页'){
                    if(this.pageNum<=1) return;
                    this.pageNum--;
                    this.getTabData();/*ajax后台获取要显示数据*/
                }else if(e.target.innerHTML=='下一页'){
                    if(this.pageNum>=this.pageCount) return;
                    this.pageNum++;
                    this.getTabData();/*ajax后台获取要显示数据*/
                }
            },
            gotoPageFn(){
                if(this.gotoPage<1||this.gotoPage>this.pageCount||this.gotoPage==this.pageNum){
                    this.gotoPage=this.pageNum;
                    return;
                }else{
                    this.pageNum=this.gotoPage;
                    this.getTabData();/*ajax后台获取要显示数据*/
                }
            },
            downExcel(){
                this.$http.get('/api/activity/download.gm?sno='+this.sno).then(function (res) {

                })
            },
        }
    }
</script>

