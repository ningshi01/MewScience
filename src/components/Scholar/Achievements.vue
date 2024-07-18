<script setup>
import {NList, NListItem, NDivider, NDropdown} from 'naive-ui'
import {reactive, ref, onMounted, toRefs,defineProps} from "vue";
import {getAward, getPaperAndRelated, getPatent,getProject} from '@/api'
import {useRoute, useRouter} from 'vue-router';

const props = defineProps({
  //子组件接收父组件传递过来的值
  scholar: {
    default: {
      cited_by_count: "",
      works_count: "",
      projects: [],
      patents: [],
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
      inite()
    },
    {
      deep: true
    }
)

onMounted(() => {
})
const route = useRoute()
const router = useRouter()

let type = ref(1)

let papers = ref([])
let showPapers = ref([])
let patents = ref([])

let projects = ref([])

let scholarID = ref()

const options = ref([
  {
    label: "年份",
    key: "year",
    children: []
  },
  {
    label: "引用量",
    key: "quoted"
  },
  {
    label: "合作机构",
    key: "institution",
    children: []
  },
  {
    label: "合作者",
    key: "coop",
    children: []
  }
]);



const sortOrder = ref("排序/筛选")

function changePaper() {
  type.value = 1;
}

function changePatent() {
  type.value = 2;
}

function changeProjects() {
  type.value = 3;
}


//改变排序
function changeSort(key) {
  showPapers.value = []
  if(typeof key === "number"){
    showPapers.value=papers.value.filter(paper=>parseInt(paper._source.publication_date.substring(0, 4))===key)
  }else if (key === "quoted") {
    sortOrder.value = "引用量优先"
    papers.value.sort(function (a, b) {
      return b._source.cited_by_count - a._source.cited_by_count;
    })
    showPapers.value=papers.value
  } else {
    sortOrder.value = key
    for (let i = 0; i < papers.value.length; i++) {
      for (let j = 0; j < papers.value[i]._source.authorships.length; j++) {
        if (papers.value[i]._source.authorships[j].author.display_name === key) {
          showPapers.value.push(papers.value[i])
        }
      }
    }
  }
}

function getPaperAndRelationship(id) {
  getPaperAndRelated({
    id: id
  }).then(function (res) {
    //console.log(res)
    papers.value = res.data.works
    for (let key in res.data.researchers) {
      if (res.data.researchers.hasOwnProperty(key)) {
        options.value[3].children.push({
          label: res.data.researchers[key].display_name,
          key: res.data.researchers[key].display_name
        })
      }
    }
    for (let key in res.data.institutions) {
      if (res.data.institutions.hasOwnProperty(key)) {
        options.value[2].children.push({
          label: res.data.institutions[key].display_name,
          key: res.data.institutions[key].display_name
        })
      }
    }
    let times = [];
    console.log(papers.value)
    for (let i = 0; i < papers.value.length; i++) {
      let year = parseInt(papers.value[i]._source.publication_date.substring(0, 4))
      if (!times.includes(year))
        times.push(year)
    }
    times.sort();
    for (let t in times) {
      options.value[0].children.push({
        label: times[t],
        key: times[t]
      })
    }
    paperOrder()
  })
}

function paperOrder() {
  //console.log("sort!!!")
  papers.value.sort(function (a, b) {
    if (a._source.publication_date < b._source.publication_date) {
      return 1;
    }
    if (a._source.publication_date > b._source.publication_date) {
      return -1;
    }
    return 0; // 如果相等，返回0
  })
  showPapers.value = papers.value
}

function toAuthor(id) {
  router.push({name: 'ScholarPage', query: {id: id}});
}

function toPaper(id) {
  router.push({name: 'DisplayPaper', query: {id: id}});
}

function toJournal(id) {
  const matches = id.match(/(\d+)$/);
  if (matches) {
    const idNum = parseInt(matches[0], 10)
    console.log(idNum)
    router.push({name: 'JournalPage', query: {id: idNum}});
  }
}
const PatentData=ref()
const getPatentData=(id)=>{
  getPatent({
    id: id
  }).then(function (res) {
    console.log(res)
    showPatent.value=true
    PatentData.value=res.data

  })
}
const AwardData=ref()
const getAwardData=()=>{
  getAward({
    id: 1001
  }).then(function (res) {
    console.log(res)
    showAward.value=true
    console.log(showAward.value)
    AwardData.value=res.data

  })
}
const ProjectData=ref()
const getProjectData=(id)=>{
  getProject({
    id:id
  }).then(function (res) {
    console.log(res)
    showProject.value=true
    console.log(showProject.value)
    ProjectData.value=res.data

  })
}
const showPatent=ref(false)
const showAward=ref(false)
const showProject=ref(false)

function inite(){
  projects.value = scholar.value.projects;
  patents.value = scholar.value.patents;
  scholarID.value = parseInt(scholar.value.id);
  getPaperAndRelationship(scholarID.value);
}

</script>

<template>
  <div>
    <div class="achievementType">
      <n-popover trigger="hover" :show-arrow="false" width="trigger">
        <template #trigger>
          <div>
            <button class="type" :class="{'paper':type===1}" @click="changePaper">论文</button>
            <button class="type" :class="{'patent':type===2}" @click="changePatent">专利</button>
            <button class="type" :class="{'projects':type===3}" @click="changeProjects">科研项目</button>
          </div>
        </template>
        <div style="display: flex;justify-content:space-evenly;">
          <div style="display: flex;flex-direction:column;align-items: center;">
            <span>学术成果总量</span> <span style="color: dodgerblue">{{ scholar.works_count }}</span></div>
          <div style="display: flex;flex-direction:column;align-items: center;"><span>被引用量</span> <span
              style="color: dodgerblue">{{ scholar.cited_by_count }}</span></div>
        </div>
      </n-popover>

      <n-dropdown
          :options="options"
          placement="left-start"
          trigger="hover"
          @select="changeSort"
      >
        <span class="sort" v-show="type===1">{{ sortOrder }}</span>
      </n-dropdown>
    </div>

    <n-list v-for="(paper,index) in showPapers" class="achievements" v-show="type===1">
      <div class="achievement_item">
        <n-divider v-if="index===0" style="margin-bottom: 10px"/>
        <n-list-item style="padding: 0">
          <div class="title">
            <n-popover width="600" trigger="hover" :delay="300" :duration="700" v-if="paper._source.abstract!=null">
              <template #trigger>
                <a class="title" @click="toPaper(paper._source.id)">{{ paper._source.title }}</a>
              </template>
              <n-ellipsis expand-trigger="click" line-clamp="2" :tooltip="false">
                <span>{{ paper._source.abstract }}</span>
              </n-ellipsis>
            </n-popover>
            <a class="title" @click="toPaper(paper._source.id)"
               v-if="paper._source.abstract==null">{{ paper._source.title }}</a>
          </div>
          <n-ellipsis line-clamp="3">
            <div class="authors">
              <a v-for="(author,index2) in paper._source.authorships" class="author_item">
                <span v-if="index2!==0"> , </span>
                <a class="author_item" :class="{'author_self ':author.author.id===scholar.id}"
                   @click="toAuthor(author.author.id)">{{ author.author.display_name }}</a>
              </a>
            </div>
          </n-ellipsis>
          <div class="source" v-if="paper._source.locations.length!==0&&paper._source.locations[0].source!=null"
               @click="toJournal(paper._source.locations[0].source.id)">
            {{ paper._source.locations[0].source.display_name }}
          </div>
          <div class="bottom">
            <span class="bottom_item">引用 <span class="bottom_num">{{ paper._source.cited_by_count }}</span></span>
            <n-divider vertical/>
<!--            <span class="bottom_item">访问 <span class="bottom_num">{{ paper.visited_time }}</span></span>-->
<!--            <n-divider vertical/>-->
            <span class="bottom_item">发表时间 <span class="bottom_num">{{
                paper._source.publication_date
              }}</span></span>
          </div>
        </n-list-item>
      </div>
    </n-list>
    <n-list v-for="(patent,index) in patents" class="achievements" v-show="type===2">
      <div class="achievement_item">
        <n-divider v-if="index===0" style="margin-bottom: 10px"/>
        <n-list-item style="padding: 0">

          <a class="title" @click="getPatentData(patent.id)">{{ patent.title }}</a>
          <div class="patent_number">{{ patent.number }}</div>
          <div class="authors">
            <span v-for="(author,index2) in patent.authors.split(';')" class="author_item">
              <span v-if="index2!==0"> , </span>
              <span class="author_item_unuse">{{ author }}</span>
            </span>
          </div>
          <div class="patent_authorized_institutions" v-if="patent.authorized_institutions!=='无'">
            {{ patent.authorized_institutions }}
          </div>
          <div class="bottom patent_date">
            <span class="bottom_item">发布时间 <span class="bottom_num">{{ patent.year }}</span></span>
          </div>
        </n-list-item>
      </div>
    </n-list>

    <n-list v-for="(project,index) in projects" class="achievements" v-show="type===3">
      <div class="achievement_item">
        <n-divider v-if="index===0" style="margin-bottom: 10px"/>

        <n-list-item style="padding: 0">

          <a class="title" @click="getProjectData(project.id)">{{ project.title }}</a>

          <div class="authors">
            <span v-for="(author,index2) in project.authors.split(';')" class="author_item">
              <span v-if="index2!==0"> , </span>
              <span class="author_item_unuse">{{ author }}</span>
            </span>
          </div>
          <div class="institution">{{ project.supporting_units }}</div>
          <div class="abstract_c abstract">
            <n-ellipsis :line-clamp="2" :expand-trigger="'click'">
              {{ project.abstract_c }}
              <template #tooltip>
                <div class="abstract_e abstract">
                  {{ project.abstract_e }}
                </div>
              </template>
            </n-ellipsis>
          </div>
          <div class="bottom">
            <!--            <span class="bottom_item">引用 <span class="bottom_num">{{ project.quoted_time }}</span></span>-->
            <!--            <n-divider vertical/>-->
            <!--            <span class="bottom_item">访问 <span class="bottom_num">{{ project.visited_time }}</span></span>-->
          </div>
        </n-list-item>
      </div>
    </n-list>

    <div v-if="type===1&&showPapers.length===0" class="empty">什么也没有哦</div>
    <div v-if="type===2&&patents.length===0" class="empty">什么也没有哦</div>
    <div v-if="type===3&&projects.length===0" class="empty">什么也没有哦</div>
    <n-drawer v-model:show="showPatent" :width="502" :placement="placement">
      <n-drawer-content >
        <h2>{{PatentData.title}}</h2>
        <n-h2 prefix="bar" align-text type="info">
          基本信息
        </n-h2>
        <div class="content">
        <p>作者:{{PatentData.authors}}</p>
        <p>成果类型：专利</p>
        <p>专利编号：{{PatentData.number}}</p>
        <p>授权机构：{{PatentData.authorized_institutions}}</p>
        <p>授权日期：{{PatentData.year}}</p>
        <p>授权区域：中国</p>
        </div>
        <n-h2 prefix="bar" align-text type="info" class="title1">
            相关项目
        </n-h2>
        <div class="projectContainer"   v-for="(project,index) in PatentData.projects" >
          <img class="icon1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABkCAIAAADhSTKwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REZERjA1RDE1RkFDMTFFQjk0QzhGM0EzQjk3MTBBOTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REZERjA1RDI1RkFDMTFFQjk0QzhGM0EzQjk3MTBBOTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpERkRGMDVDRjVGQUMxMUVCOTRDOEYzQTNCOTcxMEE5MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpERkRGMDVEMDVGQUMxMUVCOTRDOEYzQTNCOTcxMEE5MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt/A2wcAAAqsSURBVHja7J1bbBxX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" alt="">
          <p>{{project.title}}</p>
        </div>
      </n-drawer-content>
    </n-drawer>
    <n-drawer v-model:show="showProject" :width="502" :placement="placement">
      <n-drawer-content >
        <h2>{{ProjectData.title}}</h2>
        <n-h2 prefix="bar" align-text type="info">
          基本信息
        </n-h2>
        <div class="content">
          <p>项目批准号:{{ProjectData.authors}}</p>
          <p>申请代码：{{ProjectData.application_code}}</p>
          <p>项目名称：{{ProjectData.title}}</p>
          <p>项目参与人:{{ProjectData.authors}}</p>
          <p>依托单位:{{ProjectData.supporting_units}}</p>
          <p>资助经费:{{ProjectData.funds}}</p>
        </div>
        <n-h2 prefix="bar" align-text type="info" class="title1">
          项目摘要
        </n-h2>
        <p>
          中文摘要:{{ProjectData.abstract_c}}
        </p>
        <p>英文摘要:{{ProjectData.abstract_e}}</p>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style scoped>
.content p{
  font-size: 18px;
}
.title1{
  margin-top: 30px;
}
.projectContainer{
  margin-top: 30px;
  display: flex;
  font-size: 20px;
  font-weight: bold;
}
.icon1{
  height: 40px;
}
.achievementType {
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

.sort {
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  font-weight: 600;
  color: grey;
  font-size: 14px;
}

.paper {
  background-color: rgba(137, 116, 255, 0.89);
  color: white;
}

.patent {
  background-color: rgba(137, 116, 255, 0.89);
  color: white;
}

.projects {
  background-color: rgba(137, 116, 255, 0.89);
  color: white;
}

.achievement_item {
  margin-top: 10px;
  border-bottom: 1px solid #d2d1d1;
  padding-bottom: 10px;
}

.title {
  font-size: 20px;
  font-weight: 600;
}


.author_item {
  font-size: 13px;
  display: inline;
  font-weight: 600;
  color: green;
}

.author_item:hover {
  color: blue;
}

.author_item_unuse {
  font-size: 13px;
  display: inline;
  font-weight: 600;
  color: green;
}


.author_self {
  color: purple;
  font-size: 14px;
  font-weight: 700;
}

.source {
  font-size: 13px;
  color: #bbb9b9;
  font-weight: 600;
  margin-top: 3px;
  cursor: pointer;
}

.source:hover {
  color: #222222;
}

.abstract_c {
  margin-top: 5px;
  color: #6e6e6e;
}

.institution {
  font-size: 14px;
  font-weight: 600;
  margin-top: 3px;
}

.patent_authorized_institutions {
  font-size: 14px;
  font-weight: 600;
  margin-top: 3px;
  padding-bottom: 2px;
}

.patent_date {
  border-top: 1px dashed #e0dfdf;
  padding-top: 2px;
}

a {
  color: black;
  cursor: pointer;
}

a:hover {
  background-color: transparent;
}

.bottom {
  margin-top: 5px;
}

.bottom_item {
  font-size: 13px;
  font-weight: 600;
}

.bottom_num {
  margin-left: 5px;
  margin-right: 5px;
  color: dodgerblue;
  font-weight: 600;
}

.empty {
  width: auto;
  height: 200px;
  display: flex; /* 使用Flex布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  font-size: 14px;
  font-weight: 550;
  color: rgba(133, 132, 132, 0.89);
}
</style>