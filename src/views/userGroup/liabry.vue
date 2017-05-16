<template>
    <section class="rightSide">
        <div class="deTail">
            <creat-act></creat-act>
            <section class="clearfix nextWrap">
                <right-menu></right-menu>
                <div class="leftDiv">
                    <div class="con clearfix">
                        <h5 class="listH5">操作日志</h5>
                        <div class="logScroll">
                            <ul class="logList">
                                <li class="clearfix" v-for="evLibray in librayData">
                                    <p class="left">
                                        <span v-cloak>{{evLibray.operator}}</span>
                                        <span v-cloak>{{evLibray.operationType}}</span>
                                        <span v-cloak>{{evLibray.operationContent}}</span>
                                    </p>
                                    <span class="right times" v-cloak>{{evLibray.operationTimeStr}}</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    </section>
</template>
<script type="text/ecmascript-6">
    import rightMenu from '../../components/userGroupRightMenu.vue';
    import creatAct from '../../components/userDetailCreatAct.vue';

    const IScroll=require('iscroll');
    import LayOut from '../../assets/js/layout';

    export default {
        data(){
            return{
                groupId:'',
                pageNum:'1',
                librayData:[],
                thisGroupName:'',
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
                this.$http.get('/api/operationLog/queryList.gm?userGroupId='+this.groupId+'&pageNum='+this.pageNum).then(function (res) {
                    this.librayData=res.data.dataInfo;
                    this.$nextTick(function(){
                        this.addUserLeftScroll=new IScroll('.logScroll',{
                            mouseWheel: true,
                            scrollbars: true,
                            checkDOMChanges:true,
                            bounce: false
                        });
                    })
                })
            },
            getLocal(){
                this.groupId=localStorage.thisGroupId;
                this.thisGroupName=localStorage.thisGroupName;
            },
        }
    }
</script>

