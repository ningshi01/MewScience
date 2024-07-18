<script setup >
import axios from "axios";

const Achievements = defineAsyncComponent(() => import("@/components/Scholar/Achievements.vue"))
const Profile = defineAsyncComponent (()=>import("@/components/Scholar/Profile.vue"))
import ScholarIndex from "@/components/Scholar/ScholarIndex.vue";
import ResearchField from "@/components/Scholar/ResearchField.vue"
import Cooperation from "@/components/Scholar/Cooperation.vue"
import OutputQuantity from "@/components/Scholar/OutputQuantity.vue";
import {NMessageProvider, NTimeline, NTimelineItem} from 'naive-ui'
import {onMounted, ref, defineAsyncComponent, watch} from "vue";
import {accountLogin, accountLogout, getScholarData} from "../api"
import { useRoute, useRouter } from 'vue-router';
import {PersonCircleSharp} from "@vicons/ionicons5";

let identity = ref(true);

const route = useRoute();
const router = useRouter();
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
onMounted(() => {
  scholarID.value=route.query.id;
  getScholar();
})

watch(route, (newValue, oldValue) => {
  console.log('watch 已触发', newValue, oldValue)
  // 执行onMounted代码
  scholarID.value=route.query.id;
  getScholar();
  tempKey.value++
})
const scholarID=ref()

let tempKey = ref(0)

const scholar = ref()

function login() {
  accountLogin({
    username: "ms",
    password: "123"
  }).then(function(res) {
    console.log(res)
  })
}

function getScholar() {
  getScholarData( {
      id: scholarID.value
  }).then(function (res) {
    console.log(res.data)
    const date = new Date(res.data.updated_date);
// 获取年、月、日、小时和分钟
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 加1因为月份从0开始，padStart用于补零
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
// 格式化成所需的字符串
    res.data.updated_date = year + "年" + month + "月" + day + "日" + hours + ":" + minutes;
    scholar.value = res.data;
  })
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
  <div class="container" :key="tempKey">
    <div class="left">
      <n-timeline>
        <n-timeline-item line-type="dashed">
          <div class="profile">
            <n-message-provider>
              <Profile :identity="identity" :scholar="scholar"/>
            </n-message-provider>
          </div>
        </n-timeline-item>
        <n-timeline-item line-type="dashed">
          <template #icon>
            <n-icon size=30>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
                <path d="M19 10h7v2h-7z" fill="currentColor"></path>
                <path d="M19 15h7v2h-7z" fill="currentColor"></path>
                <path d="M19 20h7v2h-7z" fill="currentColor"></path>
                <path d="M6 10h7v2H6z" fill="currentColor"></path>
                <path d="M6 15h7v2H6z" fill="currentColor"></path>
                <path d="M6 20h7v2H6z" fill="currentColor"></path>
                <path
                    d="M28 5H4a2.002 2.002 0 0 0-2 2v18a2.002 2.002 0 0 0 2 2h24a2.002 2.002 0 0 0 2-2V7a2.002 2.002 0 0 0-2-2zM4 7h11v18H4zm13 18V7h11v18z"
                    fill="currentColor"></path>
              </svg>
            </n-icon>
          </template>
          <template #default>
            <div class="edu_work">
              <ScholarIndex :scholar="scholar"/>
            </div>
          </template>
        </n-timeline-item>
        <n-timeline-item></n-timeline-item>
      </n-timeline>


    </div>
    <div class="middle">
      <OutputQuantity :scholar="scholar" class="middle1 middle-item"/>
      <Achievements :scholar="scholar" class="middle2 middle-item"/>
    </div>
    <div class="right">
      <div class="section3 right_item">
        <ResearchField :scholar="scholar"/>
      </div>
      <div class="section4 right_item">
        <Cooperation :scholar="scholar"/>
      </div>
      <!--      <div class="section4 right_item">-->
      <!--        <Right3/>-->
      <!--      </div>-->
      <div class="data_disclaimer"><p>数据免责声明</p>
        <p>页面数据均来自互联网公开来源、合作出版商和通过AI技术自动分析结果，
          我们不对页面数据的有效性、准确性、正确性、可靠性、完整性和及时性做出任何承诺和保证。
          若有疑问，可以通过电子邮件方式联系我们：mewscience@163.com</p></div>
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
.container {
  padding-left: 20px;
  margin-top: 20px;
  top: 0;
  display: flex;
  justify-content: center;

  width: 100%;
}

.left {
  width: 350px;
  height: 100%;


}

.middle {
  width: 600px;
  height: 100%;
  padding-top: 0;
}

.middle-item {
  width: 550px;
  margin-left: 20px;
  margin-right: 20px;
  border: 1px dashed lightgray; /* 浅虚线边框，颜色为浅灰色 */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  padding: 20px;
  padding-top: 0;
  margin-bottom: 20px;
}


.right {
  width: 350px;
}

.right_item {
  margin-bottom: 20px;
}

.section3 {
  border: 1px dashed lightgray; /* 浅虚线边框，颜色为浅灰色 */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  padding: 10px; /* 添加内边距以显示边框和阴影效果 */
}

.section4 {
  border: 1px dashed lightgray; /* 浅虚线边框，颜色为浅灰色 */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  padding: 10px; /* 添加内边距以显示边框和阴影效果 */
}

.edu_work {
  margin-top: 20px;
}

.data_disclaimer > p {
  margin-bottom: 10px;
  font-weight: lighter;
  font-size: 12px;
}
</style>