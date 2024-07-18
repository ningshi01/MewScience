<template>
  <keep-alive>
    <div>
      <Search></Search>
      <div ref="worldBox" class="EarthModel"></div>
    </div>
  </keep-alive>
  <n-drawer v-model:show="show" :width="1500">
    <n-drawer-content class="drawer">
      <div id="loading-v3">
        <div id="loading-v3-bg"></div>
        <div id="loading-v3-box">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts-gl';
import Search from './Search.vue';
import earthBg from '../assets/land_lights_16385.jpg';



const show=ref(true)
const worldBox = ref(null);
const isLoaded = ref(false);

onMounted(() => {
  setTimeout(()=>{
    show.value=false
    document.body.removeChild(document.querySelector("#loading-v3"));
      },500
  )
  const earthImage = new Image();
  earthImage.src = earthBg;
  earthImage.onload = () => {
    isLoaded.value = true;
    world_fun();
  };
});

const world_fun = () => {
  if (!isLoaded.value) {
    return;
  }

  const BlChart = echarts.init(worldBox.value);
  const option = {
    globe: {
      baseTexture: earthBg,
      shading: 'color',
      zoom: 2,
      viewControl: {
        autoRotate: true,
        autoRotateSpeed: 3,
        autoRotateAfterStill: 2,
        rotateSensitivity: 2,
        targetCoord: [116.46, 39.92],
        maxDistance: 400,
        minDistance: 200
      }
    },
    series: []
  };
  BlChart.setOption(option);
  window.onresize = () => {
    BlChart.resize();
  };
};
</script>
<style scoped>
.drawer{
  display: flex;
}
.EarthModel {
  position: absolute;
  top: 150px;
  left: 850px;
  height: 500px;
  width: 500px;
}


#loading-v3 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  z-index: 99999;
}

#loading-v3-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  background:
      #f6f6f6;
}

#loading-v3-box {
  height: 100vh;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

#loading-v3-box ul {
  height: 20px;
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0px;
}

#loading-v3-box ul li {
  width: 14px;
  height: 14px;
  border-radius: 1rem;
  margin-right: 10px;
  list-style-type: none;
}

#loading-v3-box ul li:nth-child(1) {
  background:
      #f4433c;
  animation: loading-v3 3s 0s infinite;
}

#loading-v3-box ul li:nth-child(2) {
  background:
      #ff9800;
  animation: loading-v3 3s 0.2s infinite;
}

#loading-v3-box ul li:nth-child(3) {
  background:
      #ffeb3b;
  animation: loading-v3 3s 0.4s infinite;
}

#loading-v3-box ul li:nth-child(4) {
  background:
      #64e291;
  animation: loading-v3 3s 0.6s infinite;
}

#loading-v3-box ul li:nth-child(5) {
  background:
      #2d85f0;
  animation: loading-v3 3s 0.8s infinite;
}

#loading-v3-box ul li:nth-child(6) {
  background:
      #794c74;
  animation: loading-v3 3s 1s infinite;
}

@keyframes loading-v3 {
  25%, 50% {
    height: 60px;
    transform: translateY(-30px);
  }
  75%, 100% {
    height: 14px;
    transform: translateY(-7px);
  }
}
</style>