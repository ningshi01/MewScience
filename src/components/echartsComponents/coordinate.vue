<template>
    <div ref="info" style="width: 100%; height: 200px">

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
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [

          ]
        }
      ]
    };

  var buckets=props.option.buckets
  var firstnum=buckets[0].doc_count;
  for (var i=0;i<buckets.length;i++){
    option.series[0].data.push({
      "value":buckets[i].doc_count,"name":buckets[i].key
    })
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