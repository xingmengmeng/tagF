<template>
    <div class="sexComWrap">
        <div class="everyDiv clearfix">
            <div class="imagesDiv"></div>
            <div id='boyChart' class="chartDiv"></div>
        </div>
        <div class="everyDiv next clearfix">
            <div class="imagesDiv girl"></div>
            <div id='girlChart' class="chartDiv"></div>
        </div>
        <!--<div class="leWrap">
            <div v-for="item in nameAry" class="lengthDiv">
                <i></i>
                <span>{{item}}</span>
            </div>
        </div>-->
    </div>
</template>
<style scoped lang="less">
    .sexComWrap{
        width:100%;
        height:220px;
        box-sizing: border-box;
        .everyDiv{
            width: 100%;
            height: 100px;
            &.next{
                border-top:1px solid #ECECEC;
            }
            .imagesDiv{
                float: left;
                margin: 25px 0 0 50px;
                width: 43px;
                height: 56px;
                background: url("../assets/images/vls_1.png");
                &.girl{
                    background: url("../assets/images/vls_2.png");
                }
            }
            .chartDiv{
                padding-left: 50px;
                margin:0 auto;
                width: 380px;
                height: 100%;
                box-sizing: border-box;
            }
        }
        .leWrap{
            width:360px;
            margin:0 auto;
            display: flex;
        }
        .lengthDiv{
            flex: 1;
            text-align: center;
            i{
                display: inline-block;
                width: 26px;
                height: 14px;
                background: #6ea4fc;
            }
            &:nth-of-type(2){
                i{
                    background: #2fcacc;
                }
            }
        }
    }
</style>
<script type="text/ecmascript-6">
    const echarts = require('echarts');
    export default{
        data(){
            return{
                nameAry:[],
                ids:[],
            }
        },
        mounted(){
            this.$on('changeData', (ids,resName,data)=> {//用户群id，传递过来的返回值，子接口返回值
                this.ids=ids;
                this.nameAry=resName;
                /*画图*/
                this.drawChart(data);
            })
        },
        methods:{
            drawChart(data){
                console.log(JSON.stringify(data));
                var xData=[],series1=[],series2=[],valuess0=[],valuess1=[];
                if(data[this.ids[0]]){
                    data[this.ids[0]].forEach( (item)=> {
                        if(item.name=='男'){
                            series1.push(item.rate);
                        }else if(item.name=='女'){
                            series2.push(item.rate);
                        }
                        //valuess0.unshift(item.value);
                    });
                }

                if(data[this.ids[1]]){
                    data[this.ids[1]].forEach( (item)=> {
                        if(item.name=='男'){
                            series1.push(item.rate);
                        }else if(item.name=='女'){
                            series2.push(item.rate);
                        }
                        //valuess1.unshift(item.value);
                    });
                }

                this.chartBoy = echarts.init(document.getElementById('boyChart'));
                this.chartGirl = echarts.init(document.getElementById('girlChart'));
                this.chartBoy.setOption({
                    tooltip: {
                        trigger: 'item'
                    },
                    calculable: true,
                    grid: {
                        height:70,
                        top:10,
                        bottom:0,
                        right:'80px',
                    },
                    xAxis: [
                        {
                            type: 'category',
                            show: false,
                            data: this.nameAry,
                        }
                    ],
                    yAxis: [
                        {
                            type : 'value',
                            max:100,
                            position: 'right',
                            axisLabel : {
                                formatter: '{value} %'
                            },
                            axisLine:{
                                show:false
                            },
                            axisTick:{
                                show:false
                            },
                            splitLine:{
                                show:false
                            },
                        }
                    ],
                    series: [
                        {
                            name: '男',
                            type: 'bar',
                            barWidth:40,
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        var colorList = [
                                            '#6ea1fc','#2fcacc'
                                        ];
                                        return colorList[params.dataIndex]
                                    },
                                }
                            },
                            data: series1,

                        }
                    ]
                });
                this.chartGirl.setOption({
                    tooltip: {
                        trigger: 'item'
                    },
                    calculable: true,
                    grid: {
                        height:70,
                        top:10,
                        bottom:0,
                        right:'80px',
                    },
                    xAxis: [
                        {
                            //type: 'category',
                            show: false,
                            data: this.nameAry,
                        }
                    ],
                    yAxis: [
                        {
                            type : 'value',
                            max:100,
                            position: 'right',
                            axisLabel : {
                                formatter: '{value} %'
                            },
                            axisLine:{
                                show:false
                            },
                            axisTick:{
                                show:false
                            },
                            splitLine:{
                                show:false
                            },
                        }
                    ],
                    series: [
                        {
                            name: '女',
                            type: 'bar',
                            barWidth:40,
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        var colorList = [
                                            '#6ea1fc','#2fcacc'
                                        ];
                                        return colorList[params.dataIndex]
                                    },
                                }
                            },
                            data: series2,
                        }
                    ]
                });
            }
        }
    }
</script>
