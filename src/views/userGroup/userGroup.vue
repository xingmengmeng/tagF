<template>
    <div>
        <router-view></router-view>
        <my-foot></my-foot>
    </div>
</template>
<script type='text/ecmascript-6'>
    import UserList from './userList.vue';
    import Footer from '../../components/footer.vue';

    require('../../assets/css/userGroup.less');
    //import LayOut from '../../assets/js/layout';

    export default {
        mounted(){
            //LayOut.setHeight.init();
        },
        components:{
            'user-list':UserList,
            'my-foot':Footer,
        }
    }

</script>
