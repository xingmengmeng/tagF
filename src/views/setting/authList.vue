<template>
    <div>
        <div class="messWrap">
            <input type="button" value="数据同步" class="left syncUserBtn" @click="syncUserFn">
            <!--分页-->
            <div class="right pages clearfix" @click="getPageData">
                <span class="allPage" v-cloak>1-{{pageCount}}</span>
                <span id="prev">上一页</span>
                <input type="text" class="goTo" v-model="gotoPage" @keyup.enter="gotoPageFn" @blur="getPage">
                <span id="next">下一页</span>
            </div>
        </div>
        <table width="100%" class="tab">
            <thead>
                <tr>
                    <th>部门角色</th>
                    <th>修改时间</th>
                    <th width="40">权限描述</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in queryList">
                    <td>{{item.name}}</td>
                    <td>{{item.deptRoleName}}</td>
                    <td>{{item.loginName}}</td>
                    <td><router-link to="/setting/auth/authSet">编辑</router-link></td>
                </tr>
            </tbody>
        </table>
        <transition name="slide-fade">
            <success-box v-show="showSuccess" cur="同步成功！"></success-box>
        </transition>
    </div>
</template>
<style lang="less" scoped>
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
    .messWrap{
        padding:10px 20px;
        margin-bottom: 10px;
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        .syncUserBtn{
            width: 80px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #DEECFC;
            border:0;
            cursor: pointer;
        }
        .tab{
            margin-top: 10px;
        }
    }

</style>
<script>
import successBox from '../../components/successBox.vue';
require('../../assets/css/pages.less');
require('../../assets/css/tab.less');
const echarts = require('echarts');
export default {
  data () {
      return {
          pageCount:'1',
          pageNum:'1',
          gotoPage:'1',
          queryList:[],//用户数组
          showSuccess:false,
      }
  },
  components: {
      'success-box':successBox,
  },
  mounted () {
      this.getTabList();
  },
  methods: {
      //得到表格数据
      getTabList(){
          var url='/api/user/queryList.gm?pageNum='+this.pageNum;
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
      //数据同步
      syncUserFn(){
          this.$http.get('/api/user/syncUserFromOa.gm').then(function(res){
              if(res.data.code==200){
                  this.showSuccess=true;
                  setTimeout(()=>{
                      this.showSuccess=false;
                  },2000);
                  this.pageNum=this.gotoPage=1;
                  this.getTabList();
              }
          })
      }
  }
}
</script>







