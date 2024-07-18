<script setup>
import * as echarts from "echarts";
import {onMounted, reactive, ref, toRefs,defineProps} from "vue";
import {NDropdown, NSwitch, NAvatar, NDivider} from "naive-ui";
import {getPaperAndRelated} from "@/api";
import {useRoute, useRouter} from 'vue-router';

const props = defineProps({
  //子组件接收父组件传递过来的值
  scholar: {
    default: {
      id: ""
    },
    type: Object
  }
})
//使用父组件传递过来的值
const {scholar} = toRefs(props)

watch(
    scholar,
    () => {
      getRelation()

    },
    {
      deep: true
    }
)

onMounted(() => {
  setTimeout(() => {

  }, 1000)
  setTimeout(() => {


  }, 2000)
})
const route = useRoute();
const router = useRouter();


const state = reactive({
  option: {
    tooltip: {},
    animation: false,
    series: [
      {
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 80
        },
        symbolSize: 15,
        data: [],
        links: []
      }
    ]
  }


})

//用于切换列表和关系图
const railStyle = reactive(({focused, checked}) => {
  const style = {};
  if (checked) {
    style.background = "#d03050";
    if (focused) {
      style.boxShadow = "0 0 0 2px #d0305040";
    }
  } else {
    style.background = "#2080f0";
    if (focused) {
      style.boxShadow = "0 0 0 2px #2080f040";
    }
  }
  return style;
});

let active = ref(false);

let type = ref(1)




const scholarList = ref([])

const institutionList = ref([])

const initeCharts = () => {
  let myChart = echarts.init(document.getElementById('scholar_diagram'))
  // 绘制图表
  myChart.setOption(state.option)
}

function getRelation() {
  getPaperAndRelated({
    id: parseInt(scholar.value.id)
  }).then(function (res) {
    let t = res.data.institutions;
    let tt= res.data.researchers;
    for (let key in t) {
      if (t.hasOwnProperty(key)) {
        institutionList.value.push({id: key, data: t[key]})
      }
    }
    for (let key in tt) {
      if (tt.hasOwnProperty(key)) {
        scholarList.value.push({id: key, data: tt[key]})
      }
    }
    institutionList.value.sort(function (a, b) {
      return b.data.times - a.data.times
    })
    scholarList.value.sort(function (a, b) {
      return b.data.times - a.data.times
    })
    state.option.series[0].data.push({name: scholar.value.display_name, symbolSize: 30})
    let names=[]
    for (let i = 0; i < scholarList.value.length && i < 30; i++) {
      let name = scholarList.value[i].data.display_name
      let time = scholarList.value[i].data.times
      if (name === scholar.value.display_name) {
        continue;
      }
      if(names.includes(name)){
        continue;
      }
      names.push(name)
      state.option.series[0].data.push({name: name, value: time})
      state.option.series[0].links.push({source: scholar.value.display_name, target: name})
    }
    initeCharts()
  })
}

function changeScholar() {
  type.value = 1;
}

function changeInstitution() {
  type.value = 2;
}

function selectScholar(scholar) {
  router.push({name: 'ScholarPage', query: {id: parseInt(scholar.id)}});
}

function selectInstitution(institution) {
  router.push({name: 'Institution', query: {id: parseInt(institution.id)}});
}

</script>

<template>
  <div class="head">
    <div class="cooperationType">
      <button class="type" :class="{'scholar':type===1}" @click="changeScholar">合作学者</button>
      <button class="type" :class="{'institution':type===2}" @click="changeInstitution">合作机构</button>
    </div>
    <div class="switch" v-show="type===1">
      <n-switch :rail-style="railStyle" v-model:value="active">
        <template #checked>
          列表
        </template>
        <template #unchecked>
          关系图
        </template>
      </n-switch>
    </div>
  </div>
  <div id="scholar_diagram" v-show="!active&&type===1">
  </div>
  <div style="margin-top: 10px">
  <n-scrollbar style="max-height: 800px">
    <div class="scholarList" v-show="active&&type===1">

      <div v-for="(scholar,index) in scholarList" class="scholar" @click="selectScholar(scholar)">
        <div class="left">
          <div class="name_institution">
            <div class="name">{{ scholar.data.display_name }}<span class="relationship"
                                                                   style="color:green ">合作者</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div>合作论文数</div>
          <div style="color: dodgerblue"> {{ scholar.data.times }}</div>
        </div>
      </div>

    </div>
  </n-scrollbar></div>
  <div class="institutionList" v-show="type===2">
    <div v-for="(institution,index) in institutionList" class="institution" @click="selectInstitution(institution)">
      <div class="left">
        <div class="name_institution">
          <div class="name">{{ institution.data.display_name }}</div>
        </div>
      </div>
      <div class="right">
        <div>合作论文数</div>
        <div style="color: dodgerblue"> {{ institution.data.times }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
}

.cooperationType {
  padding-bottom: 5px;
  margin: 0;
  height: 35px;
  display: flex;
  justify-content: left;
  position: relative;
}

.type {
  background-color: transparent;
  border: 0;
  width: 80px;
  height: 40px;
  cursor: pointer;
  color: black;
  font-size: 15px;
  font-weight: 600;

}

.cooperationType > .scholar {
  background-color: rgba(137, 116, 255, 0.89);
  color: white;
}

.cooperationType > .institution {
  background-color: rgba(137, 116, 255, 0.89);
  color: white;
}

.scholarList {
  margin-top: 15px;
}

.scholarList > .scholar {
  border-top-style: dashed; /* 使用虚线样式 */
  border-top-width: 1px; /* 边框宽度 */
  border-top-color: #bdbaba; /* 边框颜色 */
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.scholarList > .scholar:hover {
  background-color: rgb(227, 225, 225);
}


.left {
  display: flex;
  margin-left: 5px;
}

.left > .avatar {
  margin-top: 5px;
}

.left > .name_institution {
  margin-left: 10px;
}

.name_institution > .name {
  font-size: 16px;
  font-weight: 600;
}

.name_institution > .institution {
  font-size: 13px;
  font-weight: 300;
}

.relationship {
  font-weight: 350;
  font-size: 12px;
  margin-left: 5px;
}

.right {
  min-width: 80px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.institutionList {
  margin-top: 15px;
}

.institutionList > .institution {
  cursor: pointer;
  border-top-style: dashed; /* 使用虚线样式 */
  border-top-width: 1px; /* 边框宽度 */
  border-top-color: #bdbaba; /* 边框颜色 */
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
}

#scholar_diagram {
  width: 100%;
  height: 280px;
}
</style>