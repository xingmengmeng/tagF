<template>
    <div>
        <h4>权限配置</h4>
        <ul>
            <li>
                <label>部门角色：</label>
                <span>大数据</span>
            </li>
            <li>
                <label>权限描述：</label>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </li>
        </ul>
        <span>编辑标签权限：</span>
        <trees  :model='model' v-for='(model,index) in listData' :key='index'></trees>
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
        resize: none;
    }
</style>
<script>
import successBox from '../../components/successBox.vue';
import trees from '../../components/tree.vue';
export default {
  data(){
      return{
        noticeCon:'',
        showSuccess:false,
        listData:[{
                "id": "1",
                "data": {
                    "menuName": "项目管理",
                    "menuCode": "",
                },
                "childTreeNode": [{
                    "data": {
                        "menuName": "项目",
                        "menuCode": "BusProject",
                    },
                    "childTreeNode": [
                        {
                    "data": {
                        "menuName": "项目2",
                        "menuCode": "BusProject",
                    },}
                    ]
                }, {
                    "data": {
                        "menuName": "我的任务",
                        "menuCode": "BusProject",
                    },
                    "childTreeNode": []
                }, {
                    "data": {
                        "menuName": "人员周报",
                        "menuCode": "BusProject",
                    },
                    "childTreeNode": []
                }]
            }, {
                "id": "2",
                "data": {
                    "menuName": "数据统计",
                    "menuCode": "BusClock",
                },
                "childTreeNode": []
            }, {
                "id": "3",
                "data": {
                    "menuName": "人事管理",
                    "menuCode": "",
                },
                "childTreeNode": []
            }, {
                "id": "4",
                "data": {
                    "menuName": "基础管理",
                    "menuCode": "",
                },
                "childTreeNode": []
            }],
      }
  },
  components:{
    'success-box':successBox,
    trees,
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
