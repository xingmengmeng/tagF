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
        <section class="rightSide clearfix">
            <div class="app appList clearfix">
                <div class="group-tool">
                    <div class="left">
                        <router-link to="/userGroup/addUserGroup">+ 添加用户群</router-link>
                    </div>
                    <!--分页-->
                    <div class="right clearfix" @click="getPageData">
                        <span class="allPage" v-cloak>1-{{pageCount}}</span>
                        <span id="prev">上一页</span>
                        <input type="text" class="goTo" v-model="gotoPage" @keyup.enter="gotoPageFn">
                        <span id="next">下一页</span>
                    </div>
                    <!--搜索-->
                    <div class="center">
                        <div class="searchWrap">
                            <input type="text" v-model="shContent" placeholder="输入用户群名称/创建人" @keyup.enter="searchFun(shContent)">
                            <button class="searchBtn" @click="searchFun(shContent)"></button>
                        </div>
                    </div>
                </div>
                <table class="table" width="100%">
                    <thead>
                    <tr>
                        <th>序列号</th>
                        <th>用户群名称</th>
                        <th>标签条件数</th>
                        <th>状态</th>
                        <th>创建人</th>
                        <th>所属部门</th>
                        <th>创建时间</th>
                        <th width="10%">&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in list" @click="setIdLocal(item.id,item.name,item.status,$event)">
                        <td v-cloak>{{item.sno}}</td>
                        <td v-cloak>{{item.name}}</td>
                        <td v-cloak>{{item.tagCount}}</td>
                        <td v-cloak>{{item.status==0?'禁用':(item.status==2?'失效':'启用')}}</td>
                        <td v-cloak>{{item.creater}}</td>
                        <td v-cloak>{{item.createrLine}}</td>
                        <td v-cloak>{{item.createTime}}</td>
                        <td>
                            <a class="listDetailLink">详情</a>
                            <a class="macLink" v-if="item.status==1" :href="'/macroView/groupPic?id='+item.id">宏观</a>
                            <a href="javascript:;" @click="deleteUserGroup(item.id,$event)" class="listDeleteBtn" v-show="item.useStatus=='未使用'" v-if="item.createrId&&item.createrId=='canDel'">删除</a>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <!--弹框遮罩 start-->
                <div class="overlay"></div>

                <!--删除弹框-->
                <div class="markDelet">
                    <p>删除此用户群将删除其相关的活动信息和标签信息，您确定要删除该用户群吗？</p>
                    <div class="btnWrap">
                        <input type="button" value="否" @click="deletFalse">
                        <input type="button" value="是" @click="deleteTrue">
                    </div>
                </div>

                <!--弹框遮罩 end-->
            </div>
        </section>
        <!--右侧大块 end-->
    </section>
</template>
<script type='text/ecmascript-6'>
    import LayOut from '../../assets/js/layout';
    export default{
        data(){
            return{
                list:[],
                searchContent:'',
                pageNum:1,/*当前显示的列表 页码  第几页 默认为第一页 全局变量*/
                gotoPage:1,
                shContent:'',
                pageCount:1,
            }
        },
        mounted(){
            this.getUrlPage();
            this.getData();
            this.urlHashChange();
            LayOut.setHeight.init();
        },
        computed: {
            allChecked: {
                get: function(){
                    return this.checkedCount == this.list.length;
                },
                set: function(value){
                    this.list.forEach(function(item){
                        item.checked = value
                    })
                    return value;
                }
            },
            checkedCount: {
                get: function(){
                    var i = 0;
                    this.list.forEach(function(item){
                        if(item.checked == true) i++;
                    })
                    return i;
                }
            },
        },
        methods:{
            //得到地址栏中的当前页码数  history设置
            getUrlPage(){
                var url=window.location.href,
                        urlReg=/([^?=&#]+)=([^?=&#]+)/g,
                        urlObj={};
                url.replace(urlReg,function ($0,$1,$2) {
                    //console.log(arguments);
                    urlObj[$1]=$2;
                });
                if(urlObj['page']){//浏览器退回的page
                    this.pageNum=urlObj['page'];
                }else{//单独请求的页面
                    this.pageNum=1;
                }
                if(urlObj['scon']){
                    this.shContent=urlObj['scon'];
                }else{
                    this.shContent='';
                }

            },
            //哈希值变化
            urlHashChange(){
                window.onhashchange= () =>{
                    //console.log('哈希值变化');
                    this.getUrlPage();
                    this.getData();
                }
            },
            getData(){
                if(this.shContent==''){
                    var url='/api/userGroup/queryList.gm?pageNum='+this.pageNum+'&date='+Date.now();
                    //history.pushState({page:this.pageNum},'page','#page='+this.pageNum);
                }else{
                    var url='/api/userGroup/queryList.gm?pageNum='+this.pageNum+'&searchContent='+this.shContent+'&date='+Date.now();
                }
                this.$http.get(url).then(function (response) {
                    this.list=response.data.dataInfo.dataList;
                    this.pageCount=response.data.dataInfo.pageCount;
                    this.gotoPage=this.pageNum;
                });
            },
            /*deleteUserGroup(id){
             this.$http.delete('http://www.mengmeng.com/api/userGroup/delete.gm?id='+id).then(function (response) {
             if(response.data.code==200){
             this.list=this.list.filter(function (item) {
             return item.id!=id;
             });
             }
             });
             },*/
            deleteUserGroup(id){
                /*显示弹框  确定否  然后点确定  则删除*/
                var overlay=document.querySelector('.overlay'),
                        markDelet=document.querySelector('.markDelet');
                overlay.style.display=markDelet.style.display='block';
                localStorage.userGroupDeleteId=id;
            },
            deletFalse(){
                /*取消  关弹框*/
                var overlay=document.querySelector('.overlay'),
                        markDelet=document.querySelector('.markDelet');
                overlay.style.display=markDelet.style.display='none';
            },
            deleteTrue(){
                /*确定  删除  关弹框*/
                var id=localStorage.userGroupDeleteId;
                this.$http.delete('/api/userGroup/delete.gm?id='+id).then(function (res) {
                    if(res.data.code==200){
                        var overlay=document.querySelector('.overlay'),
                                markDelet=document.querySelector('.markDelet');
                        overlay.style.display=markDelet.style.display='none';
                        /*前台页面列表数组删除此条数据  或者再走一次接口*/
                        this.list=this.list.filter(function (item) {
                            return item.id!=id;
                        });
                    }
                })
            },
            searchFun(con){/*用户群列表搜索的回车及点击搜索标事件  con为当前文本框的value*/
                this.gotoPage=this.pageNum=1;
                history.pushState({page:this.pageNum},'page','#/userGroup#page=1'+'&scon='+this.shContent);
                this.getData();/*ajax后台获取要显示数据*/
            },
            getPageData(e){
                if(e.target.innerHTML=='上一页'){
                    if(this.pageNum<=1) return;
                    this.pageNum--;
                    history.pushState({page:this.pageNum},'page','#/userGroup#page='+this.pageNum+'&scon='+this.shContent);
                    this.getData();/*ajax后台获取要显示数据*/
                }else if(e.target.innerHTML=='下一页'){
                    if(this.pageNum>=this.pageCount) return;
                    this.pageNum++;
                    history.pushState({page:this.pageNum},'page','#/userGroup#page='+this.pageNum+'&scon='+this.shContent);
                    this.getData();/*ajax后台获取要显示数据*/
                }
            },
            gotoPageFn(){
                if(this.gotoPage<1||this.gotoPage>this.pageCount||this.gotoPage==this.pageNum){
                    this.gotoPage=this.pageNum;
                    history.pushState({page:this.pageNum},'page','#/userGroup#page='+this.pageNum+'&scon='+this.shContent);
                    return;
                }else{
                    this.pageNum=this.gotoPage;
                    history.pushState({page:this.pageNum},'page','#/userGroup#page='+this.pageNum+'&scon='+this.shContent);
                    this.getData();/*ajax后台获取要显示数据*/
                }
            },
            /*点击详情  本地存储用户群的id值  localStorage*/
            setIdLocal(id,curName,status,e){
                var event=window.event||e;
                if(event.target.innerHTML!='删除'){
                    this.$router.push({path:'userGroup/userDetail/groupMain'})
                }
                localStorage.thisGroupId=id;
                localStorage.thisGroupName=curName;
                localStorage.thisGroupStatus=status;
            }
        }
    }

</script>
