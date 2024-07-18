<script setup >
import {ref, onMounted, onUnmounted, defineProps, watch} from 'vue';

const props = defineProps(['flag'])
watch(props.flag, (newValue) => {
  // 在 Flag_login 变化时进行相应的操作
  console.log('子组件Flag_login 变化为', newValue);
});
onMounted(()=>{
  console.log('子组件2：'+props)
})
const isNavOpen = ref(false);
let threshold;

// 监听鼠标移动事件，控制导航的显示和隐藏
const handleMouseMove = (event) => {
  const distanceFromLeft = event.clientX;

  isNavOpen.value = distanceFromLeft <= threshold;
  if (isNavOpen.value) {
    threshold = 200;
  } else {
    threshold = 50;
  }
};

// 在组件挂载时添加鼠标移动事件监听
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

// 在组件销毁时移除鼠标移动事件监听
onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<template>
  <transition name="slide">
    <div class="sider-nav-right" v-if="isNavOpen">
      <n-list clickable>
        <template #header>
          <router-link to="/Introduction" class="nav-item">
          <div class="nav-item"><span>主页</span></div>
          </router-link>
        </template>
        <template #footer>
          <router-link to="/" class="nav-item">
          <div class="nav-item"><span>设置</span></div>
          </router-link>
        </template>
        <n-list-item>
          <router-link to="/Earth" class="nav-item">
          <div class="nav-item"><span>文献</span></div>
          </router-link>
        </n-list-item>
<!--        <n-list-item>-->
<!--          <router-link to="/workSearchList" class="nav-item">-->
<!--          <div class="nav-item"><span>期刊</span></div>-->
<!--          </router-link>-->
<!--        </n-list-item>-->
        <n-list-item>
          <router-link to="/ScholarSearch" class="nav-item">
          <div class="nav-item"><span>学者</span></div>
          </router-link>
        </n-list-item>
        <n-list-item>
          <router-link to="/RankList" class="nav-item">
          <div class="nav-item"><span>推荐</span></div>
          </router-link>
        </n-list-item>
<!--        <n-list-item>-->
<!--          <router-link to="/Introduction" class="nav-item">-->
<!--          <div class="nav-item"><span>收藏</span></div>-->
<!--          </router-link>-->
<!--        </n-list-item>-->
        <n-list-item v-if="props.flag">
          <router-link to="/userInfo" class="nav-item">
          <div class="nav-item"><span>个人中心</span></div>
          </router-link>
        </n-list-item>
        <n-list-item v-if="props.flag">
          <router-link to="/messageCenter" class="nav-item">
          <div class="nav-item"><span>消息中心</span></div>
          </router-link>
        </n-list-item>

      </n-list>
    </div>
  </transition>
</template>

<style scoped>
.sider-nav-right {
  position: fixed;
  top: 0;
  left: 50px;
  width: 150px;
  height: 100vh;
  background-color: #f8f8f8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 998;
}

.nav-item {
  margin-bottom: 10px;
  font-family: Arial,"Microsoft YaHei","微软雅黑";
  text-decoration: none; /* 取消下划线 */
}

.nav-item a {
  color: #222222; /* 设置默认颜色 */
  text-decoration: none; /* 取消下划线 */
}


.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter, .slide-leave-to {
  transform: translateX(-100%);
}
</style>
