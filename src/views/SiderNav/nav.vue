<script setup>
import NavRight from "./nav-right.vue";
import NavLeft from "./nav-left.vue";
import {ref,onMounted,watch} from "vue";
import {whoAmI} from "@/api";

const flagKey = ref(0);
const Flag_login = ref(false);
function updateFlag(){
  whoAmI({}).then((res)=>{
    console.log('开始进行赋值给Flag，此时errno为'+res.errno)
    if(res.errno!==0){
      Flag_login.value = false
      console.log('赋值为false')
    }else{
      Flag_login.value = true
      console.log('赋值为true')
    }
  })
}
onMounted(()=>{
  updateFlag();
})
// 使用 watch 监听 Flag_login 的变化，并在变化时通知子组件
watch(Flag_login, (newValue) => {
  console.log('Flag_login 变化为', newValue);
  flagKey.value++;
});
</script>

<template>
  <nav-left :flag="Flag_login"  :key="flagKey"></nav-left>
  <nav-right :flag="Flag_login" :key="flagKey"></nav-right>
</template>

<style scoped>
body{
  position: absolute;
  top: 0;
}
</style>
