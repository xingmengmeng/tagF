<template>
    <section class="container" id="mainWrap" style="height:100%">
        <!--left side start-->
        <!--<section class="leftSide">
            <ul id="leftMenu">
                <li>
                    <router-link to="/tagView">标签画像</router-link>
                </li>
                <li>
                    <router-link to="/tagView/tagSet">标签设置</router-link>
                </li>
            </ul>
            <div class="show-hide" id="show-hide" @click="changeHeight">
                显示隐藏按钮
            </div>
        </section>-->
        <!--left side end-->
        <!--右侧大块 start-->
        <section style="height:100%">
            <div style="height:100%">
                <!--左侧 start-->
                <div class="tagLeft clearfix">
                    <div class="selectWrapFir clearfix">
                        <h4>
                            筛选标签选择 
                            <span>(最多限制勾选4项)</span> 
                            <span class="right setSpan" @click="showSetFn">配置</span>
                        </h4>
                        
                        <div class="scrollWrap">
                            <div class="scrollDiv tagSelect clearfix">
                                <div>
                                    <!--每条信息-->
                                    <div class="everyDiv clearfix" v-for="(item,index) in filterItem" v-cloak>
                                        <div class="checkTit">{{index}}：</div>
                                        <ul class="fourWrap clearfix">
                                            <li class="clearfix" v-for="everyTag in item">
                                                <input type="checkbox" :value="everyTag.id" class="checks" v-model="checkedNames" @click="getSendData(everyTag)">
                                                <i :class="checkedNames.indexOf(everyTag.id)!=-1?'classA':'classB'"></i>
                                                <label class="checkLabel">{{everyTag.name}}</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="selectWrapSec next clearfix">
                        <h4>输出标签选择 <span>(最多限制勾选10项)</span></h4>
                        <div class="scrollWrap">
                            <div class="scrollDiv tagPull clearfix">
                                <div>
                                    <!--每条信息-->
                                    <div class="everyDiv clearfix" v-for="(item,index) in outputItem">
                                        <div class="checkTit">{{index}}：</div>
                                        <ul class="fourWrap clearfix">
                                            <li class="clearfix" v-for="everyTag in item">
                                                <input type="checkbox" :value="everyTag.id" class="checks" v-model="outChecks" @click="getSendData(everyTag)">
                                                <i :class="outChecks.indexOf(everyTag.id)!=-1?'classA':'classB'"></i>
                                                <label class="checkLabel">{{everyTag.name}}</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--左侧 end-->

                <!--右侧表格 start-->
                <div class="tagRight">
                    <div class="tagRightTop">
                        <h5 class="leftH5">画像输出标签项</h5>
                        <div class="tagTabelWrap">
                            <h5>筛选标签项</h5>
                            <!--表格 start-->
                            <div class="tabDiv" v-if="showTab==1">
                                <table class="indexTab" width="100%">
                                    <thead>
                                    <tr>
                                        <th width="24%" class="lsTh">
                                            &nbsp;
                                        </th>
                                        <th v-for="index in temTH" width="19%">{{index}}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="curTr in temTD1">
                                        <td>{{curTr}}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tabDiv" v-if="showTab==2">
                                <table class="indexTab" width="100%">
                                    <thead>
                                    <tr>
                                        <th width="24%" class="lsTh">
                                            &nbsp;
                                        </th>
                                        <th v-for="index in tabHead" width="19%">{{index}}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="curTr in comparedData">
                                        <td>{{curTr.name}}</td>
                                        <td v-for="index in tabHead">{{curTr[index]}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!--表格 end-->
                        </div>
                    </div>
                    <div class="tagbtnWrap clearfix">
                        <input type="button" value="清空" @click="clearAry" class="left comBtnUnabel">
                        <span class="right" @click="saveToIndex">保存至首页</span>
                        <input type="button" value="计算" @click="computedFn" class="right" :class="btnShow==1?'comBtn':'comBtnUnabel'" id="comBtn">
                    </div>
                </div>
                <!--右侧表格 end-->
            </div>
        </section>
        <!--右侧大块 end-->
        <!--<my-foot></my-foot>-->

        <over-box v-show="noSelectP==1" @hideOverFn="hideMarkWrap" :mark-con="pushMsg"></over-box>
        <set-tag v-show="showSet" @hideOverFn="hideMarkWrap" ref="setTag"></set-tag>
        <transition name="slide-fade">
            <success-box v-show="showSuccess"></success-box>
        </transition>
    </section>
</template>
<style scoped lang="less">
    .slide-fade-enter-active {
        transition: all .2s ease;
    }
    .slide-fade-leave-active {
        transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to{
        transform: translateX(100px);
        opacity: 0;
    }
    .appList{
        height: 100%;
    }
    .tagLeft{
        float:left;
        width: 50%;
        height:100%;
        .selectWrapFir{
            width: 100%;
            height:55%;
        }
        .selectWrapSec{
            .selectWrapFir;
            height:45%;
        }
        .scrollWrap{
            padding:60px 20px 0 0;
            height:100%;
            box-sizing:border-box;
        }
        h4{
            float: left;
            padding-left: 20px;
            width: 100%;
            height: 50px;
            line-height: 50px;
            border-bottom: 2px solid #1078F5;
            box-sizing: border-box;
            font-size:16px;
            span{
                font-size: 14px;
                font-weight: normal;
            }
            .setSpan{
                cursor: pointer;
            }
        }
        .scrollDiv{
            float:left;
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            .checkTit{
                float:left;
                padding-left: 5px;
                width:150px;
                min-height: 37px;
                line-height: 37px;
                box-sizing: border-box;
                text-align: right;
            }
            .fourWrap{
                padding-left: 160px;
                width:100%;
                box-sizing: border-box;
                li{
                    float:left;
                    position: relative;
                    width: 50%;
                    min-height: 37px;
                    line-height: 37px;
                    /*模拟的select*/
                    .classA{
                        float: left;
                        margin-top: 10px;
                        width: 20px;
                        height: 17px;
                        background: url(../../assets/images/select_yes.png) no-repeat;
                    }
                    .classB{
                        .classA;
                        background: url(../../assets/images/select_no.png) no-repeat;
                    }
                    /*真实的select*/
                    .checks{
                        float: left;
                        position: absolute;
                        left:0;
                        top:0;
                        margin-top: 13px;
                        opacity: 0;
                        width: 100%;
                    }
                    .checkLabel{
                        display: block;
                        padding-left: 25px;
                        text-align: left;
                    }
                    span{
                        float: left;
                        font-size: 12px;
                    }
                }
            }
        }
    }
    .tagRight{
        float: right;
        padding:10px 0 0 10px;
        width: 50%;
        height: 100%;
        box-sizing:border-box;
        .tagRightTop{
            .leftH5{
                float: left;
                padding:50px 5px 0 0;
                width: 14px;
            }
            .tagTabelWrap{
                padding-left:20px;
                width: 100%;
                box-sizing: border-box;
                h5{
                    width: 100%;
                    height:30px;
                    line-height:30px;
                    text-align: center;
                }
                .tagTable{
                    width: 100%;
                    background: lightblue;
                    box-sizing: border-box;
                }
            }
        }

    }
    .comBtn{
        width: 112px;
        height: 30px;
        border-radius: 3px;
        color: #fff;
        border: 0;
        cursor: pointer;
        background: #1078F5;
    }
    .comBtnUnabel{
        .comBtn;
        color: #333;
        cursor: default;
        background: #ddd;
    }
    .tabDiv{
        width: 100%;
        padding-right: 3px;
        box-sizing: border-box;
    }
    @media screen and (max-width: 1400px){
        .tabDiv{
            max-height: 392px;
            overflow-y: scroll;
        }
    }
    .indexTab{
        border: 1px solid #D0E6FF;
        tr th{
            height: 30px;
            padding: 5px 10px;
            line-height: 120%;
            background: #d0e6ff;
            font-size: 14px;
            font-weight:normal;
            text-align:center;
            border-left: 1px solid #eee;
        }
        tbody tr{
            padding: 5px 10px;
            line-height: 120%;
            text-align:center;
            background:#fff;
        }
        tbody tr:nth-of-type(2n){
            background:#F7FAFE;
        }
        tbody tr td{
            height: 25px;
            padding: 5px 10px;
            line-height: 120%;
            border-left: 1px solid #D0E6FF;
        }
    }
    .tagbtnWrap{
        width: 310px;
        margin: 5px auto 0 auto;
        span{
            margin-left: 10px;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            cursor: pointer;
        }
    }

</style>
<script type='text/ecmascript-6'>
    const IScroll = require('iscroll');
    require('../../assets/css/userGroup.less');
    import LayOut from '../../assets/js/layout';
    import Footer from '../../components/footer.vue';
    import overBox from '../../components/overBoxOneLine.vue';
    import setTag from '../../components/setTag.vue';
    import successBox from '../../components/successBox.vue';

    export default{
        data(){
            return{
                tagTopScroll:null,
                tagBottomScroll:null,
                tagRightScroll:null,
                tagResData:[],
                filterItem:[],//筛选标签选择
                outputItem:[],//输出标签选择
                checkedNames:[],//选中的筛选标签 id数组
                outChecks:[],//输出标签选择 id数组
                btnShow:0,//计算按钮可不可以点击状态
                tabHead:[],//表头数据
                tabData:[],//表格列表信息
                comparedData:[],//计算出的表信息

                temTD1:[],
                temTH:[],

                showTab:1,/*显示哪个表*/
                noSelectP:0,//alert弹框遮罩
                pushMsg:'',//alert中的错误提示信息

                showSet:false,//是否显示标签配置弹框
                showSuccess:false,//保存成功
            }
        },
        components:{
            'my-foot':Footer,
            'over-box':overBox,
            'set-tag':setTag,
            'success-box':successBox,
        },
        mounted(){
            this.getData();
            this.comTem();
            LayOut.setHeight.init();
            this.$nextTick(function(){
                var aDiv=Array.from(document.querySelectorAll('.tabDiv'));
                aDiv.forEach(item=>{
                    item.addEventListener('scroll', function(e) {
                        this.querySelector('thead').style.transform = 'translate(0, '+this.scrollTop+'px)';
                    });
                })
            })
        },
        updated(){
            LayOut.setHeight.init();
        },
        methods:{
            //得到可选标签
            getData(){
                this.$http.get('/api/tagPortrait/queryList.gm').then(function (res) {
                    if(res.data.code==200){
                        this.tagResData=res.data.dataInfo;
                        this.filterItem=this.tagResData.filterItem;
                        this.outputItem=this.tagResData.outputItem;
                        //this.checkedNames=this.tagResData.filterSelected;//得到初始选中数组
                        //this.outChecks=this.tagResData.outputSelected;//得到初始选中数组
                        //this.getTemTabel();
                        this.$nextTick(function(){
                            if(this.$store.state.tagTopScroll==null){
                                this.$store.state.tagTopScroll=new IScroll('.tagSelect',{
                                    mouseWheel: true,
                                    scrollbars: true,
                                    checkDOMChanges:true,
                                    bounce: false,
                                    interactiveScrollbars:true
                                });
                            }else{
                                this.$store.state.tagTopScroll.refresh();
                            }
                            
                            if(this.$store.state.tagBottomScroll==null){
                                this.$store.state.tagBottomScroll=new IScroll('.tagPull',{
                                    mouseWheel: true,
                                    scrollbars: true,
                                    checkDOMChanges:true,
                                    bounce: false,
                                    interactiveScrollbars:true
                                });
                            }else{
                                this.$store.state.tagBottomScroll.refresh();
                            }
                            
                        })
                    }
                })
            },
            //得到临时表
            getTemTabel(){
                /*清空‘’*/
                this.temTH=this.temTH.filter( (item)=> {
                    return item!='';
                });
                this.temTD1=this.temTD1.filter( (item)=> {
                    return item!='';
                })
                Object.keys(this.filterItem).forEach((key)=>{
                    var temAry=this.filterItem[key];
                    temAry.forEach(item=>{
                        if(this.checkedNames.indexOf(item.id)!=-1){
                            this.temTH.push(item.name);
                        }
                    })
                });
                Object.keys(this.outputItem).forEach((key)=>{
                    var temAry=this.outputItem[key];
                    temAry.forEach(item=>{
                        if(this.outChecks.indexOf(item.id)!=-1){
                            this.temTD1.push(item.name);
                        }
                    })
                });
                /*补齐数组*/
                while (this.temTH.length<4){
                    this.temTH.push('');
                }
                while (this.temTD1.length<10){
                    this.temTD1.push('');
                }
            },
            getSendData(curTag){
                this.showTab=1;//显示临时表格
                /**
                 * 根据临时数组渲染临时表格
                 * 1.清空临时数组后面的''项
                 * 2.根据选项id数组得到存储的name数组
                 * 3.根据限制长度补全''项
                 * 4.完成渲染
                 * /
                /*超出最大限制控制*/
                if(this.checkedNames.length>4){
                    this.pushMsg='筛选标签选择最多限制勾选4项'
                    this.noSelectP=1;
                    this.checkedNames.pop();
                }
                if(this.outChecks.length>10){
                    this.pushMsg='输出标签选择最多限制勾选10项'
                    this.noSelectP=1;
                    this.outChecks.pop();
                }
                /*计算按钮样式控制*/
                if(this.checkedNames.length==0||this.checkedNames.length>4||this.outChecks.length==0||this.outChecks.length>10){
                    this.btnShow=0;
                }else{
                    this.btnShow=1;
                }
                /*清空‘’*/
                this.temTH=this.temTH.filter( (item)=> {
                    return item!='';
                });
                this.temTD1=this.temTD1.filter( (item)=> {
                    return item!='';
                })
                /*点击计算标签名数组*/
                if(this.checkedNames.indexOf(curTag.id)!=-1){
                    this.temTH.push(curTag.name);
                }else{
                    this.temTH=this.temTH.filter( (item)=> {
                        return item!=curTag.name;
                    })
                }
                if(this.outChecks.indexOf(curTag.id)!=-1){
                    this.temTD1.push(curTag.name);
                }else{
                    this.temTD1=this.temTD1.filter( (item)=> {
                        return item!=curTag.name;
                    })
                }
                /*补齐数组*/
                while (this.temTH.length<4){
                    this.temTH.push('');
                }
                while (this.temTD1.length<10){
                    this.temTD1.push('');
                }
                //this.temTH=this.temfilCheckName;
            },
            computedFn(){
                if(this.btnShow==0){
                    return;
                }
                this.$http.get('/api/tagPortrait/getChart.gm?filterItem='+this.checkedNames+'&outputItem='+this.outChecks).then(function (res) {
                    if(res.data.code==200){
                        this.tabData=res.data.dataInfo.data;
                        this.tabHead=res.data.dataInfo.head;
                        this.comFn();
                        this.showTab=2;
                    }
                })
            },
            comTem(){
                this.temTD1.length=this.temTH.length=0;
                for(var i=0;i<10;i++){
                    this.temTD1.push('');
                }
                for(var i=0;i<4;i++){
                    this.temTH.push('');
                }
            },
            comFn(){
                var ary=[];

                for(var key in this.tabData){
                    var cur=this.tabData[key];
                    for(var curKey in cur){
                        var cun=false;
                        var c;
                        for(var i=0;i<ary.length;i++){
                            if(ary[i]['name']==curKey){//已存在
                                cun=true;
                                c=ary[i];
                            }
                        }
                        if(cun){//存在
                            c[key]=cur[curKey];
                        }else {//不存在
                            var obj={};
                            obj.name=curKey;
                            obj[key]=cur[curKey];
                            ary.push(obj);
                        }
                    }

                }
                this.comparedData=ary;
            },
            clearAry(){
                this.showTab=1;
                this.btnShow=0;
                this.comTem();
                this.checkedNames.length=this.outChecks.length=this.tabHead.length=this.tabData.length=0;
            },
            hideMarkWrap(cur){
                this.noSelectP=0;
                this.showSet=false;
                if(cur){//保存标签设置后重新请求标签选项  再次渲染页面
                    this.getData();
                    this.clearAry();
                }
            },
            /*保存至首页*/
            saveToIndex(){
                console.dir(this.checkedNames);
                this.$http.post('/api/tagPortrait/save.gm',{"filterItem":this.checkedNames.join(','),"outputItem":this.outChecks.join(',')},{emulateJSON:true}).then(function(res){
                    if(res.data.code==200&&res.data.status=='ok'){
                        this.showSuccess=true;
                        setTimeout(()=>{
                            this.showSuccess=false;
                        },2000);
                    }
                })
            },
            //点击配置  执行
            showSetFn(){
                this.showSet=true;
                this.$refs.setTag.$emit('showSetWrap');
            }
        }
    }
</script>

