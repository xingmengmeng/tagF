<template>
    <div>
        <div class="macroHeader">
            <router-link to="groupPic">人群画像</router-link>
            <router-link to="trend">趋势研究</router-link>
            <router-link to="needs">需求洞察</router-link>
            <router-link to="customer">客户关系</router-link>
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
        }
    }
</style>


