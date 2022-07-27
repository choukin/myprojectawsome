<template>
    <div>
        <p>Name export <code>useA</code>:{{a}}</p>
        <p>Name export <code>useB</code>:{{b}}</p>
        <p>Name export <code>useC</code>:{{c}}</p>
        <p>Name export <code>useD</code>:{{d}}</p>
        <p>Name export <code>useFoo</code>:{{foo}}</p>
    </div>
</template>

<script setup lang="ts">
const a = useA();
const b = useB();
const c = useC();
const d = useD();
const foo = useFoo()
</script>

<style scoped>

</style>