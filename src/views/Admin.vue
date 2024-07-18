<template>
  <div class="container">
    <div class="top">
      <n-image src="/tempLogo.png" class="logo"></n-image>
      <n-text class="title">
        管理平台
      </n-text>
    </div>
    <div class="content">
      <n-card class="card1">
        <n-button quaternary class="button" :class="{ active: activeButton === 1 }"  @click="clickButton1">
          <n-text :style="{ color: activeButton === 1 ? '#338cde' : 'black', fontWeight: 'bold', fontSize: '17px' }">门户审核</n-text>
        </n-button>
      </n-card>
      <n-card class="card2">
        <n-text style="font-weight: bold;font-size: 15px;margin-left: 38%">(点击用户名可查看具体信息)</n-text>
        <n-data-table
            class="table"
            :size="'large'"
            :bordered="false"
            :single-line="false"
            :columns="columns"
            :data="data"
            :pagination="pagination"
        />
        <n-modal
            v-model:show="isShowModal"
            preset="card"
            title="门户申请"
            style="width: 700px;height: 500px"
            size="huge"
            :bordered="false"
        >
          <n-text style="font-weight: bold">申请用户：</n-text>
          <n-text>{{username}}</n-text>
          <n-text style="margin-left: 7%;font-weight: bold">申请学者：</n-text>
          <n-text>{{researcher}}</n-text>
          <n-text style="margin-left: 7%;font-weight: bold">创建时间：</n-text>
          <n-text>{{create_time}}</n-text>
          <div style="margin-top: 30px">
            <n-text style="font-weight: bold">申请信息</n-text>
            <n-card class="card3">
              {{message1}}
            </n-card>
          </div>
          <div style="margin-top: 30px">
            <n-text style="font-weight: bold">附件</n-text>
            <div style="margin-top: 20px;display: flex;align-items: center">
              <n-icon size='50' :component="InsertDriveFileRound"></n-icon>
              <n-text>{{filename}}</n-text>
            </div>
            <div>
              <a @click="downloadFile" class="download">下载附件</a>
            </div>
          </div>
          <div style="margin-top: 30px;margin-left: 460px" >
            <n-button type="info" @click="approve1">通过</n-button>
            <n-button type="error" style="margin-left: 20px" @click="reject1">拒绝</n-button>
          </div>
        </n-modal>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h,onMounted} from 'vue'
import { NTag, NButton, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import {getApplicationList,processApplication,getApplication} from '../api'
import {InsertDriveFileRound} from '@vicons/material'
type RowData = {
  id: number;
  user: {
    id: number;
    username: string;
  };
  research_id: number;
  research_name: string;
  create_time: string;
  message:string;
}
const username = ref('')
const researcher = ref('')
const create_time = ref('')
const message1 = ref('')
const fileUrl = ref('')
const filetype = ref('')
const filename = ref('')
const application_id = ref(0)
const createColumns = ({
                         approve,
                         reject
                       }: {
  approve: (rowData: RowData) => void;
  reject: (rowData: RowData) => void;
}): DataTableColumns<RowData> => [
  {
    title: '用户名',
    key: 'user.username',
    align:'center',
    width:'17%',
    render(row: RowData) {
      return h(
          'a',
          {
            style: { cursor: 'pointer', color: 'black' },
            onClick: () => {
              // 在这里调用显示弹窗的逻辑
              showModal(row);
            }
          },
          row.user.username
      );
    }
  },
  {
    title: '学者名',
    key: 'research_name',
    align:'center',
    width:'20%',
  },
  {
    title: '申请信息',
    key: 'message',
    align:'center',
    width:'26%',
    render(row: RowData) {
      return [
        h(
            'div',
            {
              style: {
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }
            },
            row.message
        )
      ];
    }
  },
  {
    title: '申请时间',
    key: 'create_time',
    align:'center',
    width:'20%',
    render(row: RowData) {
      return formatDate(row.create_time);
    }
  },
  {
    title: 'Action',
    key: 'actions',
    width:'17%',
    align:'center',
    render(row: RowData) {
      return [
        h(
            NButton,
            {
              size: 'small',
              type: 'info',
              onClick: () => approve(row)
            },
            { default: () => '通过' }
        ),
        h(
            NButton,
            {
              size: 'small',
              type:'error',
              onClick: () => reject(row),
              style: {
                marginLeft: '20px',
              },
            },
            { default: () => '拒绝' }
        )
      ];
    }
  }
]
const formatDate = (dateString: string): string => {
  // 定义格式化选项并为其添加明确的类型注释
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  // 使用 'en-US' 区域设置和指定选项创建一个新的 DateTimeFormat 对象
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));

  // 返回格式化后的日期字符串
  return formattedDate;
};
const createData = () =>{
  getApplicationList().then(res =>{
      console.log(res);
      data.value = (res as any).data;
  })
};
const isShowModal = ref(false)
onMounted(() => {
  createData();
});
const downloadFile = async () => {
  const file = 'http://121.36.65.25:8000/'+fileUrl.value;
  const response = await fetch(file);
  const blob = await response.blob();
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = "申请材料."+filetype.value;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
const showModal=(row:RowData)=>{
  isShowModal.value=true;
  username.value = row.user.username;
  researcher.value=row.research_name;
  create_time.value=formatDate(row.create_time);
  message1.value=row.message;
  application_id.value=row.id;
  getApplication({
    id:row.id
  }).then(res=>{
    fileUrl.value=(res as any).data.file;
    filetype.value=fileUrl.value.split('/')[fileUrl.value.split('/').length-1].split('.')[1]
    filename.value='申请材料.'+filetype.value
  })
}
const message  = useMessage()
const data = ref<RowData[]>([]);
const approve1 = () => {
  processApplication({
    application_id:application_id.value,
    opinion:"true"
  }).then(res=>{
    isShowModal.value=false;
    createData()
  })
  message.success('已通过');
};
const approve = (rowData: RowData) => {
  processApplication({
    application_id:rowData.id,
    opinion:"true"
  }).then(res=>{
    createData()
  })
  message.success('已通过');
};
const reject1 = () => {
  processApplication({
    application_id:application_id.value,
    opinion:"false"
  }).then(res=>{
    isShowModal.value=false;
    createData()
  })
  message.success('已拒绝');
};
const reject = (rowData: RowData) => {
  processApplication({
    application_id:rowData.id,
    opinion:"false"
  }).then(res=>{
    createData()
  })
  message.error('已拒绝');
};
const columns = createColumns({
  approve,
  reject
})
const pagination = {
  pageSize: 12,
  size:'large'
}
const activeButton = ref(1);
const clickButton1 = () => {
  activeButton.value = 1;
};
const clickButton2 = () => {
  activeButton.value = 2;
};
const clickButton3 = () => {
  activeButton.value = 3;
};
</script>

<style scoped>
.card3{
  margin-top: 20px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  max-height: 150px;
  overflow: auto;
}
.download{
  color:blue;
  &:hover {
    cursor: pointer;
  }
}
.container {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
}

.top {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
}

.title {
  font-weight: bold;
  font-size: 25px;
  margin-left: 20px;
}

.logo {
  height: 40px;
  margin-right: 20px;
}

.content {
  flex: 1;
  display: flex;
  background-color: #f8f8f8;
}
.card1{
  width: 240px;
  height:180px;
  margin-top: 60px;
  margin-left: 120px;
  display: flex;
  align-items: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}
.button{
  width: 240px;
  margin-top: 10px;
  background-color: white;
  &:hover {
    background-color: white;
  }
  &:active{
    background-color: white;
  }
}
.active {
  color: #338cde;
  background-color: white !important;
  font-weight: bold;
  font-size: 17px;
}
.card2{
  margin: 60px 120px 50px 60px;
  display: flex;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}
.table{
  height:90%;
  width: 103%;
  margin-left: -20px;
  margin-top: 2%;
}
</style>
