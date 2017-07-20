<template>
  <div>
      <div class="overlayNew"></div>
      <div class="markWrap">
        <div class="top">标签配置<i class="close" @click="hideOneLine">关闭</i></div>
        <loading v-show="showLoading"></loading> 
        <ul class="ulWrap">
            <li v-for="(item,index) in resData" :key="index" class="wrapLi">
                <span class="firTitle" @click="changeShowIndex(index)" :class="showIndex==index?'active':''">{{index}}</span>
                <table width="100%" v-show="showIndex==index">
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
                            <td><input type="radio" :name="curTr.name" :value="curTr.id" :id="'radio'+curTr.id" @click="getFilter(curTr.id)"></td>
                            <td><input type="radio" :name="curTr.name" :value="curTr.id" :id="'radio2'+curTr.id" @click="getOutAry(curTr.id)"></td>
                        </tr>
                    </tbody>
                </table>
            </li>
        </ul>  
        <div class="btnWrap clearfix">
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
            padding-left:40px;
            height: 40px;
            line-height: 40px;
            background: #F7FAFE url(../assets/images/icon9.png) 20px center no-repeat;
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
            margin:10px 0;
            padding:0px 20px;
            height: 340px;
            box-sizing: border-box;
            overflow-y: scroll;

            .wrapLi{
                width: 100%;
                span{
                    padding-left:55px;
                    margin-top:10px;
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    background: #F7FAFE url(../assets/images/showNext2.png) 30px center no-repeat;
                    border: 1px solid #DDEDFF; 
                    box-sizing: border-box;
                    cursor: pointer;
                    &.active{
                        height: 40px;
                        line-height: 40px;
                        background: #F7FAFE url(../assets/images/showNext.png) 30px center no-repeat;
                    }
                    &:hover{
                        border: 1px solid #ADD2FF;
                    }
                }
            }
        }
        .firTitle{
            display: inline-block;
            width: 100%;
        }
        table{
            text-align: center;
            max-height: 150px;
            border: 1px solid #DDEDFF;
            border-top:0;
            overflow-y: scroll;
            th{
                height: 30px;
                line-height: 30px;
                background: #F7FAFE;
                border-bottom: 1px solid #DDEDFF;
            }
            td{
                height: 30px;
                line-height: 30px;
                color: #757575;
                border-top: 1px solid #DDEDFF;
                border-bottom: 1px solid #DDEDFF;
            }
        }
        .btnWrap{
            display: flex;
            flex-direction: row;
            justify-content:center;
            input{
                margin:0 10px;
                width: 80px;
                height: 30px;
                border: 0;
                background: #1078F5;
                border-radius: 2px;
                color:#fff;
                cursor: pointer;
                &:first-of-type{
                    background: #D8D8D8;
                    color: #252525;
                }
            }
        }
    }
</style>
<script>
import loading from '../components/loading.vue';
export default {
  props:['filterSelected','outputSelected'],
  data(){
      return {
        resData:[],
        showLoading:false,
        filterAry:[],//筛选项
        outputAry:[],//输出项
        showIndex:-1,
      }
  },
  components:{
      loading,
  },
  mounted(){
      this.getData();
      this.$on('showSetWrap',()=>{
          console.log(this.filterSelected);
          console.log(this.outputSelected);
      });
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
        }else{
            var oRadio=document.querySelector('#radio'+curId);
            oRadio.checked = false;
            this.filterAry=this.filterAry.filter(function(cur){
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
        }else{
            var oRadio=document.querySelector('#radio2'+curId);
            oRadio.checked = false;
            this.outputAry=this.outputAry.filter(function(cur){
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
                this.$emit('hideOverFn','changeUrl');
            }
        })
    },
    hideOneLine(){
        this.$emit('hideOverFn');
    },
    /*折叠效果*/
    changeShowIndex(index){
        if(this.showIndex==index){
            this.showIndex=-1;
            return;
        }else{
            this.showIndex=index;
        }
    }
  }
  
}
</script>



