<template>
    <div>
        <draggable v-model="tags" :move="getdata" @update="datadragEnd">
            <transition-group>
                <div v-for="element in tags" :key="element.id">
                    {{element.name}}
                </div>
            </transition-group>
    </draggable>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
    data(){
        return{
            tags:[{
                name:1,
                id:1
            }]
        }
    },
    components:{
        draggable
    },
    methods:{
        getdata (evt) {
            console.log(evt.draggedContext.element.id)
        },
        datadragEnd (evt) {
            console.log('拖动前的索引 :' + evt.oldIndex)
            console.log('拖动后的索引 :' + evt.newIndex)
            console.log(this.tags)
        }
    }
}
</script>
