
<template >
  <div class="cardContainer">
    <n-scrollbar style="max-height: 550px">
      <n-card
          style="width: 800px"
          title="高级检索"
          size="huge"
          role="dialog"
          aria-modal="true"
          embedded
          hoverable

      >
      <div class="selectContainer">
        <n-space  >
          <div class="select1">
          <n-select class="op2" v-model:value="firstInput.field" :options="options2" size="large" />
          <n-input class="input1" v-model:value="firstInput.query"  />
          </div>
        </n-space>
        <n-space v-for="(item, index) in num" >
          <div class="select1">
          <n-select class="op1"  v-model:value="item.logic" :options="options1" size="large" />
          <n-select class="op2"  v-model:value="item.field" :options="options2" size="large" />
          <n-input class="input" v-model:value="item.query"  />
          </div>
          <n-button strong secondary round @click="reduce">
             ×
          </n-button>
        </n-space>
        <n-button strong secondary round @click="addNum">
          + 增加检索条件
        </n-button>

  </div>


    <template #footer>
      <n-button strong secondary round type="primary" class="successButton" @click="send">
        检索学术成果
      </n-button>
    </template>
  </n-card>

    </n-scrollbar>
  </div>
</template>
<script setup>
import { useMessage } from 'naive-ui'
import {defineProps, ref,defineEmits} from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps({
  fatherName:{
    type:Object
  },
})
const emit = defineEmits(['getValue'])

const router = useRouter();
const message = useMessage()
const firstInput=ref({
  'logic':"must",
  "field": "title",
  "query":"",
})
const num=ref([{
  'logic':"must",
  "field": "title",
  "query":"",
}]);
const send=()=>{
  let query = [firstInput.value]
  query = query.concat(num.value)
  console.log(props.fatherName)
  if (props.fatherName.name==="Search"){
  router.push({name:"workSearchList",query:{'query':JSON.stringify(query)}});
  }
  else {
      emit("getValue", JSON.stringify(query))
  }
}
const addNum=()=>{
  num.value.push({
    'logic':"",
    "field": "",
    "query":"",
  })
}
const reduce=()=>{
  if(num.value.length>0){
    num.value.pop();
}
}
const options1 =[
  {
    label: 'AND',
    value: 'must'
  },
  {
    label: 'OR',
    value: 'should'
  },
  {
    label: 'NOT',
    value: 'must_not'
  },
]
const options2=[
  {
    label: '名称',
    value: 'title'
  },
  {
    label: '作者',
    value: 'author'
  },
  {
    label: '期刊名',
    value: 'source'
  },
  {
    label: '出版时间',
    value: 'publication_date'
  },
  {
    label: '领域',
    value: 'concept'
  },

]


</script>

<style scoped>

.successButton{
  margin-left: 580px;
}

.op1{
  margin-right: 5px;
  height: 58px;
  width: 80px;
}
.op2{
  height: 48px;
  margin-right: 5px;
  width: 200px;
}
.input{
  height: 40px;
  width: 400px;
}
.input1{
  height: 40px;
  width: 485px;
}
.select1{
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.selectContainer{
  min-height: 300px;
  width: 1000px;
}

</style>