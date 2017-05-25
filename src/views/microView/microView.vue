<template>
    <div class="micWrap">
        <router-view></router-view>
    </div>
</template>
<style lang="less">
.micWrap{
    background: #fff;
}
</style>
<script type="text/ecmascript-6">
    export default {
        data(){
            return{
            
            }
        },
        mounted(){
            this.setHeight();
        },
        methods:{
            setHeight(){
                var winHeight=document.documentElement.clientHeight;
                var searchBody=document.querySelector('.micWrap');
                searchBody.style.height=winHeight-50+'px';
            }
        }
    }
</script>



