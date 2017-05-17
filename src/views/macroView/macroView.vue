<template>
    <div>
        <div class="macroHeader">
            <router-link to="groupPic"><span>人群画像</span></router-link>
            <router-link to="trend"><span class="span2">趋势研究</span></router-link>
            <router-link to="needs"><span class="span3">需求洞察</span></router-link>
            <router-link to="customer"><span class="span4">客户关系</span></router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<style scoped lang="less">
    .macroHeader{
        padding:0 10px;
        width: 100%;
        height: 60px;
        background: #1864D3;
        box-sizing:border-box;
        display: flex;
        a{
            flex: 1;
            padding-left: 30px;
            height:60px;
            line-height: 60px;
            text-align: center;
            color:#fff;
            font-size:15px;

            &.active{
                background: #1555B5;
            }
            &:hover{
                background: #3E84ED;
            }
            span{
                display: inline-block;
                padding-left:35px;
            }
            span:nth-child(1){
                background: url("../../assets/images/vicon_4.png") left center no-repeat;
            }
            span.span2{
                background: url("../../assets/images/vicon_3.png") left center no-repeat;
            }
            span.span3{
                background: url("../../assets/images/vicon_1.png") left center no-repeat;
            }
            span.span4{
                background: url("../../assets/images/vicon_2.png") left center no-repeat;
            }
        }
    }
</style>


