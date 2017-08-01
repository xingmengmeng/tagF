<template>
    <section class="ideaWrap">
        <h4>意见反馈</h4>
        <div class="ideaList clearfix">
            <div class="scrollWrapDiv">
                <ul v-for="(item,index) in resData" :key="index">
                    <li>
                        <span class="time">{{item.createTime}}</span>
                        <span>{{item.loginName}}</span>
                    </li>
                    <li class="con">
                        {{item.content}}
                    </li>
                </ul>
                <!--<div v-if="pageCount>pageNum" class="showMoreClass"><i></i>加载更多...</div>-->
                <div v-if="pageCount>pageNum" class="showMoreClass"><i></i>加载更多...</div>
            </div>  
        </div>
    </section>
</template>
<style scoped lang="less">
    .ideaWrap{
        height: 100%;
        overflow: hidden;
        h4{
            width: 100%;
            padding: 10px 20px;
            margin-bottom: 15px;
            width: 100%;
            font-weight: normal;
            font-size:16px; 
            border-bottom: 2px solid #1078F5;
            box-sizing: border-box;
        }
        .ideaList{
            position: relative;
            padding:0 20px;
            box-sizing: border-box;
            overflow: hidden;

            ul{
                padding:10px 0;
                width: 100%;
                border-bottom: 1px #666 dashed;
                .time{
                    margin-right:30px;
                }
                .con{
                    padding-top:10px;
                    font-size: 12px;
                }
            }
        }
        .showMoreClass{
            display: inline-block;
            margin:20px auto 0 auto;
            border:0;
            width: 100%;
            background: none;
            text-align: center;
            cursor: pointer;
            i{
                margin-right: 10px;
                display: inline-block;
                width: 16px;
                height: 16px;
                background: url(../../assets/images/loadMore.gif) no-repeat;
                vertical-align: middle;
            }
        }
    }  
</style>
<script>
const IScroll = require('iscroll');
export default {
    data(){
        return{
            resData:[],
            ideaScroll:null,
            pageNum:1,
            pageCount:1,
            minY:0,
        }
    },
    mounted(){
        this.$nextTick(function(){
            this.setHeight();
        }) 
        this.getData();
    },
    methods:{
        setHeight(){
            let mainWrap=document.getElementById('mainWrap').style.height.split('p')[0],
                ideaList=document.querySelectorAll('.ideaList')[0];
            ideaList.style.height=mainWrap-43-15-10+'px';
        },
        getData(){
            this.$http.get('/api/feedback/queryList.gm?pageNum='+this.pageNum).then(function(res){
                if(res.data.code==200){
                    if(this.pageNum==1){
                        this.resData=res.data.dataInfo.dataList;
                    }else{
                        this.resData=[...this.resData,...res.data.dataInfo.dataList].concat();//es6合并两个数组
                    }
                    this.pageCount=res.data.dataInfo.pageCount;
                    this.$nextTick(function(){
                        if(!this.ideaScroll){
                            this.ideaScroll=new IScroll('.ideaList',{
                                mouseWheel: true,
                                scrollbars: true,
                                checkDOMChanges:true,
                                bounce: false,
                                interactiveScrollbars:true
                            });
                        }else{
                            this.ideaScroll.refresh();
                        }
                        //判断滑动到底部
                        var _this=this;
                        this.ideaScroll.on('scrollStart',function(){
                            _this.minY=this.y;
                        })
                        this.ideaScroll.on('scroll', function() {
                            _this.minY = _this.minY<this.y ? _this.minY : this.y;
                        });
                        this.ideaScroll.on('scrollEnd', function() {
                            _this.minY = _this.minY<this.y ? _this.minY : this.y;
                            if (this.y-_this.minY>=0 && (this.directionY===1)) {
                                //console.log('到底部了')
                                _this.showMore();
                            }
                        });
                    })
                }
            })   
        },
        showMore(){
            this.pageNum++;
            this.getData();
        }
    }
}
</script>


