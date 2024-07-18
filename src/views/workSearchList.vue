
<script setup lang="ts">
import SearchListCollapse from '@/components/searchList/SearchListCollapse.vue';
import { SearchOutline, PersonCircleSharp } from '@vicons/ionicons5'
import ScienceWorkCard from '../components/searchList/ScienceWorkCard.vue'
import { ref, onMounted, reactive } from 'vue'
import { queryScienceWorks, accountLogout,queryScienceWorks_Advanced } from '../api';
import MessageButton from '../components/searchList/MessageButton.vue';
import { useLoadingBar } from 'naive-ui'
import type export_default from 'unplugin-auto-import/astro';
import { getToken } from '../utils/auths';
import { useRoute, useRouter } from 'vue-router';
import SenoirSearch from '../components/SeniorSearch.vue'

const route = useRoute()
const router = useRouter()
const querys = ref()
const isMultiCond = ref(false)
const fatherName="work"
const sonMessage = ref<string>("")
const getSonValue = (value: string) => {
  sonMessage.value = JSON.parse(value)
  if (sonMessage.value!=null){
    querys.value=sonMessage.value,
    showModal.value=false
    isMultiCond.value = true
  }
  startSearch()
}

onMounted(() => {
  querys.value = route.query.query == null ? '':route.query.query
  let query = querys.value == '' ? null:JSON.parse(querys.value)
  querys.value = query
  searchContent.value = query == null ? '':query[0].query
  if(query != null && query.length > 1){
    isMultiCond.value = true
  }
  if (getToken('csrftoken') != null) {
    userOptions[1].label = '退出登录'
    userOptions[1].key = 'logout'
  } else {
    userOptions[1].label = '登录'
    userOptions[1].key = 'login'
  }
  console.log('mounted')
  startSearch()
})



const loadingBar = useLoadingBar()

const showModal = ref(false)
const sideWith = ref(250);
const sortOptions = [
  {
    label: "被引次数",
    value: 'cited_by_count',
  },
  {
    label: '发布日期',
    value: 'publication_date'
  },
  {
    label: '相关度',
    value: 'relevance'
  },
]
const userOptions = reactive([
  {
    label: '个人资料',
    key: 'personSpace'
  },
  {
    label: '登录',
    key: 'login'
  }
])
let hasShowStatistc = false;
const searchContent:any = ref("")
const page_now = ref(1) //当前页数
//page从1开始
const page_size = ref(10) //每页尺寸
const sort_type = ref("relevance")
const pageSizes = [
  {
    label: '10 每页',
    value: 10
  },
  {
    label: '20 每页',
    value: 20
  },
  {
    label: '30 每页',
    value: 30
  },
  {
    label: '40 每页',
    value: 40
  }
] //可选的每页条数
const work_num = ref(100) //文献总条数

const works = ref([])

const statisticBarContent = ref("统计信息")
const onInputConfirm = () => {
  page_now.value = 1
  startSearch()
}
const showStatistics = () => {
  if (!hasShowStatistc) {
    sideWith.value = 800;
    hasShowStatistc = true;
    statisticBarContent.value = "点我关闭";
  } else {
    sideWith.value = 250;
    hasShowStatistc = false;
    statisticBarContent.value = "统计信息";
  }
}
const aggregations = ref()
const startSearch = () => {
  loadingBar.start()
  if(querys.value != null){
    querys.value[0].query = searchContent.value
  }
  console.log("startSearch")
  if(!isMultiCond.value){
    querys.value  = querys.value == null?[{
      logic:'must',
      field:'multi_search',
      query:'deepLearning'
    }]:[querys.value[0]]
  }
  console.log(JSON.stringify(querys.value))
  queryScienceWorks_Advanced({
    query: querys.value,
    page: page_now.value,
    page_size: page_size.value,
    min_score: 10,
    sort: sort_type.value,
    order: "desc",
    aggs_size:5
  }).then(res => {
    work_num.value = res.data.hits.total.value
    works.value = res.data.hits.hits
    // .filter((hit: { _source: { abstract: null; }; }) => hit._source.abstract!=null)
    aggregations.value = res.data.aggregations
    loadingBar.finish()
    isMultiCond.value = false
  })
}
const handleUserSelect = (key:any) => {
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
const handleSortSelect = (key:any) => {
  console.log(key)
  sort_type.value = key;
  startSearch();
}
</script>

<template>
  <div class="container">
    <KeepAlive>
      <n-layout position="absolute">
        <n-layout-header class="searchHeader" :bordered="true" style="height: 64px; padding: 10px">
          <n-space justify="space-between">
            <n-space justify="left">
              <n-button :bordered="false" text-color="white" size="large" text>
                <n-gradient-text :size="24" type="warning" style="margin: 10px;"
                  @click="$router.push({ path: '/Introduction' })">
                  MewScience
                </n-gradient-text>
              </n-button>
              <n-button :bordered="false" text-color="black" size="large" text style="margin: 15px 10px 10px 30px;"
                @click="$router.push({ path: '/workSearchList' })">
                <p style="font-size: larger;font-weight: 550;">
                  文献检索
                </p>
              </n-button>
              <n-button :bordered="false" text-color="black" size="large" text style="margin: 15px 10px 10px 20px;"
                @click="$router.push({ path: '/scholarSearchList' })">
                <p style="font-size: larger;font-weight: 650;">
                  学者检索
                </p>
              </n-button>
            </n-space>
            <n-space justify="right">
              <n-dropdown placement="bottom-start" trigger="click" size="small" :options="userOptions"
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
        <n-layout class="searchContainer" :v-if="false">
          <n-space justify="center">
            <n-input size="large" round placeholder="输入关键词" class="inputBar" style="width:80vh;"
              @keyup.enter.native="onInputConfirm" v-model:value="searchContent">
              <template #prefix>
                <n-icon>
                  <SearchOutline></SearchOutline>
                </n-icon>
              </template>
            </n-input>
            <n-button type="info" style="margin-top: 40px;" @click="onInputConfirm">
              检索
            </n-button>
            <n-button strong secondary type="tertiary" style="margin-top: 40px;" @click="showStatistics()">
              {{ statisticBarContent }}
            </n-button>
            <n-button strong secondary type="tertiary" style="margin-top: 40px;" @click="showModal = !showModal">
              高级检索
            </n-button>
            <n-modal v-model:show="showModal" class="senior">
              <SenoirSearch :fatherName="{ name: fatherName }"  @getValue="getSonValue "></SenoirSearch>
            </n-modal>
          </n-space>
        </n-layout>
        <n-layout has-sider position="absolute" style="top: 164px; bottom: 5px">
          <n-layout-sider class="layoutBody" content-style="padding: 10px;" :width="sideWith" :native-scrollbar="false">
            <p style="font-weight: 200;margin-left: 20px;font-size: medium;color: rgb(162, 163, 164);">
              筛选
            </p>
            <SearchListCollapse v-if="aggregations" :aggregations="aggregations"></SearchListCollapse>
          </n-layout-sider>
          <n-layout content-style="padding: 10px;" class="content" :native-scrollbar="false">
            <n-space vertical>
              <n-space justify="end" style="position: sticky; top: 0px;">
                <n-pagination :display-order="['quick-jumper', 'pages', 'size-picker']" v-model:page="page_now"
                  v-model:page-size="page_size" :item-count=work_num :page-sizes="pageSizes" show-quick-jumper
                  show-size-picker @update:page="startSearch" @update:page-size="startSearch" />
                <!-- 当前页数{{ page_now }}
              每页最大条数{{ page_size }}
              当前关键词{{ searchContent }} -->
                <n-select size="small" :options="sortOptions" style="width: 200px;" @update:value="handleSortSelect" />
              </n-space>
              <!-- {{ works }} -->
              <ScienceWorkCard :works="works"></ScienceWorkCard>
            </n-space>
          </n-layout>
        </n-layout>
      </n-layout>
    </KeepAlive>
  </div>
</template>



<style scoped>
.inputBar {
  margin-top: 35px;
  width: 200px;
  --n-border-focus: 1px solid black;
}


.searchContainer {
  background-color: rgb(249, 249, 249);
  position: absolute;
  top: 64px;
  height: 100px;
  width: 100%;
}

.searchHeader {
  background-color: white;
  box-shadow: 0px 2px 2px 0.2px black;
}

.layoutBody {
  background-color: rgb(249, 249, 249);
}

.content {
  background-color: rgb(249, 249, 249)
}
</style>


