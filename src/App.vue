<template>
  <nav>
  App {{$store.state.user.profile.nickname}}<button @click="$store.commit('user/setUser',{nickname:'Vue3'})">点击姓名</button>
  </nav>
</template>
<script>
// import {  } from "vuex";
</script>
<style lang="less">

</style>
