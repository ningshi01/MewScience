<script setup >

import { ref,onMounted, onUnmounted, defineProps } from 'vue';
const props = defineProps(['pageIndex']);//页面切换index
const ScrollIndex = ref(0);//滑动定位index

// 转换为fixed
const isTitleFixed = ref(false);
const handleScroll = () => {
  const titleElement = document.querySelector('.i-f-c-c');
  if (titleElement) {
    const rect = titleElement.getBoundingClientRect();
    isTitleFixed.value = rect.top <= 0;
    if(rect.top > 0){
      isTitleFixed.value = false;
    }
  }
};
const monitor = () => {
  const div1 = document.getElementById('firstView')?.getBoundingClientRect();
  const div2 = document.getElementById('secondView')?.getBoundingClientRect();
  const div3 = document.getElementById('thirdView')?.getBoundingClientRect();
  if(div3?.top < 80){
    ScrollIndex.value = 2;
  }else if(div2?.top < 75){
    ScrollIndex.value = 1;
  }else{
    ScrollIndex.value = 0;
  }
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('scroll', monitor);
  // 在适当的时机调用，这里假设你的逻辑需要在 mounted 钩子中执行
  // 如果逻辑发生变化，可以根据实际情况修改
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('scroll', monitor);
});

const introFoot = ref([
  { path1: "Images/intro_f_1_1.jpg",path2: "Images/intro_f_1_2.png",
    path3: "Images/intro_f_1_3.jpg",name: '科技文献' },
  { path1: "Images/intro_f_2_1.png",path2: "Images/intro_f_2_2.png",
    path3: "Images/intro_f_2_3.png",name: '学术期刊' },
  { path1: "Images/intro_f_3_1.jpg",path2: "Images/intro_f_3_2.png",
    path3: "Images/intro_f_3_3.jpg",name: '学者集锦' },
  { path1: "Images/intro_f_4_1.jpg",path2: "Images/intro_f_4_2.png",
    path3: "Images/intro_f_4_3.jpg",name: '专业机构' },
  { path1: "Images/intro_f_5_1.png",path2: "Images/intro_f_5_2.png",
    path3: "Images/intro_f_5_3.png",name: '专利详展' },
  { path1: "Images/intro_f_6_1.png",path2: "Images/intro_f_6_2.png",
    path3: "Images/intro_f_6_3.png",name: '奖项陈列' },
  { path1: "Images/intro_f_7_1.png",path2: "Images/intro_f_7_2.png",
    path3: "Images/intro_f_7_3.png",name: '科研项目' },
]);
function ToIndexIdView(index){
  if(index==='firstView'){
    ScrollIndex.value = 0;
  }else if(index === 'secondView'){
    ScrollIndex.value = 1;
  }else {
    ScrollIndex.value = 2;
  }
  var target = document.getElementById(index)?.offsetTop-75;
  window.scrollTo({
    top: target,
    behavior: 'smooth' // 可选，产生平滑的滚动效果
  });
}
</script>

<template>
<div class="i-f-c-c">
  <div class="title" :class="{ 'title-fixed': isTitleFixed }">
    <div class="title-left">{{ introFoot[props.pageIndex].name }}</div>
    <div class="title-right">
      <div class="title-right-item" :class="{'title-right-item-active': ScrollIndex===0}" @click="ToIndexIdView('firstView')">产品介绍</div>
      <div class="title-right-item" :class="{'title-right-item-active': ScrollIndex===1}" @click="ToIndexIdView('secondView')">产品优势</div>
      <div class="title-right-item" :class="{'title-right-item-active': ScrollIndex===2}" @click="ToIndexIdView('thirdView')">助力产品</div>
    </div>
  </div>
  <div class="module-first">
    <div class="hidden_position"></div>
    <div class="m-f-content-images" id="firstView">
      <img src="../../assets/Images/intro_f_1_1.jpg" class="m-f-content-images-1" v-if="props.pageIndex===0">
      <img src="../../assets/Images/intro_f_2_1.png" class="m-f-content-images-1" v-if="props.pageIndex===1">
      <img src="../../assets/Images/intro_f_3_1.jpg" class="m-f-content-images-1" v-if="props.pageIndex===2">
      <img src="../../assets/Images/intro_f_4_1.jpg" class="m-f-content-images-1" v-if="props.pageIndex===3">
      <img src="../../assets/Images/intro_f_5_1.png" class="m-f-content-images-1" v-if="props.pageIndex===4">
      <img src="../../assets/Images/intro_f_6_1.png" class="m-f-content-images-1" v-if="props.pageIndex===5">
      <img src="../../assets/Images/intro_f_7_1.png" class="m-f-content-images-1" v-if="props.pageIndex===6">
    </div>
  </div>
  <div class="module-second">
    <div class="hidden_position"></div>
    <div class="m-f-content-images" id="secondView">
      <img src="../../assets/Images/intro_f_1_2.png" class="m-f-content-images-2" v-if="props.pageIndex===0">
      <img src="../../assets/Images/intro_f_2_2.png" class="m-f-content-images-2" v-if="props.pageIndex===1">
      <img src="../../assets/Images/intro_f_3_2.png" class="m-f-content-images-2" v-if="props.pageIndex===2">
      <img src="../../assets/Images/intro_f_4_2.png" class="m-f-content-images-2" v-if="props.pageIndex===3">
      <img src="../../assets/Images/intro_f_5_2.png" class="m-f-content-images-2" v-if="props.pageIndex===4">
      <img src="../../assets/Images/intro_f_6_2.png" class="m-f-content-images-2" v-if="props.pageIndex===5">
      <img src="../../assets/Images/intro_f_7_2.png" class="m-f-content-images-2" v-if="props.pageIndex===6">
    </div>
  </div>
  <div class="module-third">
    <div class="hidden_position"></div>
    <div class="m-f-content-images" id="thirdView">
      <img src="../../assets/Images/intro_f_1_3.jpg" class="m-f-content-images-3" v-if="props.pageIndex===0">
      <img src="../../assets/Images/intro_f_2_3.png" class="m-f-content-images-3" v-if="props.pageIndex===1">
      <img src="../../assets/Images/intro_f_3_3.jpg" class="m-f-content-images-3" v-if="props.pageIndex===2">
      <img src="../../assets/Images/intro_f_4_3.jpg" class="m-f-content-images-3" v-if="props.pageIndex===3">
      <img src="../../assets/Images/intro_f_5_3.png" class="m-f-content-images-3" v-if="props.pageIndex===4">
      <img src="../../assets/Images/intro_f_6_3.png" class="m-f-content-images-3" v-if="props.pageIndex===5">
      <img src="../../assets/Images/intro_f_7_3.png" class="m-f-content-images-3" v-if="props.pageIndex===6">
    </div>
  </div>
</div>
</template>

<style scoped>
.i-f-c-c{
  white-space: nowrap;
  padding: 12px;
  width: 100%;
}
.title{
  height: 90px;
  width: 100%;
  color: #333;
  z-index: 1;
}
.title-fixed {
  position: fixed;
  top: 0;
  left: 0;
  height: 90px;
  width: 100%;
  z-index: 1;
  background-color: #f8f8f8;
}
.title-left{
  margin-left: 100px;
  float: left;
  line-height: 80px;
  font-size: 28px;
}
.title-right{
  float: right;
  line-height: 55px;
  font-size: 22px;
}
.title-right-item{
  display: inline-block;
  padding: 15px;
}
.title-right-item-active{
  color: #184880;
  border-bottom: 4px solid #184880;
}
.hidden_position{
  height: 50px;
  width: 100%;
  position: absolute;
  top: -50px;
  left: 0;
  background: transparent;
  z-index: 0;
}
.m-f-content-images{
  width: 100%;
  height: 100%;
}
.m-f-content-images-1 ,.m-f-content-images-3{
  width: 100%;
  height: 100%;
}
.m-f-content-images-2 {
  width: 100%;
  height: 100%;
}
</style>