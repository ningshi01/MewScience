<template>
    <div ref="info" style="width: 100%; height: 200px"></div>
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
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({})

const info = ref()

const props = defineProps({
    option:{
        type:Object
    }
})
const option = ref(props.option)
onBeforeMount(() => {
    //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
    console.log('mounted')
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
    // 渲染echarts的父元素
    var infoEl = info.value;

    //  light dark
    var userEc = echarts.init(infoEl, "light");
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
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'line'
            }
        ]
    };
    var buckets=props.option.buckets
    for (var i=0;i<buckets.length;i++){
      option.series[0].data.push(
            buckets[i].doc_count
      )
      option.xAxis.data.push(buckets[i].key)
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