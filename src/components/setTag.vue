<template>
  <div>
      <div class="overlayNew"></div>
      <div class="markWrap">
        <div class="top">标签配置<i class="close" @click="hideOneLine">关闭</i></div>
        <loading v-show="showLoading"></loading> 
        <ul>
            <li>
                <span class="firTitle">人口统计</span>
                <table width="100%">
                    <thead>
                        <tr>
                            <th>二级标签</th>
                            <th>三级标签</th>
                            <th>筛选项</th>
                            <th>输出项</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>自然属性</td>
                            <td>性别</td>
                            <td><input type="radio" name="sex"></td>
                            <td><input type="radio" name="sex"></td>
                        </tr>
                    </tbody>
                </table>
            </li>
        </ul>  
      </div>
  </div>
</template>
<style lang="less" scoped>
    .markWrap{
        position: fixed;
        z-index: 10003;
        background: #fff;
        top:50%;
        left: 50%;
        margin:-225px 0 0 -350px;
        width: 700px;
        height: 450px;
        color:#333;
        .top{
            padding-left:20px;
            height: 40px;
            line-height: 40px;
            background: #F7FAFE;
            border-bottom: 1px solid #DDEDFF;
            box-sizing: border-box;
            .close{
                float: right;
                margin:10px 15px 0 0;
                width: 17px;
                height: 17px;
                background: url(../assets/images/close.png);
                font-size: 0;
                cursor: pointer;
            }
        }
        .firTitle{
            display: inline-block;
            width: 100%;
        }
        table{
            text-align: center;
        }
    }
</style>
<script>
import loading from '../components/loading.vue';
export default {
  data(){
      return {
        resData:[],
        showLoading:false,
      }
  },
  components:{
      loading,
  },
  mounted(){
      this.getData();
  },
  methods:{
    getData(){
        if(this.resData.length==0){
            this.showLoading=true;
            this.$http.get('/api/tagPortrait/queryConfigList.gm').then(function(res){
                this.showLoading=false;
                if(this.res.code=='200'){
                    
                }
            })
        }
    },
    hideOneLine(){
        this.$emit('hideOverFn');
    }
  }
  
}
</script>



