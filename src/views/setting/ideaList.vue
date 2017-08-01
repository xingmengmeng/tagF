<template>
    <section class="ideaWrap">
        <h4>意见反馈</h4>
        <div class="ideaList clearfix">
            <div>
                <ul v-for="(item,index) in resData" :key="index">
                    <li>
                        <span class="time">{{item.createTime}}</span>
                        <span>{{item.loginName}}</span>
                    </li>
                    <li class="con">
                        {{item.content}}
                    </li>
                </ul>
                <input type="button" value="加载更多..." @click="showMore" v-if="pageCount>pageNum" class="showMoreClass">
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
            display: block;
            margin:20px auto 0 auto;
            border:0;
            width: 100px;
            background: none;
            text-align: center;
            cursor: pointer;
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
                    console.log(this.pageNum);
                    if(this.pageNum==1){
                        this.resData=res.data.dataInfo.dataList;
                    }else{
                        this.resData=[...this.resData,...res.data.dataInfo.dataList].concat();//es6合并两个数组
                        console.log(this.resData.length);
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


