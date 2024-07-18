<template>
  <div ref="container" class="container" :key="tempKey">
    <div><n-layout-header class="searchHeader" :bordered="true" style="height: 64px; padding: 10px">
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
    </n-layout-header></div>
    <n-card class="name" hoverable>
      <n-scrollbar style="max-height: 150px">
        <div class="title-and-check">
          <div class="check">
            <n-button quaternary circle type="info" @click="Yes()">
              <template #icon>
                <n-icon>
                  <Star/>
                </n-icon>
              </template>
            </n-button>
          </div>
          <div class="namePaper">
            <n-popover trigger="hover">
              <template #trigger>
                <n-h1 @click="openNewPage('https://openalex.org/W'+id)" class="n" style="cursor: pointer">{{ title }}</n-h1>
              </template>
              <span>点击跳转改论文的OpenAlex详情页</span>
            </n-popover>

          </div>
        </div>
        <n-a class="writers"
             v-for="(link, index) in links"
             :key="index"
             @click="router.push({name: 'ScholarPage',query: {id: parseInt(link.author.id.match(/\d+$/))}})"
             target="_blank"
        >
          {{ index > 0 ? ', ' : '' }}{{ link.author.display_name }}<sup>{{
            {
              'first': 1,
              'middle': 2,
              'last': 3
            }[link.author_position] || link.author_position
          }}</sup>
        </n-a>
        <div class="institutions">
          <n-text class="gray-text" depth="3"
          >
          </n-text>
        </div>
        <div class="locations" @click="()=>router.push({name: 'JournalPage', query: {id: locationID}})">
          <n-text depth="3">
            volume:{{ links1.volume }}
            issue:{{ links1.issue }}
            {{ location }}
          </n-text>
        </div>
        <div>
          <n-text depth="3">
            DOI:
          </n-text>
          <n-a class="doi"
               :href=doiText
               target="_blank"
          >
            {{ doiText }}
          </n-a>
        </div>
      </n-scrollbar>
    </n-card>
    <div class="page">
      <n-card class="detail" content-style="padding: 0;">
        <n-tabs
            type="line"
            size="large"
            :tabs-padding="20"
            pane-style="padding: 20px;"
        >
          <n-tab-pane name="摘要">
            <n-scrollbar style="max-height: 330px">
              <n-ellipsis v-if="abstract === null " class="refer" expand-trigger="click" line-clamp="10" :tooltip="false"
                          content-style="margin-top: 10px;">
                当前论文摘要为空
              </n-ellipsis>
              <n-ellipsis v-else class="refer" expand-trigger="click" line-clamp="10" :tooltip="false"
                          content-style="margin-top: 10px;">
                {{ abstract }}
              </n-ellipsis>
            </n-scrollbar>
          </n-tab-pane>
          <n-tab-pane name="参考文献">
            <n-scrollbar style="max-height: 330px">
              <ScienceWorkCard :works="works"></ScienceWorkCard>
              <n-list v-if="refer.length == 0" hoverable clickable>
                当前参考文献为空
              </n-list>
              <n-list v-else hoverable clickable>
                <n-list-item v-for="(item, index) in refer" :key="index">
                  <n-thing class="refer" :title="`[${index+1}] ${item}`" content-style="margin-top: 10px;"
                           @click="toPaper(item)">
                  </n-thing>
                </n-list-item>
              </n-list>
            </n-scrollbar>
          </n-tab-pane>
          <n-tab-pane name="关键词">
            <n-scrollbar style="max-height: 330px">
              <n-space v-if="tags.length == 0" size="large" style="margin-top: 4px">
                当前关键词为空
              </n-space>
              <n-space v-else size="large" style="margin-top: 4px">
                <n-tag
                    v-for="(tag, index) in tags"
                    :key="index"
                    :bordered="false"
                    type="info"
                    size="large"
                >
                  {{ tag.keyword }}
                </n-tag>
              </n-space>
            </n-scrollbar>
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
    <div class="times">
      <n-statistic label="该论文共被引用" tabular-nums>
        <n-number-animation ref="numberAnimationInstRef" :from="0" :to=number />
        <template #suffix>
          次
        </template>
      </n-statistic>
    </div>
    <n-row>
      <div class="data">
        <n-col :span="12">
          <n-statistic label="创建时间">
            {{ createTime }}
          </n-statistic>
        </n-col>
      </div>
      <div class="users">
        <n-col :span="12">
          <n-statistic label="更新时间">
            {{ formatUpdateTime(updateTime) }}
          </n-statistic>
        </n-col>
      </div>
    </n-row>
    <div class="aspect">
      <n-card class="card" hoverable>
        <n-scrollbar style="max-height: 200px">
          <div>
            <n-h2>领域</n-h2>
          </div>
          <n-a class="p"
               v-for="(link, index) in gradientTexts"
               :key="index"
               :href="link.wikidata"
               target="_blank"
          >
            -{{ link.display_name }}
          </n-a>
        </n-scrollbar>
      </n-card>
      <n-card class="by" hoverable>
        <n-scrollbar style="max-height: 200px">
          <div>
            <n-h2>引用文献</n-h2>
          </div>
          <n-a class="o"
               v-for="(link, index) in citied"
               :key="index"
               @click="toPaper(link)"
               target="_blank"
          >
            -{{ link }}
          </n-a>
        </n-scrollbar>
      </n-card>
    </div>
  </div>
  <div class="PageContainer">
    <img src="@/assets/displayPaper.jpg" class="background" alt=" "/>
  </div>

</template>

<script setup>
import {} from '@vicons/ionicons4'
import {Reader, Star, ArrowBack, PersonCircleSharp} from '@vicons/ionicons5'
import {ref, onMounted, watch, reactive} from "vue";
import {MdSave} from '@vicons/ionicons4'
import {useMessage, NAvatar, NText} from 'naive-ui'
import {queryScienceWorkDetail, addStar, removeStar, claimSubmit, getStar, getFieldDate, accountLogout} from '../api';
import axios from 'axios';
import ScienceWorkCard from '../components/searchList/ScienceWorkCard.vue'
import {useRoute, useRouter} from "vue-router";
import {getToken} from "@/utils/auths";

const abstract = ref('');
const citied = ref([]);
const works = ref([])
const location = ref([])
const locations = ref([])
const doiText = ref('');
const title = ref("");
const number = ref("");
const refer = ref([]);
const createTime = ref("");
const updateTime = ref("");
const tags = ref([{
  "keyword": "",
}]);
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
const url1 = 'https://api.openalex.org/works/W2144506583';
let responseData = "";
const router = useRouter();
const route = useRoute();
const id = ref('');
const locationID = ref('')
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
onMounted(() => {
  id.value = route.query.id;
  getRefer(id.value);
  if (getToken('csrftoken') != null) {
    userOptions[1].label = '退出登录'
    userOptions[1].key = 'logout'
  } else {
    userOptions[1].label = '登录'
    userOptions[1].key = 'login'
  }
})
let tempKey = ref(0)
watch(route, (newValue, oldValue) => {
  // 执行onMounted代码
  id.value=route.query.id;
  getRefer(id.value)
  tempKey.value++
})
// 使用 axios 发送 GET 请求
axios.get(url1)
    .then(response => {
      // 在请求成功时更新数据
      responseData = response.data.id;
    })
    .catch(error => {
      console.error(`Failed to retrieve content. Error: ${error.message}`);
    });
const getRefer = (id) => {
  queryScienceWorkDetail({
    id: id
  }).then(res => {
    title.value = res.data.title;
    links.value = res.data.authorships;
    links1.value = res.data.biblio;
    console.log(res.data)
    doiText.value = res.data.doi;
    abstract.value = res.data.abstract;
    location.value = res.data.locations[0].source.display_name
    locationID.value = parseInt(res.data.locations[0].source.id.match(/\d+$/))
    refer.value = res.data.referenced_works;
    tags.value = res.data.keywords;
    number.value = res.data.cited_by_count;
    createTime.value = res.data.created_date;
    updateTime.value = res.data.updated_date;
    gradientTexts.value = res.data.concepts;
    citied.value = res.data.related_works;
  })
}
const collected = ref('');
const formatUpdateTime = function (time) {
  const datePart = time.split("T")[0];
  return datePart;
};
const handleItemClick = (index) => {
  // 在这里编写处理点击事件的逻辑
  openNewPage(refer.value[index]);
};
const message = ref(useMessage());
const isLogin = ref(0);
const Yes = () => {
  getStar({
    work_id: id.value
  }).then(res => {
    console.log(res.data)
    collected.value = res.data.collected;
    console.log(res.data.collected)
    console.log(collected.value)
    if (collected.value == true) {
      removeStar({
        work_id:id.value
      }).then(res => {
        isLogin.value = res.errno;
        if (isLogin.value === 1002) {
          router.push({ path: '/login' })
          message.value?.warning("请先登录！", {duration: 4000});
        } else {
          message.value?.info("已取消收藏", {duration: 4000});
        }
      })
    } else {
      console.log(id.value)
      console.log(parseInt(id.value))
      addStar({
        work_id:parseInt(id.value)
      }).then(res => {
        isLogin.value = res.errno;
        console.log(res.errno)
        if (isLogin.value === 1002) {
          router.push({ path: '/login' })
          message.value?.warning("请先登录！", {duration: 4000});
        } else {
          message.value?.success("已收藏成功！", {duration: 4000});
        }
      })
    }
  })
};

const openNewPage = (url) => {
  window.open(url, '_blank');
};

function convertURL(inputURL) {
  // 解析URL
  const urlObj = new URL(inputURL);

  // 提取路径中的标识符
  const identifier = urlObj.pathname.split('/')[2];

  // 构建新的URL
  const newURL = `https://api.openalex.org/works/W${identifier}`;

  return newURL;
}

// 示例用法
const inputURL = 'https://openalex.org/W1540584531';
const convertedURL = convertURL(inputURL);

const back = () => {
  router.back();
}

const link4 = ref(
    {
      "author_position": "",
      "institutions": [{
        "id": "",
        "display_name": "",
        "lineage": [
          ""
        ]
      }]
    });
const links = ref([{
  "author_position": "",
  "author": {
    "id": "",
    "display_name": "",
    "orcid": ""
  },
  "institutions": [
    {
      "id": "",
      "display_name": ""
    },
    {
      "id": "",
      "display_name": ""
    }
  ],
  "countries": [
    ""
  ],
}]);
const links1 = ref({
  "volume": "",
  "issue": "",
  "first_page": "",
  "last_page": "",

},);
const gradientTexts = ref([{
  "wikidata": "",
  "display_name": "",
  "id": ""
},]);
// Usage of the type
const options1 = ref([]);
const options = [
  {
    label: '用户资料',
    key: 'profile',
  },
  {
    label: '编辑用户资料',
    key: 'editProfile',

  },
  {
    label: '退出登录',
    key: 'logout',

  }
]

function toPaper(link){
  console.log(link)
  router.push({name:'DisplayPaper',query:{id:parseInt(link.match(/(\d+)$/))}})
}

</script>
<style scoped>
.refer {
  font-family: "Droid Sans";
}

.aspect {
  display: block;
  margin-left: 120vh;
  margin-top: 15vh;
}

.locations {
  cursor: pointer;
}

.locations .gray-text {
  color: grey
}

.institutions .gray-text {
  color: rgb(128, 128, 128);
}

.page {
  margin-left: 14vh;
  margin-top: 40vh;
  width: 200vh;
  height: 100%;
  position: absolute;
}

.o {
  display: flow;
  color: goldenrod;
  text-decoration: none;
}

.o:hover {
  background-color: cornsilk;
}

.name {
  margin-left: 14vh;
  margin-top: 4vh;
  max-width: 100vh;
  position: absolute;
  height: 28vh;
}

.detail {
  margin-top: -5vh;
  max-width: 100vh;
  height: fit-content;
  max-height: 55vh;
}

.card {
  max-width: 60vh;
}

.by {
  margin-top: 10vh;
  max-width: 60vh;
}

.writers {
  text-decoration: none;
}

.writers:hover {
  background-color: #c0e5cd;
}

.doi {
  text-decoration: none;
}

.doi:hover {
  background-color: #c0e5cd;
}

.title-and-check {
  display: flex;
  max-height: fit-content;
}

.p {
  display: flow;
  color: #0571c9;
  text-decoration: none;
}

.p:hover {
  background-color: #b9d4f7;
}

.check {
  margin-left: 0vh;
  margin-top: 1vh;
}

.namePaper {
  margin-top: 1vh;
}

.times {
  margin-left: 120vh;
  margin-top: 5vh;
  position: absolute;
}

.data {
  margin-left: 150vh;
  margin-top: 5vh;
  width: 100%;
  height: 100%;
  position: absolute;
}

.users {
  margin-left:180vh;
  margin-top: 5vh;
  width: 100%;
  height: 100%;
  position: absolute;
}



.background {
  height: 100%;
  width: 100%;
}

.container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}


.PageContainer {
  left: 0%;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
}

</style>