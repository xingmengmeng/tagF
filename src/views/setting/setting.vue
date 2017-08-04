<template>
    <section class="container" id="mainWrap">
        <!--left side start-->
        <section class="leftSide" >
            <div id="leftMenu">
                <h4>设置</h4>
                <div class="clearfix linkWrap" v-for="(secondLink,index) in linkAry[0]" :key="index">
                    <h5 @click="navShow(index)" :class="showMenu==index?'active':''">{{secondLink.name}}</h5>
                    <ul v-show="showMenu==index">
                        <li v-for="(threeLink,threeIndex) in secondLink.children" :key="threeIndex" :data-menu="index">
                            <router-link :to="threeLink.href">{{threeLink.name}}</router-link>
                        </li>
                    </ul>
                </div>
                <!--<div class="clearfix linkWrap">
                    <h5 @click="navShow('yh1')" id='yh1' :class="showMenu=='yh1'?'active':''">用户访问控制</h5>
                    <ul v-show="showMenu=='yh1'">
                        <li>
                            <router-link to="/setting/setUser">用户</router-link>
                        </li>
                        <li>
                            <router-link to="/setting/loginHistory">登录历史</router-link>
                        </li>
                    </ul>
                </div>
                <div class="clearfix linkWrap">
                    <h5 @click="navShow('yh2')" id='yh2' :class="showMenu=='yh2'?'active':''">其他设置</h5>
                    <ul v-show="showMenu=='yh2'">
                        <li>
                            <router-link to="/setting/notice">公告</router-link>
                        </li>
                        <li>
                            <router-link to="/setting/ideaList">意见反馈</router-link>
                        </li>
                    </ul>
                </div>-->
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
            background:#eef url("../../assets/images/vtoRight.png") 5px center no-repeat;
            border-bottom: 1px solid #ECECEC;
            box-sizing: border-box;
            cursor: pointer;
            &.active{
                background:#E5F1FF url("../../assets/images/vtoBot.png") 5px center no-repeat;
                border: 0;
            }
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
                showMenu:0,//默认值
                
            }
        },
        components:{
            'my-foot':Footer,
        },
        computed: {
            linkAry() {
                return this.$store.state.setRouteData;
            }
        },
        watch: {
            linkAry(val) {
                this.$nextTick(function(){
                    this.selectChoice();
                })
            }
        },
        mounted(){
            LayOut.setHeight.init();  
        },
        methods: {
            navShow(id){
                console.log(id);
                if(this.showMenu==id){/*同一个*/
                    this.showMenu=-1;
                }else{/*不同个*/
                    this.showMenu=id;
                }
            },
            selectChoice(){
                var aDiv=document.querySelectorAll('.linkWrap');
                for(var i=0;i<aDiv.length;i++){
                    var aA=aDiv[i].querySelectorAll('a');
                    for(var j=0;j<aA.length;j++){
                        if(aA[j].className=='active'){
                            console.log(aA[j].parentNode.dataset.menu);
                            this.showMenu=aA[j].parentNode.dataset.menu;
                        }
                    }
                }
             }
        }
    }

</script>

