<template>
    <div>
        <h4>权限配置</h4>
        <ul class="ulWraper">
            <li class="fLi">
                <label><strong>*</strong>部门角色：</label>
                <span>{{this.name}}</span>
            </li>
            <li class="fLi">
                <label>权限描述：</label>
                <textarea name="" id="" cols="30" rows="10" v-model="remark"></textarea>
            </li>
            <li class="fLi">
                <label>编辑标签权限：</label>
                <!--树级结构-->
                <div class="treeWrap">
                    <ul>
                        <li v-for="(first,index) in listData" :key="index">
                            <i class="showOrHide" @click="showNext(first,'first')" :class="secondShowId==first.id?'active':''"></i>
                            <input type="checkbox" :value="first.id" v-model="select" @click="changeCheck(first,'first',$event)">
                            <span @click="showNext(first,'first')">{{first.name}}</span>
                            <ul class="secondUl" v-show="secondShowId==first.id">
                                <li v-for="(second,index) in first.children" :key="index">
                                    <i class="showOrHide" @click="showNext(second,'second')"  :class="threeShowId==second.id?'active':''"></i>
                                    <input type="checkbox" :value="second.id" v-model="select" @click="changeCheck(second,'second',$event)">
                                    <span @click="showNext(second,'second')">{{second.name}}</span>
                                    <ul class="threeUl" v-show="threeShowId==second.id">
                                        <li v-for="(three,index) in second.children" :key="index" class="threeTagCl">
                                            <input type="checkbox" :value="three.id" v-model="select" @click="changeCheck(three,'three',$event)">
                                            <span>{{three.name}}</span>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="right btnWrap">
            <input type="button" value="取消" @click="goBack">
            <input type="button" value="保存" @click="saveAuth" class="blue">
        </div>
        
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
    .secondUl{
        padding-left:20px;
    }
    .threeUl{
        margin-left: 48px;
        border-left:2px solid #d8e9fd;
    }
    .ulWraper{
        width: 100%;
        padding:0 20px;
        box-sizing: border-box;
        .fLi{
            float: left;
            margin-bottom:15px;
            width: 100%;
            cursor: pointer;
        }
        label{
            float: left;
            width: 120px;
            text-align: right;
        }
        textarea{
            float: left;
            padding:10px;
            width: 900px;
            height: 77px;
            border: 1px solid #ECECEC;
            box-sizing: border-box;
        }
        strong{
            color: #f9915a;
        }
    }
    .treeWrap{
        float: left;
        li{
            line-height: 180%;
            i{
                display: inline-block;
                margin-right: 10px;
                width: 14px;
                height: 14px;
                background: url(../../assets/images/list_close.png) left 0px no-repeat;
                &.active{
                    background: url(../../assets/images/list_open.png) left 0px no-repeat;
                }
            }
            
            &.threeTagCl{
                padding-left:45px;
                background: url(../../assets/images/icon7.png) left 5px no-repeat;
            }
        }
    }
    .btnWrap{
        input{
            width: 80px;
            height: 30px;
            border: 0;
            border-radius: 3px;
            color: #252525;
            cursor: pointer;
            &.blue{
                background: #1078f5;
                color:#fff;
            }
        }
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
            secondShowId:-1,
            threeShowId:-1,
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
        },
        //保存
        saveAuth(){
            var ids=this.select.toString();
            this.$http.post('/api/auth/update.gm',{"id":this.authId,"tagIds":ids,"remark":this.remark},{emulateJSON:true}).then(function(res){
                if(res.data.code=='200'){
                    //this.$router.push("/setting/auth/authList");
                    this.showSuccess=true;
                    setTimeout(()=>{
                        this.showSuccess=false;
                    },2000);
                }
            })
        },
        changeCheck(item,str,e){
            let id=item.id,
                pId=item.parentId;

            if(e.target.checked){//选中
                if(str=='first'){
                    for(let second of item.children){
                        this.select.push(second.id);
                        for(let three of second.children){
                            this.select.push(three.id);
                        }
                    }        
                }else if(str=='second'){//二级选中
                    //下面的三级都选中
                    for(let three of item.children){
                        this.select.push(three.id);
                    }
                    //上层一级选中
                    for(let first of this.listData){
                        if(first.id==pId){
                            this.select.push(first.id);
                            break;
                        }  
                    }
                }else if(str=='three'){//三级选中
                    //二级选中  一级选中
                    this.select.push(pId);
                    //一级选中
                    let secondPid='';
                    for(let first of this.listData){
                        for(let second of first.children){
                            if(second.id==pId){
                                secondPid=second.parentId;
                                break;
                            };
                        } 
                    }
                    for(let first of this.listData){
                        if(first.id==secondPid){
                            this.select.push(first.id);
                            break;
                        };
                    }
                }
                this.select=[...new Set(this.select)];//去重
            }else{
                if(str=='first'){//一级反选
                    for(let second of item.children){
                        this.select=this.select.filter(cur=>second.id!=cur);
                        for(let three of second.children){
                            this.select=this.select.filter(cur=>three.id!=cur);
                        }
                    }        
                }else if(str=='second'){//二级不选中
                    for(let three of item.children){
                        this.select=this.select.filter(cur=>three.id!=cur);
                    }
                    //判断其一级是不是要选中
                    this.unSelect(pId)   
                }else if(str=='three'){//三级不选中
                    let secondPid='';//二级的父id  一级的id
                    for(let first of this.listData){
                        for(let second of first.children){
                            if(second.id==pId){
                                secondPid=first.id;
                                let firstFlg=false;
                                for(let three of second.children){
                                    let tempAry=this.select.filter(item=>item==three.id);
                                    firstFlg=tempAry.length==0?false:true;
                                    if(firstFlg) break;
                                }
                                if(!firstFlg) this.select=this.select.filter(cur=>pId!=cur);
                                break;
                            }
                        }
                    }
                    this.unSelect(secondPid);
                } 
            }
            console.log(this.select);
        },
        //二级不选中  判断其一级父级是不是选中
        unSelect(pId){
            for(let first of this.listData){
                if(first.id==pId){//得到其一级父级
                    let firstFlg=false;
                    for(let second of first.children){
                        let tempAry=this.select.filter(item=>item==second.id);
                        firstFlg=tempAry.length==0?false:true;
                        if(firstFlg) break;
                    }
                    if(!firstFlg) this.select=this.select.filter(cur=>pId!=cur);
                    break;
                }
            }
        },
        showNext(item,str){
            if(str=='first'){
                if(this.secondShowId==item.id){
                    this.secondShowId=-1;
                    return;
                }
                this.secondShowId=item.id;
            }else if(str=='second'){
                if(this.threeShowId==item.id){
                    this.threeShowId=-1;
                    return;
                }
                this.threeShowId=item.id;
            }
        }
    }
}
</script>
