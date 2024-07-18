<script setup >
import * as echarts from "echarts";
import {defineProps, onMounted, reactive, toRefs} from "vue";

const props = defineProps({
  //子组件接收父组件传递过来的值
  scholar: {
    default: {
      x_concepts: []
    },
    type: Object
  }
})
//使用父组件传递过来的值
const {scholar} = toRefs(props)

watch(
    scholar,
    () => {
      inite()
    },
    {
      deep: true
    }
)

onMounted(() => {
})

const state = reactive({
  option: {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '0%',
      left: 'center'
    },
    series: [
      {
        name: 'ResearchField',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        top:'20%',
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
            fontSize: 30,
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
  }

})

function inite(){
  for (let i = 0; i<scholar.value.x_concepts.length&&i < 8; i++) {
    state.option.series[0].data.push({
      value: scholar.value.x_concepts[i].score,
      name:scholar.value.x_concepts[i].display_name
    })
  }
  initeCharts()
}


const initLoad = () =>{
  let myChart = echarts.init(document.getElementById('myChart'))
  myChart.setOption(loadState.option)
}
const initeCharts = () => {

  let myChart = echarts.init(document.getElementById('myChart'))
  // 绘制图表
  myChart.setOption(state.option)

}

</script>

<template>
  <div style="font-size: 16px;font-weight: 600">研究领域</div>
  <div id="myChart">

  </div>
</template>

<style scoped>
#myChart {
  width: 100%;
  height: 350px;
}
</style>