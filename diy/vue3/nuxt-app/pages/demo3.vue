<template>
    <div>
        <!-- SSR teleport -->
        <Teleport to="body">
            SSR Teleport
        </Teleport>

<!-- client Teleport -->
        <ClientOnly>
            <Teleport to="body">
                <div>来自客户端的teleport{{$router}}</div>
            </Teleport>

        </ClientOnly>
        <MyModal/>
    </div>
</template>

<script setup>
import MyModal from '~~/components/MyModal.vue';

</script>

<style lang="scss" scoped>

</style>