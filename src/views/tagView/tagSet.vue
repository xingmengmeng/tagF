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
                            <label class="checkLabel"><span v-cloak>{{fourData.name}}</span><span v-cloak>({{fourData.count}})</span><span>{{fourData.rate}}</span></label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="left addUsersRight">
            <div class="biWrap">
                <ul>
                    <li>定制标签</li>
                    <li>白名单</li>
                </ul>
                <!--定制标签 start-->
                <div>
                    <ul>
                        <li>
                            <label>一级标签</label>
                            <select v-model="firstId" @change="changeSelet(tagData,firstId,'second')">
                                <option value="auto">请选择</option>
                                <option :value="firstTag.id" v-for="(firstTag,index) in tagData" :key="index">{{firstTag.name}}</option>
                            </select>
                        </li>
                        <li>
                            <label>二级标签</label>
                            <select v-model="secondId" @change="changeSelet(secondData,secondId,'three')">
                                <option value="auto">请选择</option>
                                <option :value="secondTag.id" v-for="(secondTag,index) in secondData" :key="index">{{secondTag.name}}</option>
                            </select>
                        </li>
                        <li>
                            <label>三级标签</label>
                            <select v-model="threeId" @change="getFourData(threeId)">
                                <option value="auto">请选择</option>
                                <option :value="threeTag.id" v-for="(threeTag,index) in threeData" :key="index">{{threeTag.name}}</option>
                            </select>
                        </li>
                        <li>
                            提示： 该标签限制范围：100~10000元 。
                        </li> 
                        <li>
                            <label>月收入</label>
                            <input type="text">
                            <span>-</span>
                            <input type="text">
                            <span>元</span>
                        </li>  
                    </ul>
                </div>
                <!--定制标签 end-->
                <!--白名单  start-->
                <div>
                    白名单
                </div>
                <!--白名单  end-->
            </div>
            <!--滚动块下方内容 start-->
            <div class="clearfix biFooter">  
                <input type="button" value="提交" @click="saveTags" id="saveGroup" class="tagBtn right"> 
            </div>
            <!--滚动块下方内容 end-->
        </div>
    </section>
</template>
<style scoped lang="less">
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
</style>
<script>
    import loading from '../../components/loading.vue';

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
                tagData:[],//标签联动数据
                secondData:[],
                threeData:[],
                firstId:'auto',
                secondId:'auto',
                threeId:'auto',
            }
        },
        mounted(){
            this.getData();
            this.getUrlPage();//地址栏参数判断
            this.saveGroup();
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
            /*设置提交按钮状态*/
            saveGroup(){
                /*var btnsave=document.querySelector('#saveGroup');
                console.log(this.statisUsers.count);
                if(this.statisUsers.count==0){
                    btnsave.style.background='#ddd';
                    btnsave.style.color='#333';
                    btnsave.style.cursor='default';
                    btnsave.setAttribute('disabled','true');
                }else{
                    btnsave.style.background='#1078f5';
                    btnsave.style.color='#fff';
                    btnsave.style.cursor='pointer';
                    btnsave.removeAttribute('disabled');
                }*/
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
                console.log(pId,cData)
                for(let cur of pData){
                    if(cur.id==pId){
                        if(cData=='second'){//得到二级
                            if(pId=='auto'){
                                this.secondId=this.threeId='auto';
                                this.threeData.length=this.secondData.length=0;
                            }else{
                                this.secondData=cur.children;
                                this.secondId=this.threeId='auto';
                                this.threeData=[];
                            }  
                        }else if(cData=='three'){//得到三级
                            console.log(pId)
                            if(pId=='auto'){
                                this.threeId='auto';
                                this.threeData=[];
                            }else{
                                this.threeData=cur.children;
                                this.threeId='auto';
                            } 
                        }
                        break;
                    }
                }
            },
            getFourData(id){
                console.log(id);
            },
            //保存定制标签
            saveTags(){
                
            }
        }
    }
</script>
