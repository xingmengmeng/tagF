<template>
    <div>
        <h4>公告</h4>
        <textarea placeholder="在这里输入系统公告" v-model="noticeCon"></textarea>
        <input type="button" value="保存" class="keep" @click="saveNotice"/>
        <transition name="slide-fade">
            <success-box v-show="showSuccess"></success-box>
        </transition>
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
    h4{
        padding: 10px 20px;
        margin-bottom: 15px;
        width: 100%;
        font-weight: normal;
        font-size:16px;
        border-bottom: 2px solid #1078F5;
        box-sizing: border-box;
    }
    textarea{
        width: 90%;
        height: 100px;
        margin:20px 5% 20px 5%;
        padding: 10px;
        box-shadow:3px 2px 3px #cccccc ;
        font-size:13px;
        box-sizing: border-box;
        resize: none;
    }
    .keep{
        position: relative;
        width: 112px;
        height: 30px;
        border-radius: 3px;
        color: #fff;
        border: 0;
        cursor: pointer;
        background: #1078F5;
        float: right;
        font-size: 13px;
        margin-right: 5%;

    }
</style>
<script>
import successBox from '../../components/successBox.vue';
export default {
  data(){
      return{
        noticeCon:'',
        showSuccess:false,
      }
  },
  components:{
    'success-box':successBox,
  },
  methods:{
    saveNotice(){
        this.$http.post('/api/notice/save.gm',{"message":this.noticeCon},{emulateJSON:true}).then(function(res){
            if(res.data.code=='200'){
                this.showSuccess=true;
                setTimeout(()=>{
                    this.showSuccess=false;
                },2000);
                this.$store.state.notice=this.noticeCon;
            }
        })
    }
  }
}
</script>
