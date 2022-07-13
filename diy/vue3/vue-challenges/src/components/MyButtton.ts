import {h} from 'vue'
function myButton (props, context){
    const {disable} = props
    const {emit, slots} = context;
    return h('button',{
        disable,
        onClick:()=>{
            emit('custom-click')
        }
    },slots.default())
}

export default myButton