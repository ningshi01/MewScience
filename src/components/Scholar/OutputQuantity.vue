<script setup>
import * as echarts from "echarts";
import {onMounted, reactive, toRefs, defineProps} from "vue";

const props = defineProps({
  //子组件接收父组件传递过来的值
  scholar: {
    default: {
      counts_by_year: []
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
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['works_count', 'oa_works_count', 'cited_by_count']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'works_count',
        type: 'line',
        data: []
      },
      {
        name: 'oa_works_count',
        type: 'line',
        data: []
      }, {
        name: 'cited_by_count',
        type: 'line',
        data: []
      },
    ]
  }

})

const initeCharts = () => {
  let myChart1 = echarts.init(document.getElementById('FieldStatistics1'))
  // 绘制图表
  myChart1.setOption(state.option)

}

function inite(){
  for (let i = scholar.value.counts_by_year.length - 1; i >= 0; i--) {
    state.option.xAxis.data.push(scholar.value.counts_by_year[i].year)
    state.option.series[0].data.push(scholar.value.counts_by_year[i].works_count)
    state.option.series[1].data.push(scholar.value.counts_by_year[i].oa_works_count)
    state.option.series[2].data.push(scholar.value.counts_by_year[i].cited_by_count)
    // state2.option.xAxis.data.push(scholar.value.counts_by_year[i].year)
    // state2.option.series[0].data.push(scholar.value.counts_by_year[i].cited_by_count)
  }
  initeCharts()
}


</script>

<template>
  <div>
    <div class="head">
      <div style="font-size: 16px;font-weight: 600;">产出统计</div>
    </div>
    <div>
      <div id="FieldStatistics1">
      </div>
    </div>
  </div>
</template>

<style scoped>
.head {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

#FieldStatistics1 {
  width: 100%;
  height: 250px;
}

</style>