<template>
  <Sider></Sider>
  <div class="centerBanner">
    <div class="firstBlock">
      <p class="icons icon1">
        <i class="iconfont icon-zhangdan "></i>
      </p>
      <p class="titles">
        自动聚合学术
      </p>
      <div class="content">MewSci学术会根据全网文章数据，自动帮学者聚合学术成果，
        生成自己的学者主页，学者只需要认证自己的主页即可以使用相关功能。</div>
    </div>
    <div class="secondBlock">
      <p class="icons icon2">
        <i class="iconfont icon-lianjie "></i>
      </p>
      <p class="titles">
        领域热点分析
      </p>
      <div class="content">快速查看近年热门的领域，我们根据数据筛选出了近年热门的领域，使用者可根据三不同条件来查看近年最热门的领域</div>
    </div>
    <div class="thirdBlock">
      <p class="icons icon3">
        <i class="iconfont icon-rise "></i>
      </p>
      <p class="titles">
        热门机构推荐
      </p>
      <div class="content">学者可在MewSci学术持续维护自己的学者主页，将其打造成自己的学术名片，通过分享主页增加自己在学术界的影响力。
      </div>
    </div>
  </div>
  <div class="container">
    <n-space vertical :size="10">
      <n-data-table
          :single-line="false"
          size="small"
          :columns="columns"
          :data="authors"
          :bordered="false"
          :bottom-bordered="false"
          class="table first"
          :row-props="rowProps"
          virtual-scroll
          :max-height="360"
      />
    </n-space>
    <n-space vertical :size="10">
      <n-data-table
          :single-line="false"
          size="small"
          :columns="columns"
          :data="concepts"
          :bordered="false"
          :bottom-bordered="false"
          class="table"
          :row-props="rowProps2"
          virtual-scroll
          :max-height="360"
      />
    </n-space>
    <n-space vertical :size="10">
      <n-data-table
          :single-line="false"
          size="small"
          :columns="columns"
          :data="institutions"
          :bordered="false"
          :bottom-bordered="false"
          class="table"
          :row-props="rowProps1"
          virtual-scroll
          :max-height="360"
      />
    </n-space>
  </div>
  <div class="imgContainer">
    <div class="foot foot1">
      <p>107246个机构</p>
    </div>
    <div class="foot foot2">
      <p>89520174位学者</p>
    </div>
    <div class="foot foot3">
      <p>89520174篇文章</p>
    </div>
  </div>
  <n-drawer v-model:show="show" :width="502" :on-after-leave="closeField" :show-mask="'transparent'">
    <div class="container1">
      <div class="header">
        <div class="left">
          <div class="title">
            {{ field.display_name }}
          </div>
          <div class="description">{{ field.description }}</div>
          <div style="margin-left: 10px">
            <span class="works_count">相关文献量</span> <span class="relevantLiteratureNum"><n-number-animation
              ref="numberAnimationInstRef" :from="0" :to="field.works_count" style="font-size: 18px"/></span><span
              class="works_count">篇</span>
          </div>
        </div>
        <div class="right">
          <div class="image">
            <n-image
                width="100"
                :src="field.image_url"
            />
          </div>
        </div>
      </div>
      <n-divider style="margin: 5px"/>
      <div class="date">
        <div class="created_date">创建日期 <span class="inner_date">{{ field.created_date }}</span></div>
        <div class="updated_date">最近更新 <span class="inner_date">{{ field.updated_date }}</span></div>
      </div>
      <div class="related_concepts">
        <div class="concept_title">相关概念<span>(相关度由大到小排序)</span></div>
        <div class="concepts">
        <span class="concept" v-for="(concept,index) in field.related_concepts.slice(0,30)">
          <span class="concept_name">{{ concept.display_name }}</span>
          <span v-if="index!==field.related_concepts.slice(0,30).length-1" class="comma"> , </span>
        </span>
        </div>
      </div>
      <div class="relatedData">
        <div class="data_title">相关数据</div>
        <n-table :bordered="false" :single-line="false">
          <tbody v-for="(data,index) in relatedData">
          <tr>
            <td>{{ data.name }}</td>
            <td>{{ data.value }}</td>
          </tr>
          </tbody>
        </n-table>
      </div>
    </div>
  </n-drawer>
</template>
<script setup >
import { ref } from 'vue';
import Sider from '../views/SiderNav/nav.vue'
import axios from "axios";
import {onMounted} from 'vue';
import { useRouter } from 'vue-router';

import {getFieldDate} from "@/api";

const show = ref(false)
const field = ref({
  display_name: "",
  description: "",
  created_date: "",
  updated_date: "",
  related_concepts: [],
  image_url: "",
  summary_stats: [],
})
const numberAnimationInstRef = ref(null);
const relatedData = ref([])

function dateFormatConversion(date_old) {
  const date = new Date(date_old);
// 获取年、月、日、小时和分钟
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 加1因为月份从0开始，padStart用于补零
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
// 格式化成所需的字符串
  return year + "年" + month + "月" + day + "日" + hours + ":" + minutes;
}

function showField(id) {
  getFieldDate({
    id: id,
  }).then(res => {
    //console.log(res)
    field.value = res.data
    field.value.updated_date = dateFormatConversion(field.value.updated_date)
    for (const key in field.value.summary_stats) {
      if (field.value.summary_stats.hasOwnProperty(key)) {
        const value = field.value.summary_stats[key];
        if (key === '2yr_cited_by_count')
          relatedData.value.push({name: "2年相关学术成果引用量", value: value})
        else if (key === '2yr_h_index')
          relatedData.value.push({name: "2年相关学术成果h指数", value: value})
        else if (key === '2yr_i10_index')
          relatedData.value.push({name: "2年相关学术成果i10指数", value: value})
        else if (key === '2yr_mean_citedness')
          relatedData.value.push({name: "2年平均引用率", value: value})
        else if (key === '2yr_works_count')
          relatedData.value.push({name: "2年相关学术成果数量", value: value})
        else if (key === 'cited_by_count')
          relatedData.value.push({name: "总相关学术成果饮用量", value: value})
        else if (key === 'h_index')
          relatedData.value.push({name: "总h指数", value: value})
        else if (key === 'i10_index')
          relatedData.value.push({name: "总i10指数", value: value})
        else if (key === 'oa_percent')
          relatedData.value.push({name: "对外开放文献比例", value: value})
        else if (key === 'works_count')
          relatedData.value.push({name: "相关领域成果总量", value: value})
      }
    }
    relatedData.value.sort((a, b) => a.name.localeCompare(b.name))
  })
  show.value = true;
}

function closeField(){
  relatedData.value.splice(0, relatedData.value.length);
}
//----------------------------------------------------------------





const router=useRouter();

onMounted(() => {
  
  axios.get(`/api/science/hot`, {
    params: {
      index: 'institutions'
    },
  }).then(response => {
    // 请求成功，处理返回的数据
    const objects = response.data.data; // 假设返回的数据是一个对象数组
    // 遍历每个对象
    for(var j = 0,len=objects.length; j < len; j++) {
      let temp = objects[j]
      temp.id=objects[j].id;
      temp.display_name=objects[j]._source.display_name;
      temp.h_index=objects[j]._source.summary_stats.h_index;
      temp.yr_mean_citedness=objects[j]._source.summary_stats['2yr_mean_citedness'];
      temp.i10_index=objects[j]._source.summary_stats.i10_index;
      institutions.value.push(temp);
    }
  })
  axios.get(`/api/science/hot`, {
    params: {
      index: 'concepts'
    },
  }).then(response => {
    // 请求成功，处理返回的数据
    const objects = response.data.data; // 假设返回的数据是一个对象数组
    // 遍历每个对象
    for(var j = 0,len=objects.length; j < len; j++) {
      let temp = objects[j]
      temp.id=objects[j].id;
      temp.display_name=objects[j]._source.display_name;
      temp.h_index=objects[j]._source.summary_stats.h_index;
      temp.yr_mean_citedness=objects[j]._source.summary_stats['2yr_mean_citedness'];
      temp.i10_index=objects[j]._source.summary_stats.i10_index;
      concepts.value.push(temp);
    }
  })
  axios.get(`/api/science/hot`, {
    params: {
      index: 'authors'
    },
  }).then(response => {
    // 请求成功，处理返回的数据
    const objects = response.data.data; // 假设返回的数据是一个对象数组
    // 遍历每个对象
    for(var j = 0,len=objects.length; j < len; j++) {
      let temp = objects[j]
      temp.id=objects[j].id;
      temp.display_name=objects[j]._source.display_name;
      temp.h_index=objects[j]._source.summary_stats.h_index;
      temp.yr_mean_citedness=objects[j]._source.summary_stats['2yr_mean_citedness'];
      temp.i10_index=objects[j]._source.summary_stats.i10_index;
      authors.value.push(temp);
    }
  })
});


const institutions = ref([]);
const concepts = ref([]);
const authors = ref([]);
const rowProps= (row) => {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      console.log(row);
      router.push({name: 'ScholarPage',query:{id:row['_id']}});
    }
  }
}
const rowProps1= (row) => {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      console.log(row);
      router.push({name: 'Institution',query:{id:row['_id']}});
    }
  }
}
const rowProps2= (row) => {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      showField(row['_id'])
    }
  }
}

const columns = [
  {
    title: 'Name',
    key: 'display_name',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: 'h-指数',
    key: 'h_index',
    width: '75px',
    sorter: (row1, row2) => row1.h_index - row2.h_index,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '2年内被引次数',
    key: 'yr_mean_citedness',
    defaultSortOrder: false,
    sorter: (row1, row2) => row1.yr_mean_citedness - row2.yr_mean_citedness,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: 'i10指数',
    defaultSortOrder: false,
    key: 'i10_index',
    width: '75px',
    sorter: (row1, row2)=> row1.i10_index - row2.i10_index,
    ellipsis: {
      tooltip: true
    }
  },
]




</script>
<style scoped >
.foot p{
  font-weight: bold;
  margin-left: 110px;
  margin-top: 50px;
}
.foot2{
  background-image: url("../assets/foot2.jpg");
}
.foot1{
  background-image: url("../assets/foot1.jpg");
}
.foot3{
  background-image: url("../assets/foot3.jpg");
}
.foot{
  margin-right: 70px;
  height: 120px;
  width: 335px;
  font-size: 20px;
  color: white;
}
.imgContainer{
  margin-top: 40px;
  margin-left: 170px;
  display: flex;
}
.content{
  position: absolute;
  width: 250px;
  margin-top: 70px;
  font-size: 13px;
  margin-left: 45px;
}
.titles{
  margin-top: 30px;
  margin-left: 8px;
  font-weight: bold;
  font-size: 18px;
}
.icon1{
  background: #b9d4f7;
}
.icon2{
  background: #c0e5cd;
}
.icon3{
  background: #ffd69d;
}
.icons i{
  color: white;
  margin-left: 7px;
}
.firstBlock{
  display: flex;
  align-content: center;
  margin-right: 80px;
  background: #ebf2ff;
  height: 160px;
  width: 335px;
}

.secondBlock{
  display: flex;
  margin-right: 70px;
  background: #e7fef9;
  height: 160px;
  width: 335px;
}
.thirdBlock{
  display: flex;
  margin-right: 30px;
  background: #fffdf9;
  height: 160px;
  width: 335px;
}
.icons{
  margin-top: 30px;
  margin-left: 90px;
  height: 30px;
  width: 30px;
  border-radius: 100%;
}
.icon-zhangdan{
  border-radius: 100%;
}
.centerBanner{
  display: flex;
  align-content: center;
  margin-left: 170px;
}
.first{
  margin-left: 150px;
}
.container{
  display: flex;

}
.table{
  font-size: 10px;
  margin-top: 30px;
  margin-right: 30px;
  width: 380px;
}
.container1 {
  padding: 20px;
}

.title {
  font-weight: 700;
  font-size: 30px;

}

.works_count {
  font-weight: 600;
  font-size: 13px;
  color: #646363;
}

.relevantLiteratureNum {
  color: dodgerblue;
  margin-right: 5px;
  font-size: 20px;
  font-weight: 700;
}

.description {
  font-weight: 500;
  font-size: 16px;
  margin-left: 10px;
  color: #9b9a9a;
}

.container1 {
  margin-top: 5px;
}

.container1 > .date {
  display: flex;
  position: relative;
}

.header{
  display: flex;
  justify-content: space-between;
}

.created_date {
  margin-top: 5px;
  margin-right: 50px;
  font-weight: 400;
  font-size: 13px;
}

.updated_date {
  margin-top: 5px;
  font-weight: 400;
  font-size: 13px;
  position: absolute;
  right: 0;
}

.inner_date {
  margin-left: 5px;
  color: green;
}

.related_concepts {
  height: auto;
}

.concept_title {
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 20px;
}

.concept_title > span {
  font-weight: 500;
  font-size: 16px;
}

.concepts {
  padding: 5px;
}

.concept {
  margin-top: 10px;
}

.concept_name {
  font-weight: 500;
}

.comma {
  font-weight: 700;
}

.image {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.data_title {
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 20px;
}
</style>