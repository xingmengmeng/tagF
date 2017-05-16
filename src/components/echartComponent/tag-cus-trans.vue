<template>
    <div>
        <div :id="curId">标签客户转化占比</div>
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
                dateList:[],/* x轴*/
                useRedFirst:[],/*使用红包首投*/
                useRedSecond:[],/*使用红包复投*/
                notUseRed:[],/*未使用红包*/
                basisList:[],/*平台客户对比*/
                radiodata:'week',
            }
        },
        mounted(){
            this.showChart();
        },
        methods:{
            showChart(){
                this.$http.get(this.url).then(function (res) {
                    this.resData=res.data.dataInfo;
                    this.resData.forEach( (item) =>{
                        this.dateList.push(item.name);
                        this.useRedFirst.push(item.useRedCount);
                        this.useRedSecond.push(item.count);
                        this.drawPie(this.id);
                    })
                })
            },
            drawPie (id) {
                this.chart = echarts.init(document.getElementById(id))
                this.chart.setOption({
                    color:['#5ab1ef','#97b552','#e5cf0d','#b6a2de'],
                    tooltip : {
                        trigger: 'axis',
                        formatter: "{a} : <br/>{b}: {c}"
                    },
                    calculable : true,
                    legend: {
                        data:['未使用红包','使用红包'],
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
                            name:'未使用红包',
                            type:'bar',
                            tooltip : {trigger: 'item'},
                            stack: '堆积',
                            barWidth : 30,
                            data:this.useRedFirst,
                        },
                        {
                            name:'使用红包',
                            type:'bar',
                            tooltip : {trigger: 'item'},
                            stack: '堆积',
                            barWidth : 30,
                            data:this.useRedSecond,
                        }
                    ]
                })
            }
        }
    }
</script>

