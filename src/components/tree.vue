<template>
    <li style="padding-left:30px;">
        <input type="checkbox" v-model="$store.state.authAry" :value="model.data.menuName" @click="getAry">
        <div @click='toggle' class="toggleDiv">
            <!--<i v-if='isFolder' class="fa " :class="[open?'fa-folder-open':'fa-folder']"></i>-->
    　　　　　<!--isFolder判断是否存在子级改变图标-->
            <!--<i v-if='!isFolder' class="fa fa-file-text"></i> -->
            <label>{{model.data.menuName}}</label>
        </div>
        <ul v-show="open" v-if='isFolder'>
            <items v-for='(cel,index) in model.childTreeNode' :key="index" :model='cel'></items>
        </ul>
    </li>
</template>
<style lang="less" scoped>
    li{
        list-style: none;
    }
    .toggleDiv{
        display:inline-block
    }
</style>

<script>
    export default {
        name: 'items',
        props: ['model'],
        data(){
            return{
                open: false,
                isFolder: true,
                checkedNames:[],
            }
        },
        computed: {
            isFolder() {
                return this.model.childTreeNode && this.model.childTreeNode.length;//有子节点并且数量不为0即不为空
            }
        },   
        methods:{
            toggle() {
                if(this.isFolder) {
                    this.open = !this.open;
                }
            },
            getAry(){
                console.log(this.$store.state.authAry)
            }
        },
    }
</script>
