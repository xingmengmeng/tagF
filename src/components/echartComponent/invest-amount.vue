<template>
    <div>
        <div class="clearfix">
            <div class="leftBtnWrap">
                <button :class="!firstAct?'selectBtn':'noSelectBtn'" @click="changeSelect">全部客户</button>
                <button :class="firstAct?'selectBtn':'noSelectBtn'" @click="changeSelect">首投客户</button>
            </div>
            <div class="dataControl">
                <input type="radio" value="yesterday" v-model="radiodata" @click="showChart"><label>昨天</label>
                <input type="radio" value="week" v-model="radiodata" @click="showChart"><label>近一周</label>
                <input type="radio" value="month" v-model="radiodata" @click="showChart"><label>近一月</label>
            </div>
        </div>
        <div :id="curId">参与活动的客户投资金额</div>
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
                firstAct:false,/*是否首投*/
                barWidth:30,
            }
        },
        mounted(){
            this.fetchData(this.url,this.radiodata);
        },
        methods:{
            /*切换首投非首投*/
            changeSelect(){
                this.firstAct=!this.firstAct;
                this.showChart();
            },
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
                if(radiovalue=='month'){
                    this.barWidth=10
                }else{
                    this.barWidth=30
                }
                console.log(radiovalue);
                this.dateList=this.resData[radiovalue].dateList;
                if(!this.firstAct){
                    this.useRedFirst=this.resData[radiovalue].activity;
                    this.useRedSecond=this.resData[radiovalue].notActivity;
                    this.basisList=this.resData[radiovalue].basisList;
                }else{
                    this.useRedFirst=this.resData[radiovalue].firstActivity;
                    this.useRedSecond=this.resData[radiovalue].firstNotActivity;
                    this.basisList=this.resData[radiovalue].firstBasisList;
                }
                this.drawPie(this.id);
            },
            drawPie (id) {
                this.chart = echarts.init(document.getElementById(id))
                this.chart.setOption({
                    color:['#5ab1ef','#97b552','#e5cf0d','#ffb980'],
                    tooltip : {
                        trigger: 'axis',
                        formatter: "{a} : <br/>{b}: {c}%"
                    },
                    calculable : true,
                    legend: {
                        data:['活动投资额','非活动投资额','同比'],
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
                            name:'活动投资额',
                            type:'bar',
                            tooltip : {trigger: 'item'},
                            stack: '堆积',
                            data:this.useRedFirst,
                            barWidth : this.barWidth,
                        },
                        {
                            name:'非活动投资额',
                            type:'bar',
                            tooltip : {trigger: 'item'},
                            stack: '堆积',
                            data:this.useRedSecond,
                            barWidth : this.barWidth,
                        },
                        {
                            name:'同比',
                            type:'line',
                            yAxisIndex: 1,
                            data:this.basisList,
                            barWidth : this.barWidth,
                        }
                    ]
                })
            }
        }
    }
</script>
