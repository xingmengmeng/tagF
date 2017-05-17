<template>
    <section class="container" id="mainWrap">
        <!--left side start-->
        <section class="leftSide" >
            <div id="leftMenu">
                <h4>设置</h4>
                <div>
                    <h5>用户访问控制</h5>
                    <ul>
                        <li>
                            <router-link to="/setting/setUser">用户</router-link>
                        </li>
                        <li>
                            <router-link to="/setting/loginHistory">登录历史</router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="show-hide" id="show-hide">
                显示隐藏按钮
            </div>
        </section>
        <!--left side end-->
        <!--右侧大块 start-->
        <section class="rightSide clearfix">
            <div class="app appList clearfix">
                <router-view></router-view>
            </div>
        </section>
        <!--右侧大块 end-->
        <my-foot></my-foot>
    </section>
</template>
<style scoped lang="less">
    .leftSide{
        h4{
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            box-sizing: border-box;
            font-weight: normal;
        }
        h5{
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            box-sizing: border-box;
            font-weight: normal;
            background:#E5F1FF url("../../assets/images/vtoBot.png") 5px center no-repeat;
        }
        a{
            padding-left:30px;
            text-align: left;
            &.active{
                color:#fff;
                background: #1078F5;
            }
        }
    }
</style>
<script type='text/ecmascript-6'>
    require('../../assets/css/userGroup.less');
    import LayOut from '../../assets/js/layout';
    import Footer from '../../components/footer.vue';
    export default{
        data(){
            return{

            }
        },
        components:{
            'my-foot':Footer,
        },
        mounted(){
            LayOut.setHeight.init();
        },
    }
</script>

