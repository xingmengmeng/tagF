<template>
  <div>
      <div class="overlayNew"></div>
      <div class="markWrap">
        <div class="top">人群画像指标设置（单条业务线最多勾4项）<i class="close" @click="hideOneLine">关闭</i></div>
        <loading v-show="showLoading"></loading> 
        <ul class="ulWrap">
            <li v-for="(item,index) in resData" :key="index" class="wrapLi">
                <span class="firTitle" @click="changeShowIndex(index)" :class="showIndex==index?'active':''">{{index}}</span>
                <table width="100%" v-show="showIndex==index" class="maxMapTab">
                    <thead>
                        <tr>
                            <th>二级标签</th>
                            <th>三级标签</th>
                            <th>勾选</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(curTr,curIndex) in item" :key="curIndex">
                            <td>{{curTr.parentName}}</td>
                            <td>{{curTr.name}}</td>
                            <td><input type="checkbox" :value="curTr.id" v-model="selectData"></td>
                        </tr>
                    </tbody>
                </table>
            </li>
        </ul>  
        <span class="errSpan clearfix">{{err}}</span>
        <div class="btnWrap clearfix">
            <input type="button" value="取消" @click="hideOneLine">
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
        .errSpan{
            display: block;
            width: 100%;
            height: 16px;
            line-height: 16px;
            margin-left:20px;
            color:rgb(180, 6, 6);
            font-size: 12px;
        }
        .top{
            padding-left:45px;
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
            height: 324px;
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
  data(){
      return {
        resData:[],
        showLoading:false,
        showIndex:-1,
        err:'',
        selectData:[],
      }
  },
  components:{
      loading,
  },
  watch:{
      selectData(){
          this.err='';
      }
  },
  mounted(){
      this.$on('showSetWrap',()=>{
          this.err='';
          this.getData();
      });
  },
  methods:{
    getData(){
        this.showLoading=true;
        this.$http.get('/api/userGroupPortrait/queryConfigList.gm').then(function(res){
            this.showLoading=false;
            if(res.data.code==200){
                this.resData=res.data.dataInfo.allTag;
                this.selectData=res.data.dataInfo.selected;
            }
        })
    },
    saveSet(){
        if(this.selectData.length==0){
            this.err='最少勾选一项指标。';
            return;
        }
        let maxLine=this.countLineNum();
        if(maxLine>4){
            this.err='单条业务线最多勾选4项指标。';
            return;
        }
        var fil=this.selectData.join(',');
        this.$http.post('/api/userGroupPortrait/saveSelfConfig.gm',{"list":fil},{emulateJSON:true}).then(function(res){
            if(res.data.code==200){
                this.err='';
                this.$emit('hideOverFn','changeUrl');
                this.selectData=[];
                this.showIndex=-1;
            }else{
                this.err=res.data.msg;
            }
        })
    },
    hideOneLine(){
        this.$emit('hideOverFn');
        this.selectData=[];
        this.showIndex=-1;
    },
    /*折叠效果*/
    changeShowIndex(index){
        if(this.showIndex==index){
            this.showIndex=-1;
            return;
        }else{
            this.showIndex=index;
        }
    },
    //业务线选中条数
    countLineNum(){
        //得到所有table
        let aTab=document.querySelectorAll('.maxMapTab');
        var max=0;
        for(let i=0;i<aTab.length;i++){
            //得到每个table下的input
            var aInput=aTab[i].querySelectorAll('input');
            var nums=0;
            for(let j=0;j<aInput.length;j++){
                if(aInput[j].checked){
                    nums++;
                }
            }
            if(nums>max){
                max=nums;
            }
        }
        return max;
    }
  }
  
}
</script>



