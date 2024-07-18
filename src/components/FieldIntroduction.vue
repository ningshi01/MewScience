<script setup >
import {ref} from "vue";
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
    console.log(res)
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
  console.log(8888)
}

function closeField(){
  console.log(11111)
  relatedData.value.splice(0, relatedData.value.length);
}
</script>

<template>
  <n-button @click="showField(41008148)">
    打开
  </n-button>
  <n-drawer v-model:show="show" :width="502" :show-mask="'transparent'" :on-after-leave="closeField">
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

<style scoped>
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
  height: 250px;
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