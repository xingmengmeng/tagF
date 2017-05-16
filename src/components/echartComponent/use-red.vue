<template>
    <div :id="curId">参与活动使用情况统计</div>
</template>

<script type="text/ecmascript-6">
    const echarts = require('echarts');
    export default {
        props: ['curId','curUrl'],/*放传递过来的参数*/
        data(){
            return {
                id:this.curId,
                url:this.curUrl,
                resData:[],
            }
        },
        mounted(){
            this.showChart();
        },
        methods:{
            showChart(){
                this.$http.get(this.url).then(function (res) {
                    this.resData=res.data.dataInfo;
                    this.drawPie(this.id);
                })
            },
            drawPie (id) {
                this.chart = echarts.init(document.getElementById(id))
                this.chart.setOption({
                    /*color:['#8eb2f6','#b9caf6','#d1ddfd','#508afa'],*/
                    color:['#d87a80','#2ec7c9'],
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient : 'vertical',
                        top:'10px',
                        right:'10px',
                        data:['成功使用红包用户数','未使用红包用户数'],
                    },
                    calculable : true,
                    series : [
                        {
                            name:'数据来源',
                            type:'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:this.resData,
                        }
                    ]
                })
            }
        }
    }
</script>