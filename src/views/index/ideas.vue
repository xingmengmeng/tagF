<template>
    <section>
        <div class="overlayNew"></div>
        <div class="markWrap" v-cloak>
            <div class="top">意见反馈<i class="close" @click="hideBox">关闭</i></div>
            <textarea placeholder="在此描述您的意见和建议..." @keyup="changeBtn" v-model="textaresCon"></textarea>
            <span class="left enStr">{{enterStr}}</span>
            <input type="button" class="btn" value="提交" :class="clickable?'hasCon':''" :disabled="!clickable" @click="subMess">
        </div>
    </section>
</template>
<style lang="less" scoped>
    .markWrap{
        position: fixed;
        z-index: 10003;
        background: #fff;
        top:50%;
        left: 50%;
        margin:-150px 0 0 -400px;
        width: 800px;
        height: 300px;
        color:#333;
        .top{
            padding-left:45px;
            height: 40px;
            line-height: 40px;
            background: #F7FAFE url(../../assets/images/icon2_2.png) 20px center no-repeat;
            border-bottom: 1px solid #DDEDFF;
            box-sizing: border-box;
            .close{
                float: right;
                margin:10px 15px 0 0;
                width: 17px;
                height: 17px;
                background: url(../../assets/images/close.png);
                font-size: 0;
                cursor: pointer;
            }
        }
        textarea{
            margin:20px 0 20px 30px;
            width: 740px;
            height: 170px;
            padding:10px;
            font-size: 12px;
            border: 1px #ddd solid;
            box-sizing: border-box;
        }
        .enStr{
            margin-left:30px;
        }
        .btn{
            float: right;
            margin-right:30px;
            width: 112px;
            height: 30px;
            border-radius: 3px;
            color: #333;
            border: 0;
            background: #ddd; 
            &.hasCon{
                color: #fff;
                background: #1078f5;
                cursor: pointer;
            }
        }
    }
</style>
<script>
    import '../../assets/js/layout.js';
    export default {
        data(){
            return{
                textaresCon:'',
                clickable:false,
                maxNum:400,//最多输入字数
                enterNum:400,//还可输入字数
                enterStr:'您还可以输入200个字',
            }
        },
        methods:{
            changeBtn(){
                let strLength=this.textaresCon.gblen();
                this.clickable=(strLength==0||strLength>this.maxNum)?false:true;
                this.enterNum=Math.floor((this.maxNum-strLength)/2);
                if(strLength>this.maxNum){
                    this.enterStr='已超出'+(Math.abs(this.enterNum))+'个字';
                }else{
                    this.enterStr='您还可以输入'+this.enterNum+'个字';
                }
            },
            subMess(){
                this.$http.post('/api/feedback/save.gm',{"content":this.textaresCon},{emulateJSON:true}).then(function(res){
                    if(res.data.code==200){
                        this.textaresCon='';
                        this.$emit('hideOverFn','saveSuccess');
                        //this.$emit('hideOverFn');
                    }
                })
            },
            hideBox(){
                this.textaresCon='';
                this.$emit('hideOverFn');
            },
        }
    }
</script>