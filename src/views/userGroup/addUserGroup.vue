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
                        <div class="clearfix fourWrap">
                            <ul class="four_scroll">
                                <li v-for="fourData in fourResData" class="clearfix" v-cloak>
                                    <input type="checkbox" class="checks" v-model="fourData.checked" @click="getSendData(fourData)">
                                    <i :class="fourData.checked?'classA':'classB'"></i>
                                    <label class="checkLabel"><span v-cloak>{{fourData.name}}</span><span v-cloak>({{fourData.count}})</span><span>{{fourData.rate}}</span></label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="left addUsersRight">
                    <div class="biWrap">
                        <div class="scroll_wrap">
                            <h6>所有标签 (所有标签都必须满足)</h6>
                            <div class="clearfix">
                                <ul class="clearfix andUl" v-show="biAllAry.length!=0">
                                    <li class="clearfix" v-for="biValue in biAllAry">
                                        <div class="rightTool">
                                            <a href="javascript:;" @click="toDown(biValue.parentId)">下移</a>
                                            <a href="javascript:;" class="tool-delete" @click="deleteData(biValue.parentId)">删除</a>
                                        </div>
                                        <div class="leftCon">
                                            <span v-cloak>{{biValue.value}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <h6>任意标签 (必须至少一个标签满足)</h6>
                            <div class="clearfix">
                                <ul class="clearfix andUl" v-show="biEveryAry.length!=0">
                                    <li class="clearfix" v-for="biEvery in biEveryAry">
                                        <div class="rightTool">
                                            <a href="javascript:;" @click="toUp(biEvery.parentId)">上移</a>
                                            <a href="javascript:;" class="tool-delete" @click="deleteData(biEvery.parentId)">删除</a>
                                        </div>
                                        <div class="leftCon">
                                            <span v-cloak>{{biEvery.value}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!--滚动块下方内容 start-->
                    <div class="clearfix biFooter">
                        <div class="clearfix allNum">
                            <p class="left" v-cloak>已选择了 {{n}}个标签，统计用户数：  {{statisUsers.count}}， {{statisUsers.rate}}</p>
                            <button class="clear_btn" @click="clearList">清空</button>
                        </div>
                        <div class="btnWrap">
                            <input type="button" value="取消" @click="goList">

                            <input type="button" value="提交" @click="showMark" disabled id="saveGroup">
                        </div>
                    </div>
                    <!--滚动块下方内容 end-->

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
                </div>
            </div>
        </section>
        <!--右侧大块 end-->
    </section>
</template>
<script type="text/ecmascript-6">
    import loading from '../../components/loading.vue';

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
                ishow: false,
                i: -1, /*二级树的class样式*/
                j: -1, /*三级树点击后状态  文字颜色变化*/
                addUserLeftScroll: null, /*用户群树结构的iscroll实例*/
                fourTreeScroll: null, /*中间四级结构的iscroll*/
                biSelectAry: [], /*点击四级后添加的数组 总数据数组*/
                /**
                 * [
                 *  {"id":232,"name":"二线城市","parentId":230,"level":4,"checked":true},
                 *  {"id":233,"name":"三线城市","parentId":230,"level":4,"checked":true}
                 * ]
                 */
                biAllAry: [], /*点击四级后添加的数组  所有标签数组*/
                /**
                 * [
                 *  {parentId:1,'value':'本科，专科，研究生','idAry':[12,13,14,15]}，
                 *  {parentId:2,'value':'本科，专科，研究生'}，
                 * ]
                 */
                biEveryAry: [], /*点击四级后添加的数组  任意标签数组*/
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
        components: {
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
                        /*this.addUserCenterScroll=new IScroll('.fourWrap',{
                         mouseWheel: true,
                         scrollbars: true,
                         checkDOMChanges:true,
                         bounce: false
                         });*/
                        this.addUserRightScroll=new IScroll('.biWrap',{
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
                    this.j=id;
                    this.showLoading=true;
                }
                this.fourResData=[];
                this.addGroupSearchCon='';
                this.$http.get('/api/baseTag/queryByParentId.gm?parentId='+id).then(function (response) {
                    this.showLoading=false;
                    this.setFour(response);
                })

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

                if(checkData.checked){/*选中状态  查找放好的数组中有没有padrentid相同的  有的话拼到一个数组中，没有的话拼到另一个数组中  整体是一个大数组*/
                    /*查找已有数组，看是否存有当前的父级id*/
                    /*var isHave=this.biAllAry.filter(function (item) {
                     return item.parentId==checkData.parentId
                     });
                     if(isHave.length!=0){/!*有当前父级  向后追加*!/
                     this.biAllAry.map(function (item) {
                     if(item.parentId==checkData.parentId){
                     item.value=item.value+'，'+checkData.name;
                     item.idAry.push(checkData.id);
                     }
                     })
                     }else{
                     var idAry=new Array;/!*存放逻辑数组*!/
                     idAry.push(checkData.id);
                     var obj={
                     "parentId":checkData.parentId,
                     "value":checkData.name,
                     "idAry":idAry
                     }
                     this.biAllAry.push(obj);
                     }
                     this.biSelectAry.push(checkData);/!*选中的数组*!/
                     this.checkdId.push(checkData.id);/!*选中项的id数组*!/*/
                    var biAllAryNohas=this.biAllAry.filter(function (item) {
                        return item.parentId==checkData.parentId;
                    })
                    var biEveryAryHas=this.biEveryAry.filter(function (item) {
                        return item.parentId==checkData.parentId;
                    })
                    if(biAllAryNohas.length==0&&biEveryAryHas.length!=0){
                        this.checkTrue(checkData,this.biEveryAry);
                    }else{
                        this.checkTrue(checkData,this.biAllAry);
                    }
                }
                else{/*不选中状态   看原数组中有无这项  有：删除总数组中此项   拼好的数组中  删除此项*/
                    var biAllAryNohas=this.biAllAry.filter(function (item) {
                        return item.parentId==checkData.parentId;
                    })
                    var biEveryAryHas=this.biEveryAry.filter(function (item) {
                        return item.parentId==checkData.parentId;
                    })
                    if(biAllAryNohas.length==0&&biEveryAryHas.length!=0){
                        this.checkFalse(checkData,this.biEveryAry);
                    }else{
                        this.checkFalse(checkData,this.biAllAry);
                    }
                }
                /*点击复选按钮以后得到的新的数组  所有标签都必须满足的数组
                 * 循环拿到的biAllAry数组，把idAry中的数组拼为一个新数组
                 * this.tagRelations先致空  再拼接
                 * */
                this.pingAry();
                this.$nextTick(function () {
                    this.addUserRightScroll.refresh();
                })
            },
            /*选中状态*/
            checkTrue(checkData,aryData){
                this.n++;
                var isHave=aryData.filter(function (item) {
                    return item.parentId==checkData.parentId
                });
                if(isHave.length!=0){/*有当前父级  向后追加*/
                    aryData.map(function (item) {
                        if(item.parentId==checkData.parentId){
                            item.value=item.value+'，'+checkData.name;
                            item.idAry.push(checkData.id);
                        }
                    })
                }else{
                    var idAry=new Array;/*存放逻辑数组*/
                    idAry.push(checkData.id);
                    var obj={
                        "parentId":checkData.parentId,
                        "value":checkData.name,
                        "idAry":idAry
                    }
                    aryData.push(obj);
                }
                this.biSelectAry.push(checkData);/*选中的数组*/
                this.checkdId.push(checkData.id);/*选中项的id数组*/
            },
            /*从选中到未选中状态*/
            checkFalse(checkData,aryData){
                this.n--;
                aryData.map(function (item) {
                    if(item.parentId==checkData.parentId){
                        //item.value=item.value.split('').removeByValue(checkData.value).join(' ，');
                        var tmpl=item.value.split('，');
                        for(var i=0; i<tmpl.length; i++) {
                            if(tmpl[i] == checkData.name) {
                                tmpl.splice(i, 1);
                                break;
                            }
                        }
                        for(var i=0;i<item.idAry.length;i++){
                            if(item.idAry[i] == checkData.id) {
                                item.idAry.splice(i, 1);
                                break;
                            }
                        }
                        item.value=tmpl.join('，');
                    }
                });
                for(var i=0;i<aryData.length;i++){
                    if(aryData[i].value==''&&aryData[i].parentId){
                        aryData.splice(i,1);
                        break;
                    }
                }
                this.checkdId=this.checkdId.filter(function (item) {
                    return item!=checkData.id;
                });
                /*this.biSelectAry=this.biSelectAry.filter(function (item) {
                 return item.id!=checkData.id;
                 });*/
            },
            /*下移*/
            toDown(pId){
                /*通过父级的id  得到上个模块数组总的此项数据  上级块数组删掉此数据  下块增加此条数据*/
                var dowData;
                this.biAllAry.forEach( (item,index)=> {
                    if(item.parentId==pId){
                        this.biEveryAry.push(item);
                        this.biAllAry.splice(index,1);
                    }
                });
                this.pingAry();/*拼接数组函数（得到tagRelations）*/
                this.$nextTick(function () {
                    this.addUserRightScroll.refresh();
                })
            },
            /*上移*/
            toUp(pId){
                /*通过父级的id  得到上个模块数组总的此项数据  上级块数组增加此数据  下块删除此条数据*/
                var dowData;
                this.biEveryAry.forEach( (item,index)=> {
                    if(item.parentId==pId){
                        this.biAllAry.push(item);
                        this.biEveryAry.splice(index,1);
                    }
                });
                this.pingAry();/*拼接数组函数（得到tagRelations）*/
                this.$nextTick(function () {
                    this.addUserRightScroll.refresh();
                })
            },
            /*拼接数组函数（得到tagRelations）*/
            pingAry(){
                this.tagRelations=[];
                this.biAllAry.forEach( (item) =>{
                    this.tagRelations.push(item.idAry);
                });
                var biTmpAry=[];
                this.biEveryAry.forEach( (item) =>{
                    item.idAry.forEach( (curId) =>{
                        biTmpAry.push(curId);
                    })
                })
                this.tagRelations.push(biTmpAry);/*得到向后台发送的总数组*/

                var tagRelationsStr=JSON.stringify(this.tagRelations);
                //console.log('统计用户数');
                this.$http.get('/api/baseTag/queryCount.gm?tagRelations='+tagRelationsStr).then(function (res) {
                    this.statisUsers=res.data.dataInfo;
                    this.saveGroup();
                });
                console.log(JSON.stringify(this.tagRelations));
            },
            /*删除*/
            deleteData(pId){
                /*
                 * 上下两块的数组查找删掉此项
                 * 向后台发送的数据重新拼接(两个接口的数据都要变)
                 * 存储的checkid数组（checkdId）更新删除里面的id
                 * */
                var tmId;
                this.biEveryAry.forEach( (item,index) =>{
                    if(item.parentId==pId){
                        this.biEveryAry.splice(index,1);
                        tmId=item.idAry;
                        return false;
                    }
                });
                this.biAllAry.forEach( (item,index) =>{
                    if(item.parentId==pId){
                        this.biAllAry.splice(index,1);
                        tmId=item.idAry;
                        return false;
                    }
                });

                /*checkid的变化*/
                tmId.forEach((item)=>{
                    this.checkdId=this.checkdId.filter((curid)=>{
                        return curid!=item;
                    })
                });
                this.fourResData.forEach( (item) =>{
                    tmId.forEach(function (cur) {
                        if(item.id==cur){
                            item.checked=false;
                        }
                    })
                });
                this.n=this.checkdId.length;
                this.pingAry();
                this.$nextTick(function () {
                    this.addUserRightScroll.refresh();
                });
                this.saveGroup();
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
                window.location.href='/#/userGroup';
            },
            /*清空列表*/
            clearList(){
                this.checkdId=[];
                this.biSelectAry=[];
                this.biAllAry=[];
                this.biEveryAry=[];
                this.tagRelations=[];
                this.fourResData.forEach(function (item) {
                    item.checked=false;
                });
                this.n=0;
                this.statisUsers={rate: "0%", count: 0};
                this.saveGroup();
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
                this.$http.post(this.addGroupUrl,{"name":this.userGroupName,"tagRelations":JSON.stringify(this.tagRelations)},{emulateJSON:true}).then(function (response) {
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
                this.j=-1;
                var reg=/\s+/g;
                var searchContent=this.addGroupSearchCon.replace(reg,'');
                this.showLoading=true;
                this.$http.get('/api/baseTag/queryListBySearch.gm?searchContent='+searchContent).then(function (response) {
                    this.showLoading=false;
                    this.setFour(response);
                })
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
                    this.addGroupGotoPage='/#/macroView/groupPic';
                }else{//其他页面点击而来  添加到总用户群中
                    this.addGroupUrl='/api/userGroup/save.gm';
                    this.addGroupGotoPage='/#/userGroup';
                }
            },
        }
    }
</script>


