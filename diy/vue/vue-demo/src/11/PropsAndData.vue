<template>
    <div>
        <div>{{names}}</div>
        <div>{{info}}</div>
        <div>{{list}}</div>
    </div>
</template>
<script>
export default {
    props:{
        names:{
            type:String,
        },
        info:Object,
        list:Array,
    }
}
</script>