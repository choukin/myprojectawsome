<template>
    <div>
        <template v-if="user">
        <a-alert :message="`你登陆了`+logins+`次`"></a-alert>
        <a-button @click="logout">退出</a-button>
        </template>
        <template v-else>
            <h1>登陆</h1>
            <a-input v-model:value="name" placeholder="输入姓名" />
            <a-button @click="login">登录</a-button>
        </template>
    </div>
</template>

<script setup lang="ts">
 const user = useCookie<{name:string}>('user')
 const logins = useCookie<number>('logins')
 const name = ref('')

 const login = ()=>{
    logins.value = (logins.value || 0)+1
    user.value = {name:name.value}
 }

 const logout = ()=>{
    user.value = null
 }
</script>

<style scoped>

</style>