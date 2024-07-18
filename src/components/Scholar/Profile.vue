<script setup>
import {
  NGrid,
  NGi,
  NButton,
  NCard,
  NModal,
  NInput,
  NUpload,
  useMessage, NDivider
} from 'naive-ui'
import {reactive, ref, toRefs, onMounted, defineProps} from "vue";
import {claimSubmit, followScholar, getAward, unfollowScholar,whoAmI} from "@/api";
import {useRoute, useRouter} from 'vue-router';

const props = defineProps({
  //子组件接收父组件传递过来的值
  identity: Boolean,
  scholar: {
    default: {
      display_name: "",
      updated_date: "",
      last_known_institution: {
        display_name: "",
        ror: ""
      },
      id: "",
      claim_info: {},
      followed: false
    },
    type: Object
  }
})
//使用父组件传递过来的值
const {identity, scholar} = toRefs(props)

watch(
    scholar,
    () => {
      isclaimed.value = scholar.value.claim_info.has_been_claimed
      isfollowed.value = scholar.value.followed
      followButtonText.value = isfollowed.value ? "已关注" : "关注"
    },
    {
      deep: true
    }
)

const route=useRoute()
const router=useRouter()
let degree = ref("博士")
let introduction = ref("")

let isclaimed = ref(false)
let isfollowed = ref(false)

let claimButtonText = ref("认领")
let claim_request = ref("")

let followButtonText = ref("关注")

let claimModal = ref(false)
let labelModal = ref(false)

let editBrief = ref(false);
let editLabels = ref(false);

const message = useMessage();

const fileListLength = ref(0);//用于上传文件
const upload = ref(null);

const label_input = ref("")

const options = [
  {
    label: "编辑简介",
    key: "brief",
  },
  {
    label: "编辑标签",
    key: "label"
  },
];

const rewards = reactive([
  {
    label: "科研小白"
  }, {
    label: "学界大牛"
  }, {
    label: "科研达人"
  }, {
    label: "理工男"
  }, {
    label: "电竞选手"
  }
])

function follow() {
  whoAmI().then(res=>{
    if (res.errno!==0){
      message.warning("您尚未登录！");
      // router.push({name: 'Login'});
    }else{
      followScholar({
        research_id: scholar.value.id
      }).then(res => {
        isfollowed.value = true;
      })
    }
  })
}

function unfollow() {
  unfollowScholar({
    research_id: scholar.value.id
  }).then(res => {
    isfollowed.value = false;
  })
}

function claim() {
  whoAmI().then(res=>{
    if (res.errno!==0){
      message.warning("您尚未登录！");
      // router.push({name: 'Login'});
    }else{
      claimModal.value = true
    }
  })

}

let files = []

function handleChange(options) {
  fileListLength.value = options.fileList.length;
  files = options.fileList;
}

function submitClaim() {
  let param = new FormData()
  param.append('file', files[0].file)
  param.append("research_id", scholar.value.id)
  param.append("message", claim_request.value)
  claimSubmit(param).then(res => {
  })
  claimModal.value = false
  message.success(
      "已提交认证申请，管理员正在加急审核中..."
  );
}

function share() {
  let now_href = "学者名：" + scholar.value.display_name + " 链接：" + window.location.href + " 来源：Mew Science"
  var input = document.createElement('input') // 创建input元素
  document.body.appendChild(input) // 将input元素挂到body上
  input.setAttribute('value', now_href) //设置input的value，也就是想要复制的内容
  input.select() // 设置当前input元素被选中
  document.execCommand("Copy") //执行复制命令
  document.body.removeChild(input) // 清除input元素
  message.success(
      "已复制分享链接，您可以将链接粘贴发送给他人。"
  );
}

function saveBrief() {
  editBrief.value = false;
}

const showAward = ref(false)
const AwardData = ref()
const getAwardData = (id) => {
  getAward({
    id: id
  }).then(function (res) {
    showAward.value = true
    AwardData.value = res.data

  })
}

function toScholarInstitution(id){
  router.push({name: 'Institution',query: {id: parseInt(id.match(/\d+$/))}});
}

</script>

<template>

  <n-card
      embedded
      :bordered="false"
      :hoverable="true"
  >
    <div>
      <div class="head">
        <!--        <div class="avatar">-->
        <!--          <n-avatar :size="75"-->
        <!--                    src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"/>-->
        <!--        </div>-->
        <div class="name_degree">
          <n-popover trigger="hover" v-if="scholar.orcid!=null" placement="right">
            <template #trigger>
              <a class="name" :href="scholar.orcid">{{ scholar.display_name }}</a>
            </template>
            <span>点击跳转到该学者的ORC主页</span>
          </n-popover>

          <div class="name" v-if="scholar.orcid==null">{{ scholar.display_name }}</div>
          <a class="institution" @click="toScholarInstitution(scholar.last_known_institution.id)" v-if="scholar.last_known_institution!==null&&scholar.last_known_institution.length!==0">{{ scholar.last_known_institution.display_name }}</a>
          <!--          <div class="degree">{{ degree }}</div>-->

        </div>
      </div>
      <n-divider style="margin: 10px"/>
    </div>
    <div class="rewards">
      <div class="reward" v-for="(reward,index) in scholar.rewards">
        <span style="cursor: pointer" @click="getAwardData(reward.id)">{{ reward.title }}({{ reward.year }})</span>
      </div>
    </div>
    <n-grid :cols="3" class="buttons">
      <n-gi>
        <button class="button" @click=follow v-show="!isfollowed">关注</button>
        <button class="button follow" @click=unfollow v-show="isfollowed">已关注</button>
      </n-gi>
      <n-gi>
        <button class="button" :class="{'claim':isclaimed}" @click=claim><span v-show="isclaimed">已被认领</span><span
            v-show="!isclaimed">认领</span></button>
        <n-modal v-model:show="claimModal">
          <n-card
              style="width: 600px"
              title="认领您的学者主页"
              :bordered="false"
              size="huge"
              role="dialog"
              aria-modal="true"
              class="claim_show"
          >

            <div class="claim_describe">
              欢迎开始认领过程！请按照以下步骤操作：<br>
              <ol>
                <li><span style="font-weight: bold;">填写认领请求：</span><br>
                  在下方文本框中，请简明扼要地撰写一句认领请求。例如：“我是 <span
                      style="font-weight: bold;">[您的姓名]</span> ，目前任职于 <span
                      style="font-weight: bold;">[您的机构]</span> ，请求认领我的学者主页。”<br>
                </li>
                <li><span style="font-weight: bold;">上传基本信息文件：</span><br>
                  请准备一份包含您的基本信息的文件。该文件应包含以下内容：<br>
                  姓名、联系方式（电子邮件地址等）、当前职位及工作单位、学术领域及研究兴趣、教育背景、重要论文及出版物（如适用）...<br>
                </li>
              </ol>

              请确保您提供的信息准确无误，以便我们能快速有效地处理您的认领请求。<br>
              我们的联系邮箱：mewscience@163.com
            </div>
            <n-input
                v-model:value="claim_request"
                type="textarea"
                placeholder="请输入认领请求"
                style="margin-top: 10px"
            />
            <n-upload
                ref="upload"
                :default-upload="false"
                multiple
                action="http://121.36.65.25:8080/api/portal/claim"
                :headers="{
                  'X-Csrftoken': 'W2Umf5amOWWQxTCDLAZ28AkXIvOd9tKY'
                }"
                :data="{
                  'research_id': scholar.id,
                  'message':claim_request,
                }"
                :change="handleChange"
            >
              <n-button strong secondary round class="claim_button" style="margin-top: 10px">选择文件</n-button>
            </n-upload>
            <template #footer>
              <div class="claim_buttons">
                <n-button strong secondary round @click="cancelClaim" class="claim_button">
                  取消
                </n-button>
                <n-button
                    strong secondary round type="success"
                    :disabled="!fileListLength"
                    @click="submitClaim"
                    class="claim_button"
                >
                  提交
                </n-button>
              </div>
            </template>
          </n-card>
        </n-modal>
      </n-gi>
      <n-gi>
        <button class="button" @click="share">分享</button>
      </n-gi>
      <!--      <n-gi v-if="identity">-->
      <!--        <n-dropdown-->
      <!--            :options="options"-->
      <!--            placement="right-start"-->
      <!--            trigger="hover"-->
      <!--            @select="changeSort"-->
      <!--        >-->
      <!--          <button class="button">...</button>-->
      <!--        </n-dropdown>-->
      <!--      </n-gi>-->
    </n-grid>
    <div class="bottom">
<!--      <div class="visited_update_time" style="margin-right: 15px">访问次数 <span class="bottom_number">10</span></div>-->
      <div class="visited_update_time">更新时间 <span class="bottom_number">{{ scholar.updated_date }}</span></div>
    </div>
  </n-card>

  <n-drawer v-model:show="showAward" :width="502" :placement="placement">
    <n-drawer-content>
      <h2>{{ AwardData.title }}</h2>
      <n-h2 prefix="bar" align-text type="info">
        基本信息
      </n-h2>
      <div class="content">
        <p>作者:{{ AwardData.authors }}</p>
        <p>成果类型：专利</p>
        <p>授奖机构：{{ AwardData.award_institution }}</p>
        <p>获奖日期：{{ AwardData.year }}</p>
        <p>授权区域：中国</p>
      </div>
      <n-h2 prefix="bar" align-text type="info" class="title1">
        相关项目
      </n-h2>
      <div class="projectContainer" v-for="(project,index) in AwardData.projects">
        <img class="icon1"
             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABkCAIAAADhSTKwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REZERjA1RDE1RkFDMTFFQjk0QzhGM0EzQjk3MTBBOTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REZERjA1RDI1RkFDMTFFQjk0QzhGM0EzQjk3MTBBOTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpERkRGMDVDRjVGQUMxMUVCOTRDOEYzQTNCOTcxMEE5MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpERkRGMDVEMDVGQUMxMUVCOTRDOEYzQTNCOTcxMEE5MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt/A2wcAAAqsSURBVHja7J1bbBxXGYDnn5m9e+11SG0ncWjqQBFbRBylyAZc4iA7IFWREjVA85SLgDzakQjipcRRhHgAqfZjeGhsXiK1DjhFRWAXNVWC1BZHcVtiJEQdt+TWXLCzXtt7m3M4M+PdnZkz1/WO7VnNL8uePbM7u/Pt/5//NmcMGGNGLbO356am786nlhkvy47WxvbktkR92NV34ZUPhkcnRy5dv/LeDFMrcuzwnjN9vQSlS8cHWfvmU5lT594cHr3O1Jwk6iMXfvODg/ufcxHfoZMjY+PTTO3KOxd/2t25s+qHZWWbrW12RI6ffoNYmCv4zg69zdS6EH84MjpZfddBHAU5tGa0u7Otu6PNu7Bu3Z57933teY1N3Ow70VVlfB9O39V6q5f2XPjtD72ubkQt9h05rxyZmr5XfeOl4zv33PxaCjEgzYm4EcmyjC8+Ph+fj8/H54uPz8fn4/Px+eLj8/FtWOEreI1Y/Lk0STJwkkXuSm7tP95VG2nyWuAbGb3ef+7NUunxynszl8dv/vH80fbkFh+ftd4dO/06PbjvyPkbb/XROkjgnh2aoOuJVRHydn3Hu1xqYriCb2BoQnecWDEx5zN9vTRW9z46OT75elxqYrjiOj40rjiOjd/UjAy9dm0NTmBkXbuDzvA5qjiuTaN99s6cZ/Dt2GboYdu/ulUzcvTw82twAsdeet4z+M7099rf1d3Z5mqHP1EffvWVA0cP7/GM65CJnKUcyJn+Hl1MA/095McPXFRECKmR0cmpf4ktuvbkVgKUYPXDZtvTzeE9x9bVZPyc18fni4/Px+fj8/H5+Hzx8fn4fHw+Pl98fG5LJSWD+VRmZPQf8qXC3Z1tezt3+o1KuzI1fXffkfOlRuXwpeuEnd+otCVy80yzvoQMHjo5cuOtfnr9HWE99No1l9oRifrIq68cWF/Fd9yo1F2bQwgOXbiq26h0Yy1PScbGb5KvbR0V391Gpavsiu9y1TOe129UrgqfRxuVAAzLAxdis1ggP3mMMIPXYe470997xeC6i74TL2hGjNpyVZS+E11GjUoCKNgQaGRjgQjLR3k2ABCAj5ceIAZjEHcHgY2wgSgbaOTDcTa4FvhMGpW68/dAf0//iS6XrJh4XtrXE2ppIZ8Wcoso37A9mvmfwBBY8k9RECbqh7O48ETICgxGGRxmeQJxR7ChziHHChuVQxeuTUlrCQnQvuMvHNyfND7JsNs3FJClgBEBl0JZASNRxUTzVFgoaDkrB5ZQfiGXm83OJ7jws+FNTXzMxayj1KgkjnVt0FgKUbcUyhVQcVKzMbPpPuWxsPz39O2n+Gh7tNmOJrKrM5/1Z0f8wKP8EjFDhBGla2DmT4yB3i8sjqdmpjOPLD2Mt0sGGVSYL2TyZXDYTLXU9MyfUmDQR8sP/rbwaQHj2sRH2C2SIKSMSuEgoORIFA/BQvto+byQ/nPqPwtCrtbwLaMCwafxuYZah2mVVCkV1jducfiJkBlfmJkXMrWDL0dCXyTozWVgNsOBk/dQ4E2j3PjCrQwu1AI+EqDkKHYGXgBUxoudgAXV2CLK/TU1Q742b+Mj4W4eIfsq5Ej7QLWhNehHhaXrS/e8ja/gLF0F47lPx/NqVJbm/XHm4We5lFfxiekExrZiYbCM9FRZB7bwM+WZ8Nrif72LzyysUxkqpmhSbhmbpyEAypHSTLiAsjeW73sPn4DVEZ6ObmEq7lMYL1jOfWBGU/Hoo8yDbNGHVI5v9vacS6utjJyGLV9hDwHlebFV1FM+yBIqfJKdq7xkcHZoYrBYiN/R2jjQ1+N2ZXSFHTAOq5xgmzSIb6LdjanDAZZcDsnnkuHNleA7fvp15V0SpUWCb8zemdP0iUpCKE9N31klvkCQB1FDJL8LJMUVf1qa4s1NcedVFRPW2OhR8eGKW3ksLD8oLDbxMWf4hkcnde8wOTD49t6ONnpp3qlzfxpc9co2jgOi48Cxko1h2WUSiGTj5YPtp37cpUAFOgYL+roI1kkbvQeKR8R382mCz9ncZ7L+jt5FWA9WY1VgiKgeC0oLKm1fvDz1u4sfKMYp1ww2Z0I6sNHNoEuhIfNp7olj12HS1rryvvaGse9W6RayBJ8Jhn/femg3sQDDpAxo5gBGrkP+9VBYqmbgQnf7E/WRqhw5HDKbYeKxkHHFBWyVBPQioNJ+kDhj6pAZVCApsDN8B3sNl27TDcO+E9W5xwHPc0ZGR9j95OUO2qhtJCF2yi8yRlxK8fBKtrJy2JSQdeY6CJHhS5P0tQME015qWRsZfOfiSTL9PVldp+0Lm2IsB/InJyeDZRfMMHXx4I8O7GpuritmI7jsOjQuBFsEPTpJGygnOqwMXUojKZTjnVooIXLo5O+VAbM8qKtoZHDwlwdWm2+IUZ88k4sNRjlqkTcIOIFBOrEGtvK1ljENVud6IGeF4tdXOk4OCY7jvvbk1ltXf0HCl1Kjch1uxoArivKwufViywPSaTJf2eeXGpXrt6jSMv0AKm3AWs+Ltf5AEzaD6ghYabzFSVmMRb0nYK1gtPGCZatI7Wew/nyoJBxheQ/gA7BvpGDLr2LTqBkbfgas/jRxLlhLl4aDRcVFBQqwxVcAelFiWatJChlnvYAPKniNrufFjl6L6c8Aiqc0cmEyEXrCeMH2eZsar81ivcGUoXnu9kA945VqM1TlWbgC/TUsw2wPeggf2MyxsBlYMK4fmMyNoOy/Y1lrI8C1BGI1ho8x7FdgC/Uy8zgYq+M+8c+XQptCwHvJeMGWtVFxH7ZWTYMvAfQqMVjKNFi5Us94qNPGAuiUjSxnPjDajekaFagrLUb11S8GGzbzUe/hK5qwUcqmvUBtcTnryDlR5VKdYJD87YiW1xCwT1OVkrGJ6TVYzlKB8Cxr6kGx0nj/8Jd/phdzyp2xaNDczYJ++lYeIkq6O7IlwZWvqeXbk9s0x5qavrv7xcGNuUgyFOYbG6MIsNwzQlLXDUtqh0vKxzILy9lPPntc1iBp13NfaTGvOmCrjKaeDX890qT6RtuTW7o72jSdijVugTuSli3xaCwod9pkgitWy0qOUVwCU3yoBtOxa7tR2GwnKOKB3V//TAhUpW/xTUzuyrcB5fP7C/mCYBG2gPZKn6bNdd/91k5TT2NwUVBx3zdjrY2c9lJ4EZ+82MUr+Mh53buTKuRtXFxb/E3Y/epn32NM8KjTNCqKhm9EW54NbdJxaPKfgf4eDxEs5NH9O0/yeWQnXWveXPfrn3+fEDTJaaXABWN9V0zYbfmaesorP0v5H1LJfDcwOHF54ubG9Lwa4Thobo3zEU687kSa8qTerDT3SdNf81Pxnu98+eD+ZDgaWGmSyB0ScQMVWyXlQXk5EpIHpQ3ioDpj254JJgw9CtZreG5Yv0Gbco7DaSGLpHS0dBEM+RWNBCKxoKCgpsYn9pgQLm3Le5EEUXw52YhB4Nt1rQnObOmPPj5vSQYJKSGTw4J04a6Klwk+xCBBja+kfURznw427I40g1WuyDPelzDLhdjogpBLC7k8NlmjYSvIawnWJUObG7iQrUieqQkhalLPheJcMC3kF1B2WShYvkLTaQsC2xKo3xFM1HEBB+9bA8ZLSxYJaZRbQvklRCIcoWy/ateBGAgDG2eDjXykmY+x4Lgv8H8BBgAeNU0hDUCsrwAAAABJRU5ErkJggg=="
             alt="">
        <p>{{ project.title }}</p>
      </div>
    </n-drawer-content>
  </n-drawer>

</template>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.n-card {
  border-radius: 15px;
}


.head {
  display: flex;
  align-items: center;

}

.name_degree {
  margin-left: 20px;
}

.name_degree > .name {

  display: inline;
  font-size: xx-large;
  font-weight: 400;
}


.rewards {
  margin: 5px;
}

.reward {
  margin-bottom: 5px;
  color: darkgoldenrod;
}

.institution {
  cursor: pointer;
  display: block;
  font-size: 15px;
  font-weight: 400;
}

.institution:hover {
  color: green;
}

.introduction {
  margin-left: 10px;
  display: block;
  font-weight: 500;
  font-size: 16px;
  color: #757474;
}

.buttons {
  margin: 10px;
  display: flex;
  justify-content: space-between;
}

.button {
  padding: 6px;
  border-color: transparent;
  border-width: 1px;
  cursor: pointer;
  color: cornflowerblue;
  border-radius: 20px;
  width: 65px;
  font-size: 12px;
}

.button:hover {
  border-color: cornflowerblue;
  color: cornflowerblue;
}

.claim {
  color: white;
  background-color: cornflowerblue;
}

.follow {
  color: white;
  background-color: cornflowerblue;
}

.follow:hover {
  border-color: white;
  color: cornflowerblue;
  background-color: white;
}

.claim_show {
  position: relative;
}

.claim_button {
  margin-right: 10px;
}

.claim_describe {
  line-height: 30px;
}

.label_item {
  font-size: 13px;
  display: inline;
  font-weight: 600;
  color: #0571c9;
  margin-left: 3px;
  margin-right: 3px;
  margin-top: 3px;
}

.label_item:hover {
  color: green;
}

.label_item2 {
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #0571c9;
  margin-left: 3px;
  margin-right: 3px;
  margin-top: 3px;
}

.label_item2:hover {
  color: green;
}

.bottom {
  display: flex;
}

.visited_update_time {
  font-size: 13px;
  font-weight: 300;
  width: auto;

}


.bottom > .visited_update_time > .bottom_number {
  color: #0571c9;
}

.labels {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
}
</style>