
<script>
import {check} from '@/utils/auth'
export default {
    functional:true,
    props:{
        authority:{
            type:Array,
            required:true
        }
    },
    render(h,context){
        console.log(h);
        const {props, scopedSlots} = context;
        return check(props.authority) ? scopedSlots.default(): null;
    }
}
</script>

<style>

</style>