<template>
    <section class="container chartsWrap" id="com-2">
        <div class="mainLeft factory">
            <div class="hWrap">
                <h4>标签工厂</h4>
            </div>

            <div class="echarts-wraper">
                <div class="div-title">
                    <h5 class="ic1">入库客户数据</h5>
                </div>
                <!--可点击切换部分 start-->

                <!--可点击切换部分 end-->
                <!--图表 start-->
                <div>
                    <line-large-component></line-large-component>
                </div>
                <!--图表 end-->
            </div>

            <div class="echarts-wraper">
                <div class="div-title">
                    <h5 class="ic2">标签数据</h5>
                </div>
                <!--图表 start-->
                <div>
                    <pie-control-component></pie-control-component>
                </div>
                <!--图表 end-->
            </div>

            <div class="echarts-wraper">
                <div class="div-title">
                    <h5 class="ic3">标签加工进度</h5>
                </div>
               
                <div class="clearfix" style="padding-bottom:10px">
                    <s-tab-component></s-tab-component>
                </div>
                
            </div>

        </div>

        <div class="mainLeft pros">
            <div class="hWrap">
                <h4>用户画像</h4>
            </div>

            <!--<div class="echarts-wraper">
                <div class="div-title">
                    <h5 class="ic5">推送客户统计</h5>
                </div>
                &lt;!&ndash;图表 start&ndash;&gt;
                <div>
                    <line-component></line-component>
                </div>
                &lt;!&ndash;图表 end&ndash;&gt;
            </div>

            <div class="echarts-wraper">
                <div class="div-title">
                    <h5 class="ic6"> 跨业务线客户资源转化统计</h5>
                </div>
                &lt;!&ndash;图表 start&ndash;&gt;
                <div>
                    <btn-click></btn-click>
                    <bar-stack-y></bar-stack-y>
                </div>
                &lt;!&ndash;图表 end&ndash;&gt;
            </div>-->


            <div class="echarts-wraper">
                <div class="div-title">
                    <h5 class="ic4">美易理财画像</h5>
                </div>
                <!--图表 start-->
                <div id="words">
                    <wordcloud></wordcloud>
                </div>
                <!--图表 end-->
            </div>

            <div class="echarts-wraper">
                <div class="div-title">
                    <h5 class="ic6">标签关联画像</h5>
                    <a href="/tagView" class="right tagDetailLink">自定义</a>
                </div>
                <!--图表 start-->
                <div class="indexTabelWrapDiv">
                    <index-table></index-table>
                </div>
                <!--图表 end-->
            </div>
        </div>
        <div class="mainLeft mess">
            <div class="hWrap">
                <h4>智能匹配</h4>
            </div>

            <div class="echarts-wraper">
                <div class="div-title">
                    <h5 class="ic5">用户群活动推送</h5>
                </div>
                <!--图表 start-->
                <div>
                    <bar-stack-component></bar-stack-component>
                </div>
                <!--图表 end-->
            </div>

            <!--<div class="echarts-wraper">
                <div class="div-title">
                    <h5 class="ic3">操作记录</h5>
                </div>
                &lt;!&ndash;图表 start&ndash;&gt;
                <div>
                    <bar-left-right></bar-left-right>
                </div>
                &lt;!&ndash;图表 end&ndash;&gt;
            </div>-->

        </div>
        <ul class="messVersion">
            <li @click="showIdea=true">意见反馈</li>
            <li>版本说明</li>
        </ul>
        <ideas v-show="showIdea" @hideOverFn="hideMarkWrap"></ideas>
        <transition name="slide-fade">
            <success-box v-show="showSuccess"></success-box>
        </transition>
    </section>
</template>
<style lang="less" scoped>
    .slide-fade-enter-active {
        transition: all .2s ease;
    }
    .slide-fade-leave-active {
        transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to{
        transform: translateX(100px);
        opacity: 0;
    }
    .messVersion{
        position: fixed;
        z-index: 2;
        right:20px;
        bottom: 60px;
        width: 42px;
        background: #f8f5f2;
        li{
            margin-top:1px;
            padding:4px 0px 0 9px;
            width:100%;
            height: 42px;
            background: #2673f5 url(../../assets/images/messIcon2.png) center no-repeat;
            font-size: 0;
            box-sizing: border-box;
            cursor: pointer;
            &:nth-of-type(2){
                background: #2673f5 url(../../assets/images/messIcon1.png) center no-repeat;
            }
            &:hover{
                background: #3e94f9;
                font-size: 12px;
                color:#fff;
            } 
        }
    }
</style>

<script type="text/ecmascript-6">
    import lineLargeComponent from '../../components/echartComponent/line-large-component.vue';
    import pieControlComponent  from '../../components/echartComponent/pie-control-component.vue';
    import sTabComponent from '../../components/echartComponent/s-tab-component.vue';
    import wordcloud from '../../components/echartComponent/wordcloud.vue';
    import indexTable from '../../components/echartComponent/index-table.vue';
    import barStackComponent from '../../components/echartComponent/bar-stack-component.vue';
    import ideas from '../index/ideas.vue';
    import successBox from '../../components/successBox.vue';

    require('../../assets/css/index.less');

    export default {
        data(){
            return{
                showIdea:false,//是否显示意见反馈弹框
                showSuccess:false,//是否显示保存成功弹框
            }
        },
        components:{
            'line-large-component':lineLargeComponent,
            'pie-control-component':pieControlComponent,
            's-tab-component':sTabComponent,
            'wordcloud':wordcloud,
            'index-table':indexTable,
            'bar-stack-component':barStackComponent,
            'ideas':ideas,
            'success-box':successBox,
        },
        mounted(){
            var aDiv=document.querySelectorAll('.mainLeft');
            var cliWidth=document.documentElement.clientWidth-20-17;
            var aDivWidth=cliWidth/3;
            aDiv.forEach(function (item) {
                item.style.width=aDivWidth+'px';
            })
        },
        methods:{
            hideMarkWrap(){
                this.showIdea=false;
            }
        }
    }
</script>

