<template>
    <div>
        <div class="clearfix">
            <div class="dataControl">
                <input type="radio" value="yesterday" v-model="radiodata" @click="showChart"><label>昨天</label>
                <input type="radio" value="week" v-model="radiodata" @click="showChart"><label>近一周</label>
                <input type="radio" value="month" v-model="radiodata" @click="showChart"><label>近一月</label>
            </div>
        </div>
        <div :id="curId">参与活动的客户人均投资</div>
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
                useRedFirst:[],/*1数据*/
                useRedSecond:[],/*2数据*/
                notUseRed:[],/*3数据*/
                basisList:[],/*线数据*/
                radiodata:'week',
            }
        },
        mounted(){
            this.fetchData(this.url,this.radiodata);
        },
        methods:{
            showChart(){/*点击切换事件*/
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
                this.dateList=this.resData[radiovalue].dateList;
                this.useRedFirst=this.resData[radiovalue].activity;
                this.useRedSecond=this.resData[radiovalue].notActivity;
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
                        data:['活动中的人均投资','历史的人均投资','同比'],
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
                            name:'活动中的人均投资',
                            type:'bar',
                            tooltip : {trigger: 'item'},
                            stack: '',
                            data:this.useRedFirst,
                        },
                        {
                            name:'历史的人均投资',
                            type:'bar',
                            tooltip : {trigger: 'item'},
                            stack: '',
                            data:this.useRedSecond,
                        },
                        {
                            name:'同比',
                            type:'line',
                            yAxisIndex: 1,
                            data:this.basisList,
                        }
                    ]
                })
            }
        }
    }
</script>

