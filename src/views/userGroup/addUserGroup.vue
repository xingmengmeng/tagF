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
        <section class="rightSide">
            <div class="app appAndUser clearfix addUsers">
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
                            <input type="checkbox" class="checkboxClass" id="checkboxModelId" @click="checkedAll($event)" v-model="allSelect">
                            <label for="checkboxModelId" class="allSelectLabel" :class="allSelect?'active':''" v-show="fourResData.length!=0">全选</label>
                            <span class="sortSpan" :class="sortFlag?'':'active'" @click="sortFn" v-show="fourResData.length!=0">排序</span>
                        </div>
                        <div class="clearfix fourWrap">
                            <ul class="four_scroll">
                                <li v-for="fourData in fourResData" class="clearfix" v-cloak>
                                    <input type="checkbox" class="checks" v-model="fourData.checked" @click="getSendData(fourData)">
                                    <!--<i :class="fourData.checked?'classA':'classB'"></i>-->
                                    <i :class="checkdId.indexOf(fourData.id)!=-1?'classA':'classB'"></i>
                                    <label class="checkLabel"><span v-cloak>{{fourData.name}}({{fourData.count}}){{fourData.rate}}</span></label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="left addUsersRight">
                    <div class="biWrap">
                        <span class="left">已选标签：</span>
                        <draggable id="biSelectAry" :list="biSelectAry" class="dragArea clearfix" :options="{group:{name:'people', pull:'clone', put:false }}">
                            <div v-for="(fourData,index) in biSelectAry" :key="index" class="left tagWrap">{{fourData.name}}</div>
                        </draggable>
                        <span class="left">组合公式：</span>
                        <draggable id="addOr" :list="addOr" class="dragArea clearfix" :options="{group:{name:'people', pull:'clone', put:false }}">
                            <div v-for="(item,index) in addOr" :key="index" class="left addOrList">
                                {{item.name}}
                            </div>
                        </draggable>
                        <draggable id="targetData" :list="targetData" class="dragArea addArea clearfix" :options="{group:'people'}" @change="getPingData">
                            <div v-for="(item,index) in targetData" :key="index" class="left targetList">
                                <i @click="deleteTag(item)" class="deleteTag"></i>
                                <span>{{item.name}}</span>
                            </div>
                        </draggable>
                    </div>

                    <!--滚动块下方内容 start-->
                    <div class="clearfix biFooter">
                        <div class="clearfix allNum">
                            <p class="left" v-cloak>统计用户数：  {{statisUsers.count}}， {{statisUsers.rate}}</p>
                            <button class="clear_btn" @click="clearList">清空</button>
                        </div>
                        <div class="clearfix redFont">{{comError}}</div>
                        <div class="btnWrap">
                            <input type="button" value="计算" @click="comTagRelations">

                            <input type="button" value="提交" @click="showMark" disabled id="saveGroup">
                        </div>
                        
                    </div>
                    <!--滚动块下方内容 end-->
                </div>
            </div>
        </section>
        <!--右侧大块 end-->

        <!--弹框遮罩 start-->
        <div class="overlay"></div>
        <div class="markWarp">
            <div class="markTitle clearfix">
                <h5>创建用户群</h5>
                <i class="right close" @click="hideMark">关闭</i>
            </div>
            <ul class="clearfix addUserGroup">
                <li class="clearfix">
                    <label class="left"><strong>*</strong>用户群名称：</label>
                    <input type="text" v-model="userGroupName" placeholder="最多可输入20个字符" class="left txt">
                </li>
                <li class="errorLi clearfix" style="padding:0px 0 0 95px;height: 14px; font-size: 12px; color: #B40606;">
                    <span v-cloak>{{savaError}}</span>
                </li>
                <li class="btnWrap" style="margin-top: 10px">
                    <input type="button" value="取消" @click="hideMark">
                    <input type="button" value="确定" @click="addUserGroupFn">
                </li>
            </ul>
        </div>
        <!--弹框遮罩 end-->
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
    .dragArea{
        display: block;
        width: 100%;
    }
    .addArea{
        width: 100%;
        height:200px;
        border:1px #ddd solid;
        box-sizing: border-box;
        .targetList{
            position: relative;
            i{
                position: absolute;
                top: 10px;
                right: 0;
                width: 15px;
                height: 15px;
                
                cursor: pointer;
            }
            span{
                float: left;
                display: block;
                padding: 2px 15px;
                margin: 0 3px 10px 3px;
                background: #FFFFFF;
                border: 1px solid #9BC9FF;
                border-radius: 25px;
                cursor: pointer;
            }
        }
    }
    .addOrList{
        margin:0 5px;
        cursor: pointer;
    }
    .tagWrap{
        float: left;
        display: block;
        padding: 3px 20px;
        margin: 0 3px 10px 3px;
        background: #FFFFFF;
        border: 1px solid #9BC9FF;
        border-radius: 57px;
        cursor: pointer;
    }
</style>

<script type="text/ecmascript-6">
    import loading from '../../components/loading.vue';
    import draggable from 'vuedraggable'

    const IScroll = require('iscroll');
    import LayOut from '../../assets/js/layout';

    require('../../assets/css/addUserGroup.less');

    export default {
        data(){
            return {
                list: null,
                searchContent: '',
                pageNum: 1,
                treeResData: [], /*树的数据*/
                fourResData: [], /*得到的四级结构的数据*/
                temConAry:[],//临时存储的四级结构
                ishow: false,
                i: -1, /*二级树的class样式*/
                j: -1, /*三级树点击后状态  文字颜色变化*/
                addUserLeftScroll: null, /*用户群树结构的iscroll实例*/
                fourTreeScroll: null, /*中间四级结构的iscroll*/
                biSelectAry: [], /*点击四级后添加的数组 总数据数组*/
                tagRelations: [], /*点击提交向后台发送的数据数组*/
                checkdId: [], /*checked为true的标签*/
                userGroupName: '',
                addGroupSearchCon: '',
                n: '0', /*选择的标签数*/
                savaError: '', /*创建用户群保存确定后的接口状态  错误提示*/
                statisUsers: {rate: "0%", count: 0},
                showLoading: false,
                addGroupUrl:'/api/userGroup/save.gm',//添加用户群接口
                addGroupGotoPage:'/#/userGroup',//添加成功后跳转地址
                allSelect:false,//全选
                sortFlag:true,
                addOr:[
                    {"value":"AND","name":'and'},
                    {"value":"OR","name":'or'},
                    {"value":"(","name":'('},
                    {"value":")","name":')'},
                ],
                targetData:[],
                comError:'',//计算的错误提示
            }
        },
        mounted(){
            this.getData();
            this.getUrlPage();//地址栏参数判断
            this.saveGroup();
            /*提交按钮样式*/
            LayOut.setHeight.init();
            LayOut.serBiWrap.init();
        },
        updated(){
            LayOut.setHeight.init();
            LayOut.serBiWrap.init();
        },
        components: {
            'loading': loading,
            draggable,
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
            
            /*显示弹框*/
            showMark(){
                this.savaError='';
                var overlay=document.querySelector('.overlay'),
                        markWarp=document.querySelector('.markWarp');
                overlay.style.display=markWarp.style.display='block';
            },
            /*关闭按钮 隐藏弹框*/
            hideMark(){
                var overlay=document.querySelector('.overlay'),
                        markWarp=document.querySelector('.markWarp');
                overlay.style.display=markWarp.style.display='none';
            },
            /*两个取消按钮*/
            goList(){
                window.location.href='/userGroup';
            },
            /*清空列表*/
            clearList(){
                
            },
            /*弹框中 确定按钮事件  提交信息 */
            addUserGroupFn(){
                var userGroupNameLength=this.userGroupName.gblen();
                if(this.userGroupName==''){
                    this.savaError='用户群名称不能为空';
                    return false;
                }else if(userGroupNameLength>20){
                    this.savaError='最多输入20个字符';
                    return false;
                }
                this.$http.post(this.addGroupUrl,{"name":this.userGroupName,"tagRelations":JSON.stringify(this.targetData)},{emulateJSON:true}).then(function (response) {
                    if(response.data.code==200){
                        window.location.href=this.addGroupGotoPage;
                    }
                    if(response.data.status=='error') {
                        this.savaError = response.data.msg;
                    }
                })
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
            /*设置提交按钮状态*/
            saveGroup(){
                var btnsave=document.querySelector('#saveGroup');
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
                }
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
            //选中、不选中
            getSendData(item){
                if(item.checked){//选中
                    let obj={
                        "tagId":item.id,
                        "name":item.name,
                    }
                    this.biSelectAry.push(obj);
                    this.checkdId.push(item.id);
                    this.biSelectAry=[...new Set(this.biSelectAry)];
                    this.checkdId=[...new Set(this.checkdId)];
                }else{//不选中
                    this.biSelectAry=this.biSelectAry.filter(cur=>cur.tagId!=item.id);
                    this.checkdId=this.checkdId.filter(cur=>cur!=item.id);
                    this.targetData=this.targetData.filter(itemStr=>{
                        return item.id!=itemStr.tagId;
                    })
                }
                this.comAllSelect();
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
            //全选与反选
            checkedAll(e){
                if (!e.target.checked) {//实现反选
                    this.fourResData.forEach((item)=> {
                        item.checked=false;
                        this.biSelectAry=this.biSelectAry.filter(function (itemStr) {
                            return item.id!=itemStr.tagId;
                        })
                        this.checkdId=this.checkdId.filter(itemStr=>{
                            return item.id!=itemStr;
                        })
                        this.targetData=this.targetData.filter(itemStr=>{
                            return item.id!=itemStr.tagId;
                        })
                    });
                }else{
                    this.fourResData.forEach(item=>{
                        //判断已选标签中有无当前四级的选项  没有的话添加进数组中
                        var hasId=false;
                        for(let seBi of this.biSelectAry){
                            if(seBi.tagId==item.id){
                                hasId=true;
                                break;
                            }
                        }
                        if(!hasId){
                            let obj={
                                "tagId":item.id,
                                "name":item.name,
                            }
                            item.checked=true;
                            this.biSelectAry.push(obj);
                        }
                        this.checkdId.push(item.id);
                    })
                    this.biSelectAry=[...new Set(this.biSelectAry)];
                    this.checkdId=[...new Set(this.checkdId)];
                }
            },
            //得到拼接的数组  向后台传值           
            getPingData(){
				let tagRelations=JSON.stringify(this.targetData);
                //console.log(tagRelations);
			},
            comTagRelations(){
                var tagRelations=encodeURI(JSON.stringify(this.targetData));
                this.$http.get('/api/baseTag/queryCount.gm?tagRelations='+tagRelations).then(function(res){
                    if(res.data.code==200){
                        this.comError='';
                        this.statisUsers=res.data.dataInfo;
                        this.saveGroup();
                    }else{
                        this.statisUsers={rate: "0%", count: 0};
                        this.comError=res.data.msg.replace('参数校验不通过:','')
                    }
                })
            }
        }
    }
</script>


