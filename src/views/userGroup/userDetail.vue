<template>
    <section class="container" id="mainWrap">
        <!--left side start-->
        <section class="leftSide">
            <ul id="leftMenu">
                <li>
                    <router-link to="/userGroup">用户群列表</router-link>
                </li>
            </ul>
            <div class="show-hide" id="show-hide">
                显示隐藏按钮
            </div>
        </section>
        <!--left side end-->
        <!--右侧大块 start-->
        <router-view></router-view>
        <!--右侧大块 end-->
        <my-foot></my-foot>
    </section>
</template>
<script type='text/ecmascript-6'>
    import Footer from '../../components/footer.vue';

    import LayOut from '../../assets/js/layout';
    export default {
        data(){
            return{

            }
        },
        components:{
            'my-foot':Footer,
        },
        mounted(){
            LayOut.setHeight.init();
        }
    }
</script>


