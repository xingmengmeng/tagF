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
                color:'',
            }
        },
        mounted(){
            this.$on('changeData', (ids,resName,data,color)=> {
                this.ids=ids;
                this.nameAry=resName;
                this.color=color;
                this.drawChart(data.provinceTopTen[this.ids]);
            })
        },
        methods:{
            drawChart(data){
                var yData=[],series1=[];
                for(var key in data){
                    yData.unshift(key);
                    series1.unshift(data[key]);
                }
                /*配置series*/
                var temSeries=new Array();
                if(this.ids.length==1){
                    temSeries=[
                        {
                            name:this.nameAry,
                            type:'bar',
                            data:series1,
                            barWidth:6
                        }
                    ];
                }
                
                this.chart = echarts.init(document.getElementById(this.curId));
                this.chart.setOption({
                    color: [this.color],
                    tooltip : {
                        trigger: 'axis',
                    },
                    legend: {
                        top:10,
                        data:this.nameAry,
                        show:false,
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
                            name:this.nameAry,
                            type:'bar',
                            data:series1,
                            barWidth:6
                        }
                    ]
                });
            }
        },
    }
</script>
