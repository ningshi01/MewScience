<script setup >
import SiderNav from "../SiderNav/nav.vue"
import IntroHCBg from "./intro-h-c-bg.vue";
import IntroFC from "./intro-f-c.vue";
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {accountLogout, whoAmI} from "@/api";
import {useRouter} from "vue-router";
import {PersonCircleSharp} from "@vicons/ionicons5";

const Page_index = ref(0);
function updatePageIndex(newPageIndex) {
  Page_index.value = newPageIndex;
}
const reloadKey = ref(0);

const containerWidth = ref(window.innerWidth);
const introImages = ref([
  { path: '../../assets/Images/intro_1_1.png', name: '科技文献' },
  { path: '../../assets/Images/intro_2_1.png', name: '学术期刊' },
  { path: '../../assets/Images/intro_3_1.png', name: '学者集锦' },
  { path: '../../assets/Images/intro_4_1.png', name: '专业机构' },
  { path: '../../assets/Images/intro_5_1.png', name: '专利详展' },
  { path: '../../assets/Images/intro_6_1.png', name: '奖项陈列' },
  { path: '../../assets/Images/intro_7_1.png', name: '科研项目' },
]);
onMounted(() => {

  const handleResize = () => {
    containerWidth.value = window.innerWidth;
    location.reload(); // 重新加载整个页面
  };
  changeImageSrc(0);
  window.addEventListener('resize', handleResize);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    location.reload(); // 重新加载整个页面
  });
});
function changeImageSrc(index) {
  Page_index.value = index;
  console.log('Page_index.value改为'+Page_index.value)
}
function test() {
  console.log("执行Exit测试")

  accountLogout({}).then(res => {
    console.log(res)
  })
}


function checkAndTo(router){
  whoAmI().then((res)=>{
    if(res.errno!==0){
      router.push({path:'Login'});
    }else{
      router.push({path:'userInfo'});
    }
  })
}
</script>

<template>
<SiderNav></SiderNav>
<div class="forLogin">
  <n-icon size="50" title="登录/个人中心" @click="checkAndTo($router)">
    <PersonCircleSharp />
  </n-icon>
</div>
<div class="Container">
  <div class="content">
    <div class="h-content">
      <div class="h-content-pre">数据中心<br>Database</div>
      <intro-h-c-bg :key="reloadKey"></intro-h-c-bg>
    </div>
<!--    <button @click="test">按钮</button>-->
    <div class="m-content">
      <n-scrollbar x-scrollable trigger="hover" default="default">
        <div class="image-container">
<!--          <div-->
<!--              v-for="(image, index) in introImages"-->
<!--              :key="index"-->
<!--              @click="changeImageSrc(index)"-->
<!--              :class="['image-item', {'image-item-first': index === 0, 'image-item-last': index === introImages.length - 1}]"-->
<!--          >-->
<!--            <img src="../../assets/Images/intro_1_1.png">-->
<!--            <img :src="image.path" alt="image.alt" class="image" :id="'intro_' + (index + 1)"/>-->
<!--            <div class="image-item-footer">{{ image.name }}</div>-->
<!--          </div>-->
          <div class="image-item-first" @click="changeImageSrc(0)">
            <img src="../../assets/Images/intro_1_1.png" alt="image.alt" class="image" id="intro_1" v-if="Page_index.value!==0"/>
            <div class="image-item-footer">科技文献</div>
          </div>
          <div class="image-item" @click="changeImageSrc(1)">
            <img src="../../assets/Images/intro_2_1.png" alt="image.alt" class="image" id="intro_2" v-if="Page_index.value!==0"/>
            <div class="image-item-footer">学术期刊</div>
          </div>
          <div class="image-item" @click="changeImageSrc(2)">
            <img src="../../assets/Images/intro_3_1.png" alt="image.alt" class="image" id="intro_3" v-if="Page_index.value!==0"/>
            <div class="image-item-footer">学者集锦</div>
          </div>
          <div class="image-item" @click="changeImageSrc(3)">
            <img src="../../assets/Images/intro_4_1.png" alt="image.alt" class="image" id="intro_4" v-if="Page_index.value!==0"/>
            <div class="image-item-footer">专业机构</div>
          </div>
          <div class="image-item" @click="changeImageSrc(4)">
            <img src="../../assets/Images/intro_5_1.png" alt="image.alt" class="image" id="intro_5" v-if="Page_index.value!==0"/>
            <div class="image-item-footer">专利详展</div>
          </div>
          <div class="image-item" @click="changeImageSrc(5)">
            <img src="../../assets/Images/intro_6_1.png" alt="image.alt" class="image" id="intro_6" v-if="Page_index.value!==0"/>
            <div class="image-item-footer">奖项陈列</div>
          </div>
          <div class="image-item" @click="changeImageSrc(6)">
            <img src="../../assets/Images/intro_7_1.png" alt="image.alt" class="image" id="intro_7" v-if="Page_index.value!==0"/>
            <div class="image-item-footer">科研项目</div>
          </div>
        </div>
      </n-scrollbar>
    </div>
    <div class="f-content">
      <intro-f-c :pageIndex="Page_index" @updatePageIndex="updatePageIndex"></intro-f-c>
    </div>
  </div>
</div>
</template>

<style scoped>
.Container {
  width: 100vw;
  height: 200vh;
  display: flex;
}
.content{
  flex: 1;
  width: 100%;
  flex-direction: column;
  display: flex;
}
.h-content {
  flex: 6; /* 占整个容器的 50% */
  width: 100%;
  display: flex;
  border: 0px solid #2c3e50; /* 边框宽度和颜色 */
  border-radius: 10px; /* 设置圆角的半径，根据需要调整 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 设置阴影，根据需要调整 */
}
.h-content-pre {
  position: absolute;
  top: 25%;
  left: 0;
  height: 142px;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 60px;
  z-index: 2;
  font-weight: bold;
  letter-spacing: 20px;
  margin-bottom: 22px;
  line-height: 64px;
}

.m-content {
  flex: 3; /* 占整个容器的 20% */
  width: 100vw;
  display: flex;
  border: 0px solid #2c3e50; /* 边框宽度和颜色 */
  border-radius: 10px; /* 设置圆角的半径，根据需要调整 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 设置阴影，根据需要调整 */
}

.f-content {
  flex: 10; /* 占整个容器的 30% */
  width: 100vw;
  display: flex;
  border: 0px solid #2c3e50; /* 边框宽度和颜色 */
  border-radius: 10px; /* 设置圆角的半径，根据需要调整 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 设置阴影，根据需要调整 */
}
.image-container {
  white-space: nowrap;
  height: 100%; /* 高度与外部容器相同 */
  margin: 12px;
}
.image-item-first {
  display: inline-block;
  width: 200px; /* 宽度与高度相同 */
  height: 100%;
  box-sizing: border-box;
  margin-top: 50px;
  margin-left: 50px;
  text-align: center;
}
.image-item {
  display: inline-block;
  width: 200px; /* 宽度与高度相同 */
  height: 100%;
  margin-top: 50px;
  box-sizing: border-box;
  text-align: center;
  font-family: Arial,"Microsoft YaHei","Hiragino Sans GB",Helvetica,"Lucida Grande",sans-serif !important;
}
.image-item-last {
  display: inline-block;
  width: 200px; /* 宽度与高度相同 */
  height: 100%;
  box-sizing: border-box;
  margin-top: 50px;
  //margin-right: 150px;
  text-align: center;
}
.image-item-footer{
   display: block;
   width: 200px;
   text-align: center;
   font-size: 25px;
 }
.image {
  width: 86px;
  height: 86px;
  object-fit: cover;
}

.forLogin{
  position: absolute;
  right: 60px;
  top: 30px;
  color: #f8f8f8;
}
</style>