<template>
    <div class="right rightMenu">
        <ul id="rightMenuUl">
            <li>
                <router-link to="/userGroup/userDetail/groupMain">用户群信息</router-link>
            </li>
            <li>
                <router-link to="/userGroup/userDetail/userLabel">用户标签</router-link>
            </li>
            <li v-if="hasCsv">
                <router-link to="/userGroup/userDetail/downloadLink">CSV下载</router-link>
            </li>
            <li>
                <router-link to="/userGroup/userDetail/liabry">操作日志</router-link>
            </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data(){
            return{
                hasCsv:false,
            }
        },
        mounted(){
            this.setClass();
            this.hasCsv=localStorage.getItem('hasCsv');
        },
        methods:{
            setClass(){
                var oUl=document.querySelector('#rightMenuUl');
                var aLi=oUl.children;
                for(var i=0;i<aLi.length;i++){
                    if(aLi[i].children[0].className=='active'){
                        aLi[i].className='active';
                    }
                }
            }
        }
    }
</script>

