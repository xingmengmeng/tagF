<template>
    <section class="setWrap">
        <h4>标签加工</h4>
        <ul class="tagUl">
            <li>
                <label>月新增标签：</label>
                <input type="text" v-model="monthTag" class="txtMin">
            </li>
            <li>
                <label>季新增标签：</label>
                <input type="text" v-model="monthAllTag" class="txtMin">
            </li>
            <li>
                <label>年新增标签：</label>
                <input type="text" v-model="yearTag" class="txtMin">
            </li>
        </ul>
        <input type="button" @click="saveFn" class="saveBtn" value="保存">
        <span class="errorSpan redFont">{{errorV}}</span>
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
            margin-top:10px;
        }
        label{
            margin-right: 20px;
        }
        .txtMin{
            width: 186px;
            padding:3px 5px;
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
    .errorSpan{
        float: right;
        margin-top:29px;
    }
</style>
<script>
    import successBox from '../../components/successBox.vue';
    export default {
        data(){
            return{
                monthTag:'',
                monthAllTag:'',
                yearTag:'',
                showSuccess:false,
                errorV:'',
            }
        },
        components:{
            'success-box':successBox,
        },
        methods:{
            //保存
            saveFn(){
                if(this.monthTag==''||this.monthAllTag==''||this.yearTag==''){
                    this.errorV='三个字段必填，不能为空！';
                    return;
                }

                this.$http.post('/api/handleProcess/save.gm',{"monthCount":this.monthTag,"quarterCount":this.monthAllTag,"yearCount":this.yearTag},{emulateJSON:true}).then(function(res){
                    if(res.data.code=='200'){
                        this.showSuccess=true;
                        setTimeout(()=>{
                            this.showSuccess=false;
                        },2000);
                    }
                })
            }
        }
    }
</script>
