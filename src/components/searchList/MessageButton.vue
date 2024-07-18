<template>
<button class="btn-94">
    <svg viewBox="0 0 512 512">
        <path
        d="M309.333,341.333c29.419,0,53.333-23.936,53.333-53.333V96c0-29.397-23.915-53.333-53.333-53.333h-256
                    C23.915,42.667,0,66.603,0,96v192c0,29.397,23.915,53.333,53.333,53.333h32v53.333c0,4.032,2.283,7.723,5.888,9.536
                    c1.493,0.747,3.136,1.131,4.779,1.131c2.261,0,4.523-0.725,6.4-2.133l82.496-61.867H309.333z"
        ></path>
        <path
        d="M458.667,106.667h-64c-5.888,0-10.667,4.779-10.667,10.667V288c0,41.173-33.493,74.667-74.667,74.667H195.563
                    c-2.304,0-4.565,0.747-6.4,2.133l-17.685,13.269c-2.731,2.048-4.309,5.248-4.267,8.64c0.043,3.392,1.685,6.571,4.459,8.555
                    c9.173,6.592,19.904,10.069,30.997,10.069h124.437L409.6,467.2c1.877,1.408,4.117,2.133,6.4,2.133
                    c1.621,0,3.264-0.384,4.779-1.131c3.605-1.813,5.888-5.504,5.888-9.536v-53.333h32C488.085,405.333,512,381.397,512,352V160
                    C512,130.603,488.085,106.667,458.667,106.667z"
        ></path>
    </svg>
</button>

</template>

<script setup >
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
/**
* 仓库
*/
const store = useStore();
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({})
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped>
.btn-94,
.btn-94 *,
.btn-94 :after,
.btn-94 :before,
.btn-94:after,
.btn-94:before {
  border: 0 solid;
  box-sizing: border-box;
}
.btn-94 {
  -webkit-tap-highlight-color: transparent;
  -webkit-appearance: button;
  background-color: #000;
  background-image: none;
  color: #fff;
  cursor: pointer;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-size: 100%;
  font-weight: 900;
  line-height: 1.5;
  margin: 0;
  -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
  text-transform: uppercase;
}
.btn-94:disabled {
  cursor: default;
}
.btn-94:-moz-focusring {
  outline: auto;
}
.btn-94 svg {
  vertical-align: middle;
}
.btn-94 [hidden] {
  display: none;
}
.btn-94 {
  background: hsla(0, 0%, 100%, 0.2);
  background-clip: content-box;
  border: 5px solid;
  border-radius: 50%;
  box-sizing: border-box;
  display: block;
  height: 100px;
  -webkit-mask-image: none;
  padding: 0;
  position: relative;
  transition: 0.2s;
  width: 100px;
}
.btn-94 svg {
  --size: 50px;
  fill: #fff;
  display: block;
  height: var(--size);
  left: calc(50% - var(--size) / 2);
  position: absolute;
  top: calc(50% - var(--size) / 2);
  width: var(--size);
}
.btn-94:hover {
  --size: 70px;
  border: 10px solid transparent;
}

</style>