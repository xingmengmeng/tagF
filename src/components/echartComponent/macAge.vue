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
                //如果数据大于30列 则柱形图宽度自适应
                for(let curData in data){
                    if(data[curData].length>30){
                        this.serWidth=null;
                    };
                    break;
                }
                var xData=[],series1=[],series2=[],valuess0=[],valuess1=[];
                if(data[this.ids[0]]){
                    data[this.ids[0]].forEach( (item)=> {
                        xData.push(item.name);
                        series1.push(item.rate);
                        valuess0.push(item.value);
                    });
                }

                if(data[this.ids[1]]){
                    data[this.ids[1]].forEach( (item)=> {
                        series2.push(item.rate);
                        valuess1.push(item.value);
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
                            /*tooltip : {trigger: 'item'},*/
                            itemStyle: {
                                normal: {
                                    color: '#6ea1fc',
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
                            /*tooltip : {trigger: 'item'},*/
                            itemStyle: {
                                normal: {
                                    color: '#6ea1fc',
                                }
                            },
                        },
                        {
                            name:this.nameAry[1],
                            type:'bar',
                            data:series2,
                            barWidth:this.serWidth,
                            /*tooltip : {trigger: 'item'},*/
                            itemStyle: {
                                normal: {
                                    color: '#2fcacc',
                                }
                            },
                        }
                    ];
                }
                var _this=this;
                this.chart = echarts.init(document.getElementById(this.curId));
                this.chart.setOption({
                    //color: ['#6ea6fc','#2fcacc'],
                    tooltip : {
                        trigger: 'axis',
                        confine:true,
                        formatter: function (data) {
                            if(_this.nameAry[1]){
                                return data[0].name+'<br/>'+'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:#6ea1fc;"></span>'+_this.nameAry[0]+'：'+valuess0[data[0].dataIndex]+'<br/>'+'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:#2fcacc;"></span>'+_this.nameAry[1]+'：'+valuess1[data[0].dataIndex];
                            }else{
                                return data[0].name+'<br/>'+'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:#6ea1fc;"></span>'+_this.nameAry[0]+'：'+valuess0[data[0].dataIndex];
                            }
                            
                        }
                    },
                    grid:{
                        top:20,
                        bottom:80,
                        left: '65',
			            right: '65',
                    },
                    legend: {
                        data:this.nameAry,
                        bottom:20
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : xData,
                            axisTick:{
                                show:false
                            },
                            axisLine:{
                                show:false
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
                            },
                        }
                    ],
                    series : temSeries,
                });
            }
        }
    }
</script>
