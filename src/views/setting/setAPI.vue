<template>
    <section>
        <div class="listWrap apiEveryDiv" @click="showAdd">
            +添加对接业务
        </div>
        <div class="listWrap apiListDiv">
            <ul @click="goDetail">
                <li>国美app首页模块个性化服务</li>
                <li>对接系统：金控cms后台系统</li>
                <li>服务编号：001</li>
                <li>创建时间：2017-07-31 19:32</li>
            </ul>
            <div class="tools">
                <a>编辑</a>
                <a>删除</a>
            </div>
        </div>
        <!--弹框遮罩 start-->
        <div class="overlay"></div>
        <div class="markWarp addMess">
            <div class="markTitle clearfix">
                <h5>添加对接系统</h5>
                <i class="right close" @click="hideMark">关闭</i>
            </div>
            <ul class="clearfix">
                <li class="clearfix">
                    <label class="left"><strong>*</strong>对接系统：</label>
                    <select>
                        <option>金控cms后台系统</option>
                    </select>
                </li>
                <li class="clearfix">
                    <label class="left"><strong>*</strong>业务名称：</label>
                    <input type="text" v-model="businessName" placeholder="最多可输入20个字符" class="left txt">
                </li>
                <li class="errorLi clearfix" style="padding:0px 0 0 95px;height: 14px; font-size: 12px; color: #B40606;">
                    <span v-cloak>{{saveError}}</span>
                </li>
                <li class="btnWrap" style="margin-top: 10px">
                    <input type="button" value="取消" @click="hideMark">
                    <input type="button" value="提交" @click="addFn">
                </li>
            </ul>
        </div>
        <!--删除弹框-->
        <div class="markDelet">
            <p>您确定要删除这个版本记录吗？</p>
            <div class="btnWrap">
                <input type="button" value="否" @click="deletFalse">
                <input type="button" value="是" @click="deleteTrue">
            </div>
        </div>
        <!--弹框遮罩 end-->
    </section>
</template>
<script>
    export default {
        data(){
            return{
                businessName:'',
                saveError:'',
            }
        },
        methods:{
            showAdd(){
                var overlay=document.querySelector('.overlay'),
                        markWarp=document.querySelector('.markWarp');
                overlay.style.display=markWarp.style.display='block';
            },
            hideMark(){
                var overlay=document.querySelector('.overlay'),
                        markWarp=document.querySelector('.markWarp');
                overlay.style.display=markWarp.style.display='none';
            },
            addFn(){

            },
            deletFalse(){

            },
            deleteTrue(){
                
            },
            goDetail(){
                console.log(1);
                this.$router.push({path:'apiDetail',query: {id:"1"}});
            }
        },
    }
</script>

<style lang="less" scoped>
    .listWrap{
        margin-top:20px;
        float: left;
        width: 210px;
        height: 180px;
        margin:30px;
        border:1px #ddd solid;
        &.apiEveryDiv,ul{
            cursor: pointer;
        }
    }
</style>

