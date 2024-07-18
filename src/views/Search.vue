<template>
  <div ref="container" class="container">
    <div class="topBar">

      <img src="@/assets/logo1.png" class="logo" @click="toMainPage" alt="1"/>
      <h3 class="word1"  @click="toPaper">论文检索</h3>
      <h3 class="word1" @click="toScholar">学者检索</h3>
      <i class="iconfont icon-gerentouxiang_o user"></i>
      <div class="Username">
        <n-dropdown trigger="hover" :options="options"  >
          ling
        </n-dropdown>
      </div>
    </div>
    <div class="EarthModel">
    </div>

      <n-modal v-model:show="showModal" class="senior">
        <SenoirSearch :fatherName="{ name: fatherName }"></SenoirSearch>
      </n-modal>


    <div class="searchContainer">
      <div class="titleContainer">
        <div class="flexContainer">
          <h1 class="title1">Access scholarly articles</h1>
          <i class="iconfont icon-cangpinjiansuo searchIcon" @click="seniorSearch"></i>
          <h5 class="seniorSearch" @click="seniorSearch">高级检索</h5>
        </div>
      </div>
      <div class="inputContainer">
        <n-input class="input" placeholder="输入想查询的学术成果标题，关键词" v-model:value="input"/>
        <n-button strong  secondary class="searchButton" type="tertiary" @click="search">
          <i class="iconfont icon-sousuo souSuo"></i>
        </n-button>
      </div>
      <h5 class="title2">欢迎使用MewScience学术成果共享平台，数据定期更新欢迎查阅</h5>
    </div>
     <canvas id="canvas" ref="canvas" />
  </div>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { onMounted, ref } from 'vue';
import cyanStreamer from '../components/cyanStreamer.vue'
import purpleStreamer from '../components/purpleStreamer.vue'
import SenoirSearch from '../components/SeniorSearch.vue'
import { useRouter } from 'vue-router';
const fatherName="Search"
const router = useRouter();
const input=ref("")
const search = () => {
 const query = [{
    logic:'must',
    field:'multi_search',
    query:input.value
  }]
  router.push({name:"workSearchList",query:{'query':JSON.stringify(query)}})
}
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


const showModal=ref(false)
const seniorSearch= ()=>{
  console.log(showModal.value)
  showModal.value=true;
}
/**
 * 星星对象
 */
interface Star {
  orbitRadius: number;
  radius: number; //s星星大小
  orbitX: number;
  orbitY: number;
  timePassed: number;
  speed:number; //星星移动速度
  alpha: number;
}
const container = ref<HTMLElement>();
const canvas = ref<HTMLCanvasElement>();
const ctx = ref<CanvasRenderingContext2D>();

const w = ref<number | undefined>(1000);
const h = ref<number | undefined>(800);
const hue = 217,
    stars = ref<Star[]>([]),
    maxStars = 2000;

const canvas2 = ref<HTMLCanvasElement>();
const ctx2 = ref<CanvasRenderingContext2D>();

const half = ref<number>(0);
const gradient2 = ref<any>();


const random = (min: number, max?: number) => {
  if (!max) {
    max = min;
    min = 0;
  }

  if (min > max) {
    let hold = max;
    max = min;
    min = hold;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * 计算星星移动范围
 * @param x
 * @param y
 */
const maxOrbit = (x: number, y: number) => {
  const max = Math.max(x, y),
      diameter = Math.round(Math.sqrt(max * max + max * max));
  return diameter / 2;
  //星星移动范围，值越大范围越小，
};

/**
 * 绘制星星
 */
const drawStar = (ctx: CanvasRenderingContext2D, star: Star) => {
  const x = Math.sin(star.timePassed) * star.orbitRadius + star.orbitX,
      y = Math.cos(star.timePassed) * star.orbitRadius + star.orbitY,
      twinkle = random(10);

  if (twinkle === 1 && star.alpha > 0) {
    star.alpha -= 0.05;
  } else if (twinkle === 2 && star.alpha < 1) {
    star.alpha += 0.05;
  }

  ctx.globalAlpha = star.alpha;
  ctx.drawImage(canvas2.value!, x - star.radius / 2, y - star.radius / 2, star.radius, star.radius);
  star.timePassed += star.speed;
};

/**
 * 星星的旋转动画
 */
const animation = () => {
  ctx.value!.globalCompositeOperation = 'source-over';
  ctx.value!.globalAlpha = 0.4; //尾巴
  ctx.value!.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
  ctx.value!.fillRect(0, 0, w.value!, h.value!);

  ctx.value!.globalCompositeOperation = 'lighter';
  for (let i = 1, l = stars.value.length; i < l; i++) {
    drawStar(ctx.value!, stars.value[i]);
  }

  window.requestAnimationFrame(animation);
};

/**
 * 产生星星
 */
const generateStar = () => {
  const orbitRadius = random(maxOrbit(w.value!, h.value!));
  // 星星大小
  const radius = random(3, orbitRadius-20) / 16;
  const orbitX = w.value! / 2;
  const orbitY = h.value! / 2;
  const timePassed = random(0, maxStars);
  // 星星移动速度
  const speed = random(orbitRadius) / 2000000;
  const alpha = random(2, 10) / 10;
  const star: Star = {
    orbitX,
    orbitY,
    orbitRadius,
    radius,
    timePassed,
    speed,
    alpha
  };
  return star;
};

/**
 * 初始化星星的数量
 */
const initStar = () => {
  ctx.value = canvas.value!.getContext('2d') as CanvasRenderingContext2D;
  w.value = container.value?.clientWidth;
  h.value = container.value?.clientHeight;
  canvas.value!.width = container.value?.clientWidth || 1000;
  canvas.value!.height = container.value?.clientHeight || 800;
  console.log(`画布的宽高是: ${w.value} ======== ${h.value}`);
  canvas2.value = document.createElement('canvas');
  ctx2.value = canvas2.value!.getContext('2d') as CanvasRenderingContext2D;
  canvas2.value.width = 100;
  canvas2.value.height = 100;
  half.value = canvas2.value!.width / 2;
  gradient2.value = ctx2.value!.createRadialGradient(half.value, half.value, 0, half.value, half.value, half.value);
  gradient2.value.addColorStop(0.025, '#CCC');
  gradient2.value.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
  gradient2.value.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
  gradient2.value.addColorStop(1, 'transparent');
  ctx2.value!.fillStyle = gradient2.value;
  ctx2.value!.beginPath();
  ctx2.value!.arc(half.value, half.value, half.value, 0, Math.PI * 2);
  ctx2.value!.fill();
  for (let i = 0; i < maxStars; i++) {
    const star = generateStar();
    stars.value.push(star);
  }
  console.log(stars.value);
};

onMounted(() => {
  initStar();
  animation();
});


</script>

<style  scoped>
.logo:hover{
  cursor: pointer;
}
.word1{
  font-weight: bold;
  margin-top: 15px;
  font-size: 20px;
  margin-left: 30px;
  color: white;
}
.logo{
  margin-left: 60px;
  height: 60px;
  margin-right: 30px;
}
.user{
  font-size:20px;
  margin-left: 750px;
}
.Username{
  margin-top: 20px;
  color: white;
}
.souSuo{
  color: rgb(128, 128, 128);
}
.searchIcon{
  color: rgb(128, 128, 128);
  margin-top: 50px;
  margin-left: 51px;
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
.word1:hover{
  cursor: pointer;
}
.seniorSearch{
  font-size: 15px;
  margin-top: 45px;
  color: rgb(128, 128, 128);
}
.EarthModel{
  width: 0;
  height: 0;

}
.topBar i{
  font-size:40px;
  color: white;
}
.topBar{
  z-index: 100;
  width: 1480px;
  border-bottom: 1px solid #223356;
  position: absolute;
  display: flex;
  flex-direction:row;
}
.title2{
  font-size:17px;
  color: #338cde;
  font-weight: bold;
}
.title1{
  font-weight: bold;
  font-style: italic;
  font-size:55px;
  color: #338cde;
}
.searchContainer {
  width: 73%;
  height: 100%;
  margin-left: 100px;
  margin-top: 250px;
  position: absolute;
}

.inputContainer {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  width: 70%;
  height: 40px;
}

.input {
  font-size: 16px;
  height: 100%;
  flex: 1; /* 输入框自动填充剩余空间 */
  line-height: 45px;
}
.searchButton:hover {
  color: white;
  background-color: white;
}
.searchButton {
  width: 60px;
  height: 100%;
 background: white;
}

.container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

#canvas {
  width: 100%;
  height: 100%;
}
</style>

