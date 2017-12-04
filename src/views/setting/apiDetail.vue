<template>
    <section>
        <!--左侧列表 start-->
        <div class="apiLeft">
            <h5>国美app首页模块个性化服务</h5>
            <div class="right whiteTool" @mouseenter="toolEnterW" @mouseleave="toolLeaveW">
                <span>操作</span>
                <ul class="left" v-show="showTool"> 
                    <li @click="addApiFn">新增场景</li>
                    <li @click="updateApi">修改</li>
                    <li @click="deleteApi">删除</li>
                </ul>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>场景名称</th>
                        <th>Code编码</th>
                        <th>创建时间</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>0001</td>
                        <td>广告位banner客群推荐</td>
                        <td>tag001</td>
                        <td>2017-02-12 19:21</td>
                        <td>未计算</td>
                        <td>上线</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--左侧列表 end-->

        <!--右侧大块 start-->
        <div class="apiRight">
            <!--右 左侧展示部分-->
            <div>
                <!--算法策略-->
                <div>
                    <h5>配置推荐策略逻辑，通过启动场景计算推荐结果</h5>
                    <ul class="ulWraper">
                        <li class="fLi2">
                            <label><strong>*</strong>数据服务：</label>
                            <span class="curNormal">标签查询服务</span>
                        </li>
                        <li class="fLi">
                            <label>标签配置：</label>
                            <!--树级结构-->
                            <div class="treeWrap">
                                <ul>
                                    <li v-for="(first,index) in listData" :key="index">
                                        <i class="showOrHide" @click="showNext(first,'first')" :class="secondShowId==first.id?'active':''"></i>
                                        <input type="checkbox" :value="first.id" v-model="select" @click="changeCheck(first,'first',$event)">
                                        <span @click="showNext(first,'first')">{{first.name}}</span>
                                        <ul class="secondUl" v-show="secondShowId==first.id">
                                            <li v-for="(second,index) in first.children" :key="index">
                                                <i class="showOrHide" @click="showNext(second,'second')"  :class="threeShowId==second.id?'active':''"></i>
                                                <input type="checkbox" :value="second.id" v-model="select" @click="changeCheck(second,'second',$event)">
                                                <span @click="showNext(second,'second')">{{second.name}}</span>
                                                <ul class="threeUl" v-show="threeShowId==second.id">
                                                    <li v-for="(three,index) in second.children" :key="index" class="threeTagCl">
                                                        <input type="checkbox" :value="three.id" v-model="select" @click="changeCheck(three,'three',$event)">
                                                        <span>{{three.name}}</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--api调用-->
                <div>

                </div>
                <!--效果统计-->
                <div>

                </div>
            </div>
            <!--右侧三个工具栏-->
            <div>

            </div>
        </div>
        <!--右侧大块 end-->
    </section>
</template>
<script>
    export default {
        data(){
            return{
                showTool:false,
                listData:[],
            }
        },
        methods:{
            toolEnterW(){},/*操作 fn1*/
            toolLeaveW(){},/*操作 fn2*/
            addApiFn(){},/*操作 fn3*/
            updateApi(){},/*操作 fn4*/
            deleteApi(){},/*操作 fn5*/
            showNext(){},
            changeCheck(){},
        }
    }
</script>
