<template>
    <div>
        <h1>Vue Dragable</h1>

        <div class="drag">
            <h2>List 1 v-dragable-for</h2>
            <draggable id="list1" :list="list1" class="dragArea" :options="{group:{name:'people', put:false }}" @change="log">
                <div v-for="(element, index) in list1"  :key="index">
                    {{element.name}} {{index}}
                </div>
             </draggable>
             <h2>List 1 v-dragable-for</h2>
             <draggable id="list1" :list="list3" class="dragArea" :options="{group:{name:'people', pull:'clone', put:false }}" @change="log">
                <div v-for="(element, index) in list3"  :key="index">
                    {{element.name}} {{index}}
                </div>
             </draggable>

            <h2>List 2 v-dragable-for</h2>
            <draggable id="list2" :list="list2" class="dragArea" :options="{group:'people'}" @change="log">
                <div v-for="(element, index)  in list2"  :key="index">{{element.name}}</div>
             </draggable>
         </div>

        <div class="normal">
            <h2>List 1 v-for</h2>
            <div>
                <div v-for="(element, index) in list1" :key="index">{{element.name}}</div>
             </div>

            <h2>List 2 v-for</h2>
            <div>
                <div v-for="(element, index) in list2" :key="index">{{element.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
    data(){
        return{
            list1:[{name:"111", id:1}, 
				{name:"111", id:2}, 
				{name:"111", id:3},
				{name:"111", id:4} ],
            list2:[{name:"Juan", id:5}, 
                {name:"Edgard", id:6}, 
                {name:"Johnson", id:7} ],
            list3:[{name:"222", id:8}, 
                {name:"222", id:9}, 
                {name:"222", id:10} ],
        }
    },	
    components:{
        draggable
    },
	methods:{
			add: function(){
				this.list.push({name:'Juan'});
			},
			replace: function(){
				this.list=[{name:'Edgard'}]
			},
			clone: function(el){
				return {
					name : el.name + ' cloned'
				}
			},
			log: function (evt){
				console.log(evt)
			}
		},
}
</script>
