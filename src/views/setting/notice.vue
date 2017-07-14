<template>
    <div>
        <h4>公告</h4>
        <textarea placeholder="在这里输入系统公告"></textarea>
        <input type="button" value="保存" class="keep" />
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
    textarea{
        width: 90%;
        height: 100px;
        margin:20px 5% 20px 5%;
        padding: 10px;
        box-shadow:3px 2px 3px #cccccc ;
        color:#cccccc ;
        font-size:13px;
        box-sizing: border-box;
    }
    .keep{
        position: relative;
        width: 112px;
        height: 30px;
        border-radius: 3px;
        color: #fff;
        border: 0;
        cursor: pointer;
        background: #1078F5;
        float: right;
        font-size: 13px;
        margin-right: 5%;

    }
</style>