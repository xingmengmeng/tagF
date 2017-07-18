<template>
  <div>
      <div class="overlayNew"></div>
      <div class="markWrap">
        <div class="top">标签配置<i class="close" @click="hideOneLine">关闭</i></div>
        <loading v-show="showLoading"></loading> 
        <ul class="ulWrap">
            <li v-for="(item,index) in resData" :key="index">
                <span class="firTitle">{{index}}</span>
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
                        <tr v-for="(curTr,index) in item" :key="index">
                            <td>{{curTr.parentName}}</td>
                            <td>{{curTr.name}}</td>
                            <td><input type="radio" :name="curTr.name" :value="curTr.id" @click="getFilter(curTr.id)"></td>
                            <td><input type="radio" :name="curTr.name" :value="curTr.id" @click="getOutAry(curTr.id)"></td>
                        </tr>
                    </tbody>
                </table>
            </li>
            {{filterAry}}
            {{outputAry}}
        </ul>  
        <div>
            <input type="button" value="取消" @click="goBack">
            <input type="button" value="保存" @click="saveSet">
        </div>
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
        .ulWrap{
            height: 380px;
            overflow-y: scroll;
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
        filterAry:[],//筛选项
        outputAry:[],//输出项
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
                if(res.data.code==200){
                    this.resData=res.data.dataInfo;
                }
            })
        }
    },
    //得到筛选项数组
    getFilter(curId){ 
        if(this.filterAry.indexOf(curId)==-1){//原数组中没有当前项
            this.filterAry.push(curId);
            this.outputAry=this.outputAry.filter(function(cur){
                return cur!=curId;
            })
        }  
    },
    //得到输出项数组
    getOutAry(curId){
        if(this.outputAry.indexOf(curId)==-1){//原数组中没有当前项
            this.outputAry.push(curId);
            this.filterAry=this.filterAry.filter(function(cur){
                return cur!=curId;
            })
        }
    },
    goBack(){

    },
    saveSet(){
        var fil=this.filterAry.join(','),
            outStr=this.outputAry.join(',');
        this.$http.post('/api/tagPortrait/saveConfig.gm',{"filterItem":fil,"outputItem":outStr},{emulateJSON:true}).then(function(res){
            if(res.data.code==200){
                
            }
        })
    },
    hideOneLine(){
        this.$emit('hideOverFn');
    }
  }
  
}
</script>



