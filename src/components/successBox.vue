<template>
    <div class="success">
        <span>信息</span>
        <p>{{cur}}</p>
    </div>
</template>
<style lang="less" scoped>
    .success{
        position: fixed;
        top: 45px;
        right:26px;
        z-index: 100;
        padding:15px 10px;
        width: 290px;
        height: 72px;
        background: #f2f2f2;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16); 
        box-sizing: border-box;

        span{
            color:#333;
            padding-left: 25px;
            background: url(../assets/images/set.png) left center no-repeat;
        }
        p{
            padding:5px 0 0 25px;
            color: #1078F5;
        }
    }
</style>

<script>
    export default {
        props: {
            cur: {   // 可选字段，有默认值
                default: '保存成功！'
            }
        }
    }
</script>

