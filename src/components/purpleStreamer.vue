<template>
  <div class="login">
    <div class="lightline"></div>
    <ol>
      <li v-for="(item, index) in indoorParams" :key="index">
        <div class="animate-border">
          <i></i>
            <h5 class="content">大量数据</h5>
          <i></i>
        </div>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
    let indoorParams = ref([1]);
    return { indoorParams };
  },
};
</script>
<style scoped lang="scss">
.content{
  margin-top: 8px;
  margin-left: 17px;
  font-size: 17px;
  color:#a379be;
}

ol li {
  border: 1px solid rgba(32, 254, 255, 0.3);
  /* 宽高和相对定位是一定要给的,因为这会影响.animate-border子元素的定位 */
  position: relative;
  margin-top: 7px;
  width: 100px;
  height: 50px;
  overflow: hidden;
  border-radius:10px;
  /* 利用伪元素和两个i元素产生4条线 */
  .animate-border {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
    }
    i {
      position: absolute;
      display: inline-block;
      height: 100%;
      width: 2px;
    }
    &::before {
      top: 0;
      left: -100%;
      background-image: linear-gradient(
              90deg,
              transparent,
              #a379be,
              transparent
      );

      animation: one 4s linear infinite;
    }
    i:nth-child(1) {
      top: -100%;
      right: 0;
      background-image: linear-gradient(
              180deg,
              transparent,
              #a379be,
              transparent
      );
      /* 动画名称  动画持续时间  动画渲染函数 动画延迟时间 动画执行次数 */
      animation: two 4s linear 2s infinite;
    }
    &::after {
      bottom: 0;
      right: -100%;
      background-image: linear-gradient(
              -90deg,
              transparent,
              #a379be,
              transparent
      );
      animation: three 4s linear 1s infinite;
    }
    i:nth-child(2) {
      bottom: -100%;
      left: 0;
      background-image: linear-gradient(
              360deg,
              transparent,
              #a379be,
              transparent
      );
      animation: four 4s linear 3s infinite;
    }
  }
}
@keyframes one {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

@keyframes two {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

@keyframes three {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

@keyframes four {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}

</style>