<template>
  <div ref="info" style="width: 100%; height: 150px">

  </div>
</template>

<script setup >
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed,defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as echarts from 'echarts'
/**
* 仓库
*/
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const props = defineProps({
    option:{
        type:Object
    }
})

const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({})

const info = ref()

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
  // 渲染echarts的父元素
  var buckets=props.option.buckets

  var infoEl = info.value;

  //  light dark
  var userEc = echarts.init(infoEl, "light");
  console.log(userEc)
  window.addEventListener(
        "resize",
        () => {
            userEc.resize();
        },
        false
    );
    const resizeObserver = new ResizeObserver(() => {
        // 尺寸变化时调用 resize 方法
        userEc.resize();
    });

    // 监听容器元素的尺寸变化
    resizeObserver.observe(infoEl);
  // 指定图表的配置项和数据
  var option = {
    //使用grid配置容器
    grid: {
      left: '2%', // 与容器左侧的距离
      right: '2%', // 与容器右侧的距离
      top: '10%', // 与容器顶部的距离
      bottom: '10%', // 与容器底部的距离
      borderWidth: 10,
      containLabel: true,
    },

    legend: {
      orient: "vertical",
      x: "left",
      data: [],
      icon: "react",
    },
    series: [
      {
        type: "pie",
        radius: "80%",
        data: [

        ],
        //阴影
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        // 颜色
        color: [
          "#516b91",
          "#59c4e6",
          "#edafda",
          "#93b7e3",
          "#a5e7f0",
          "#cbb0e3",
          "#c12e34",
          "#e6b600",
          "#0098d9",
          "#2b821d",
          "#005eaa",
          "#339ca8",
          "#cda819",
          "#32a487",
        ],
      },
    ],
  };
  for (var i=0;i<buckets.length;i++){
    option.series[0].data.push(
        {
          value: buckets[i].doc_count,
          name:buckets[i].key
        },
    )
    option.legend.data.push(buckets[i].key)
}

  // 使用刚指定的配置项和数据显示图表。
  userEc.setOption(option);
})
watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped></style>