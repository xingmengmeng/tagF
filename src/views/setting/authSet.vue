<template>
    <div>
        <h4>权限配置</h4>
        <ul>
            <li>
                <label>部门角色：</label>
                <span>{{this.name}}</span>
            </li>
            <li>
                <label>权限描述：</label>
                <textarea name="" id="" cols="30" rows="10" v-model="remark"></textarea>
            </li>
        </ul>
        <span>编辑标签权限：</span>
        <!--树级结构-->
        <div>
            <ul>
                <li v-for="(first,index) in listData" :key="index" >
                    <input type="checkbox" :value="first.id" v-model="select"><span>{{first.name}}</span>
                    <ul v-show="isOpen">
                        <li v-for="(second,index) in first.children" :key="index">
                            <input type="checkbox" :value="second.id" v-model="select">{{second.name}}
                            <ul>
                                <li v-for="(three,index) in second.children" :key="index">
                                    <input type="checkbox" :value="three.id" v-model="select">{{three.name}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <input type="button" value="取消" @click="goBack">
        <input type="button" value="保存" @click="saveAuth">
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
export default {
    data(){
        return{
            authId:0,
            noticeCon:'',
            showSuccess:false,
            listData:[],
            name:'',
            remark:'',
            select:[],
            isOpen:false,
        }
    },
    components:{
        'success-box':successBox,
    },
    mounted(){
        this.authId=this.$route.query.id;
        this.getAuth();
    },
    methods:{
        //查看部门内容
        getAuth(){
            this.$http.get('/api/auth/getById.gm?id='+this.authId).then(function(res){
                if(res.data.code=='200'){
                    this.listData=res.data.dataInfo.allTags;
                    this.name=res.data.dataInfo.name;
                    this.remark=res.data.dataInfo.remark;
                    this.select=res.data.dataInfo.selectedList.concat();
                }
            })
        },
        //取消
        goBack(){
            this.$router.push("/setting/auth/authList");
            //window.location.href="/setting/auth/authList";
        },
        //保存
        saveAuth(){
            var ids=this.select.toString();
            this.$http.post('/api/auth/update.gm',{"id":this.authId,"tagIds":ids,"remark":this.remark},{emulateJSON:true}).then(function(res){
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
