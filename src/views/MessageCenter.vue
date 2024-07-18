<template>
  <SiderNav></SiderNav>
  <div ref="container" class="container">
    <n-tabs class="card" type="segment">
      <n-tab-pane class="m1" name="chap1" tab="系统通知">
        <n-scrollbar style="max-height: 88vh">
          <n-list hoverable clickable>
            <n-list-item v-if="items1.length == 1 && items2.length == 1 && items3.length == 1 && items4.length == 1" :key="0">
              <n-thing class="thing-container"  :content-style="'margin-top: 10px;'">
                当前暂无系统消息！
              </n-thing>
            </n-list-item>
            <n-list-item  v-for="(item, index) in items1.slice(1)" :key="index">
              <n-thing class="thing-container" :title="item.title" :content-style="'margin-top: 10px;'" @click="hasRead1(index,item)">
                <template #description>
                  <n-tag :bordered="false" :type="item.type" size="large">
                    {{ item.timestamp }}
                  </n-tag>
                  <n-badge class="dot" :value="value" dot />
                </template>
                {{ item.content }}
                <n-a @click="toPaper(item.link_id,index,item)">
                  {{item.link_content}}
                </n-a>
              </n-thing>
            </n-list-item>
            <n-list-item v-for="(item, index) in items2.slice(1)" :key="index">
              <n-thing class="thing-container" :title="item.title" :content-style="'margin-top: 10px;'">
                <template #description>
                  <n-tag :bordered="false" :type="item.type" size="large">
                    {{ item.timestamp }}
                  </n-tag>
                </template>
                {{ item.content }}
                <n-a @click="toPaperNew(item.link_id)">
                  {{item.link_content}}
                </n-a>
              </n-thing>
            </n-list-item>
            <n-list-item v-for="(item, index) in items3.slice(1)" :key="index" @click="hasRead2(index,item)">
              <n-thing class="thing-container" :title="item.title" :content-style="'margin-top: 10px;'">
                <template #description>
                  <n-tag :bordered="false" :type="item.type" size="large">
                    {{ item.timestamp }}
                  </n-tag>
                  <n-badge class="dot" :value="value" dot />
                </template>
                {{ item.content }}
                <n-a v-if="item.research_id === 'passed'" @click="toScholar(item.link_id,index,item)">
                  {{ item.link_content }}
                </n-a>
                <n-a v-if="item.research_id === 'failed'">
                  {{ item.link_content }}
                </n-a>
                {{item.message}}
              </n-thing>
            </n-list-item>
            <n-list-item v-for="(item, index) in items4.slice(1)" :key="index">
              <n-thing class="thing-container" :title="item.title" :content-style="'margin-top: 10px;'">
                <template #description>
                  <n-tag :bordered="false" :type="item.type" size="large">
                    {{ item.timestamp }}
                  </n-tag>
                </template>
                {{ item.content }}
                <n-a v-if="item.research_id == 'passed'" @click="toScholarNew(item.link_id)">
                  {{ item.link_content }}
                </n-a>
                <n-a v-if="item.research_id == 'failed'">
                  {{ item.link_content }}
                </n-a>
                {{item.message}}
              </n-thing>
            </n-list-item>
          </n-list>
        </n-scrollbar>
      </n-tab-pane>
      <n-tab-pane name="chap2" tab="转让请求">
        <n-scrollbar style="max-height: 88vh">
          <n-list hoverable clickable>
            <n-list-item v-if="items5.length == 1 && items6.length == 1 " :key="0">
              <n-thing class="thing-container"  :content-style="'margin-top: 10px;'">
                当前暂无转让请求！
              </n-thing>
            </n-list-item>
            <n-list-item v-for="(item, index) in items5.slice(1)" :key="index">
              <n-thing :title="item.title" :content-style="'margin-top: 10px;'">
                <template #description>
                  <n-tag :bordered="false" :type="item.type" size="large">
                    {{ item.timestamp }}
                  </n-tag>
                  <n-popconfirm
                      @positive-click="handlePositiveClick(index,item)"
                      @negative-click="handleNegativeClick(index,item)"
                  >
                    <template #trigger>
                      <n-badge class="dot" :value="value" dot />
                    </template>
                    您是否同意该转让请求？
                  </n-popconfirm>
                </template>
                {{ item.content }}
              </n-thing>
            </n-list-item>
            <n-list-item v-for="(item, index) in items6.slice(1)" :key="index">
              <n-thing :title="item.title" :content-style="'margin-top: 10px;'">
                <template #description>
                  <n-tag :bordered="false" :type="item.type" size="large">
                    {{ item.timestamp }}
                  </n-tag>
                </template>
                {{ item.content }}
              </n-thing>
            </n-list-item>
          </n-list>
        </n-scrollbar>
      </n-tab-pane>
      <n-tab-pane name="chap3" tab="转让回应">
        <n-scrollbar style="max-height: 88vh">
          <n-list hoverable clickable>
            <n-list-item v-if="items7.length == 1 && items8.length == 1" :key="0">
              <n-thing class="thing-container"  :content-style="'margin-top: 10px;'">
                当前暂无转让回应！
              </n-thing>
            </n-list-item>
            <n-list-item v-for="(item, index) in items7.slice(1)" :key="index" @click="hasRead3(index,item)">
              <n-thing :title="item.title" :content-style="'margin-top: 10px;'">
                <template #description>
                  <n-tag :bordered="false" :type="item.type" size="large">
                    {{ item.timestamp }}
                  </n-tag>
                  <n-badge class="dot" :value="value" dot />
                </template>
                {{ item.content }}
              </n-thing>
            </n-list-item>
            <n-list-item v-for="(item, index) in items8.slice(1)" :key="index">
              <n-thing :title="item.title" :content-style="'margin-top: 10px;'">
                <template #description>
                  <n-tag :bordered="false" :type="item.type" size="large">
                    {{ item.timestamp }}
                  </n-tag>
                </template>
                {{ item.content }}
              </n-thing>
            </n-list-item>
          </n-list>
        </n-scrollbar>
      </n-tab-pane>
    </n-tabs>
  </div>
  <div class="PageContainer">
    <img src="@/assets/y1.jpg" class="background" alt=" "/>
  </div>
</template>

<script setup>
import SiderNav from './SiderNav/nav.vue'
import {onMounted} from "vue";
import {getMessage, handlePatent, handleProject, handleReward, hasReadMessage, starWork} from "@/api";
import {useRoute, useRouter} from 'vue-router';
import {useMessage} from "naive-ui";
const route = useRoute()
const router = useRouter()
const items1 = ref([
  {
    id:"",
    research_id: "passed",
    timestamp: "2023-12-24 15:57:05",
    link_content: "Jack.",
    link_id: 5003911000,
    msg_type: "Follow Update",
    work_type: "not a work transfer message",
    title:"",
    type:"",
    content:"",
    status:"",
    message:""
  }
]);
const items2 = ref([
  {
    id:"",
    research_id: "passed",
    timestamp: "2023-12-24 15:57:05",
    link_content: "Jack.",
    link_id: 5003911000,
    msg_type: "Follow Update",
    work_type: "not a work transfer message",
    title:"",
    type:"",
    content:"",
    status:"",
    message:""
  }
]);
const items3 = ref([
  {
    id:"",
    research_id: "passed",
    timestamp: "2023-12-24 15:57:05",
    link_content: "Jack.",
    link_id: 5003911000,
    msg_type: "Follow Update",
    work_type: "not a work transfer message",
    title:"",
    type:"",
    content:"",
    status:"",
    message:""
  }
]);
const items4 = ref([
  {
    id:"",
    research_id: "passed",
    timestamp: "2023-12-24 15:57:05",
    link_content: "Jack.",
    link_id: 5003911000,
    msg_type: "Follow Update",
    work_type: "not a work transfer message",
    title:"",
    type:"",
    content:"",
    status:"",
    message:""
  }
]);
const items5 = ref([
  {
    id:"",
    research_id: "passed",
    timestamp: "2023-12-24 15:57:05",
    link_content: "Jack.",
    link_id: 5003911000,
    msg_type: "Follow Update",
    work_type: "not a work transfer message",
    title:"",
    type:"",
    content:"",
    status:"",
    message:""
  }
]);
const items6 = ref([
  {
    id:"",
    research_id: "passed",
    timestamp: "2023-12-24 15:57:05",
    link_content: "Jack.",
    link_id: 5003911000,
    msg_type: "Follow Update",
    work_type: "not a work transfer message",
    title:"",
    type:"",
    content:"",
    status:"",
    message:""
  }
]);
const items7 = ref([
  {
    id:"",
    research_id: "passed",
    timestamp: "2023-12-24 15:57:05",
    link_content: "Jack.",
    link_id: 5003911000,
    msg_type: "Follow Update",
    work_type: "not a work transfer message",
    title:"",
    type:"",
    content:"",
    status:"",
    message:""
  }
]);
const items8 = ref([
  {
    id:"",
    research_id: "passed",
    timestamp: "2023-12-24 15:57:05",
    link_content: "Jack.",
    link_id: 5003911000,
    msg_type: "Follow Update",
    work_type: "not a work transfer message",
    title:"",
    type:"",
    content:"",
    status:"",
    message:"",
  }
]);
const items = ref([
  {
    research_id: "",
    timestamp: "",
    link_content: "",
    link_id: "",
    msg_type: "",
    work_type: "",
    title:"",
    type:"",
    content:"",
    status:"",
    message:"",
    id:""
  }
]);
const hasRead1 = (index,item)  => {
  items1.value.splice(index, 1)
  items2.value.push(item)
  console.log(item.link_id)
  console.log(item.id)
  hasReadMessage({
    id:item.id
  }).then(res=>{
    console.log(res)
    if(res.errno === 0){
    }
  })
}
const hasRead2 = (index,item)  => {
  items3.value.splice(index, 1)
  items4.value.push(item)
  console.log(item.link_id)
  hasReadMessage({
    id:item.id
  }).then(res=>{
    console.log(res)
    if(res.errno === 0){
    }
  })
}
const hasRead3 = (index,item)  => {
  items7.value.splice(index, 1)
  items8.value.push(item)
  console.log(item.link_id)
  hasReadMessage({
    id:item.id
  }).then(res=>{
    console.log(res)
    if(res.errno === 0){
    }
  })
}
const handlePositiveClick = (index,item)  => {
    items5.value.splice(index, 1)
    items6.value.push(item)
    console.log(item.link_id)
    hasReadMessage({
      id:item.id
    }).then(res=>{
      console.log(res)
      if(res.errno === 0){
      }
    });
  if(item.work_type === 'Patent'){
    handlePatent({
      opinion:"agree",
      transfer_id:item.id,
      patent_id:item.link_id
    }).then(res=>{
      console.log(res)
      if(res.errno === 0){
      }
    })
  }
  else if(item.work_type === 'Reward'){
    handleReward({
      opinion:"agree",
      transfer_id:item.id,
      reward_id:item.link_id
    }).then(res=>{
      console.log(res)
      if(res.errno === 0){
      }
    })
  }
  else if(item.work_type === 'Project'){
    handleProject({
      opinion:"agree",
      transfer_id:item.id,
      project_id:item.link_id
    }).then(res=>{
      console.log(res)
      if(res.errno === 0){
      }
    })
  }
}
const handleNegativeClick = (index,item)  => {
  items5.value.splice(index, 1)
  items6.value.push(item)
  console.log(item.link_id)
  hasReadMessage({
    id:item.id
  }).then(res=>{
    console.log(res)
    if(res.errno === 0){
    }
  });
  if(item.work_type === 'Patent'){
    handlePatent({
      opinion:"refuse",
      transfer_id:item.id,
      patent_id:item.link_id
    }).then(res=>{
      console.log(res)
      if(res.errno === 0){
      }
    })
  }
  else if(item.work_type === 'Reward'){
    handleReward({
      opinion:"refuse",
      transfer_id:item.id,
      reward_id:item.link_id
    }).then(res=>{
      console.log(res)
      if(res.errno === 0){
      }
    })
  }
  else if(item.work_type === 'Project'){
    handleProject({
      opinion:"refuse",
      transfer_id:item.id,
      project_id:item.link_id
    }).then(res=>{
      console.log(res)
      if(res.errno === 0){
      }
    })
  }
}
const add1 = (item)  => {
  items1.value.push(item)
  console.log(items1.value[1].research_id)
}
const add2 = (item)  => {
  items2.value.push(item)
  console.log(items2.value[1].research_id)
}
const add3 = (item)  => {
  items3.value.push(item)
  console.log(items3.value[1].research_id)
}
const add4 = (item)  => {
  items4.value.push(item)
  console.log(items4.value[1].research_id)
}
const add5 = (item)  => {
  items5.value.push(item)
  console.log(items5.value[1].research_id)
}
const add6 = (item)  => {
  items6.value.push(item)
  console.log(items6.value[1].research_id)
}
const add7 = (item)  => {
  items7.value.push(item)
  console.log(items7.value[1].research_id)
}
const add8 = (item)  => {
  items8.value.push(item)
  console.log(items8.value[1].research_id)
}
const message = useMessage();
onMounted (() => {
   getMessage({
   }).then(res => {
     console.log(res.errno)
     if(res.errno === 1002 ){
       router.push({ path: '/login' })
       message.warning("请先登录！")
     }
     else {
       items.value=res.data;
       set();
     }
   })
})
function toPaper(id,index,item) {
  router.push({name: 'DisplayPaper', query: {id: id}});
  hasRead1(index,item)
}
function toScholar(id,index,item){
  router.push({name: 'ScholarPage', query: {id: id}});
  hasRead2(index,item)
}
function toPaperNew(id) {
  router.push({name: 'DisplayPaper', query: {id: id}});
}
function toScholarNew(id){
  router.push({name: 'ScholarPage', query: {id: id}});
}
const set = () =>{
  console.log(items.value.length)
  for(let i=0;i<items.value.length;i++){
    console.log(items.value[i].status)
    init(items.value[i]);
    console.log(items.value[i].msg_type)
    if(items.value[i].msg_type == "Follow Update" && items.value[i].status == false){
      add1(items.value[i]);
    }
    else if(items.value[i].msg_type == "Follow Update" && items.value[i].status == true){
      add2(items.value[i]);
    }
    else if(items.value[i].msg_type == "Claim Review" && items.value[i].status == false){
      add3(items.value[i]);
    }
    else if(items.value[i].msg_type == "Claim Review" && items.value[i].status == true){
      add4(items.value[i]);
    }
    else if(items.value[i].msg_type == "Works Transfer" && items.value[i].status == false){
      console.log("yes")
      add5(items.value[i]);
    }
    else if(items.value[i].msg_type == "Works Transfer" && items.value[i].status === true){
      console.log("yes")
      add6(items.value[i]);
    }
    else if(items.value[i].msg_type == "Transfer Response" && items.value[i].status == false){
      add7(items.value[i]);
    }
    else if(items.value[i].msg_type == "Transfer Response" && items.value[i].status == true){
      add8(items.value[i]);
    }
  }
}
const init = (item)  => {
  if (item.msg_type == "Follow Update") {
    item.title = "关注者更新";
    item.type = "info";
    item.content = "您关注的ID为 " + item.research_id + " 的研究者更新了 ";
  }
  else if (item.msg_type == "Works Transfer") {
    item.title = "转让请求";
    item.type = "warning";
    item.content = "ID为 " + item.research_id + " 的用户向你发来 " + item.work_type + " 的转让请求 ";
  }
  else if (item.msg_type == "Transfer Response") {
    item.title = "转让回应";
    item.type = "success";
    if (item.research_id == "passed") {
      item.content = "ID为 " + item.link_id + " 的用户 " + item.link_content + " 接受了你的 " + item.work_type + " 转让请求 ";
    }
    else {
      item.content = "ID为 " + item.link_id + " 的用户 " + item.link_content + " 拒绝了你的 " + item.work_type + " 转让请求 ";
    }
  }
  else if (item.msg_type == "Claim Review") {
    item.title = "门户认领";
    item.type = "error";
    item.content = "您申请的ID为 " + item.link_id + " 的门户";
    if (item.research_id == "passed") {
      item.message = " 成功了！";
    }
    else {
      item.content = " 失败了！";
    }
  }
};
</script>
<style scoped>
.thing-container {
  display: flex;
  justify-content: space-between;
}
.background{
  height: 100%;
  width: 100%;
}
.container {
  display: flex;
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
.dot{
  margin-left: 60vh;
}
.card{
  margin-top: 2vh;
  margin-left: 30vh;
  margin-right: 80vh;
}
</style>