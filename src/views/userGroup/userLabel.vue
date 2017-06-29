<template>
    <section class="rightSide">
        <div class="deTail">
            <creat-act></creat-act>
            <section class="clearfix nextWrap">
                <right-menu></right-menu>
                <div class="leftDiv">
                    <div class="con clearfix">
                        <h5 class="listH5">用户标签</h5>
                        <div id="tagWrap">
                            <!--<span v-cloak>
                                {{resData}}
                            </span>-->
                            <div v-for="(item,index) in resDataAry" :key="index">
                                <span class="left" v-if="item.length>1">（</span>
                                <div class="left" v-for="(curTag,index) in item" :key="index">
                                    <span class="left ffTag">{{curTag}} </span>
                                    <i v-if="index!=item.length-1" class="left orClass">或</i>
                                </div>
                                <span class="left" v-if="item.length>1">）</span>
                                <i v-if="index!=resDataAry.length-1" class="left andClass">且</i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>
<style scoped lang="less">
#tagWrap{
    span{
        margin: 5px 0;
        padding:5px;
    }
}
.andClass{
    margin: 5px 0;
    padding:5px;
    color:#1078f5;
    font-style: normal;
}
.orClass{
    margin: 5px 0;
    padding:5px;
    font-style: normal;
}
#tagWrap .ffTag{
    /*padding:5px 20px;
    background: #d0e6ff;
    border-radius: 5px;*/
    padding:4px 20px;
    border:1px solid #9BC9FF;
    border-radius: 57px;
}
</style>

<script type="text/ecmascript-6">
    import rightMenu from '../../components/userGroupRightMenu.vue';
    import creatAct from '../../components/userDetailCreatAct.vue';
    import LayOut from '../../assets/js/layout';
    export default {
        data(){
            return{
                resData:'',
                gropId:'',
                resDataAry:[],
            }
        },
        components:{
            'right-menu':rightMenu,
            'creat-act':creatAct,
        },
        mounted(){
            this.getLocal();
            this.getData();
            LayOut.setHeight.init();
        },
        methods:{
            getData(){
                /*用户标签*/
                this.$http.get('/api/userGroup/tagRelation/queryDetail.gm?userGroupId='+this.gropId).then(function (response) {
                    this.resData=response.data.dataInfo;
                    this.resData=this.resData.replace(/or/ig,function () {
                        return '或';
                    });
                    this.resData=this.resData.replace(/and/ig,function () {
                        return '且';
                    });
                    var reg1=/\s+且\s+/g,reg2=/\s+或\s+/g;
                    var array1=this.resData.split(reg1);
                    var newAry=[],aryss=[];
                    array1.forEach((item)=> {
                        var newAry=[];
                        newAry=item.split(reg2);
                        newAry=newAry.map((item)=>{
                            item=item.replace(/\（|\）/g,'');
                            return item;
                        })
                        this.resDataAry.push(newAry);
                    }, this);
                });
            },
            /*从localstorage里拿到当前的用户群id*/
            getLocal(){
                this.gropId=localStorage.thisGroupId;
                this.thisGroupName=localStorage.thisGroupName;
            },
        }
    }
</script>

