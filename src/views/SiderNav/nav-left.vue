<script setup lang="ts">
import { ref,onMounted, onUnmounted, defineProps ,watch} from 'vue';
import {SearchOutlined,BlockOutlined,SettingTwotone} from "@vicons/antd"
import {IosBook,MdStar,MdRibbon} from "@vicons/ionicons4"
import {PersonCircleSharp,Wifi} from "@vicons/ionicons5"
import {MessageOutlined} from "@vicons/material"

const props = defineProps(['flag']);
watch(props.flag, (newValue) => {
  // 在 Flag_login 变化时进行相应的操作
  console.log('子组件Flag_login 变化为', newValue);
});
onMounted(()=>{
  console.log('子组件1：'+props)
})
</script>

<template>
  <div class="sider-nav-left">
    <n-list clickable>
      <template #header>
        <router-link to="/Introduction">
          <n-icon size="27">
          <!--主页-->
            <BlockOutlined />
          </n-icon>
        </router-link>
      </template>
      <template #footer>
        <router-link to="/userInfo">
          <n-icon size="27">
            <!--设置-->
            <SettingTwotone />
          </n-icon>
        </router-link>
      </template>
      <n-list-item>
        <router-link to="/Earth">
          <n-icon size="27">
            <!--文献-->
            <SearchOutlined />
          </n-icon>
        </router-link>
      </n-list-item>
<!--      <n-list-item>-->
<!--        <router-link to="/workSearchList">-->
<!--          <n-icon size="27">-->
<!--            &lt;!&ndash;期刊&ndash;&gt;-->
<!--            <IosBook />-->
<!--          </n-icon>-->
<!--        </router-link>-->
<!--      </n-list-item>-->
      <n-list-item>
        <router-link to="/ScholarSearch">
          <n-icon size="27">
            <!--学者-->
            <MdRibbon />
          </n-icon>
        </router-link>
      </n-list-item>
      <n-list-item>
        <router-link to="/RankList">
          <n-icon size="27">
            <!--推荐-->
            <Wifi />
          </n-icon>
        </router-link>
      </n-list-item>
<!--      <n-list-item>-->
<!--        <router-link to="/Introduction">-->
<!--          <n-icon size="27">-->
<!--            &lt;!&ndash;收藏&ndash;&gt;-->
<!--            <MdStar />-->
<!--          </n-icon>-->
<!--        </router-link>-->
<!--      </n-list-item>-->
      <n-list-item v-if="props.flag">
        <router-link to="/userInfo">
          <n-icon size="27">
            <!--个人中心-->
            <PersonCircleSharp />
          </n-icon>
        </router-link>
      </n-list-item>
      <n-list-item v-if="props.flag">
        <router-link to="/messageCenter">
          <n-icon size="27">
            <!--消息中心-->
            <MessageOutlined />
          </n-icon>
        </router-link>
      </n-list-item>
    </n-list>
  </div>
</template>

<style scoped>

.sider-nav-left {
  position: fixed;
  top: 0;
  left: 0;
  top:0;
  width: 50px;
  height: 100vh;
  background-color: #f8f8f8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 999;
}

.nav-item {
  margin-bottom: 10px;
  font-family: Arial,"Microsoft YaHei","微软雅黑";
}

.nav-item a {
  color: #222222; /* 设置默认颜色 */
  text-decoration: none; /* 取消下划线 */
}
</style>