<template>
    <section class="container" id="mainWrap">
        <!--left side start-->
        <section class="leftSide">
            <ul id="leftMenu">
                <li>
                    <router-link to="/tagGroup">标签体系</router-link>
                </li>
                <li>
                    <router-link to="/tagView">标签画像</router-link>
                </li>
            </ul>
            <div class="show-hide" id="show-hide">
                显示隐藏按钮
            </div>
        </section>
        <!--left side end-->
        <!--右侧大块 start-->
        <section class="rightSide clearfix">
            <div class="app appList clearfix"></div>
        </section>
        <!--右侧大块 end-->
        <my-foot></my-foot>
    </section>
</template>
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

