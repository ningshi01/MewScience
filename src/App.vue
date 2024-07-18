<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { accountLogin, accountLogout, queryScienceWorks } from './api';
import { ref, reactive } from 'vue'


</script>

<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-dialog-provider>
        <RouterView />
      </n-dialog-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>


<style scoped>
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0px;
}
</style>
