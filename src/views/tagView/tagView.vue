<template>
    <section class="container" id="mainWrap">
        <!--left side start-->
        <section class="leftSide">
            <ul id="leftMenu">
                <!--<li>
                    <router-link to="/tagGroup">标签体系</router-link>
                </li>-->
                <li>
                    <router-link to="/tagView">标签画像</router-link>
                </li>
            </ul>
            <div class="show-hide" id="show-hide">
                显示隐藏按钮
            </div>
        </section>
        <!--left side end-->
        <!--右侧大块 start-->
        <section class="rightSide clearfix">
            <div class="app appList clearfix">
                <!--左侧 start-->
                <div class="tagLeft clearfix">
                    <div class="selectWrapFir clearfix">
                        <h4>筛选标签选择 <span>(最多限制勾选10项)</span></h4>
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
                <!--右侧表格 end-->
            </div>
        </section>
        <!--右侧大块 end-->
        <my-foot></my-foot>
    </section>
</template>
<style scoped lang="less">
    .appList{
        height: 100%;
    }
    .tagLeft{
        float:left;
        width: 55%;
        height:100%;
    }

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

</style>
<script type='text/ecmascript-6'>
    const IScroll = require('iscroll');
    require('../../assets/css/userGroup.less');
    import LayOut from '../../assets/js/layout';
    import Footer from '../../components/footer.vue';
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
            }
        },
        components:{
            'my-foot':Footer,
        },
        mounted(){
            LayOut.setHeight.init();
            this.getData();
        },
        methods:{
            //得到可选标签
            getData(){
                this.$http.get('/api/tagPortrait/queryList.gm').then(function (res) {
                    if(res.data.code==200){
                        this.tagResData=res.data.dataInfo;
                        this.filterItem=this.tagResData.filterItem;
                        this.outputItem=this.tagResData.outputItem;
                        this.$nextTick(function(){
                            this.tagTopScroll=new IScroll('.tagSelect',{
                                mouseWheel: true,
                                scrollbars: true,
                                checkDOMChanges:true,
                                bounce: false,
                                interactiveScrollbars:true
                            });

                            this.tagBottomScroll=new IScroll('.tagPull',{
                                mouseWheel: true,
                                scrollbars: true,
                                checkDOMChanges:true,
                                bounce: false,
                                interactiveScrollbars:true
                            });
                        })
                    }
                })
            },
            getSendData(){
                console.log(this.checkedNames,this.outChecks);
            },
        }
    }
</script>

