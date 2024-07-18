<template>
  <div ref="container" class="container">
    <div class="topBar">
      <img src="@/assets/tempLogo.png" @click="toMainPage" class="logo">
      <h3 class="paperSearch word1" @click="toPaper">论文检索</h3>
      <h3 class="scholarSearch word1" @click="toScholar">学者检索</h3>
      <i class="iconfont icon-gerentouxiang_o user"></i>
      <div class="Username">
      <n-dropdown trigger="hover" :options="options"  >
        ling
      </n-dropdown>
      </div>
    </div>
    <div class="searchContainer">
      <div class="titleContainer">
        <div class="flexContainer">
          <h1 class="title1">Retrieve scholars</h1>
        </div>
      </div>
      <div class="inputContainer">
        <n-input-group class="">
          <n-input-group-label size="large">姓名</n-input-group-label>
          <n-input :style="{ width: '22%' ,height:'50%'}" v-model:value="searchContent" size="large" placeholder="请输入姓名(必填)" />
          <n-input-group-label size="large">科研机构</n-input-group-label>
          <n-input :style="{ width: '50%' ,height:'60%'}" v-model:value="institution" size="large" placeholder="请尽量填写详细" />
          <n-button type="info" class="searchButton" @click="router.push({path:'/scholarSearchList',query:{searchContent:searchContent,institution:institution}})">
            <i class="iconfont icon-sousuo souSuo"></i>
          </n-button>
        </n-input-group>
      </div>

    </div>
    <canvas id="canvas" ref="canvas" />
  </div>
  <div class="PageContainer">
      <img src="@/assets/ScholarPage%20.jpg" width="903" height="801" class="background" alt=" "/>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const searchContent = ref('')
const institution = ref('')
const toMainPage=()=>{
  router.push({ name: 'Introduction' });
}
const toPaper=()=>{
  router.push({ name: 'Earth' });
}
const toScholar=()=>{
  router.push({ name: 'ScholarSearch' });
}

const options= [
  {
    label: '用户资料',
    key: 'profile',

  },
  {
    label: '编辑用户资料',
    key: 'editProfile',

  },
  {
    label: '退出登录',
    key: 'logout',

  }
]
</script>
<style scoped>
.logo:hover{
  cursor: pointer;
}
.word1:hover{
  cursor: pointer;
}
.logo{
  margin-top: 10px;
  margin-left: 100px;
  height: 40px;
}
.searchButton{
  height: 40px;
}
.Username{
  text-decoration:underline;
  margin-top: 15px;
  border-bottom: #181818;
}
.scholarSearch{
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
  width:150px;
}
.paperSearch{
  margin-top: 15px;
  margin-left: 50px;
  font-size: 20px;
  width: 150px;
  font-weight: bold;
}
.PageContainer {
  left: 0%;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}
.background{
  margin-left: 540px;
}

.titleContainer {
  display: flex;
  justify-content: space-between;
}

.flexContainer {
  display: flex;
  align-items: center;
}
.flexContainer h5:hover {
  cursor: pointer;
}
.flexContainer i:hover {
  cursor: pointer;
}
.topBar i{
  font-size:30px;
  color: rgb(128, 128, 128);
}
.user{
  margin-top: 7px;
  font-size:20px;
  margin-left: 680px;
  color: rgb(128, 128, 128);
}

.title1{
  margin-top: 40px;
  font-weight: bold;
  font-style: italic;
  font-size:55px;
  color: black;
}
.searchContainer {
  margin-left: 100px;
  margin-top: 250px;
  width: 73%;
  height: 100%;
  position: absolute;
}

.inputContainer {
  margin-top: 10px;
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  width:65%;
  height: 50px;
}

.container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.topBar{
  z-index: 100;
  width: 1480px;
  position: absolute;
  display: flex;
  flex-direction:row;
}
</style>