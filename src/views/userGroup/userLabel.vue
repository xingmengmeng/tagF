<template>
    <section class="rightSide">
        <div class="deTail">
            <creat-act></creat-act>
            <section class="clearfix nextWrap">
                <right-menu></right-menu>
                <div class="leftDiv">
                    <div class="con clearfix">
                        <h5 class="listH5">用户标签</h5>
                        <p>
                            <span v-cloak>
                                {{resData}}
                            </span>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import rightMenu from '../../components/userGroupRightMenu.vue';
    import creatAct from '../../components/userDetailCreatAct.vue';
    import LayOut from '../../assets/js/layout';
    export default {
        data(){
            return{
                resData:'',
                gropId:'',
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

