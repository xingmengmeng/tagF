<template>
    <div>
        <transition name="fade">
            <div class="searchBody" v-show="serchAlready==0">
                <div class="searchWrap">
                    <p class="ptitle">客户查询入口</p>
                    <p>
                        <img src="../../assets/images/vbg.png">
                    </p>
                    <div class="searchWrap2">
                        <input type="text" class="txt" v-model="shContent" placeholder="输入手机号/身份证号" @keyup.enter="searchFun(shContent)">
                        <button class="searchBtn" @click="searchFun(shContent)"></button>
                    </div>
                    <span class="errorF">{{error}}</span>
                </div>
            </div>
        </transition>
        <!--搜索出的内容 start-->
        <div class="clearfix resDiv" v-show="serchAlready==1">
            <div class="clearfix">
                <span class="left cusSpan">客户查询</span>
                <div class="left searchWrap2 input2">
                    <input type="text" class="txt" v-model="shContent" placeholder="输入手机号/身份证号" @keyup.enter="searchFun(shContent)">
                    <button class="searchBtn" @click="searchFun(shContent)"></button>
                </div>
            </div>
            
            <div class="clearfix getIdWrap">
                <span>ID：{{resId}}</span>
            </div>
            <div class="resWrap clearfix">
                <!--人口统计/地理位置 美易理财  美易分  美借-->
                <div class="everyTagWrap clearfix" v-for="(item,index) in resData">
                    <h5><span>{{item.name}}</span></h5>
                    <div class="countWrap">
                        <span>{{item.count}}/{{item.total}}</span>
                        <div class="lineWrap">
                            <div :style="'width:'+item.count/(item.count+item.total)*100+'%'"></div><!--上方占比条-->
                        </div>
                    </div>
                    <div class="ulWrapScroll" :class="'scrollDiv'+index">
                        <ul>
                            <li v-for="curTag in item.list">{{curTag}}</li>
                        </ul> 
                    </div>
                </div>
                <!--国美保险-->
                <div class="everyTagWrap clearfix">
                    <h5><span>国美保险</span></h5>
                    <div class="countWrap">
                        <span>0/0</span>
                        <div class="lineWrap">
                            <div style="width:0%'"></div><!--上方占比条-->
                        </div>
                    </div>
                    <ul>
                        <!--<li>数据1</li>
                        <li>数据1</li>
                        <li>数据1</li>
                        <li>数据1</li>
                        <li>数据1</li>-->
                    </ul>
                </div>
            </div>
        </div>
        <!--搜索出的内容 end-->
    </div>
    
</template>
<style scoped lang="less">
    .fade-enter-active, .fade-leave-active {
        transition: all .5s;
    }
    .fade-enter, .fade-leave-active {
        transform: translateY(-230px);
    }
    .searchBody{
        width: 100%;
        margin:0 auto;
        background: #fff;
    }
    .searchWrap{
        width: 600px;
        margin:0 auto;
        padding-top: 92px;
        p{
            text-align: center;
            &.ptitle{
                padding-bottom: 10px;
            }
            img{
                float: left;
                margin-left: 10px;
            }
        }
        
        .errorF{
            float:left;
            margin-top:8px;
            font-size: 12px;
            color: rgb(180, 6, 6);
        }
    }
    .searchWrap2{
        width: 100%;
        input{
            float: left;
            padding: 0 59px 0 25px;
            width: 100%;
            height: 40px;
            border: 1px solid #B1D2F7;
            border-radius: 26px;
            box-sizing: border-box;
            color:#444;
        }
        .searchBtn{
            float: left;
            margin-left: -34px;
            width: 18px;
            height: 40px;
            line-height: 40px;
            background: url(../../assets/images/page_1.png) center no-repeat;
            border: 0;
            cursor: pointer;
        }
        &.input2{
            width: 430px;
            input{
                height: 30px;
            }
            .searchBtn{
                height: 30px;
                line-height: 30px;
            }
        }
    }

    .resDiv{
        padding: 15px 10px;
        .cusSpan{
            height: 30px;
            line-height: 30px;
            margin:0 10px 15px 0;
        }
        .getIdWrap{
            clear: both;
            width: 100%;
            height: 54px;
            line-height: 54px;
            border-top: 1px solid #F1F4FA;
        }
        .resWrap{
            width: 100%;
            display: flex;
            border: 1px solid #BED4FF;
            border-right:0;
            border-radius: 2px;
            .everyTagWrap{
                flex: 1;
                border-right: 1px solid #BED4FF;
                box-sizing: border-box;

                .ulWrapScroll{
                    position: relative;
                    overflow:hidden;
                }
                ul{
                    padding: 0 10px;
                    li{
                        height: 35px;
                        line-height: 35px;
                        border-bottom:1px solid #F1F4FA;
                        font-size:13px;
                    }
                }
                h5{
                    padding:15px 0 0 0;
                    text-align: center;
                    span{
                        display: inline-block;
                        height: 34px;
                        line-height: 34px;
                        font-size: 12px;
                        padding-left: 40px;
                        background: url('../../assets/images/tag1.png') left center no-repeat;
                    }  
                }
                .countWrap{
                    text-align: center;
                    span{
                        font-size: 10px;
                    }
                    .lineWrap{
                        margin-top:3px;
                        width: 100%;
                        height: 3px;
                        background: #F0F0F0;
                        div{
                            background: -webkit-linear-gradient( left,#4babf7,#70f2f7);
                            height: 3px;
                        }

                    }
                }
                &:nth-of-type(2){
                    h5{
                        span{
                            background: url('../../assets/images/tag4.png') left center no-repeat;
                        }
                    }
                    .countWrap{
                        .lineWrap{
                            div{
                                background: -webkit-linear-gradient( left,#4babf7,#70f2f7);
                            }
                        }
                    } 
                }
                &:nth-of-type(3){
                    h5{
                        span{
                            background: url('../../assets/images/tag2.png') left center no-repeat;
                        }
                    }
                    .countWrap{
                        .lineWrap{
                            div{
                                background: -webkit-linear-gradient( left,#ea5624,#f2931b);
                            }
                        }
                    }
                }
                &:nth-of-type(4){
                    h5{
                        span{
                            background: url('../../assets/images/tag3.png') left center no-repeat;
                        }
                    }
                    .countWrap{
                        .lineWrap{
                            div{
                                background: -webkit-linear-gradient( left,#ea5624,#f99f1e);
                            }
                        }
                    }
                }
                &:nth-of-type(5){
                    h5{
                        span{
                            background: url('../../assets/images/tag5.png') left center no-repeat;
                        }
                    }
                    .countWrap{
                        .lineWrap{
                            div{
                                background: -webkit-linear-gradient( left,#02ada2,#70f2f7);
                            }
                        }
                    }
                }
                
            }
        }
    }
</style>
<script type="text/ecmascript-6">
    const IScroll = require('iscroll');
    export default {
        data(){
            return{
                error:'',
                shContent:'',
                serchAlready:0,
                resId:'111111',
                resData:[],
                tagAry:[{tagScroll0:null},{tagScroll1:null},{tagScroll2:null},{tagScroll3:null},{tagScroll4:null}],
            }
        },
        mounted(){
            this.setHeight();
        },
        methods:{
            setHeight(){
                var winHeight=document.documentElement.clientHeight;
                var searchBody=document.querySelector('.searchBody');
                searchBody.style.height=winHeight-50+'px';
            },
            searchFun(){
                //window.location.href='/#/microView/micDetail';
                this.$http.get('/api/microPortrait/getMicroPortrait.gm?searchContent='+this.shContent).then(function (res) {
                    if(res.data.code==200){
                        this.serchAlready=1;
                        this.resId=res.data.dataInfo.passportId;
                        this.resData=res.data.dataInfo.detail;
                        this.$nextTick(function(){
                            /*设置每块滚动条高度*/
                            var ulWrapScrollAry=document.querySelectorAll('.ulWrapScroll');
                            var winHeight=document.documentElement.clientHeight;
                            for(var i=0;i<ulWrapScrollAry.length;i++){
                                ulWrapScrollAry[i].style.height=winHeight-255+'px';
                            }
                            /*加滚动条*/
                            for(var i=0;i<4;i++){
                                this.tagAry[i]=new IScroll('.scrollDiv'+i,{
                                    mouseWheel: true,
                                    scrollbars: true,
                                    checkDOMChanges:true,
                                    bounce: false,
                                    interactiveScrollbars:true
                                })
                            }
                        })
                    }
                });
            }
        }
    }
</script>

