<template>
    <section class="setWrap">
        <h4>标签加工</h4>
        <ul class="tagUl">
            <li>
                <label>版本号：</label>
                <select v-model="versonNo" class="versonS">
                    <option value="d">2.2</option>
                </select>
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
        <input type="button" @click="saveFn" class="saveBtn" value="保存">
        <transition name="slide-fade">
            <success-box v-show="showSuccess"></success-box>
        </transition>
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
            padding-left:100px;
            width: 100%;
            height: 120px;
            box-sizing: border-box;
        }
    }
    .saveBtn{
        float: right;
        margin:20px 20px 0 0;
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
            }
        },
        components:{
            'success-box':successBox,
        },
        methods:{
            //保存
            saveFn(){
                console.log(this.proCon);
                /*this.$http.post('/api/notice/save.gm',{"message":this.noticeCon},{emulateJSON:true}).then(function(res){
                    if(res.data.code=='200'){
                        this.showSuccess=true;
                        setTimeout(()=>{
                            this.showSuccess=false;
                        },2000);
                        this.$store.state.notice=this.noticeCon;
                    }
                })*/
            }
        }
    }
</script>
