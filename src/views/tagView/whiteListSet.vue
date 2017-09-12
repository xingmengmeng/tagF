<template>
    <div class="whiteWrap">
        <h4>白名单标签</h4>
        <section class="whiteSetUl">
            <ul class="left leftUl" style="position:relative;">
                <li class="clearfix">
                    <label class="lab"><strong>*</strong>标签名称：</label>
                    <input type="text" v-model="tagName" class="langTxt" placeholder="限制20个字符，支持中英文数字">
                </li>
                <li class="clearfix">
                    <label class="lab"><strong>*</strong>状态：</label>
                    <input type="radio" id="unable" value="1" v-model="status"><label for="unable" class="labr">启用</label>
                    <input type="radio" id="ableId" value="0" v-model="status"><label for="ableId">禁用</label>
                </li>
                <li class="clearfix">
                    <label class="lab"><strong>*</strong>有效时间：</label>
                    <input type="text" id="startTime" v-model="startTimes" class="smallTxt" readonly>
                    <span>~</span>
                    <input type="text" id="endTime" v-model="endTimes" class="smallTxt" readonly>
                </li>
                <li>
                    <span class="redFont">{{saveError}}</span>
                </li>
            </ul>
            <div class="right messDetail">
                <label class="lab">描述：</label>
                <textarea v-model="remark"></textarea>
                <div class="btnWrap right">
                    <input type="button" value="取消" @click="goBack">
                    <input type="button" value="保存" @click="saveWhite">
                </div>
            </div>
        </section>
        <h4 v-if="id!==''">用户明细</h4>
        <div class="left messWrap" v-if="id!==''">
            <section class="left">
                <div class="left whiteTool" @mouseenter="toolEnterW" @mouseleave="toolLeaveW">
                    <span>操作</span>
                    <ul class="left" v-show="showTool">
                        <li @click="deleteWhite">删除</li>
                        <li @click="showPushMarket">导入</li>
                        <li @click="downWhite">导出</li>
                    </ul>
                </div>
                <span class="left whiteCount" v-if="whiteTotal">最近一次成功上传{{whiteTotal.uploadCount}}条数据，当前总用户人数：{{whiteTotal.total}}</span>
            </section>

            <!--分页-->
            <div class="right pages clearfix" @click="getPageData">
                <span class="allPage" v-cloak>1-{{pageCount}}</span>
                <span id="prev">上一页</span>
                <input type="text" class="goTo" v-model="gotoPage" @keyup.enter="gotoPageFn" @blur="getPage">
                <span id="next">下一页</span>
            </div>
            <!--搜索-->
            <div class="right searchWrap">
                <input type="text" v-model="shContent" placeholder="输入用户群名称/创建人" @keyup.enter="searchFun(shContent)">
                <button class="searchBtn" @click="searchFun(shContent)"></button>
            </div>
        </div>
        <table width="100%" class="tab" v-if="id!==''">
            <thead>
                <tr>
                    <th><input type="checkbox" @click="selectAll($event)"></th>
                    <th>Passport ID</th>
                    <th>User ID</th>
                    <th>姓名</th>
                    <th>手机</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in queryList" :key="index">
                    <td><input type="checkbox" :value="item.id" v-model="selectAry"></td>
                    <td>{{item.passportId}}</td>
                    <td>{{item.userId}}</td>
                    <td>{{item.userName}}</td>
                    <td>{{item.mobile}}</td>
                </tr>
            </tbody>
        </table>

        <div class="overlay"></div>
        <!--上传白名单弹框-->
        <div class="markWarp markPush">
            <i class="closeMark" @click="hideAll"></i>
            <ul class="pushUl">
                <li class="clearfix">
                    <span class="inputSpan">{{inputCon}}</span>
                    <a href="javascript:;" class="file">选择文件
                        <form id="uploadForm" action="/api/tagWhiteList/importDetail.gm" method="post" enctype="multipart/form-data">
                            <input type="file" name="file" @change="fileSelected" id="fileInput">
                        </form>
                        <!--<input type="file" name="file" @change="fileSelected" id="fileInput">-->
                    </a>
                    <input type="button" value="上传" class="pushBtn" @click="pushFn">
                </li>
                <li class="pushDoe clearfix">
                    <span>支持的文件类型：csv  ，成功上传的新数据将第2天生效。</span>
                    <span class="downLink" @click="downModel">下载模板</span>
                </li>
                <li class="pushMess clearfix" v-show="loadClicking">
                    <span class="loadingSpan" v-show="loading">上传数据中...</span>
                    <span class="pushedMes" v-show="!loading">
                        提示：{{pushMsg}}
                    </span>
                </li>
            </ul>
            
        </div>
        <!--弹框遮罩 start-->
        <!--删除弹框-->
        <div class="markDelet">
            <p>你确定要删除选定的记录吗？</p>
            <div class="btnWrap">
                <input type="button" value="否" @click="hideAll">
                <input type="button" value="是" @click="deletWhiteTrue">
            </div>
        </div>

        <transition name="slide-fade">
            <success-box v-show="showSuccess"></success-box>
        </transition>
        <oneline markCon="请至少选择一条记录" v-show="oneLineShow" @hideOverFn="hideOver"></oneline>
    </div>
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
    .whiteWrap{
        padding-bottom:60px;
        background: #fff;
    }
    h4{
       padding: 10px 20px;
       margin-bottom: 15px;
       width: 100%;
       font-weight: normal;
       font-size:16px; 
       border-bottom: 2px solid #1078F5;
       box-sizing: border-box;
    }
    #loginId{
        width: 100%;
        height: 300px;
        box-sizing: border-box;
        overflow: hidden;
    }
    .messWrap{
        width: 100%;
        padding: 0 20px;
        margin-bottom: 10px;
        box-sizing: border-box;
        .whiteTool{
            position: relative;
            span{
                padding-right:10px;
                float: left;
                width: 60px;
                height: 30px;
                line-height: 30px;
                background:#DEECFC url(../../assets/images/vtoBot2.png) 45px center no-repeat;
                text-align: center;
                box-sizing: border-box;
                cursor: pointer;
            }
            ul{
                position: absolute;
                top:32px;
                width: 100px;
                border: 1px solid #DFDFDF;
                box-shadow: 0 2px 6px 0 rgba(25,32,88,0.44);
                border-radius: 4px;
                background: #fff;
                li{
                    padding:6px 0;
                    width: 100%;
                    text-align: center;
                    box-sizing: border-box;
                    font-size: 12px;
                    cursor: pointer;
                    &:hover{
                        background: #DEECFC;
                    }

                    &:nth-of-type(1){
                        border-bottom: 1px solid #DFDFDF;
                    }
                }
            }
        }
        .whiteCount{
            float: left;
            margin-left: 20px;
            height: 30px;
            line-height: 30px;
        }
    }
    #messSelect{
        width: 120px;
    }
    .tab{
        background: #fff;
    }
    .searchWrap{
      margin: 0 50px 0 auto;
      width: 330px;
      input{
        float: left;
        padding: 0 59px 0 25px;
        width: 346px;
        height: 30px;
        border: 1px solid #B1D2F7;
        border-radius: 26px;
        box-sizing: border-box;
      }
      .searchBtn{
        float: left;
        margin-left: -34px;
        width: 18px;
        height: 30px;
        line-height: 30px;
        background: url(../../assets/images/page_1.png) center no-repeat;
        border: 0;
        cursor: pointer;
      }
    }
    .whiteSetUl{
        padding:0 20px;
        height:160px;
        li{
            margin:10px 0;
        }
        .lab{
            display: inline-block;
            width: 80px;
            text-align: right;
            strong{
                color: #F56010;
            }
        }
        .labr{
            margin-right:20px;
        }
        .langTxt{
            padding:0 10px;
            width: 370px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #ECECEC;
        }
        .smallTxt{
            .langTxt;
            width: 165px;
            background: url(../../assets/images/canl.png) 160px center no-repeat;
        }
        .messDetail{
            label{
                float: left;
            }
            textarea{
                float: left;
                padding:5px 10px;
                width: 440px;
                height: 112px;
                border: 1px solid #ECECEC;
                box-sizing: border-box;
            }
            .btnWrap{
                padding:10px 0;
                clear:left;
                width: 200px;
                input{
                    float: left;
                    width: 80px;
                    height: 30px;
                    border: 0;
                    border-radius: 3px;
                    color: #252525;
                    cursor: pointer;
                    &:nth-of-type(2){
                        float: right;
                        color: #fff;
                        background: #1078f5;
                    }
                }
            }
        }
    }
    .markPush{
        i{
            margin: 5px 10px;
            float: right;
            width: 17px;
            height: 17px;
            background: url(../../assets/images/close.png);
            cursor: pointer;
        }
        .pushUl{
            clear: right;
            padding:25px 25px;
            .inputSpan{
                padding:0 10px;
                float: left;
                width: 322px;
                height: 30px;
                line-height: 30px;
                border: 1px solid #ECECEC;
                box-sizing: border-box;
                overflow: hidden;
            }
            .file{
                margin:0 10px;
                padding:0 8px;
                float: left;
                height: 30px;
                line-height: 30px;
                position: relative;
                cursor: pointer;
                color: #666;
                background: #BAD8FC;
                font-size: 12px;
                overflow: hidden;
                input {
                    position: absolute;
                    font-size: 100px;
                    right: 0;
                    top: 0;
                    opacity: 0;
                    cursor: pointer;
                }
            }
            .pushBtn{
                float: left;
                width: 60px;
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                color: #fff;
                background: #1078F5;
                border:0;
                cursor: pointer;
            }
            .pushDoe{
                font-size: 12px;
                color: #666666;
                .downLink{
                    margin-left: 24px;
                    color: #1078F5;
                    text-decoration: underline;
                }
            }
            .pushMess{
                padding:0 10px;
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-size: 10px;
                color: #666666;
                background: #E5F1FF;
                box-sizing: border-box;
                .loadingSpan{
                    padding-left:20px;
                    background: url(../../assets/images/loadMore.gif) left center no-repeat;
                    box-sizing: border-box;
                }
                .pushedMes{
                    padding-left:20px;
                    background: url(../../assets/images/tishi.png) left center no-repeat;
                    box-sizing: border-box;
                }
            }
        }
    }
    
</style>
<script>
require('../../assets/css/pages.less');
require('../../assets/css/tab.less');
import * as laydate from '../../assets/laydate/laydate.js';
require('../../assets/laydate/theme/default/laydate.css');
import successBox from '../../components/successBox.vue';
import oneline from '../../components/overBoxOneLine.vue';
export default {
    data () {
        return {
            pageCount:'1',
            pageNum:'1',
            gotoPage:'1',
            shContent:'',
            queryList:[],//表格列表
            startTimes:'',
            endTimes:'',
            remark:'',
            tagName:'',
            status:0,
            id:'',
            inputCon:'未选择任何文件',
            loadClicking:false,
            loading:true,
            showTool:false,
            timer:null,
            showSuccess:false,
            saveError:'',
            pushMsg:'',
            selectAry:[],/*删除选中的数组*/
            selectAryAll:[],/*接口返回的所有数据id数组*/
            oneLineShow:false,
            whiteTotal:null,
        }
    },
    components:{
        'success-box':successBox,
        'oneline':oneline,
    },
    mounted () {
        const _this=this;
        if(this.$route.query.id){
            this.id=this.$route.query.id;
            this.getWhite();
        }
        this.getTabList();//table数据
        laydate.render({
            elem: '#startTime', //指定元素
            type:'datetime',
            theme: '#1078f5',
            value: _this.startTimes,
            done(value, date){
                //console.log('你选择的日期是：' + value + '\n获得的对象是' + JSON.stringify(date));
                _this.startTimes=value;
            }
        });
        laydate.render({
            elem: '#endTime', //指定元素
            type:'datetime',
            theme: '#1078f5',
            value: _this.endTimes,
            done(value, date){
                _this.endTimes=value;
            }
        });
    },
    watch:{
        inputCon(str){
            if(str!=='未选择任何文件'){
                this.loadClicking=false;
            }
        }
    },
    methods: {
        //如果存在id 则为编辑
        getWhite(){
            this.$http.get('/api/tagWhiteList/getById.gm?id='+this.id).then(function(res){
                if(res.data.code==200){
                    let resData=res.data.dataInfo;
                    this.tagName=resData.name;
                    this.status=resData.status;
                    this.startTimes=resData.beginTime;
                    this.endTimes=resData.endTime;
                    this.remark=resData.remark;
                }
            })
        },
        //得到表格数据
        getTabList(){
            var reg=/\s+/g;
            var searchContent=this.shContent.replace(reg,'');
            if(this.shContent==''){
                var url='/api/tagWhiteList/queryDetailList.gm?whiteListId='+this.id+'&pageNum='+this.pageNum+'&date='+Date.now();
            }else{
                var url='/api/tagWhiteList/queryDetailList.gm?whiteListId='+this.id+'&pageNum='+this.pageNum+'&searchContent='+searchContent+'&date='+Date.now();
            }
            this.$http.get(url).then(function(res) {
                if(res.data.code==200){
                    this.pageCount=res.data.dataInfo.pageCount;
                    this.queryList=res.data.dataInfo.dataList;
                    this.gotoPage=this.pageNum;

                    this.selectAryAll.length=0;
                    this.queryList.forEach((item)=> {
                        this.selectAryAll.push(item.id);
                    });
                }
            })
            this.$http.get('/api/tagWhiteList/querySummary.gm?whiteListId='+this.id).then(function(res){
                if(res.data.code==200){
                    this.whiteTotal=res.data.dataInfo;
                }
            })
        },
        //分页点击
        getPageData(e){
            if(e.target.innerHTML=='上一页'){
            if(this.pageNum<=1) return;
            this.pageNum--;
            this.getTabList();/*ajax后台获取要显示数据*/
            }else if(e.target.innerHTML=='下一页'){
            if(this.pageNum>=this.pageCount) return;
            this.pageNum++;
            this.getTabList();/*ajax后台获取要显示数据*/
            }
        },
        //分页跳转
        gotoPageFn(){
            if(isNaN(Number(this.gotoPage))){
                this.gotoPage=this.pageNum;
                return;
            }
            if(this.gotoPage<1||this.gotoPage>this.pageCount||this.gotoPage==this.pageNum){
                this.gotoPage=this.pageNum;
                return;
            }else{
                this.pageNum=this.gotoPage;
                this.getTabList();/*ajax后台获取要显示数据*/
            }
        },
        //失去焦点  如果为非数字  则返回原页码
        getPage(){
            if(typeof this.gotoPage !='number'){
                this.gotoPage=this.pageNum;
            }
        },
        searchFun(){
            this.gotoPage=this.pageNum=1;
            this.getTabList();
        },
        //保存白名单
        saveWhite(){
            let obj={};
            if(this.id==''){//新增
                obj={"name":this.tagName,"status":this.status,"beginTimeStr":this.startTimes,"endTimeStr":this.endTimes,"remark":this.remark};
            }else{
                obj={"id":this.id,"name":this.tagName,"status":this.status,"beginTimeStr":this.startTimes,"endTimeStr":this.endTimes,"remark":this.remark};
            }
            this.$http.post('/api/tagWhiteList/save.gm',obj,{emulateJSON:true}).then(function(res){
                if(res.data.code=='200'){
                    this.saveError='';
                    this.id=res.data.dataInfo.id;
                    this.showSuccess=true;
                    setTimeout(()=>{
                        this.showSuccess=false;
                    },2000);
                }else{
                    this.saveError=res.data.msg.replace('参数校验不通过:','');
                }
            })
        },
        goBack(){
            this.$router.push('/tagView/tagw/tagSet');
        },
        //上传文件
        fileSelected(){
            let fileInput=document.querySelector('#fileInput');
            this.inputCon=fileInput.value;
        },
        //删除
        deleteWhite(){
            this.showTool=false;
            if(this.selectAry.length==0){
                this.oneLineShow=true;
                return;
            }
            var overlay=document.querySelector('.overlay'),
                markDelet=document.querySelector('.markDelet');
            overlay.style.display=markDelet.style.display='block';
        },
        deletWhiteTrue(){
            this.$http.delete('/api/tagWhiteList/deleteDetail.gm?ids='+this.selectAry).then(function(res){
                if(res.data.code==200){
                    this.getTabList();
                    this.hideAll();
                }
            })
        },
        //导入
        showPushMarket(){
            this.showTool=false;
            var overlay=document.querySelector('.overlay'),
                markPush=document.querySelector('.markPush');
            overlay.style.display=markPush.style.display='block';
        },
        //导出
        downWhite(){
            this.showTool=false;
            window.location.href='/api/tagWhiteList/exportDetail.gm?id='+this.id;
        },
        //上传
        pushFn(){
            if(this.inputCon=='未选择任何文件'){
                this.loadClicking=true;
                this.loading=false;
                this.pushMsg='请选择上传文件';
            }else{
                const formData = new FormData(document.getElementById('uploadForm'));
                formData.append('id', this.id);
                this.loadClicking=this.loading=true;

                this.$http.post('/api/tagWhiteList/importDetail.gm',formData).then(function(res){
                    if(res.data.code==200){
                        let resd=res.data.dataInfo;
                        this.pushMsg='成功上传了'+resd.successCount+'条数据，失败'+resd.failCount+'条，已删除重复数据'+resd.coverCount+'条';
                        this.getTabList();
                    }else{
                        this.pushMsg=res.data.msg;
                    }
                    this.loading=false;
                })
                /*var vFD = new FormData(document.getElementById('uploadForm')),    //建立请求和数据
                    oXHR = new XMLHttpRequest();
                    vFD.append('id',this.id);
                    oXHR.addEventListener('load', function(resUpload) {
                        //成功
                        console.log('成功');
                    }, false);
                    oXHR.addEventListener('error', function() {
                        console.log('失败');
                        //失败
                    }, false);
                    oXHR.addEventListener('abort', function() {
                        console.log('中断');
                        //上传中断
                    }, false);
                    oXHR.open('POST', '/api/tagWhiteList/importDetail.gm');
                    oXHR.send(vFD);*/
            }
            
        },
        hideAll(){
            var overlay=document.querySelector('.overlay'),
                markDelet=document.querySelector('.markDelet'),
                markPush=document.querySelector('.markPush');
            overlay.style.display=markDelet.style.display=markPush.style.display='none';

            let fileInput=document.querySelector('#fileInput');
            fileInput.value='';
            this.inputCon='未选择任何文件';
            this.loadClicking=false;
        },
        //下载模板
        downModel(){
            window.location.href='/api/tagWhiteList/exportTemplate.gm';
        },
        toolEnterW(){
            clearTimeout(this.timer);
            this.showTool=true;
        },
        toolLeaveW(){  
            this.timer=setTimeout(()=> {
                this.showTool=false;
            },100)
        },
        /*删除  全选*/
        selectAll(e){
            let sel=e.target.checked;
            if(sel){
                this.selectAry=this.selectAryAll.concat();
            }else{
                this.selectAry=[];
            }
        },
        hideOver(){
            this.oneLineShow=false;
        }
    }
}
</script>



