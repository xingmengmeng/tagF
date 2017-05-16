<template>
    <div>
        <div class="clearfix">
            <div class="dataControl">
                <input type="radio" value="yesterday" v-model="radiodata" @click="showChart"><label>昨天</label>
                <input type="radio" value="week" v-model="radiodata" @click="showChart"><label>近一周</label>
                <input type="radio" value="month" v-model="radiodata" @click="showChart"><label>近一月</label>
            </div>
        </div>
        <div :id="curId">参与活动的客户数量</div>
    </div>
</template>

<script type="text/ecmascript-6">
    const echarts = require('echarts');
    export default {
        props: ['curId','curUrl'],/*放传递过来的参数*/
        data(){
            return{
                id:this.curId,
                url:this.curUrl,
                resData:[],
                dateList:[],/*日期*/
                useRedFirst:[],/*使用红包首投*/
                useRedSecond:[],/*使用红包复投*/
                notUseRed:[],/*未使用红包*/
                basisList:[],/*平台客户对比*/
                radiodata:'week',
                barWidth:25,
            }
        },
        mounted(){
            this.fetchData(this.url,this.radiodata);
        },
        methods:{
            showChart(){/*点击切换事件*/
                /*daychart:近一月   weekChart 周  monthChart月份  yearChart 年*/
                this.fetchData(this.url,this.radiodata);
            },
            fetchData(url,radiovalue){
                if(this.resData.length==0){
                    this.$http.get(url).then(function (res) {
                        this.resData=res.data.dataInfo;
                        this.setData(radiovalue);
                    })
                }else{
                    this.setData(radiovalue);
                }
            },
            setData(radiovalue){
                if(radiovalue=='month'){
                    this.barWidth=10;
                }else{
                    this.barWidth=25;
                }
                this.dateList=this.resData[radiovalue].dateList;
                this.useRedFirst=this.resData[radiovalue].useRedFirst;
                this.useRedSecond=this.resData[radiovalue].useRedSecond;
                this.notUseRed=this.resData[radiovalue].notUseRed;
                this.basisList=this.resData[radiovalue].basisList;
                this.drawPie(this.id);
            },
            drawPie (id) {
                this.chart = echarts.init(document.getElementById(id))
                this.chart.setOption({
                    color:['#5ab1ef','#97b552','#e5cf0d','#b6a2de'],
                    tooltip : {
                        trigger: 'axis',
                        formatter: "{a} : <br/>{b}: {c}%"
                    },
                    calculable : true,
                    legend: {
                        data:['使用红包首投客户数','使用红包复投客户数','未用红包客户数','平台客户同比'],
                        bottom:'10px',
                    },
                    grid:{
                        top:'20px'
                    },
                    xAxis : [
                        {
                            type : 'category',
                            splitLine : {show : false},
                            data : this.dateList,
                            axisLine: {
                                lineStyle: {
                                    color: '#8e8e8e',
                                    width:1,
                                }
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            position: 'right',
                            axisLabel : {
                                formatter: '{value} %'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#8e8e8e',
                                    width:1,
                                }
                            }
                        },
                        {
                            type : 'value',
                            position: 'left',
                            axisLine: {
                                lineStyle: {
                                    color: '#8e8e8e',
                                    width:1,
                                }
                            }
                        }
                    ],
                    series : [
                        {
                            name:'使用红包首投客户数',
                            type:'bar',
                            tooltip : {trigger: 'item'},
                            stack: '广告',
                            data:this.useRedFirst,
                            barWidth:this.barWidth,
                        },
                        {
                            name:'使用红包复投客户数',
                            type:'bar',
                            tooltip : {trigger: 'item'},
                            stack: '广告',
                            data:this.useRedSecond,
                            barWidth:this.barWidth,
                        },
                        {
                            name:'未用红包客户数',
                            type:'bar',
                            tooltip : {trigger: 'item'},
                            stack: '广告',
                            data:this.notUseRed,
                            barWidth:this.barWidth,
                        },
                        {
                            name:'平台客户同比',
                            type:'line',
                            yAxisIndex: 1,
                            data:this.basisList,
                            barWidth:this.barWidth,
                        }
                    ]
                })
            }
        }
    }
</script>
