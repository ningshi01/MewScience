<script lang="ts" setup>
import {onMounted,ref,reactive,getCurrentInstance } from 'vue'
import {queryScienceInsitutions} from "../../api";
import {useRoute} from "vue-router"
onMounted(()=>{
  const instance = getCurrentInstance();
  const route = useRoute();

  const id = ref()
  id.value = route.query.id;
  // 获取路由参数
  Institution_Id.value = id.value;
  getData_ForInstitutions();
})
const Institution_Data = reactive({
  "display_name":"",
  "image_url":"",
  "country_code":"",
  "geo_city":"",
  "type":"",
  "homepage_url":"",
  "summary_stats_2yr_mean_citedness":"",
  "summary_stats_2yr_works_count":"",
  "summary_stats_oa_percent":"",
})
type situation_by_one_year = {
  "year": number,
  "works_count": number,
  "oa_works_count": number,
  "cited_by_count": number
}
type Array_sboy = situation_by_one_year[];
const columns1 = [{
  title: 'Year',
  key: 'year'
},{
  title: '文献总数',
  key: 'works_count'
},{
  title: '开放文献',
  key: 'oa_works_count'
},{
  title: '被引次数',
  key: 'cited_by_count'
}]
const counts_by_year:Array_sboy = reactive([])
type concept = {
  "id": String,
  "wikidata": String,
  "display_name": String,
  "level": number,
  "score": number
}
type Array_concepts = concept[];
const columns2 = [{
  title: '领域名称',
  key: 'display_name'
},{
  title: '领域评级',
  key: 'level'
},{
  title: '综合得分',
  key: 'score'
},{
  title: '维基百科介绍网址',
  key: 'wikidata'
}]
const x_concepts:Array_concepts = reactive([]);
const pagination = ref({ pageSize: 5 });

const Institution_Id = ref(82880672);
const getData_ForInstitutions = () =>{
  queryScienceInsitutions({
    id:Institution_Id.value,
  }).then(res=>{
    console.log("succeed to get the Data!")
    console.log(res.data)
    Institution_Data.display_name = res.data.display_name
    Institution_Data.image_url = res.data.image_url
    Institution_Data.country_code = res.data.country_code
    Institution_Data.geo_city = res.data.geo.city
    Institution_Data.type = res.data.type
    Institution_Data.homepage_url = res.data.homepage_url
    Institution_Data.summary_stats_2yr_mean_citedness = res.data.summary_stats['2yr_mean_citedness'];
    Institution_Data.summary_stats_2yr_works_count = res.data.summary_stats['2yr_works_count'];
    Institution_Data.summary_stats_oa_percent = res.data.summary_stats['oa_percent'];
    counts_by_year.push(...res.data.counts_by_year);
    x_concepts.push(...res.data.x_concepts);
  }).catch(e=>{
    console.log("some Errors!")
  })
}
</script>

<template>
<div class="container">
  <div class="first-card">
    <div class="second-card">
      <div class="third-card">
        <n-card :title="Institution_Data.display_name" size="medium" hoverable>
          <template #cover>
            <img alt="机构图片"
                 class="card-image"
                 :src="Institution_Data.image_url">
          </template>
          机构简介暂无
        </n-card>
      </div>
      <div class="message-card">
        <div class="message-card-item">
          基本信息
          <br><br><br>
          所属地：{{Institution_Data.country_code}}<br>
          城市：{{Institution_Data.geo_city}}<br>
          机构类型：{{Institution_Data.type}}<br>
        </div>
        <div class="message-card-item">
          联系信息
          <br><br><br>
          主页：<a :href="Institution_Data.homepage_url" >{{Institution_Data.homepage_url}}</a><br>
        </div>
        <div class="message-card-item">
          概况信息
          <br><br><br>
          两年内被引次数：{{Institution_Data.summary_stats_2yr_mean_citedness}}<br>
          两年内文献总数：{{Institution_Data.summary_stats_2yr_works_count}}<br>
          相关系数：{{Institution_Data.summary_stats_oa_percent}}<br>
        </div>
      </div>
    </div>
    <div class="firth-card">
      <n-card content-style="padding: 0;">
        <n-tabs
            type="line"
            size="large"
            :tabs-padding="20"
            pane-style="padding: 20px;"
        >
          <n-tab-pane name="近年概况">
            <n-data-table
                :columns="columns1"
                :data="counts_by_year"
                :bordered="true"
                :pagination="pagination"
            />
          </n-tab-pane>
          <n-tab-pane name="领域概况">
            <n-data-table
                :columns="columns2"
                :data="x_concepts"
                :bordered="true"
                :pagination="pagination"
            />
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </div>
</div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.first-card {
  width: 95%;
  height: 95%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 0;
}
.second-card {
  width: 100vw;
  height: 50%;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-bottom: #222222;
  display: flex;
  flex: 1;
}
.third-card {
  margin-top: 2%;
  margin-left: 10%;
  width: 15%;
  height: 90%;
  display: flex;
}
.message-card {
  margin-left: 10%;
  width: 50vw;
  height: 60%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
}
.message-card-item {
  flex: 1;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.firth-card{
  flex: 1;
}
.card-image{
  width: 200px;
  height: 150px;
}
</style>