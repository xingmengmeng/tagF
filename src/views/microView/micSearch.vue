<template>
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
</template>
<style scoped lang="less">
    .fade-enter-active, .fade-leave-active {
        transition: all .5s;
    }
    .fade-enter, .fade-leave-active {
        transform: translateY(-50px);
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
        }
        .errorF{
            float:left;
            margin-top:8px;
            font-size: 12px;
            color: rgb(180, 6, 6);
        }
    }
</style>
<script type="text/ecmascript-6">
    export default {
        data(){
            return{
                error:'查询结果没空！',
                shContent:'',
                serchAlready:0,
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
                    }
                });
            }
        }
    }
</script>

