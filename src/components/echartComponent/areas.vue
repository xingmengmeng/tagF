<template>
    <div :id="curId"></div>
</template>
<script type="text/ecmascript-6">
    const echarts = require('echarts');
    require('../../assets/js/china');
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
                this.drawChart(data.province,data.max);
            })
        },
        methods:{
            drawChart(data,mymax){
                /*配置series*/
                var temSeries=new Array();
                if(this.ids.length==1){
                    temSeries=[
                        {
                            name: this.nameAry[0],
                            type: 'map',
                            showLegendSymbol: false,
                            mapType: 'china',
                            roam: false,
                            data: data[this.ids[0]],
                            label: {
                                normal: {
                                    show:false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle:{
                                emphasis:{
                                    areaColor:'#FF99F3',
                                }
                            },
                        }
                    ];
                }else if(this.ids.length==2){
                    temSeries=[
                        {
                            name: this.nameAry[0],
                            type: 'map',
                            showLegendSymbol: false,
                            mapType: 'china',
                            roam: false,
                            data: data[this.ids[0]],
                            label: {
                                normal: {
                                    show:false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle:{
                                emphasis:{
                                    areaColor:'#FF99F3',
                                }
                            },
                        },
                        {
                            name: this.nameAry[1],
                            type: 'map',
                            showLegendSymbol: false,
                            mapType: 'china',
                            roam: false,
                            data: data[this.ids[1]],
                            label: {
                                normal: {
                                    show:false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle:{
                                emphasis:{
                                    areaColor:'#FF99F3',
                                }
                            },
                        }
                    ];
                }

                this.chart = echarts.init(document.getElementById(this.curId));
                this.chart.setOption({
                    color: ['#477bfc','#6fc1ff','#cfe8fc'],
                    tooltip: {
                        trigger: 'item'
                    },
                    visualMap: {
                        min: 0,
                        max: mymax,
                        x: 'left',
                        y: 'bottom',
                        text:['高','低'],
                        calculable : true,
                        color: ['#477bfc','#6fc1ff','#cfe8fc'],
                    },
                    grid:{
                        top:'0'
                    },
                    legend: {
                        orient: 'horizontal',
                        bottom:'20',
                        data:this.nameAry,
                    },
                    series: temSeries,
                });
            }
        }
    }
</script>

