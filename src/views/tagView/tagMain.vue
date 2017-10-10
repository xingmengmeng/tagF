<template>
    <section class="container" id="mainWrap">
        <!--left side start-->
        <section class="leftSide">
            <ul id="leftMenu">
                <li v-for="(secondLink,index) in linkAry" :key="index">
                    <router-link :to="secondLink.href">{{secondLink.name}}</router-link>
                </li>
                <!--<li>
                    <router-link to="/tagView/tagMap">标签画像</router-link>
                </li>-->
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
        computed: {
            linkAry() {
                return this.$store.state.tagRouteData;
            }
        },
        components:{
            'my-foot':Footer
        },
        methods:{
            changeHeight(){
                setTimeout( ()=> {
                    if(this.$store.state.tagTopScroll) this.$store.state.tagTopScroll.refresh(); 
                    if(this.$store.state.tagBottomScroll) this.$store.state.tagBottomScroll.refresh(); 
                    if(this.$store.state.fourTreeScroll) this.$store.state.fourTreeScroll.refresh(); 
                }, 0);
            }
        }
    }
</script>
    
