<template>
    <div class="whiteWrap">
        <h4>白名单标签</h4>
        <section>
            <ul>
                <li>
                    <label><strong>*</strong>标签名称：</label>
                    <input type="text">
                </li>
                <li>
                    <label><strong>*</strong>状态：</label>
                    <input type="radio" id="unable"><label for="unable">启用</label>
                    <input type="radio" id="ableId"><label for="ableId">禁用</label>
                </li>
                <li>
                    <label><strong>*</strong>有效时间：</label>
                    <input type="text" id="startTime" v-model="startTimes">
                    <span>~</span>
                    <input type="text" id="endTime" v-model="endTimes">
                </li>
            </ul>
            <div class="right">
                <label>描述：</label>
                <textarea></textarea>
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
        <input type="button" value="取消" @click="goBack">
        <input type="button" value="保存" @click="saveWhite">
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
        }
    },
    mounted () {
        const _this=this;
        this.getTabList();//table数据
        laydate.render({
            elem: '#startTime', //指定元素
            type:'datetime',
            theme: '#1078f5',
            done(value, date){
                //console.log('你选择的日期是：' + value + '\n获得的对象是' + JSON.stringify(date));
                _this.startTimes=value;
            }
        });
        laydate.render({
            elem: '#endTime', //指定元素
            type:'datetime',
            theme: '#1078f5',
            done(value, date){
                _this.endTimes=value;
            }
        });
    },
    methods: {
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



