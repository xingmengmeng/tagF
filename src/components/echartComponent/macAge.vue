<template>
    <div :id="curId"></div>
</template>
<script type="text/ecmascript-6">
    const echarts = require('echarts');
    export default {
        props: ['curId'],/*放传递过来的参数*/
        data(){
            return{
                resData:[],
                ids:[],
                nameAry:[],
                serWidth:11,
            }
        },
        mounted(){
            this.$on('changeData', (ids,resName,data,serWidth)=> {//用户群id，传递过来的返回值，子接口返回值，bar宽度
                this.ids=ids;
                this.nameAry=resName;
                /*设置bar宽度*/
                if(serWidth){
                    this.serWidth=serWidth;
                }
                /*画图*/
                this.drawChart(data);
            })
        },
        methods:{
            drawChart(data){
                var xData=[],series1=[],series2=[],valuess0=[],valuess1=[];
                if(data[this.ids[0]]){
                    data[this.ids[0]].forEach( (item)=> {
                        xData.unshift(item.name);
                        series1.unshift(item.rate);
                        valuess0.unshift(item.value);
                    });
                }

                if(data[this.ids[1]]){
                    data[this.ids[1]].forEach( (item)=> {
                        series2.unshift(item.rate);
                        valuess1.unshift(item.value);
                    });
                }

                /*配置series*/
                var temSeries=new Array();
                if(this.ids.length==1){
                    temSeries=[
                        {
                            name:this.nameAry[0],
                            type:'bar',
                            data:series1,
                            barWidth:this.serWidth,
                            tooltip : {trigger: 'item'},
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 1, color: '#6d8ffa'},
                                                {offset: 0.5, color: '#6ea6fc'},
                                                {offset: 0, color: '#6fc2ff'}
                                            ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 1, color: '#2378f7'},
                                                {offset: 0.7, color: '#2378f7'},
                                                {offset: 0, color: '#83bff6'}
                                            ]
                                    )
                                }
                            },
                        }
                    ]
                }else if(this.ids.length==2){
                    temSeries=[
                        {
                            name:this.nameAry[0],
                            type:'bar',
                            data:series1,
                            barWidth:this.serWidth,
                            tooltip : {trigger: 'item'},
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 1, color: '#6d8ffa'},
                                                {offset: 0.5, color: '#6ea6fc'},
                                                {offset: 0, color: '#6fc2ff'}
                                            ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 1, color: '#2378f7'},
                                                {offset: 0.7, color: '#2378f7'},
                                                {offset: 0, color: '#83bff6'}
                                            ]
                                    )
                                }
                            },
                        },
                        {
                            name:this.nameAry[1],
                            type:'bar',
                            data:series2,
                            barWidth:this.serWidth,
                            tooltip : {trigger: 'item'},
                            itemStyle: {
                                normal: {
                                    color: '#2fcacc',
                                }
                            },
                        }
                    ];
                }

                this.chart = echarts.init(document.getElementById(this.curId));
                this.chart.setOption({
                    //color: ['#6ea6fc','#2fcacc'],
                    tooltip : {
                        trigger: 'axis',
                        formatter: function (data) {
                            return data.seriesName+' '+data.name+':<br/>('+(data.seriesIndex==0?valuess0[data.dataIndex]:valuess1[data.dataIndex])+')'+data.value+'%';
                        }
                    },
                    grid:{
                        top:20,
                        bottom:80
                    },
                    legend: {
                        data:this.nameAry,
                        bottom:20
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : xData
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
                        }
                    ],
                    series : temSeries,
                });
            }
        }
    }
</script>
