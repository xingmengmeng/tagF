<template>
    <section class="container" id="mainWrap">
        <!--left side start-->
        <section class="leftSide">
            <ul id="leftMenu">
                <!--<li>
                    <router-link to="/tagGroup">标签体系</router-link>
                </li>-->
                <li>
                    <router-link to="/tagView/tagSet">标签体系</router-link>
                </li>
                <li>
                    <router-link to="/tagView/tagMap">标签画像</router-link>
                </li>
            </ul>
            <div class="show-hide" id="show-hide" @click="changeHeight">
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
    .app{
        height:100%;
    }
</style>

<script>
    import LayOut from '../../assets/js/layout';
    import Footer from '../../components/footer.vue';
    export default {
        data(){
            return{

            }
        },
        mounted(){
            LayOut.setHeight.init();

        },
        /*updated(){
            LayOut.setHeight.init();
        },*/
        components:{
            'my-foot':Footer
        },
        methods:{
            changeHeight(){}
        }
    }
</script>
    
