<template>
  <div style="background:linear-gradient(#add8e6,#87cefa,#b0e0e6);width: 60%;height: 100%;">
  </div>
  <n-space class="card-container">
    <n-button @click="toIntroPage" :bordered=false class="introButton" >
      <n-text style="font-weight: bold;color: #f8f8f8;font-size: 16px" >平台介绍</n-text>
    </n-button>
    <n-carousel autoplay class="carousel" interval=3000 @update:current-index="changeImg">
      <img class="carousel-img" src="../assets/scholarPage.jpg">
      <img class="carousel-img" src="../assets/searchPaper.jpg">
    </n-carousel>
    <div style="display: flex;flex-direction: column;align-items: center;left:16%;top:67%;position: absolute">
      <n-text v-if="imgIndex==1" style="font-weight: bold;color: black;font-size: 23px">MewSci学者门户</n-text>
      <n-text v-if="imgIndex==1" style="font-size: 18px;color: black;margin-top: 4%">详尽的数据陈列，生动的图表展示，让科研变得更简单</n-text>
    </div>
    <div style="display: flex;flex-direction: column;align-items: center;left:16%;top:67%;position: absolute">
      <n-text v-if="imgIndex==0" style="font-weight: bold;color: black;font-size: 23px">MewSci文献搜索</n-text>
      <n-text v-if="imgIndex==0" style="font-size: 18px;color: black;margin-top: 4%">丰富的数据来源，完善的分类体系，让搜索变得更直接</n-text>
    </div>
    <n-image src="/tempLogo.png" class="logo" @click.prevent></n-image>
    <n-card v-if="showFirstCard" class="card">
      <n-text class="text">
        欢迎使用MewScience
      </n-text>
      <n-input v-model:value="username1" size="large" round placeholder="请输入用户名" class="input">
      </n-input>
      <n-input v-model:value="password1" size="large" round placeholder="请输入密码" class="input">
      </n-input>
      <n-button round type="info" class="loginButton" @click="login">
        <n-text class="loginText">
          登录
        </n-text>
      </n-button>
      <n-button quaternary round type="info" class="registerButton">
        <n-text class="text1" @click="showFirstCard=false;showSecondCard=true">
          立即注册
        </n-text>
      </n-button>
      <n-text class="text2">
        |
      </n-text>
      <n-button quaternary round type="info" class="forgetButton">
        <n-text class="text3">
          忘记密码
        </n-text>
      </n-button>
    </n-card>
    <n-card v-if="showSecondCard" class="card">
      <div>
        <n-text class="text">
          欢迎加入MewScience
        </n-text>
      </div>
      <n-text class="text4">
        已有账号？使用
      </n-text>
      <n-button quaternary round type="info" class="returnButton">
        <n-text class="text5" @click="showFirstCard=true;showSecondCard=false">
          账号密码登录
        </n-text>
      </n-button>
      <n-input v-model:value="username2" size="large" round placeholder="设置您的用户名" class="input3">
      </n-input>
      <n-input v-model:value="password2" size="large" round placeholder="设置您的登录密码" class="input">
      </n-input>
      <n-input v-model:value="email" size="large" round placeholder="请输入邮箱" class="input">
      </n-input>
      <n-input v-model:value="firstname" size="large" round placeholder="名" class="input1">
      </n-input>
      <n-input v-model:value="lastname" size="large" round placeholder="姓" class="input2">
      </n-input>
      <n-button round type="info" class="loginButton" @click="register">
        <n-text class="loginText">
          注册
        </n-text>
      </n-button>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import { ref,onMounted} from 'vue';
import {accountLogin,accountRegister} from "../api";
import { useRouter,useRoute} from 'vue-router';
import {useMessage} from 'naive-ui'
const message = useMessage();
const router = useRouter();
const route = useRoute();
const showFirstCard = ref(true);
const showSecondCard = ref(false);
const username1 =ref('');
const password1 =ref('');
const username2 = ref('');
const password2 = ref('');
const email = ref('');
const firstname = ref('');
const lastname = ref('');
const indentity = ref(0);
const imgIndex = ref(1);
const login = () =>{
  accountLogin({
    username:username1.value,
    password:password1.value
  }).then(res=>{
    if(res.errno == 10002){
      message.error('用户名或密码错误')
    }
    else {
      indentity.value=(res as any).data.identify
      if(indentity.value==0){
        router.push('/Introduction')
      }
      if(indentity.value==1){
        router.push('/admin')
      }
    }
  })
}
const changeImg = (index1:number,index2:number) =>{
  imgIndex.value=index2;
}
const register = () =>{
  accountRegister({
    username:username2.value,
    password:password2.value,
    email:email.value,
    first_name:firstname.value,
    last_name:lastname.value
  }).then(res=>{
    if(res.errno == 0){
      message.success('注册成功');
      showFirstCard.value=true;
      showSecondCard.value=false;
    }
    if(res.errno == 10001){
      message.error('用户名已存在')
    }

  })
}
const toIntroPage = () =>{
  router.push('/Introduction')
}
</script>

<style scoped>
.carousel {
  position: absolute;
  left:9%;
  top: 12%;
  width: 42%;
  height: 50%;
}
.carousel-img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-container{
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo{
  position: absolute;
  left: 73%;
  top: 10%;
}
.introButton{
  width: 8%;
  height: 5%;
  position: absolute;
  left: 24%;
  top:80%;
  background:linear-gradient(to right,#3770f2,#7a70dc);
}
.card {
  width: 30%;
  height: 60%;
  position: absolute;
  top: 53%;
  left: 80%;
  transform: translate(-50%, -50%);
  padding: 3%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}
.input {
  width:97%;
  height: 10%;
  margin-left: 2%;
  margin-top: 8%;
  background-color: rgba(128, 128, 128, 0.1);
}
.input1 {
  width:42%;
  height: 10%;
  margin-left: 2%;
  margin-top: 8%;
  background-color: rgba(128, 128, 128, 0.1);
}
.input2 {
  width:42%;
  height: 10%;
  margin-left: 12%;
  margin-top: 8%;
  background-color: rgba(128, 128, 128, 0.1);
}
.input3 {
  width:97%;
  height: 10%;
  margin-left: 2%;
  margin-top: 2%;
  background-color: rgba(128, 128, 128, 0.1);
}
.text{
  margin-left: 16%;
  font-weight: bold;
  font-size: 25px;
}
.loginText{
  font-size: 18px;
  color: #f2f2f2;
}
.loginButton{
  margin-top: 8%;
  margin-left: 2%;
  width: 97%;
  height: 10%;
}
.text1{
  color: #338cde;
  font-size: 15px;
}
.text2{
  font-size: 15px;
  margin-left: 8%;
}
.text3{
  font-size: 15px;
}
.text4{
  font-size: 14px;
  margin-top: 25%;
  margin-left: 22%;
}
.text5{
  color: #338cde;
  font-size: 13px;
}
.registerButton{
  margin-top: 25%;
  margin-left: 14%;
}
.forgetButton{
  margin-top: 25%;
  margin-left: 14%;
}
.returnButton{
  margin-left: -2%;
  &:hover {
    background-color: transparent;
  }
}
</style>