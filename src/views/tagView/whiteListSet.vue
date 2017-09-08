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
                    <input type="text" id="startTime" v-model="startTimes" class="smallTxt">
                    <span>~</span>
                    <input type="text" id="endTime" v-model="endTimes" class="smallTxt">
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
        <h4>用户明细</h4>
        <div class="left messWrap">
            <section class="left">
                <div>
                    <input type="file" name="file" @change="fileSelected" id="fileInput"/>
                </div>
                <span>最近一次成功上传23,00 条数据，当前总用户人数：32,323</span>
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
        <table width="100%" class="tab">
            <thead>
                <tr>
                    <th><input type="checkbox"></th>
                    <th>Passport ID</th>
                    <th>User ID</th>
                    <th>姓名</th>
                    <th>手机</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in queryList">
                    <td><input type="checkbox"></td>
                    <td>{{item.deptRole}}</td>
                    <td>{{item.loginIp}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.type}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped lang="less">
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
        select{
            padding: 3px 2px;
            border: 1px solid #ECECEC;
            border-radius: 2px;
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
</style>
<script>
require('../../assets/css/pages.less');
require('../../assets/css/tab.less');
import * as laydate from '../../assets/laydate/laydate.js';
require('../../assets/laydate/theme/default/laydate.css');
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
        }
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
    methods: {
        //如果存在id 则为编辑
        getWhite(){
            this.$http.get('/api/tagWhiteList/getById.gm?id='+this.id).then(function(res){

            })
        },
        //得到表格数据
        getTabList(){
            var reg=/\s+/g;
            var searchContent=this.shContent.replace(reg,'');
            if(this.shContent==''){
                var url='/api/marketActivity/queryList.gm?pageNum='+this.pageNum+'&date='+Date.now();
            }else{
                var url='/api/marketActivity/queryList.gm?pageNum='+this.pageNum+'&searchContent='+searchContent+'&date='+Date.now();
            }
            this.$http.get(url).then(function(res) {
                if(res.data.code==200){
                    this.pageCount=res.data.dataInfo.pageCount;
                    this.queryList=res.data.dataInfo.dataList;
                    this.gotoPage=this.pageNum;
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
            console.log(this.startTimes,this.endTimes);
            this.$http.post('/api/tagWhiteList/save.gm',{"name":this.tagName,"status":this.status,"beginTimeStr":this.startTimes,"endTimeStr":this.endTimes,"remark":this.remark},{emulateJSON:true}).then(function(res){

            })
        },
        goBack(){
            this.$router.push('/tagView/tagw/tagSet');
        },
        //上传文件
        fileSelected(){
            let fileInput=document.querySelector('#fileInput');
            console.log(fileInput.value);
        }
    }
}
</script>



