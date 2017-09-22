<template>
    <div>
        <div class="messWrap">
            <input type="button" value="新建部门" class="left syncUserBtn" @click="creatAuth">
            <!--分页-->
            <div class="right pages clearfix" @click="getPageData">
                <span class="allPage" v-cloak>1-{{pageCount}}</span>
                <span id="prev">上一页</span>
                <input type="text" class="goTo" v-model="gotoPage" @keyup.enter="gotoPageFn" @blur="getPage">
                <span id="next">下一页</span>
            </div>
        </div>
        <table width="100%" class="table">
            <thead>
                <tr>
                    <th>部门角色</th>
                    <th>更新时间</th>
                    <th width="40%">权限描述</th>
                    <th width="80"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in queryList" :key="index" @click="trClickFn(item.id,$event)">
                    <td>{{item.name}}</td>
                    <td>{{item.updateTime}}</td>
                    <td>{{item.remark}}</td>
                    <td>
                        <!--<router-link class="listDetailLink" :to="{ path:'/setting/auth/authSet', query: {id:item.id}}">编辑</router-link>-->
                        <a href="javascript:;" class="listDetailLink">编辑</a>
                        <a href="javascript:;" class="listDeleteBtn" v-show="item.useStatus!='已使用'">删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <transition name="slide-fade">
            <success-box v-show="showSuccess" cur="提交成功！"></success-box>
        </transition>
        <!--弹框遮罩 start-->
        <div class="overlay"></div>
        <!--新增活动的弹框-->
        <div class="markWarp addUserGroup">
            <div class="markTitle clearfix">
                <h5>新增部门</h5>
                <i class="right close" @click="hideMark">关闭</i>
            </div>
            <ul class="clearfix">
                <li class="clearfix">
                    <label class="left"><strong>*</strong>部门角色：</label>
                    <input type="text" v-model="authName" placeholder="最多可输入40个字符" class="left txt">
                </li>
                <li class="errorLi clearfix" style="padding:0px 0 0 120px;height: 14px; font-size: 12px; color: #B40606;">
                    <span v-cloak>{{saveError}}</span>
                </li>
                <li class="clearfix btnWrap">
                    <input type="button" value="取消" @click="hideMark">
                    <input type="button" value="确定" @click="saveNewAuth">
                </li>
            </ul>
        </div>

        <!--删除弹框-->
        <div class="markDelet">
            <p>您确定要删除这个部门吗？</p>
            <div class="btnWrap">
                <input type="button" value="否" @click="deletFalse">
                <input type="button" value="是" @click="deleteTrue">
            </div>
        </div>

        <!--弹框遮罩 end-->
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
require('../../assets/css/userGroup.less');
import LayOut from '../../assets/js/layout';
const echarts = require('echarts');
export default {
  data () {
      return {
          pageCount:'1',
          pageNum:'1',
          gotoPage:'1',
          queryList:[],//用户数组
          showSuccess:false,
          authName:'',//部门名称
          saveError:''
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
          var url='/api/auth/queryList.gm?pageNum='+this.pageNum;
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
    /*关闭按钮 隐藏弹框*/
    hideMark(){
        var overlay=document.querySelector('.overlay'),
            markWarp=document.querySelector('.addUserGroup'),
            markDelet=document.querySelector('.markDelet');
        overlay.style.display=markWarp.style.display=markDelet.style.display='none';
    },
    //新建部门
    creatAuth(){
        this.authName=this.saveError='';
        var overlay=document.querySelector('.overlay'),
            markWarp=document.querySelector('.addUserGroup');
        overlay.style.display=markWarp.style.display='block';
    },
    /*提交事件*/
    saveNewAuth(){
        var subjectLength=this.authName.gblen();
        if(subjectLength>40){
            this.saveError='最多可输入40个字符';
            return false;
        }else if(subjectLength==0){
            this.saveError='部门名称不能为空';
            return false;
        }
        this.$http.post('/api/auth/save.gm',{"name":this.authName},{emulateJSON:true}).then(function (res) {
            if(res.data.code==200){
                var overlay=document.querySelector('.overlay'),
                    markWarp=document.querySelector('.addUserGroup');
                /*弹框消失  列表刷新*/
                overlay.style.display=markWarp.style.display='none';
                this.getTabList();
            }else{
                this.saveError=res.data.msg.replace('参数校验不通过:','');
            }
        })
    },
    //点击列表一行效果
    trClickFn(id,e){
        console.log(e.target.innerHTML)
        if(e.target.innerHTML=='删除'){
            this.deleteUserGroup(id);
        }else{
            this.$router.push({ path:'/setting/auth/authSet', query: {id:id}});
        }
    },
    deleteUserGroup(id){
        /*显示弹框  确定否  然后点确定  则删除*/
        var overlay=document.querySelector('.overlay'),
                markDelet=document.querySelector('.markDelet');
        overlay.style.display=markDelet.style.display='block';
        console.log(id);
        localStorage.authDeleteId=id;
    },
    deletFalse(){
        /*取消  关弹框*/
        var overlay=document.querySelector('.overlay'),
            markDelet=document.querySelector('.markDelet');
        overlay.style.display=markDelet.style.display='none';
    },
    deleteTrue(){
        /*确定  删除  关弹框*/
        var id=localStorage.authDeleteId;
        console.log(id);
        this.$http.delete('/api/auth/delete.gm?id='+id).then(function (res) {
            if(res.data.code==200){
                var overlay=document.querySelector('.overlay'),
                    markDelet=document.querySelector('.markDelet');
                overlay.style.display=markDelet.style.display='none';
                /*前台页面列表数组删除此条数据  或者再走一次接口*/
                this.getTabList();
            }
        })
    },
  }
}
</script>







