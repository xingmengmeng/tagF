<template>
    <div>
        <h4>登录统计</h4>
        <div id="loginId"></div>
        <h4>登录记录</h4>
        <div class="messWrap">
            <select name="messSelect" id="messSelect" v-model="selected" @change="selectVal">
                <option value="all">全部</option>
                <option :value="op.code" v-for="op in selectAry">{{op.name}}</option>
            </select>
            <!--分页-->
            <div class="right pages clearfix" @click="getPageData">
                <span class="allPage" v-cloak>1-{{pageCount}}</span>
                <span id="prev">上一页</span>
                <input type="text" class="goTo" v-model="gotoPage" @keyup.enter="gotoPageFn" @blur="getPage">
                <span id="next">下一页</span>
            </div>
        </div>
        <table width="100%" class="tab">
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>所属部门与角色</th>
                    <th>登录IP</th>
                    <th>登录时间</th>
                    <th>状态</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in queryList">
                    <td>{{item.userName}}</td>
                    <td>{{item.deptRole}}</td>
                    <td>{{item.loginIp}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.type}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped lang="less">
    h4{
       padding: 10px 20px;
       margin-bottom: 15px;
       width: 100%;
       font-weight: normal;
       font-size:16px; 
       border-bottom: 2px solid #1078F5;
       box-sizing: border-box;
    }
    #loginId{
        width: 100%;
        height: 300px;
        box-sizing: border-box;
        overflow: hidden;
    }
    .messWrap{
        padding: 0 20px;
        select{
            padding: 3px 2px;
            border: 1px solid #ECECEC;
            border-radius: 2px;
        }
    }
    #messSelect{
        width: 120px;
    }
    
</style>
<script>
require('../../assets/css/pages.less');
require('../../assets/css/tab.less');
const echarts = require('echarts');
export default {
  data () {
      return {
          pageCount:'1',
          pageNum:'1',
          gotoPage:'1',
          selectAry:[],//下拉选择框数据
          selected:'all',//当前选中
          queryList:[],//登录历史记录
      }
  },
  mounted () {
      this.getChartsData();//charts图表信息
      this.getSelectAryData();//下拉列表
      this.getTabList();//table数据
  },
  methods: {
      getChartsData(){
          this.$http.get('/api/loginLog/getLoginChart.gm?month=2017-05').then(function(res){
              if(res.data.code==200){
                  this.drawChart(res.data.dataInfo);
              }
          })
      },
      drawChart(resData){
          this.chart = echarts.init(document.getElementById('loginId'));
          //var dataMap={"2002":[{"name":"北京","value":4315},{"name":"天津","value":2150.76},{"name":"河北","value":6018.28},{"name":"山西","value":2324.8},{"name":"内蒙古","value":1940.94},{"name":"辽宁","value":5458.22},{"name":"吉林","value":2348.54},{"name":"黑龙江","value":3637.2},{"name":"上海","value":5741.03},{"name":"江苏","value":10606.85},{"name":"浙江","value":8003.67},{"name":"安徽","value":3519.72},{"name":"福建","value":4467.55},{"name":"江西","value":2450.48},{"name":"山东","value":10275.5},{"name":"河南","value":6035.48},{"name":"湖北","value":4212.82},{"name":"湖南","value":4151.54},{"name":"广东","value":13502.42},{"name":"广西","value":2523.73},{"name":"海南","value":642.73},{"name":"重庆","value":2232.86},{"name":"四川","value":4725.01},{"name":"贵州","value":1243.43},{"name":"云南","value":2312.82},{"name":"西藏","value":162.04},{"name":"陕西","value":2253.39},{"name":"甘肃","value":1232.03},{"name":"青海","value":340.65},{"name":"宁夏","value":377.16},{"name":"新疆","value":1612.6}],"2003":[{"name":"北京","value":5007.21},{"name":"天津","value":2578.03},{"name":"河北","value":6921.29},{"name":"山西","value":2855.23},{"name":"内蒙古","value":2388.38},{"name":"辽宁","value":6002.54},{"name":"吉林","value":2662.08},{"name":"黑龙江","value":4057.4},{"name":"上海","value":6694.23},{"name":"江苏","value":12442.87},{"name":"浙江","value":9705.02},{"name":"安徽","value":3923.11},{"name":"福建","value":4983.67},{"name":"江西","value":2807.41},{"name":"山东","value":12078.15},{"name":"河南","value":6867.7},{"name":"湖北","value":4757.45},{"name":"湖南","value":4659.99},{"name":"广东","value":15844.64},{"name":"广西","value":2821.11},{"name":"海南","value":713.96},{"name":"重庆","value":2555.72},{"name":"四川","value":5333.09},{"name":"贵州","value":1426.34},{"name":"云南","value":2556.02},{"name":"西藏","value":185.09},{"name":"陕西","value":2587.72},{"name":"甘肃","value":1399.83},{"name":"青海","value":390.2},{"name":"宁夏","value":445.36},{"name":"新疆","value":1886.35}],"2004":[{"name":"北京","value":6033.21},{"name":"天津","value":3110.97},{"name":"河北","value":8477.63},{"name":"山西","value":3571.37},{"name":"内蒙古","value":3041.07},{"name":"辽宁","value":6672},{"name":"吉林","value":3122.01},{"name":"黑龙江","value":4750.6},{"name":"上海","value":8072.83},{"name":"江苏","value":15003.6},{"name":"浙江","value":11648.7},{"name":"安徽","value":4759.3},{"name":"福建","value":5763.35},{"name":"江西","value":3456.7},{"name":"山东","value":15021.84},{"name":"河南","value":8553.79},{"name":"湖北","value":5633.24},{"name":"湖南","value":5641.94},{"name":"广东","value":18864.62},{"name":"广西","value":3433.5},{"name":"海南","value":819.66},{"name":"重庆","value":3034.58},{"name":"四川","value":6379.63},{"name":"贵州","value":1677.8},{"name":"云南","value":3081.91},{"name":"西藏","value":220.34},{"name":"陕西","value":3175.58},{"name":"甘肃","value":1688.49},{"name":"青海","value":466.1},{"name":"宁夏","value":537.11},{"name":"新疆","value":2209.09}],"2005":[{"name":"北京","value":6969.52},{"name":"天津","value":3905.64},{"name":"河北","value":10012.11},{"name":"山西","value":4230.53},{"name":"内蒙古","value":3905.03},{"name":"辽宁","value":8047.26},{"name":"吉林","value":3620.27},{"name":"黑龙江","value":5513.7},{"name":"上海","value":9247.66},{"name":"江苏","value":18598.69},{"name":"浙江","value":13417.68},{"name":"安徽","value":5350.17},{"name":"福建","value":6554.69},{"name":"江西","value":4056.76},{"name":"山东","value":18366.87},{"name":"河南","value":10587.42},{"name":"湖北","value":6590.19},{"name":"湖南","value":6596.1},{"name":"广东","value":22557.37},{"name":"广西","value":3984.1},{"name":"海南","value":918.75},{"name":"重庆","value":3467.72},{"name":"四川","value":7385.1},{"name":"贵州","value":2005.42},{"name":"云南","value":3462.73},{"name":"西藏","value":248.8},{"name":"陕西","value":3933.72},{"name":"甘肃","value":1933.98},{"name":"青海","value":543.32},{"name":"宁夏","value":612.61},{"name":"新疆","value":2604.19}],"2006":[{"name":"北京","value":8117.78},{"name":"天津","value":4462.74},{"name":"河北","value":11467.6},{"name":"山西","value":4878.61},{"name":"内蒙古","value":4944.25},{"name":"辽宁","value":9304.52},{"name":"吉林","value":4275.12},{"name":"黑龙江","value":6211.8},{"name":"上海","value":10572.24},{"name":"江苏","value":21742.05},{"name":"浙江","value":15718.47},{"name":"安徽","value":6112.5},{"name":"福建","value":7583.85},{"name":"江西","value":4820.53},{"name":"山东","value":21900.19},{"name":"河南","value":12362.79},{"name":"湖北","value":7617.47},{"name":"湖南","value":7688.67},{"name":"广东","value":26587.76},{"name":"广西","value":4746.16},{"name":"海南","value":1065.67},{"name":"重庆","value":3907.23},{"name":"四川","value":8690.24},{"name":"贵州","value":2338.98},{"name":"云南","value":3988.14},{"name":"西藏","value":290.76},{"name":"陕西","value":4743.61},{"name":"甘肃","value":2277.35},{"name":"青海","value":648.5},{"name":"宁夏","value":725.9},{"name":"新疆","value":3045.26}],"2007":[{"name":"北京","value":9846.81},{"name":"天津","value":5252.76},{"name":"河北","value":13607.32},{"name":"山西","value":6024.45},{"name":"内蒙古","value":6423.18},{"name":"辽宁","value":11164.3},{"name":"吉林","value":5284.69},{"name":"黑龙江","value":7104},{"name":"上海","value":12494.01},{"name":"江苏","value":26018.48},{"name":"浙江","value":18753.73},{"name":"安徽","value":7360.92},{"name":"福建","value":9248.53},{"name":"江西","value":5800.25},{"name":"山东","value":25776.91},{"name":"河南","value":15012.46},{"name":"湖北","value":9333.4},{"name":"湖南","value":9439.6},{"name":"广东","value":31777.01},{"name":"广西","value":5823.41},{"name":"海南","value":1254.17},{"name":"重庆","value":4676.13},{"name":"四川","value":10562.39},{"name":"贵州","value":2884.11},{"name":"云南","value":4772.52},{"name":"西藏","value":341.43},{"name":"陕西","value":5757.29},{"name":"甘肃","value":2703.98},{"name":"青海","value":797.35},{"name":"宁夏","value":919.11},{"name":"新疆","value":3523.16}],"2008":[{"name":"北京","value":11115},{"name":"天津","value":6719.01},{"name":"河北","value":16011.97},{"name":"山西","value":7315.4},{"name":"内蒙古","value":8496.2},{"name":"辽宁","value":13668.58},{"name":"吉林","value":6426.1},{"name":"黑龙江","value":8314.37},{"name":"上海","value":14069.87},{"name":"江苏","value":30981.98},{"name":"浙江","value":21462.69},{"name":"安徽","value":8851.66},{"name":"福建","value":10823.01},{"name":"江西","value":6971.05},{"name":"山东","value":30933.28},{"name":"河南","value":18018.53},{"name":"湖北","value":11328.92},{"name":"湖南","value":11555},{"name":"广东","value":36796.71},{"name":"广西","value":7021},{"name":"海南","value":1503.06},{"name":"重庆","value":5793.66},{"name":"四川","value":12601.23},{"name":"贵州","value":3561.56},{"name":"云南","value":5692.12},{"name":"西藏","value":394.85},{"name":"陕西","value":7314.58},{"name":"甘肃","value":3166.82},{"name":"青海","value":1018.62},{"name":"宁夏","value":1203.92},{"name":"新疆","value":4183.21}],"2009":[{"name":"北京","value":12153.03},{"name":"天津","value":7521.85},{"name":"河北","value":17235.48},{"name":"山西","value":7358.31},{"name":"内蒙古","value":9740.25},{"name":"辽宁","value":15212.49},{"name":"吉林","value":7278.75},{"name":"黑龙江","value":8587},{"name":"上海","value":15046.45},{"name":"江苏","value":34457.3},{"name":"浙江","value":22990.35},{"name":"安徽","value":10062.82},{"name":"福建","value":12236.53},{"name":"江西","value":7655.18},{"name":"山东","value":33896.65},{"name":"河南","value":19480.46},{"name":"湖北","value":12961.1},{"name":"湖南","value":13059.69},{"name":"广东","value":39482.56},{"name":"广西","value":7759.16},{"name":"海南","value":1654.21},{"name":"重庆","value":6530.01},{"name":"四川","value":14151.28},{"name":"贵州","value":3912.68},{"name":"云南","value":6169.75},{"name":"西藏","value":441.36},{"name":"陕西","value":8169.8},{"name":"甘肃","value":3387.56},{"name":"青海","value":1081.27},{"name":"宁夏","value":1353.31},{"name":"新疆","value":4277.05}],"2010":[{"name":"北京","value":14113.58},{"name":"天津","value":9224.46},{"name":"河北","value":20394.26},{"name":"山西","value":9200.86},{"name":"内蒙古","value":11672},{"name":"辽宁","value":18457.27},{"name":"吉林","value":8667.58},{"name":"黑龙江","value":10368.6},{"name":"上海","value":17165.98},{"name":"江苏","value":41425.48},{"name":"浙江","value":27722.31},{"name":"安徽","value":12359.33},{"name":"福建","value":14737.12},{"name":"江西","value":9451.26},{"name":"山东","value":39169.92},{"name":"河南","value":23092.36},{"name":"湖北","value":15967.61},{"name":"湖南","value":16037.96},{"name":"广东","value":46013.06},{"name":"广西","value":9569.85},{"name":"海南","value":2064.5},{"name":"重庆","value":7925.58},{"name":"四川","value":17185.48},{"name":"贵州","value":4602.16},{"name":"云南","value":7224.18},{"name":"西藏","value":507.46},{"name":"陕西","value":10123.48},{"name":"甘肃","value":4120.75},{"name":"青海","value":1350.43},{"name":"宁夏","value":1689.65},{"name":"新疆","value":5437.47}],"2011":[{"name":"北京","value":16251.93},{"name":"天津","value":11307.28},{"name":"河北","value":24515.76},{"name":"山西","value":11237.55},{"name":"内蒙古","value":14359.88},{"name":"辽宁","value":22226.7},{"name":"吉林","value":10568.83},{"name":"黑龙江","value":12582},{"name":"上海","value":19195.69},{"name":"江苏","value":49110.27},{"name":"浙江","value":32318.85},{"name":"安徽","value":15300.65},{"name":"福建","value":17560.18},{"name":"江西","value":11702.82},{"name":"山东","value":45361.85},{"name":"河南","value":26931.03},{"name":"湖北","value":19632.26},{"name":"湖南","value":19669.56},{"name":"广东","value":53210.28},{"name":"广西","value":11720.87},{"name":"海南","value":2522.66},{"name":"重庆","value":10011.37},{"name":"四川","value":21026.68},{"name":"贵州","value":5701.84},{"name":"云南","value":8893.12},{"name":"西藏","value":605.83},{"name":"陕西","value":12512.3},{"name":"甘肃","value":5020.37},{"name":"青海","value":1670.44},{"name":"宁夏","value":2102.21},{"name":"新疆","value":6610.05}],};
          var dataMap=resData;
          var tempData=[],xData=[],seriesAry=[];
          for(var dataTime in dataMap){
              var temValue=dataMap[dataTime];
              var temXdata=[];
              temValue.forEach((cur)=> {
                  temXdata.push(cur.name);
              });
              var obj={
                  xAxis: [
                        {
                            'type':'category',
                            'axisLabel':{'interval':0,rotate:45},
                            'data':temXdata,
                            splitLine: {show: false}
                        }
                    ],
                  series: [
                     {data: dataMap[dataTime]},
                  ]
              };
              seriesAry.push(obj);
              tempData.push(dataTime);
          }
          //xData=['李慧敏','邢萌萌'];
          var attributeCount = function(obj) {
              var count = 0;
              for(var i in obj) {
                    if(obj.hasOwnProperty(i)) {  // 建议加上判断,如果没有扩展对象属性可以不加
                        count++;
                    }
               }
            return count;
           }
          var resDataNum=attributeCount(resData);
          //console.log(resDataNum);

          this.chart.setOption({
                baseOption: {
                    timeline: {
                        // y: 0,
                        axisType: 'category',
                        // realtime: false,
                        // loop: false,
                        autoPlay: false,
                        currentIndex: resDataNum-1,
                        playInterval: 2000,
                        // controlStyle: {
                        //     position: 'left'
                        // },
                        data:tempData,
                        label: {
                            formatter : function(s) {
                                return s;
                            },
                            emphasis:{
                                textStyle:{
                                    color:'#6ea1fc'
                                }
                            }
                        },
                        lineStyle:{
                            color:'#6ea1fc',
                            type:'dashed',
                        },
                        itemStyle:{
                            normal: {
                                color: '#6ea1fc',
                                borderColor:'#6ea1fc',
                            },
                            emphasis: {
                                color: '#6ea1fc',
                                borderColor:'#6ea1fc',
                            },
                        },
                        checkpointStyle:{
                            color:'#6ea1fc',
                            borderWidth:0,
                            symbol: 'circle',
                            symbolSize: 8,
                        },
                        controlStyle:{
                            normal: {
                                color: '#6ea1fc',
                                borderColor:'#6ea1fc',
                            },
                            emphasis: {
                                color: '#6ea1fc',
                                borderColor:'#6ea1fc',
                            },
                        },
                    },
                    tooltip: {
                    },
                    color:['#6ea1fc'],
                    calculable : true,
                    grid: {
                        top: 20,
                        bottom: 100,
                        left: '60',
			            right: '60',
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                                label: {
                                    show: true,
                                    formatter: function (params) {
                                        return params.value.replace('\n', '');
                                    }
                                }
                            }
                        }
                    },
                    xAxis: [
                        {
                            'type':'category',
                            'axisLabel':{'interval':0},
                            'data':xData,
                            splitLine: {show: false},
                            axisTick:{
                                show:false
                            },
                            axisLine:{
                                show:false
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#8e8e8e',
                                    width:1,
                                }
                            },
                        }
                    ],
                    series: [
                        {name: '登录次数', type: 'bar',barWidth:40},
                    ]
                },
                options: seriesAry,
          })
      },
      //下拉选择框数据
      getSelectAryData(){
          this.$http.get('/api/loginLog/querySelectList.gm').then(function(res) {
              if(res.data.code==200){
                  this.selectAry=res.data.dataInfo;
              }
          })
      },
      //文本框内容变化  分页部分  数据重新请求  当前页码为1 跳转页码为1   如果value==all  value!=all两种情况
      selectVal(){
          this.gotoPage=this.pageNum=1;
          this.getTabList();
      },
      //得到表格数据
      getTabList(){
          var url='';
          if(this.selected=='all'){
              url='/api/loginLog/queryList.gm?pageNum='+this.pageNum;
          }else{
              url='/api/loginLog/queryList.gm?searchContent='+this.selected+'&pageNum='+this.pageNum;
          }
          this.$http.get(url).then(function(res) {
              if(res.data.code==200){
                  this.pageCount=res.data.dataInfo.pageCount;
                  this.queryList=res.data.dataInfo.dataList;
                  this.gotoPage=this.pageNum;
              }
          })
      },
      //分页点击
      getPageData(e){
          if(e.target.innerHTML=='上一页'){
            if(this.pageNum<=1) return;
            this.pageNum--;
            this.getTabList();/*ajax后台获取要显示数据*/
          }else if(e.target.innerHTML=='下一页'){
            if(this.pageNum>=this.pageCount) return;
            this.pageNum++;
            this.getTabList();/*ajax后台获取要显示数据*/
          }
      },
      //分页跳转
      gotoPageFn(){
        if(isNaN(Number(this.gotoPage))){
            this.gotoPage=this.pageNum;
            return;
        }
        if(this.gotoPage<1||this.gotoPage>this.pageCount||this.gotoPage==this.pageNum){
            this.gotoPage=this.pageNum;
            return;
        }else{
            this.pageNum=this.gotoPage;
            this.getTabList();/*ajax后台获取要显示数据*/
        }
      },
      //失去焦点  如果为非数字  则返回原页码
      getPage(){
          if(typeof this.gotoPage !='number'){
              this.gotoPage=this.pageNum;
          }
      }
  }
}
</script>



