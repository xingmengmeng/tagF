<template>
    <section class="setWrap">
        <h4>版本说明</h4>
        <ul class="tagUl">
            <li>
                <label>版本号：</label>
                <select v-model="versonNo" class="versonS" @change="showDetail">
                    <option :value="cur.id" v-for="cur in listData">{{cur.versionName}}</option>
                </select>
                <span class="newVersionn" @click="showNewVersion">+新建</span>
            </li>
            <li>
                <label>更新时间：</label>
                <input type="text" v-model="updateTime" class="txtMin">
            </li>
            <li class="clearfix">
                <label>原子标签：</label>
                <textarea  v-model="tagCon" class="txt"></textarea>
            </li>
            <li class="clearfix">
                <label>产品功能：</label>
                <textarea  v-model="proCon" class="txt"></textarea>
            </li>
        </ul>
        
        <input type="button" @click="deleteFn" class="deleteBtn" value="删除">
        <input type="button" @click="saveFn" class="saveBtn" value="保存">
        <span class="errorSpan redFont">{{errorV}}</span>
        
        <transition name="slide-fade">
            <success-box v-show="showSuccess" :cur="succCon"></success-box>
        </transition>
        <!--弹框遮罩 start-->
        <div class="overlay"></div>
        <div class="markWarp">
            <div class="markTitle clearfix">
                <h5>新建版本</h5>
                <i class="right close" @click="hideMark">关闭</i>
            </div>
            <ul class="clearfix addUserGroup">
                <li class="clearfix">
                    <label class="left"><strong>*</strong>版本号：</label>
                    <input type="text" v-model="versionName" placeholder="最多可输入20个字符" class="left txt">
                </li>
                <li class="errorLi clearfix" style="padding:0px 0 0 95px;height: 14px; font-size: 12px; color: #B40606;">
                    <span v-cloak>{{savaError}}</span>
                </li>
                <li class="btnWrap" style="margin-top: 10px">
                    <input type="button" value="取消" @click="hideMark">
                    <input type="button" value="确定" @click="addVersionbFn">
                </li>
            </ul>
        </div>
        <!--删除弹框-->
        <div class="markDelet">
            <p>您确定要删除这个版本记录吗？</p>
            <div class="btnWrap">
                <input type="button" value="否" @click="deletFalse">
                <input type="button" value="是" @click="deleteTrue">
            </div>
        </div>
        <!--弹框遮罩 end-->
    </section>
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
    .newVersionn{
        padding:5px;
        color:#1078F5;
        cursor: pointer;
    }
    .errorSpan{
        float: right;
        margin-top:29px;
    }
    .setWrap{
        height: 100%;
        overflow: hidden;
        h4{
            width: 100%;
            padding: 10px 20px;
            margin-bottom: 15px;
            width: 100%;
            font-weight: normal;
            font-size:16px; 
            border-bottom: 2px solid #1078F5;
            box-sizing: border-box;
        }
    }  
    .tagUl{
        margin-top:20px;
        padding:0px 20px;
        li{
            display: flex;
            margin-top:10px;
        }
        label{
            float: left;
            padding:4px 0;
            width: 80px;
            margin-right:20px;
            text-align: right;
        }
        .txtMin{
            width: 186px;
            padding:3px 5px;
            box-sizing: border-box;
        }
        .versonS{
            .txtMin;
        }
        .txt{
            flex: 1;
            padding:5px;
            width: 100%;
            height: 120px;
            box-sizing: border-box;
        }
    }
    .saveBtn{
        float: right;
        margin:20px 0px 0 10px;
        width: 112px;
        height: 30px;
        border-radius: 3px;
        color: #fff;
        border: 0;
        cursor: pointer;
        background: #1078F5;
        float: right;
        font-size: 13px;
    }
    .deleteBtn{
        .saveBtn;
        margin-right: 20px;
        width: 50px;
        background: none;
        color:#333;
    }
</style>
<script>
    import successBox from '../../components/successBox.vue';
    export default {
        data(){
            return{
                versonNo:'',
                updateTime:'',
                tagCon:'',
                proCon:'',
                showSuccess:false,
                listData:[],
                savaError:'',
                versionName:'',
                succCon:'保存成功',
                errorV:'',
            }
        },
        components:{
            'success-box':successBox,
        },
        mounted(){
            this.getList();
        },
        methods:{
            getList(){
                this.$http.get('/api/version/querySelectList.gm').then(function(res){
                    if(res.data.code==200){
                        this.listData=res.data.dataInfo;
                        if(this.listData.length!=0){
                            this.versonNo=this.listData[0].id;
                            this.showDetail();
                        }
                    }
                })
            },
            //显示所选版本
            showDetail(){
                this.$http.get('/api/version/getById.gm?id='+this.versonNo).then(function(res){
                    if(res.data.code==200){
                        let resD=res.data.dataInfo;
                        this.updateTime=resD.versionDate;
                        this.tagCon=resD.tagContent;
                        this.proCon=resD.functionContent;
                    }
                })
            },
            //
            showNewVersion(){
                this.savaError='';
                var overlay=document.querySelector('.overlay'),
                        markWarp=document.querySelector('.markWarp');
                overlay.style.display=markWarp.style.display='block';
                this.versionName='';
            },
            hideMark(){
                var overlay=document.querySelector('.overlay'),
                        markWarp=document.querySelector('.markWarp');
                overlay.style.display=markWarp.style.display='none';
            },
            //保存版本号
            addVersionbFn(){
                if(this.versionName==''){
                    this.savaError='版本号不能为空';
                    return false;
                }else{
                    var versionNameLength=this.versionName.gblen();
                    if(versionNameLength>20){
                        this.savaError='最多输入20个字符';
                        return false;
                    }  
                }
                this.$http.post('/api/version/save.gm',{"versionName":this.versionName},{emulateJSON:true}).then(function (res) {
                   if(res.data.code==200){
                       this.hideMark();
                       this.getList();
                       this.versionName='';
                   }
                })
            },
            //保存编辑的版本信息
            saveFn(){
                if(this.versonNo==''){
                    this.errorV='请先选择版本号!';
                    return;
                }else{
                    this.errorV='';
                }
                var tagConLength=this.tagCon.gblen();
                if(tagConLength>1000){
                    this.errorV='原子标签描述最多只能输入500个字';
                    return false;
                }
                var proCon=this.proCon.gblen();
                if(proCon>1000){
                    this.errorV='功能描述最多只能输入500个字';
                    return false;
                }
                this.$http.post('/api/version/update.gm',{"id":this.versonNo,"versionDate":this.updateTime,"tagContent":this.tagCon,"functionContent":this.proCon},{emulateJSON:true}).then(function (res) {
                   if(res.data.code==200){
                        this.succCon="保存成功！";
                        this.showSuccess=true;
                        setTimeout(()=>{
                            this.showSuccess=false;
                        },2000);
                   }
                })
            },
            deleteFn(id){
                if(this.versonNo==''){
                    this.errorV='请先选择版本号!';
                    return;
                }else{
                    this.errorV='';
                }
                /*显示弹框  确定否  然后点确定  则删除*/
                var overlay=document.querySelector('.overlay'),
                        markDelet=document.querySelector('.markDelet');
                overlay.style.display=markDelet.style.display='block';
                localStorage.userGroupDeleteId=id;
            },
            deletFalse(){
                /*取消  关弹框*/
                var overlay=document.querySelector('.overlay'),
                        markDelet=document.querySelector('.markDelet');
                overlay.style.display=markDelet.style.display='none';
            },
            deleteTrue(){
                /*确定  删除  关弹框*/
                this.$http.delete('/api/version/delete.gm?id='+this.versonNo).then(function(res){
                    if(res.data.code=='200'){
                        this.deletFalse();
                        this.succCon="删除成功！";
                        this.showSuccess=true;
                        setTimeout(()=>{
                            this.showSuccess=false;
                        },2000);
                        this.getList();
                    }
                })
            },
        }
    }
</script>
