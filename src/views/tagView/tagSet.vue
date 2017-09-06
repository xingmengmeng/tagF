<template>
    <section class="appAndUser clearfix addUsers">
        <div class="left addUsersLeft clearfix">
            <!--用户群树级结构-->
            <ul class="box clearfix" id="box">
                <li class="one-li clearfix" v-for="treeOne in treeResData" v-cloak>
                    <span class="one-span">{{treeOne.name}}</span>
                    <ul class="two">
                        <li v-for="treeTwo in treeOne.children">
                            <span class="two-span" @click="showChild(treeTwo.id)" :class="{'two-span2':treeTwo.id == i}" v-cloak>{{treeTwo.name}}</span>
                            <ul class="three"  v-show="treeTwo.id == i">
                                <li v-for="treeThree in treeTwo.children">
                                    <span :id="treeThree.id" class="three-span" :class="{'three-span2':treeThree.id == j}" @click="showFourTree(treeThree.id)" v-cloak>{{treeThree.name}}</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="left addUsersCenter" style="position:relative;">
            <div class="center">
                <loading v-show="showLoading"></loading>
                <div class="clearfix searchWrap">
                    <input type="text" placeholder="搜索" v-model="addGroupSearchCon" class="searchInput" @keyup.enter="addUserGroupSearch(addGroupSearchCon)">
                    <button class="searchBtn" @click="addUserGroupSearch(addGroupSearchCon)"></button>
                </div>
                <div class="clearfix">
                    <!--<input type="checkbox" class="checkboxClass" id="checkboxModelId" @click="checkedAll($event)" v-model="allSelect">
                    <label for="checkboxModelId" class="allSelectLabel" :class="allSelect?'active':''" v-show="fourResData.length!=0">全选</label>
                    <span class="sortSpan" :class="sortFlag?'':'active'" @click="sortFn" v-show="fourResData.length!=0">排序</span>-->
                </div>
                <div class="clearfix fourWrap" style="margin-top:30px"><!--有全选 排序时删掉style-->
                    <ul class="four_scroll">
                        <li v-for="fourData in fourResData" class="clearfix" v-cloak>
                            <!--<input type="checkbox" class="checks" v-model="fourData.checked" @click="getSendData(fourData)">
                            <i :class="checkdId.indexOf(fourData.id)!=-1?'classA':'classB'"></i>-->
                            <label class="checkLabel"><span v-cloak>{{fourData.name}}({{fourData.count}}){{fourData.rate}}<i v-if="fourData.createrId&&fourData.createrId=='canDel'" class='tagDle' @click="deleteTag(fourData.id)">删除</i> </span></label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="left addUsersRight">
            <div class="biWrap">
                <ul class="tagSetNav clearfix">
                    <li @click="showCon='tagWrap'" :class="showCon=='tagWrap'?'active':''">定制标签</li>
                    <li @click="showCon='vipWrap'" :class="showCon=='vipWrap'?'active':''">白名单</li>
                </ul>
                <!--定制标签 start-->
                <div v-show="showCon=='tagWrap'" class="tagSetDiv">
                    <ul>
                        <li class="tagLis">
                            <label>一级标签：</label>
                            <div class="rightTag">
                                <select v-model="firstId" @change="changeSelet(tagData,firstId,'second')">
                                    <option value="auto">请选择</option>
                                    <option :value="firstTag.id" v-for="(firstTag,index) in tagData" :key="index">{{firstTag.name}}</option>
                                </select>
                            </div>
                        </li>
                        <li class="tagLis">
                            <label>二级标签：</label>
                            <div class="rightTag">
                                <select v-model="secondId" @change="changeSelet(secondData,secondId,'three')">
                                    <option value="auto">请选择</option>
                                    <option :value="secondTag.id" v-for="(secondTag,index) in secondData" :key="index">{{secondTag.name}}</option>
                                </select>
                            </div>
                        </li>
                        <li class="tagLis">
                            <label>三级标签：</label>
                            <div class="rightTag">
                                <select v-model="threeId" @change="getFourData(threeId)">
                                    <option value="auto">请选择</option>
                                    <option :value="threeTag.id" v-for="(threeTag,index) in threeData" :key="index">{{threeTag.name}}</option>
                                </select>
                            </div>  
                        </li>
                        <li v-if="tagCon">
                            提示： {{tagCon.tips}}
                        </li> 
                        <li v-if="tagCon">
                            <label>{{tagCon.tagName}}</label>
                            <input type="text" v-model="minTxt">
                            <span>~</span>
                            <input type="text" v-model="maxTxt">
                            <span>{{tagCon.unit}}</span>
                            <span v-if="tagCon.unit=='元'">(小数点后2位)</span>
                            <span v-if="tagCon.unit=='次'||tagCon.unit=='天'">(输入整数)</span>
                        </li>  
                    </ul>
                </div>
                <!--定制标签 end-->
                <!--白名单  start-->
                <div v-show="showCon=='vipWrap'">
                    白名单
                </div>
                <!--白名单  end-->
            </div>
            <!--滚动块下方内容 start-->
            <!--定制标签模块-->
            <div class="clearfix biFooter" v-show="showCon=='tagWrap'">  
                <span>{{error}}</span>
                <input type="button" value="提交" @click="saveTags" class="tagBtn right"> 
            </div>
            <!--白名单模块-->
            <div class="clearfix biFooter" v-show="showCon=='vipWrap'">  
                <input type="button" value="新增" @click="whiteListSet" class="tagBtn right"> 
            </div>
            <!--滚动块下方内容 end-->
        </div>
        <transition name="slide-fade">
            <success-box v-show="showSuccess"></success-box>
        </transition>

        <div class="overlay"></div>
        <!--删除弹框-->
        <div class="markDelet">
            <p>您确定要删除此标签吗？如果删除，可能会使相</br>关联的用户群、活动状态失效，以及宏观对比人群被移除。</p>
            <div class="btnWrap" style="margin:0 auto;">
                <input type="button" value="否" @click="deletFalse">
                <input type="button" value="是" @click="deleteTrue">
            </div>
        </div>
    </section>
</template>
<style scoped lang="less">
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
    .checkboxClass{
        float: left;
        opacity: 0;
    }
    .allSelectLabel{
        float: left;
        margin: 15px 0 0 20px;
        color:#919191;
        cursor: pointer;
        &.active{
            color:#1078f5;
        }
    }
    .sortSpan{
        .allSelectLabel;
    }
    .tagBtn{
        width: 80px;
        height: 30px;
        border: 0;
        border-radius: 3px;
        cursor: pointer;
        background: #1078f5; 
        color:#fff;
    }
    .tagDle{
        display: inline-block;
        margin-left:10px;
        vertical-align: -7px;
        width: 12px;
        height: 12px;
        font-size: 0;
        background: url(../../assets/images/tagDle.png);
        cursor: pointer;
    }
    .tagSetNav{
        width: 100%;
        border-bottom: 1px #F1F4FA solid;
        li{
            float: left;
            padding:5px 30px;
            border-bottom: 2px #F1F4FA solid;
            cursor: pointer;
            &.active{
                border-bottom: 2px #1078F5 solid;
            }
        }
    }
    .tagSetDiv{
        .tagLis{
            margin-top: 10px;
            padding:10px 30px;
            width: 100%;
            background: #f9f9f9;
            box-sizing: border-box;
            label{
                float: left;
                height: 30px;
                line-height: 30px;
            }
            .rightTag{
                padding-left:85px;
                width: 100%;
                box-sizing: border-box;
                select{
                    width: 100%;
                    height: 30px;
                    border: 1px #ECECEC solid;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>
<script>
    import loading from '../../components/loading.vue';
    import successBox from '../../components/successBox.vue';

    const IScroll = require('iscroll');
    import LayOut from '../../assets/js/layout';

    require('../../assets/css/addUserGroup.less');
    export default {
        data(){
            return{
                treeResData: [], /*树的数据*/
                fourResData: [], /*得到的四级结构的数据*/
                checkdId: [], /*checked为true的标签*/
                biAllAry: [], /*点击四级后添加的数组  所有标签数组*/
                showLoading: false,
                addGroupSearchCon: '',
                allSelect:false,//全选
                sortFlag:true,//排序
                i: -1, /*二级树的class样式*/
                j: -1, /*三级树点击后状态  文字颜色变化*/

                showSuccess:false,

                showCon:'tagWrap',//最后侧显示的模块
                tagData:[],//标签联动数据
                secondData:[],
                threeData:[],
                firstId:'auto',
                secondId:'auto',
                threeId:'auto',//三级id
                tagCon:null,//标签信息
                minTxt:'',
                maxTxt:'',
                error:'',//自定义标签错误提示
                deleteId:'',
            }
        },
        mounted(){
            this.getData();
            this.getUrlPage();//地址栏参数判断
            /*提交按钮样式*/
            LayOut.setHeight.init();
            LayOut.serBiWrap.init();
            this.getTags();//得到标签选择数据
        },
        updated(){
            LayOut.setHeight.init();
            LayOut.serBiWrap.init();
        },
        components:{
            'loading': loading,
            'success-box':successBox,
        },
        methods:{
            /*得到树的数据*/
            getData(){
                this.$http.get('/api/baseTag/queryTree.gm').then(function (response) {
                    this.treeResData=response.data.dataInfo;

                    this.$nextTick(function(){
                        this.addUserLeftScroll=new IScroll('.addUsersLeft',{
                            mouseWheel: true,
                            scrollbars: true,
                            checkDOMChanges:true,
                            bounce: false,
                            interactiveScrollbars:true
                        });
                        /*this.addUserRightScroll=new IScroll('.biWrap',{
                            mouseWheel: true,
                            scrollbars: true,
                            checkDOMChanges:true,
                            bounce: false,
                            interactiveScrollbars:true
                        });*/
                    })
                })
            },
            /*显示三级树*/
            showChild(index){
                if(this.i==index){
                    //console.log('同一个');
                    this.i=-1;
                }else{
                    //console.log('不同个');
                    this.i=index;
                }
                this.$nextTick(function () {
                    this.addUserLeftScroll.refresh();
                })
            },
            /*显示四级*/
            showFourTree(id){
                if(this.j==id){
                    //console.log('同一个');
                    return;
                }else{
                    //console.log('不同个');
                    this.fourResData=[];
                    this.allSelect=false;
                    this.j=id;
                    this.showLoading=true;
                }
                
                this.addGroupSearchCon='';
                this.$http.get('/api/baseTag/queryByParentId.gm?parentId='+id).then(function (response) {
                    this.showLoading=false;
                    this.sortFlag=true;//排序恢复默认
                    this.setFour(response);
                })

            },
            //得到地址栏中的当前页码数  history设置
            getUrlPage(){
                var url=window.location.href,
                        urlReg=/([^?=&#]+)=([^?=&#]+)/g,
                        urlObj={};
                url.replace(urlReg,function ($0,$1,$2) {
                    urlObj[$1]=$2;
                });
                if(urlObj['flag']){//从宏观新建 按钮点击来的页面标志  添加到宏观弹框中的用户群
                    this.addGroupUrl='/api/userGroupPortrait/save.gm';
                    this.addGroupGotoPage='/macroView/groupPic';
                }else{//其他页面点击而来  添加到总用户群中
                    this.addGroupUrl='/api/userGroup/save.gm';
                    this.addGroupGotoPage='/userGroup';
                }
            },
            /*搜索及点出四级树后的操作*/
            setFour(response){
                var _this=this;
                this.fourResData=response.data.dataInfo;
                /*设置返回的数据中哪一项为选中状态*/
                if(this.fourResData){
                    this.fourResData.forEach(function (item) {
                        _this.checkdId.forEach(function (cur) {
                            if(item.id==cur){
                                item.checked=true;
                            }
                        })
                    })
                    this.comAllSelect();
                }
                this.$nextTick(function(){
                    if(this.fourTreeScroll==null){
                        this.fourTreeScroll=new IScroll('.fourWrap',{
                            mouseWheel: true,
                            scrollbars: true,
                            checkDOMChanges:true,
                            bounce: false,
                            interactiveScrollbars:true
                        })
                    }else {
                        this.fourTreeScroll.refresh();
                    }
                });
            },
            /*搜索*/
            addUserGroupSearch(){
                if(this.addGroupSearchCon!=''){
                    this.j=-1;
                    var reg=/\s+/g;
                    var searchContent=this.addGroupSearchCon.replace(reg,'');
                    this.showLoading=true;
                    this.$http.get('/api/baseTag/queryListBySearch.gm?searchContent='+searchContent).then(function (response) {
                        this.showLoading=false;
                        this.setFour(response);
                    })
                }
            },
            /*点击四级标签事件  添加到右侧*/
            getSendData(checkData){

                if(navigator.userAgent.toLowerCase().indexOf('firefox')!='-1'){//火狐浏览器兼容
                    if(checkData.checked==undefined||checkData.checked==false){
                        checkData.checked=true;
                    }else {
                        checkData.checked=false;
                    }
                };
                if(checkData.checked){//选中
                    this.checkdId.push(checkData.id);
                }else{//不选中
                    this.checkdId=this.checkdId.filter(function (item) {
                        return item!=checkData.id;
                    });
                }
                
            },
            /*全选*/
            comAllSelect(){
                var cc=this.fourResData.filter(item=>{
                    return item.checked!=true;
                })
                if(cc.length==0){
                    this.allSelect=true;
                }else{
                    this.allSelect=false;
                }
            },
            /*全选 实现*/
            checkedAll(e) {
                console.log(e.target.checked);
                if (!e.target.checked) {//实现反选
                    this.fourResData.forEach((item)=> {
                        item.checked=false;
                        var biAllAryNohas=this.biAllAry.filter(function (itemStr) {
                            return item.parentId==itemStr.parentId;
                        })
                        var biEveryAryHas=this.biEveryAry.filter(function (itemStr) {
                            return item.parentId==itemStr.parentId;
                        })
                        if(biAllAryNohas.length==0&&biEveryAryHas.length!=0){
                            this.checkFalse(item,this.biEveryAry);
                        }else{
                            this.checkFalse(item,this.biAllAry);
                        }
                        //this.checkFalse(item,this.biAllAry);
                    });
                }else{//实现全选
                    this.fourResData.forEach((item)=> {
                        if(this.checkdId.indexOf(item.id)==-1){
                            item.checked=true;
                            var biAllAryNohas=this.biAllAry.filter(function (itemStr) {
                                return item.parentId==itemStr.parentId;
                            })
                            var biEveryAryHas=this.biEveryAry.filter(function (itemStr) {
                                return item.parentId==itemStr.parentId;
                            })
                            if(biAllAryNohas.length==0&&biEveryAryHas.length!=0){
                                this.checkTrue(item,this.biEveryAry);
                            }else{
                                this.checkTrue(item,this.biAllAry);
                            }
                            //this.checkTrue(item,this.biAllAry);
                        } 
                    });
                }
                this.pingAry();
                this.$nextTick(function () {
                    this.addUserRightScroll.refresh();
                });
            },
            //排序
            sortFn(){
                if(this.sortFlag){
                    let temAry=this.fourResData.concat();
                    this.temConAry=this.fourResData.concat();
                    temAry.sort(function(a,b){
                        return b.count-a.count;
                    });
                    this.fourResData=temAry.concat();
                }else{
                    this.fourResData=this.temConAry.concat();
                }
                this.sortFlag=!this.sortFlag;
            },
            //得到标签联动数据
            getTags(){
                this.$http.get('/api/tagDefined/queryCanDefinedTagList.gm').then(function(res){
                    if(res.data.code==200){
                        this.tagData=res.data.dataInfo
                    }
                })
            },
            /*pData:父级数据  pId父级选中的id  cData子数据*/
            changeSelet(pData,pId,cData){
                //如果选择了默认状态 则下级都默认到初始状态
                if(pId=='auto'){
                    if(cData=='second'){
                        this.secondId=this.threeId='auto';
                        this.threeData.length=this.secondData.length=0;
                    }else if(cData=='three'){
                        this.threeId='auto';
                        this.threeData.length=0;
                    }
                    return;
                }
                //没有选择到默认选项时  所执行逻辑
                for(let cur of pData){
                    if(cur.id==pId){
                        if(cData=='second'){//得到二级
                            this.secondData=JSON.parse(JSON.stringify(cur.children));
                            this.secondId=this.threeId='auto';
                            this.threeData.length=0;
                        }else if(cData=='three'){//得到三级
                            this.threeData=JSON.parse(JSON.stringify(cur.children));
                            this.threeId='auto';
                        }
                        break;
                    }
                }
            },
            //选择三级后  查询可自定义内容
            getFourData(id){
                console.log(id);
                this.$http.get('/api/tagDefined/queryConfigByTagId.gm?tagId='+id).then(function(res){
                    if(res.data.code==200){
                        this.tagCon=res.data.dataInfo;
                    }
                })

            },
            //校验填入的内容
            validatTag(){
                if(isNaN(Number(this.minTxt))||isNaN(Number(this.maxTxt))){//其中有一个数字非数字  返回
                    this.error='请在输入框内，填写具体的数字';
                    return;
                }
            },
            //保存定制标签
            saveTags(){
                this.validatTag();
                if(this.minTxt==''||this.maxTxt==''){
                    this.error='设置范围不能为空';
                    return;
                }
                this.$http.post('/api/tagDefined/save.gm',{"tagId":this.threeId,"minValue":this.minTxt,"maxValue":this.maxTxt},{emulateJSON:true}).then(function(res){
                    if(res.data.code=='200'){
                        this.showSuccess=true;
                        setTimeout(()=>{
                            this.showSuccess=false;
                        },2000);
                    }
                })
            },
            //跳转到白名单设置页面
            whiteListSet(){
                this.$router.push('/tagView/tagw/whiteListSet');
            },
            //删除配置标签
            deleteTag(id){
                this.deleteId=id;
                /*显示弹框  确定否  然后点确定  则删除*/
                var overlay=document.querySelector('.overlay'),
                        markDelet=document.querySelector('.markDelet');
                overlay.style.display=markDelet.style.display='block';
            },
            deletFalse(){
                /*取消  关弹框*/
                var overlay=document.querySelector('.overlay'),
                    markDelet=document.querySelector('.markDelet');
                overlay.style.display=markDelet.style.display='none';
            },
            deleteTrue(){
                /*确定  删除  关弹框*/
                this.$http.delete('/api/baseTag/delete.gm?id='+this.deleteId).then(function (res) {
                    if(res.data.code==200){
                        var overlay=document.querySelector('.overlay'),
                            markDelet=document.querySelector('.markDelet');
                        overlay.style.display=markDelet.style.display='none';
                        /*前台页面列表数组删除此条数据  或者再走一次接口*/
                        this.getData();
                    }
                })
            },
        }
    }
</script>
