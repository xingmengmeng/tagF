<template>
    <section>
        <div class="overlayNew"></div>
        <div class="markWrap"> 
            <div class="pContainer">
                <h4>版本说明</h4>
                <div class="clearfix versionWrap"> 
                    <div>
                        <h5>V2.2 版本</h5>
                        <p>更新时间：2017-8-10</p>
                        <h5>原子标签</h5>
                        <p>新增183个美借业务原子标签</p>
                        <h5>产品功能</h5>
                        <p> 1、	首页新增昨日新增入库客户数</br>
                            2、	首页新增前往标签画像页面“自定义”链接</br>
                            3、	首页新增意见反馈和版本更新功能</br>
                            4、	用户群标签筛选页新增了【全选、排序】功能</br>
                            5、	宏观画像优化了地域分布指标分析功能</br>
                            6、	宏观画像新增了美易分和美借人群画像指标</br>
                            7、	标签画像新增配置标签功能和保存首页功能</br>
                            8、	设置中心用户列表新增了职务字段内容</br>
                            9、	设置中心新增修改公告功能</br>
                        </p>
                        <i></i>
                        <h5>V2.1.1 版本</h5>
                        <p>更新时间：2017-7-12</p>
                        <h5>原子标签</h5>
                        <p>新增43个美易理财渠道原子标签，实现各渠道人群画像分析对比功能</p>
                        <i></i>
                        <h5>V2.1版本</h5>
                        <p>更新时间：2017-6-30</p>
                        <h5>原子标签</h5>
                        <p>新增美借人口统计、地理位置原子标签</p>
                        <h5>产品功能</h5>
                        <p>新增美借业务线及其他业务线的用户拉通关系</p>
                        <i></i>
                        <h5>V2.0版本</h5>
                        <p>更新时间：2017-6-10</p>
                        <h5>原子标签</h5>
                        <p>新增250个美易理业务原子标签</br>新增134个美易分业务原子标签</p>
                        <h5>产品功能</h5>
                        <p> 1、	完成了美易理财与美易分用户唯一标识拉通关系</br>
                            2、	新增了宏观画像、微观画像、标签画像、设置等页面功能</br>
                        </p>
                        <i></i>
                        <h5>V1.9 版本</h5>
                        <p>更新时间：2017-5-20</p>
                        <h5>原子标签</h5>
                        <p>修复了美易理财所有业务线标签逻辑（存库上线，表结构变更导致）</p>
                        <i></i>
                        <h5>V1.0版本</h5>
                        <p>上线时间：2017-4-30</p>
                        <h5>原子标签</h5>
                        <p>新增190个美易理财人口统计、地理位置、投资业务原子标签</p>
                        <h5>产品功能</h5>
                        <p> 1、	完成标签工厂系统框架搭建 </br>
                            2、	上线了创建用户群、人群筛选、营销活动、美易理财昨日用户画像等页面功能</br>
                        </p>
                    </div>
                </div>
            </div>
            <div class="close" @click="hideBox"></div>
        </div>
    </section>
</template>
<style lang="less" scoped>
    .markWrap{
        position: fixed;
        z-index: 10003;
        top:50%;
        left:50%;
        margin: -262px 0 0 -205px;
        height: 524px;
        width: 410px;
        background: url(../../assets/images/versionBg.png) top center no-repeat;
        h4{
            margin-top:84px;
            font-size: 16px;
            padding:0;
            width:100%;
            margin-bottom:50px;
            text-align: center;
            color:#fff;
        }
        .versionWrap{
            position: relative;
            padding:0 50px;
            width: 100%;
            height: 286px;
            overflow: hidden;
            box-sizing: border-box;
            color:#666;
            h5{
                padding:10px 0;
            }
            p{
                font-size: 12px;
                line-height: 180%;
            }
            i{
                display: inline-block;
                width: 100%;
                height: 1px;
                border-bottom: 1px #666 dashed;
            }
        }
        .close{
            margin: 50px 0 0 196px;
            width: 38px;
            height: 38px;
            background: url(../../assets/images/versionClose.png);
            cursor: pointer;
        }
    }
</style>
<script>
    const IScroll = require('iscroll');
    export default {
        data(){
            return{
                versionScroll:null,
            }
        },
        mounted(){
            this.$on('showVersion',()=>{
                setTimeout(()=>{
                    if(this.versionScroll){
                        console.log(1)
                        this.versionScroll.refresh();
                    }else{
                        console.log(2)
                        this.setScroll();
                    }
                },0) 
            }) 
        },
        methods:{
            setScroll(){
                this.versionScroll=new IScroll('.versionWrap',{
                    mouseWheel: true,
                    scrollbars: true,
                    checkDOMChanges:true,
                    bounce: false,
                    interactiveScrollbars:true
                });
            },
            hideBox(){
                this.$emit('hideOverFn');
            },
        }
    }
</script>

