<template>
    <div :id="curId">省份</div>
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
            }
        },
        mounted(){
            this.$on('changeData', (ids,resName,data)=> {
                this.ids=ids;
                this.nameAry=resName;
                this.drawChart(data.provinceTopTen);
            })
        },
        methods:{
            drawChart(data){
                var yData=[],series1=[],series2=[];
                for(var key in data){
                    yData.unshift(key);
                    series1.unshift(data[key][this.ids[0]]);
                    if(this.ids[1]){
                        series2.unshift(data[key][this.ids[1]]);
                    }
                }

                /*配置series*/
                var temSeries=new Array();
                if(this.ids.length==1){
                    temSeries=[
                        {
                            name:this.nameAry[0],
                            type:'bar',
                            data:series1,
                            barWidth:6
                        }
                    ];
                }else if(this.ids.length==2){
                    temSeries=[
                        {
                            name:this.nameAry[0],
                            type:'bar',
                            data:series1,
                            barWidth:6
                        },
                        {
                            name:this.nameAry[1],
                            type:'bar',
                            data:series2,
                            barWidth:6
                        }
                    ];
                }
                this.chart = echarts.init(document.getElementById(this.curId));
                this.chart.setOption({
                    color: ['#6ea1fc','#2fcacc'],
                    tooltip : {
                        trigger: 'axis',
                    },
                    legend: {
                        top:10,
                        data:this.nameAry
                    },
                    grid:{
                        top:50,
                        left:'50px',
                    },
                    calculable : true,
                    xAxis : [
                        {
                            show:false,
                        }
                    ],
                    yAxis : [
                        {
                            data : yData,
                            axisLine: {
                                show:false,
                            },
                            axisTick:{
                                show:false
                            }
                        }
                    ],
                    series : [
                        {
                            name:this.nameAry[0],
                            type:'bar',
                            data:series1,
                            barWidth:6
                        },
                        {
                            name:this.nameAry[1],
                            type:'bar',
                            data:series2,
                            barWidth:6
                        }
                    ]
                });
            }
        },
    }
</script>
