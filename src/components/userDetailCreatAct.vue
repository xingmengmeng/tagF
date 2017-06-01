<template>
    <div>
        <div class="detailTitle">
            <h3 v-cloak>{{thisGroupName}}<a href="javascript:;" class="right creatAct" @click="showMark">+创建活动</a></h3>
        </div>
        <!--弹框遮罩 start-->
        <div class="overlay"></div>
        <!--新增活动的弹框-->
        <div class="markWarp markAddAct">
            <div class="markTitle clearfix">
                <h5>新增活动</h5>
                <i class="right close" @click="hideMark">关闭</i>
            </div>
            <ul class="clearfix">
                <li class="clearfix">
                    <label><strong>*</strong>用户群：</label>
                    <span class="left curNameSpan" v-cloak>{{thisGroupName}}</span>
                    <a href="addUserGroup.html" class="creatNew" style="font-size: 12px">想创建新的用户群？</a>
                </li>
                <li class="clearfix">
                    <label><strong>*</strong>对接系统：</label>
                    <select v-model="selected" class="left">
                        <option v-for="op in querySystemList" :value="op" v-cloak>{{op}}</option>
                    </select>
                </li>
                <li class="clearfix">
                    <label><strong>*</strong>主题名称：</label>
                    <input type="text" v-model="subject" class="txt" placeholder="最多输入20个字符">
                </li>
                <li class="clearfix">
                    <label><strong>*</strong>覆盖用户数：</label>
                    <span class="left countNum" v-cloak>{{counts}}</span>
                    <!--<button @click="countNum" class="countBtn">刷新</button>-->
                </li>
                <li class="clearfix saveErrorLi">
                    <span>{{saveError}}</span>
                </li>
                <li class="clearfix btnWrap" style="margin-top: 10px">
                    <input type="button" value="取消" @click="hideMark">
                    <input type="button" value="确定" @click="addUserGroupFn">
                </li>
            </ul>
        </div>
        <!--弹框遮罩 end-->
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return{
                resData:'',
                gropId:'',
                thisGroupName:'',
                selected:'',
                querySystemList:null,/*对接系统列表*/
                subject:'',/*活动主题*/
                counts:'',/*覆盖用户数*/
                saveError:'',
                subject:'',/*主题*/
                status:'',/*当前用户群使用状态*/
            }
        },
        components:{

        },
        mounted(){
            this.getLocal();
        },
        watch: {
            selected: function(val) {
                for(var key in this.querySystemList){
                    if(this.querySystemList[key]==val){
                        this.systemId=key;
                    }
                }
            }
        },
        methods:{
            /*从localstorage里拿到当前的用户群id*/
            getLocal(){
                this.gropId=localStorage.thisGroupId;
                this.thisGroupName=localStorage.thisGroupName;
            },
            /*提交事件*/
            addUserGroupFn(){
                this.getLocalStatus();
                if(this.status==2){
                    this.saveError='当前用户群已失效';
                    return;
                }
                if(this.systemId==''||this.subject==''){
                    this.saveError='对接系统、主题不能为空';
                    return;
                }
                console.log(this.subject);
                var subjectLength=this.subject.gblen();
                if(subjectLength>20){
                    this.saveError='主题最多输入20个字符';
                    return false;
                }
                this.$http.post('/api/marketActivity/save.gm',{"systemCode":this.systemId,"userGroupId":this.gropId,"subject":this.subject},{emulateJSON:true}).then(function (res) {
                    if(res.data.code==200){
                        //window.location.href='pushActivities.html';
                        this.$router.push({path:'/pushActivities'})
                    }else if(res.data.status=='error'){
                        this.saveError=res.data.msg;
                    }
                })
            },
            /*计算活动覆盖用户数*/
            countNum(){
                this.$http.get('/api/userGroup/queryUserCount.gm?id='+this.gropId).then(function (res) {
                    this.counts=res.data.dataInfo;
                })
            },
            /*显示创建活动弹框*/
            showMark(){
                this.saveError='';
                this.selected='';
                this.subject='';
                var overlay=document.querySelector('.overlay'),
                        markWarp=document.querySelector('.markAddAct');
                overlay.style.display=markWarp.style.display='block';
                this.countNum();
                /*计算得到的对接系统列表*/
                this.$http.get('/api/marketActivity/querySystemList.gm').then(function (response) {
                    this.querySystemList=response.data.dataInfo;
                })
            },
            hideMark(){
                var overlay=document.querySelector('.overlay'),
                        markAddAct=document.querySelector('.markAddAct');
                overlay.style.display=markAddAct.style.display='none';
            },
            getLocalStatus(){
                this.status=localStorage.thisGroupStatus;
            }
        }
    }
</script>
