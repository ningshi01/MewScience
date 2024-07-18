<template>
  <SiderNav></SiderNav>
  <n-space class="container">
    <n-image src="/tempLogo.svg" class="logo"></n-image>
    <n-card class="card1">
      <n-avatar
          round
          :size="200"
          src="/default avatar.svg"
          class="avatar"
      />
      <div style="display: flex;flex-direction: row;">
        <div @click="showMessage=true;showFollowList=false;showStarList=false" class="house">
          <n-icon size="40" color="#3f51b5" :component="HouseOutlined"></n-icon>
          <n-text style="font-size: 13px;">
            信息
          </n-text>
        </div>
        <div @click="showList2" class="star">
          <n-icon size="40" color="#f3a034" :component="StarSharp"></n-icon>
          <n-text style="font-size: 13px;">
            收藏夹
          </n-text>
        </div>
        <div class="follow" @click="showList">
          <n-text style="font-size: 28px;">
            {{followerNum}}
          </n-text>
          <n-text style="font-size: 13px;">
            订阅
          </n-text>
        </div>
      </div>
      <div class="icon-text">
        <n-icon size="23" :component="PersonOutlineOutlined" class="icon"/>
        <n-text class="text">{{userInfo.username}}</n-text>
        <n-button
            text
            style="font-size: 13px;margin-left: auto"
            type="info"
        >
          修改用户名
        </n-button>
      </div>
      <div class="icon-text">
        <n-icon size="23" :component="KeyRound" class="icon"/>
        <n-text class="text">{{userInfo.password}}</n-text>
        <n-button
            text
            style="font-size: 13px;margin-left: auto"
            type="info"
        >
          修改密码
        </n-button>
      </div>
      <div class="icon-text">
        <n-icon size="23" :component="LocalPhoneSharp" class="icon"/>
        <n-text class="text">{{userInfo.phone}}</n-text>
        <n-button
            text
            style="font-size: 13px;margin-left: auto"
            type="info"
        >
          绑定手机号
        </n-button>
      </div>
      <div class="icon-text">
        <n-icon size="23" :component="EmailOutlined" class="icon"/>
        <n-text class="text">{{userInfo.email}}</n-text>
        <n-button
            text
            style="font-size: 13px;margin-left: auto"
            type="info"
        >
          修改邮箱
        </n-button>
      </div>
      <div class="ListItem" @click="logout">
        <n-icon size="35" :component="LogOutRound" class="logout"/>
      </div>
    </n-card>
    <div class="space">
      <n-card class="card2" v-if="showMessage">
        <div class="icon-text1">
          <n-text style="font-weight: bold;font-size: 17px">基础信息</n-text>
          <n-icon size="25" :component="EditCalendarOutlined" class="edit_icon" @click="showModal1=true"/>
          <n-modal
              v-model:show="showModal1"
              :mask-closable="false"
              class="modal"
          >
            <n-card class="card4">
              <n-text style="font-weight: bold;font-size: 17px;margin-bottom: 30px">修改信息</n-text>
              <n-button circle style="margin-left: 540px;margin-bottom: 30px" @click="showModal1=false">
                <template #icon>
                  <n-icon><CloseOutlined /></n-icon>
                </template>
              </n-button>
              <n-form label-placement="left" inline class="input-container">
                <n-form-item label="生日" style="width: 200px;">
                  <n-input  v-model:value="newBirth" placeholder="请输入"/>
                </n-form-item>
                <n-form-item label="星座" style="width: 200px;margin-left: 100px">
                  <n-input v-model:value="newStar" placeholder="请输入"/>
                </n-form-item>
              </n-form>
              <n-form label-placement="left" inline class="input-container">
                <n-form-item label="学历" style="width: 200px;">
                  <n-input v-model:value="newDegree" placeholder="请输入"/>
                </n-form-item>
                <n-form-item label="单位" style="width: 200px;margin-left: 100px">
                  <n-input v-model:value="newUnit" placeholder="请输入"/>
                </n-form-item>
              </n-form>
              <n-form label-placement="left" inline class="input-container">
                <n-form-item label="学校" style="width: 200px;">
                  <n-input v-model:value="newSchool" placeholder="请输入"/>
                </n-form-item>
                <n-form-item label="职位" style="width: 200px;margin-left: 100px">
                  <n-input v-model:value="newPost" placeholder="请输入"/>
                </n-form-item>
              </n-form>
              <n-button type="info" style="margin-left: 580px;margin-top: 30px" @click="changeInfo">确认</n-button>
            </n-card>
          </n-modal>
        </div>
        <div style="margin-left: 10px">
          <n-descriptions  separator="    "  label-placement="left" columns=2 size="large" label-align="center">
            <n-descriptions-item label="生日" class="label">
              <n-text style="margin-left: 30px">{{birthday}}</n-text>
            </n-descriptions-item>
            <n-descriptions-item label="星座">
              <n-text style="margin-left: 30px">{{constellation}}</n-text>
            </n-descriptions-item>
            <n-descriptions-item label="学历">
              <n-text style="margin-left: 30px">{{degree}}</n-text>
            </n-descriptions-item>
            <n-descriptions-item label="单位">
              <n-text style="margin-left: 30px">{{unit}}</n-text>
            </n-descriptions-item>
            <n-descriptions-item label="学校">
              <n-text style="margin-left: 30px">{{school}}</n-text>
            </n-descriptions-item>
            <n-descriptions-item label="职位">
              <n-text style="margin-left: 30px">{{post}}</n-text>
            </n-descriptions-item>
          </n-descriptions>
        </div>
      </n-card>
      <n-card class="card3" v-if="showMessage">
        <div class="icon-text1">
          <n-text style="font-weight: bold;font-size: 17px">个人简介</n-text>
          <n-icon size="25" :component="EditCalendarOutlined" class="edit_icon" @click="showModal2=true"/>
          <n-modal
            v-model:show="showModal2"
            :mask-closable="false"
            class="modal"
            >
            <n-card class="card4">
              <n-text style="font-weight: bold;font-size: 17px">修改简介</n-text>
              <n-button circle style="margin-left: 540px" @click="showModal2=false">
                <template #icon>
                  <n-icon><CloseOutlined /></n-icon>
                </template>
              </n-button>
              <n-input placeholder="请输入" v-model:value="newBrief" class="input" type="textarea" maxlength="300" show-count />
              <n-button type="info" style="margin-left: 580px;margin-top: 30px" @click="changeBrief">确认</n-button>
            </n-card>
          </n-modal>
        </div>
        <n-text style="margin-left: 10px;font-size: 15px">
            {{userInfo.briefInfo}}
        </n-text>
      </n-card>
      <n-card class="card5" v-if="showFollowList">
        <n-list>
          <template #header>
            <n-text style="font-weight: bold;font-size: 20px">全部订阅</n-text>
          </template>
          <n-list-item v-for="(name, id) in subscriptions" :key="id">
            <template #suffix>
              <n-dropdown trigger="hover" :options="options" @select="(key:string) => handleSelect(key, id)" v-if="!followedList.includes(id)">
                <n-button v-if="!followedList.includes(id)" text-color="black" color="#e5e9ef" style="width: 80px">已订阅</n-button>
              </n-dropdown>
              <n-button v-if="followedList.includes(id)" @click="follow(id)" color="#ff69b4" style="width: 80px">订阅</n-button>
            </template>
            <n-thing :title="name" :description="id" @click="toScholarPage(id)" class="ListItem">
            </n-thing>
          </n-list-item>
        </n-list>
      </n-card>
      <n-card class="card5" v-if="showStarList">
        <n-list>
          <template #header>
            <n-text style="font-weight: bold;font-size: 20px">收藏夹</n-text>
          </template>
          <n-list-item v-for="(item, id) in articles" :key="id">
            <template #suffix>
              <n-dropdown trigger="hover" :options="options2" @select="(key:string) => handleSelect2(key, id,item)" v-if="item.stared">
                <n-button v-if="item.stared" text-color="black" color="#e5e9ef" style="width: 80px">已收藏</n-button>
              </n-dropdown>
              <n-button v-if="!item.stared" @click="item.stared=true;star(id)" color="#f3a034" style="width: 80px">收藏</n-button>
            </template>
            <n-thing :title="item.title" :description="displayAuthors(item.authorships)" @click="toWork(id)" class="ListItem">
            </n-thing>
          </n-list-item>
        </n-list>
      </n-card>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import SiderNav from './SiderNav/nav.vue'
import { ref,onMounted} from 'vue';
import type {Ref} from 'vue';
import { useRouter } from 'vue-router';
import {
  LocalPhoneSharp,
  EmailOutlined,
  EditCalendarOutlined,
  CloseOutlined,
  PersonOutlineOutlined,
  KeyRound,
  HouseOutlined,
  StarSharp,
  LogOutRound
} from '@vicons/material';
import {
  updateIntro,
  queryAccountSelfInfo,
  getAccountFollowList,
  getAccountWorkCollection,
  unFollow,
  followScholarPage,
  unStarWork,
  starWork,
  whoAmI,
  accountLogout
} from "../api";
import {useMessage} from "naive-ui";
import type { DrawerPlacement } from 'naive-ui'


interface UserInfo {
  phone: string;
  email: string;
  briefInfo:string;
  username:string;
  password:string;
  // 其他属性...
}
const messageNum = ref(0)
const showModal1 = ref(false);
const showModal2 = ref(false);
const userInfo = ref<UserInfo>({password: "********", username: "", briefInfo: "", email: "", phone: "——"});
const constellation = ref('——');
const birthday = ref('——');
const degree = ref('——');
const school = ref('——');
const unit = ref('——');
const post = ref('——');
const newBrief = ref(userInfo.value.briefInfo)
const newStar = ref(constellation.value=='——'?'':constellation.value)
const newBirth = ref(birthday.value=='——'?'':birthday.value);
const newDegree = ref(degree.value=='——'?'':degree.value);
const newSchool = ref(school.value=='——'?'':school.value);
const newUnit = ref(unit.value=='——'?'':unit.value);
const newPost = ref(post.value=='——'?'':post.value);
const message  = useMessage()
const followerNum = ref(0)
const showMessage = ref(true)
const showFollowList = ref(false)
const showStarList = ref(false)
const subscriptions = ref<{ [key: string]: string }>({});
const starList = ref<{ [key: string]: string }>({});
const Followed = ref(true);
const unFollowed = ref(false);
const Stared = ref(true);
const unStared = ref(false);
const articles = ref<{ [key: string]: Article }>({});
const router = useRouter();
const followedList : Ref<(string|number)[]>= ref([])
const options = [
  {
    label: '取消订阅',
    key: '取消成功',
  }
]
const options2 = [
  {
    label: '取消收藏',
    key: '取消成功',
  }
]
interface Authorship {
  id: string;
  display_name: string;
  orcid: string | null;
}

interface Article {
  title: string;
  stared?:boolean;
  authorships: Authorship[];
}

const toScholarPage=(id:number|string)=>{
  router.push({ name: 'ScholarPage', query:{id:id}});
}
const toWork=(id:number|string)=>{
  router.push({ name: 'DisplayPaper', query:{id:id}});
}
const star = (id:string | number) =>{
  Stared.value=true;
  unStared.value=false;
  starWork({
    work_id:id
  }).then(res=>{
    if(res.errno==0){
      message.success('收藏成功');
    }
  })
}

const follow =(id:string | number)=>{
  Followed.value=true;
  unFollowed.value=false;
  followedList.value=followedList.value.filter(tmpId=>tmpId!=id)
  followScholarPage({
    research_id:id
  }).then(res=>{
    if(res.errno==0){
      queryAccountSelfInfo({}).then(res=>{
        followerNum.value=Object.keys((res as any).data.user_profile.follow_list).length;
      })
      message.success('订阅成功');
    }
  })
}
const handleSelect = (key: string,id:string | number) =>{
  Followed.value=false;
  unFollowed.value = true;
  followedList.value.push(id);
  unFollow({
    research_id:id
  }).then(res=>{
    if(res.errno==0){
      queryAccountSelfInfo({}).then(res=>{
        followerNum.value=Object.keys((res as any).data.user_profile.follow_list).length;
      })
      message.success(String(key));
    }
  })
}
const handleSelect2 = (key: string,id:string | number,item:Article) =>{
  Stared.value=false;
  unStared.value = true;
  item.stared = false;
  unStarWork({
    work_id:id
  }).then(res=>{
    if(res.errno==0){
      message.success(String(key));
    }
  })
}
onMounted(() => {
  whoAmI({}).then(res=>{
    if(res.errno!=0){
      router.push('/login')
    }
    else {
      queryAccountSelfInfo({}).then(res=>{
        userInfo.value.email=(res as any).data.email;
        userInfo.value.username=(res as any).data.username;
        userInfo.value.briefInfo=(res as any).data.user_profile.intro;
        newBrief.value=(res as any).data.user_profile.intro;
        followerNum.value=Object.keys((res as any).data.user_profile.follow_list).length;
      })
    }
  })
});
const showList=()=>{
  showMessage.value = false;
  showFollowList.value = true;
  showStarList.value=false;
  getAccountFollowList().then(res=>{
    subscriptions.value = res.data
  })
}
const showList2=()=>{
  showMessage.value = false;
  showFollowList.value = false;
  showStarList.value=true;
  getAccountWorkCollection().then(res=>{
    articles.value = res.data
    for (const key in articles.value) {
      if (Object.prototype.hasOwnProperty.call(articles.value, key)) {
        articles.value[key].stared = true;
      }
    }
  })
}
const displayAuthors = (authorships: Authorship[]): string => {
  return authorships.map(author => author.display_name).join(', ');
};
const changeInfo=()=>{
  showModal1.value=false;
  birthday.value=newBirth.value;
  if(birthday.value == ''){
    birthday.value = '——';
  }
  constellation.value=newStar.value;
  degree.value=newDegree.value;
  school.value=newSchool.value;
  unit.value=newUnit.value;
  post.value=newPost.value;
  if(constellation.value == ''){
    constellation.value = '——';
  }
  if(degree.value == ''){
    degree.value = '——';
  }
  if(school.value == ''){
    school.value = '——';
  }
  if(unit.value == ''){
    unit.value = '——';
  }
  if(post.value == ''){
    post.value = '——';
  }
  message.success("修改成功");
}
const changeBrief=()=>{
  showModal2.value=false;
  updateIntro({
    intro:newBrief.value
  }).then(res=>{
    userInfo.value.briefInfo=newBrief.value;
  })
  message.success("修改成功");
}
const logout = () =>{
  accountLogout({}).then(res=>{
        message.success('退出成功');
        router.push('/Login');
      }
  )
}
</script>

<style scoped>
.ListItem{
  &:hover{
    cursor: pointer;
  }
}
.logo{
  position: absolute;
  left: 20%;
  top: 1%;
  color:#f8f8f8;
}
.house{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:3%;
  margin-bottom: 6%;
  margin-left: 15%;
  &:hover{
    cursor: pointer;
  }
}

.star{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:3%;
  margin-bottom: 6%;
  margin-left: 18%;
  &:hover{
    cursor: pointer;
  }
}

.follow{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2%;
  margin-bottom: 6%;
  margin-left: 18%;
  &:hover{
    cursor: pointer;
  }
}
.logout{
  margin-top: 80px;
  margin-left: 1%;
}
input-container{
  width: 700px;
}
.label{
  width: 100px;
}
.input{
  margin-top: 20px;
  height: 200px;
}

.container{
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
}
.card1{
  width: 400px;
  height:600px;
  margin-left: 50%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}
.avatar{
  background-color: white;
  margin-left: 75px;
}
.space {
  margin-left: 32%;
  display: flex;
  flex-direction: column;
}
.icon-text{
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.icon-text1{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.icon{
  margin-left: 40px;
}
.edit_icon{
  margin-left: 10px;
  &:hover{
    cursor: pointer;
  }
}
.modal{
  width:700px;
  height: 360px;
}
.text{
  margin-left: 15px;
  font-size: 16px;
}
.card2{
  width: 700px;
  height:290px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  display: flex;
}
.card5{
  width: 700px;
  height:600px;
  overflow: auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  display: flex;
}
.card3{
  width: 700px;
  height:290px;
  margin-top: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  display: flex;
}
.card4{
  width:700px;
  height: 360px;
  display: flex;
  align-items: center;
}
</style>
