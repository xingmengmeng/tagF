<template>
    <li>
        <div @click='toggle'>
            <!--<i v-if='isFolder' class="fa " :class="[open?'fa-folder-open':'fa-folder']"></i>-->
    　　　　　<!--isFolder判断是否存在子级改变图标-->
            <!--<i v-if='!isFolder' class="fa fa-file-text"></i> -->{{model.data.menuName}}
        </div>
        <ul v-show="open" v-if='isFolder'>
            <items v-for='(cel,index) in model.childTreeNode' :key="index" :model='cel'></items>
        </ul>
    </li>
</template>
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
                return this.model.childTreeNode && this.model.childTreeNode.length;
            }
        },   
        methods:{
            toggle() {
                if(this.isFolder) {
                    this.open = !this.open;
                }
            }
        },
    }
</script>
