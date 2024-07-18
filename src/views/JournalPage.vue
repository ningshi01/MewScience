<script setup>
import {accountLogout, getJournalData} from "@/api";
import {onMounted, reactive, ref} from "vue";
import {useRoute,useRouter} from 'vue-router';
import * as echarts from "echarts";
import {PersonCircleSharp} from "@vicons/ionicons5";
const journalData = ref({
  display_name: "",
  type: "",
  host_organization_name: "",
  created_date: "",
  works_count: 0,
  homepage_url:"",
  summary_stats: {
    '2yr_cited_by_count': 0,
    '2yr_h_index': 0,
    '2yr_i10_index': 0,
    '2yr_mean_citedness': 0,
    '2yr_works_count': 0,
    cited_by_count: 0,
    h_index: 0,
    i10_index: 0,
    oa_percent: 0,
    works_count: 0
  }
})
const x_conceptsShow = ref(true)
watch(
    journalData,
    () => {
      inite()
      console.log("变变变吧")
    },{
      deep:true
    }
)


onMounted(() => {
  journalID.value = route.query.id
  getJournal()
})
const colors = ['#5470C6', '#91CC75', '#EE6666'];
const state = reactive({
  option: {
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    grid: {
      right: '20%'
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: ['works_count', 'oa_works_count', 'cited_by_count']
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        // prettier-ignore
        data: []
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '数量',
        position: 'left',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0]
          }
        },
        axisLabel: {
          formatter: '{value} 篇'
        }
      },
      {
        type: 'value',
        name: '次数',
        position: 'right',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1]
          }
        },
        axisLabel: {
          formatter: '{value} 次'
        }
      }
    ],
    series: [
      {
        name: 'works_count',
        type: 'bar',
        data: [
        ]
      },
      {
        name: 'oa_works_count',
        type: 'bar',
        yAxisIndex: 1,
        data: [
        ]
      },
      {
        name: 'cited_by_count',
        type: 'line',
        yAxisIndex: 1,
        data: [
        ]
      }
    ]
  }

})
const state2 = reactive({
  option : {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 0,
      data: []
    },
    series: [
      {
        name: '姓名',
        type: 'pie',
        radius: '55%',
        center: ['40%', '50%'],
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
const journalID = ref()
const route = useRoute()
const router = useRouter()
const userOptions = [
  {
    label: '个人资料',
    key: 'personSpace'
  },
  {
    label: '登录',
    key: 'login'
  }
]

const initeCharts = () => {
  let myChart1 = echarts.init(document.getElementById('journalStatistics1'))
  let myChart2 = echarts.init(document.getElementById('journalStatistics2'))
  // 绘制图表
  console.log("初始化中")
  console.log()
  myChart1.setOption(state.option)
  myChart2.setOption(state2.option)
}

function getJournal() {
  console.log(journalID.value)
  getJournalData({
    id: journalID.value
  }).then(function (res) {
    console.log(res);
    journalData.value = res.data
  })
}

function inite(){
  for (let i = journalData.value.counts_by_year.length - 1; i >= 0; i--) {
    state.option.xAxis[0].data.push(journalData.value.counts_by_year[i].year)
    state.option.series[0].data.push(journalData.value.counts_by_year[i].works_count)
    state.option.series[1].data.push(journalData.value.counts_by_year[i].oa_works_count)
    state.option.series[2].data.push(journalData.value.counts_by_year[i].cited_by_count)
  }
  if(journalData.value.x_concepts.length===0){
    x_conceptsShow.value=false
  }else{  for (let i = 0; i < journalData.value.x_concepts.length&&i<9; i++) {
    state2.option.legend.data.push(journalData.value.x_concepts[i].display_name)
    state2.option.series[0].data.push({
      value: journalData.value.x_concepts[i].score,
      name:journalData.value.x_concepts[i].display_name
    })
  }}
  initeCharts()
}

function openNewPage(){
  window.open(journalData.value.homepage_url, '_blank');
}
const handleUserSelect = (key) => {
  console.log(key)
  if (key == 'login') {
    router.push({ path: '/login' })
  } else if (key == 'logout') {
    accountLogout({}).then(res => {
      console.log(res)
    })
  } else if (key == 'personSpace') {
    router.push({ path: '/userInfo' })
  }
}
</script>

<template>
  <n-layout-header class="header_cbl" :bordered="true">
    <n-space justify="space-between">
      <n-space justify="left">
        <img src="@/assets/tempLogo.png" class="logo_cbl" width="120" height="40" style="margin-left: 10px;"
             @click="router.push({ path: '/Introduction' })">
        <n-button :bordered="false" text-color="black" size="large" text
                  style="margin: 15px 10px 10px 50px;" @click="$router.push({ path: '/workSearchList' })">
          <p style="font-size: larger;font-weight: 550;">
            文献检索
          </p>
        </n-button>
        <n-button :bordered="false" text-color="black" size="large" text
                  style="margin: 15px 10px 10px 40px;" @click="$router.push({ path: '/scholarSearchList' })">
          <p style="font-size: larger;font-weight: 650;">
            学者检索
          </p>
        </n-button>
      </n-space>
      <n-space justify="right">
        <n-dropdown placement="bottom-start" trigger="hover" size="small" :options="userOptions"
                    @select="handleUserSelect">
          <n-button :bordered="false" style="margin: 15px;" color="black" text>
            <n-icon :size="24">
              <PersonCircleSharp>
              </PersonCircleSharp>
            </n-icon>
          </n-button>
        </n-dropdown>
      </n-space>
    </n-space>
  </n-layout-header>
  <div class="head">
    <n-popover trigger="hover" placement="left" v-if="journalData.homepage_url!==null">
      <template #trigger>
        <div class="title" @click="openNewPage" >
          {{ journalData.display_name }}
        </div>
      </template>
      <span> 点击进入该{{journalData.type}}的官方详情页 </span>
    </n-popover>
    <div class="title2" v-if="journalData.homepage_url===null">
      {{ journalData.display_name }}
    </div>

    <n-tag round :bordered="false" type="warning" size="large">
      <template #default>
        <span style="font-size: 25px;font-weight: 600">{{ journalData.type }}</span>
      </template>
    </n-tag>
  </div>
  <div class="body">
    <div class="table_container">
      <n-table :single-line="false" :size="'small'" :striped="true">
        <tbody>
        <tr>
          <td class="first_title">主办机构</td>
          <td class="first_content">{{ journalData.host_organization_name }}</td>
          <td class="second_title">论文总数</td>
          <td class="second_content">{{ journalData.works_count }}</td>
        </tr>
        <tr>
          <td class="first_title">创立时间</td>
          <td class="first_content">{{ journalData.created_date }}</td>
          <td class="second_title">被引总数</td>
          <td class="second_content">{{ journalData.summary_stats.cited_by_count }}</td>
        </tr>
        <tr>
          <td class="first_title">h-index</td>
          <td class="first_content">{{ journalData.summary_stats.h_index }}</td>
          <td class="second_title">2年平均引用率</td>
          <td class="second_content">{{ journalData.summary_stats['2yr_mean_citedness'] }}</td>
        </tr>
        <tr>
          <td class="first_title">i10-index</td>
          <td class="first_content">{{ journalData.summary_stats.i10_index }}</td>
          <td class="second_title">对外开放文献比例</td>
          <td class="second_content">{{ journalData.summary_stats.oa_percent }}</td>
        </tr>
        </tbody>
      </n-table>
    </div>
  </div>
  <div class="statistics">
    <div class="statistic1">
      <div class="statistics_head">
        <div style="font-size: 16px;font-weight: 600;">产出统计</div>
      </div>
      <div>
        <div id="journalStatistics1">
        </div>
      </div>
    </div>
    <div class="statistic2" v-show="x_conceptsShow">
      <div class="statistics_head">
        <div style="font-size: 16px;font-weight: 600;">热门领域</div>
      </div>
      <div>
        <div id="journalStatistics2">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header_cbl {
  background-color: rgb(255, 255, 255);
  padding: 10px;
  border-radius: 0 0 4px 4px;
}
.logo_cbl:hover {
  cursor: pointer;
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;

}

.title {
  cursor: pointer;
  font-size: 30px;
  font-weight: 700;
  margin-right: 20px;
}

.title2 {
  font-size: 30px;
  font-weight: 700;
  margin-right: 20px;
}

.body {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.table_container {
  width: 80%;
}

.first_title {
  padding-left: 20px;
  width: 100px;
  height: 5px;
}

.first_content {
  padding-left: 20px;
}

.second_title {
  padding-left: 20px;
  width: 150px;
  height: 10px;
}

.second_content {
  padding-left: 20px;
}

td {
  height: 10px;
}

.statistics {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  height: 300px;
}

.statistic1,.statistic2 {
  border: 1px dashed lightgray; /* 浅虚线边框，颜色为浅灰色 */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  padding: 10px; /* 添加内边距以显示边框和阴影效果 */
  width: 550px;
}

.statistics_head {
  margin-top: 5px;
}

#journalStatistics1 {
  width: 100%;
  height: 280px;
}

#journalStatistics2 {
  width: 100%;
  height: 280px;
}
</style>