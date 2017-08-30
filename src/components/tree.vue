<template>
    <li style="padding-left:30px;">
        <input type="checkbox" v-model="$store.state.authAry" :value="model.id" @click="getAry">
        <div @click='toggle' class="toggleDiv">
            <!--<i v-if='isFolder' class="fa " :class="[open?'fa-folder-open':'fa-folder']"></i>-->
    　　　　　<!--isFolder判断是否存在子级改变图标-->
            <!--<i v-if='!isFolder' class="fa fa-file-text"></i> -->
            <label>{{model.name}}</label>
        </div>
        <ul v-show="open" v-if='isFolder'>
            <items v-for='(cel,index) in model.children' :key="index" :model='cel'></items>
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
            }
        },
        computed: {
            isFolder() {
                return this.model.children && this.model.children.length;//有子节点并且数量不为0即不为空
            }
        },   
        methods:{
            /*
                1、从服务器拿到数据，为每个item设置checked属性
                2、计算选中的数量selectCount,如果选中的数量与selectItems的数量相等，则全选selectAll选中
                3、点全选时，将每个item的checked属性置为true，反选时置为false，
                4、每次selectItems的属性发生变化时，都将checked的为true的item放入数组checkedGroups中
            */
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
