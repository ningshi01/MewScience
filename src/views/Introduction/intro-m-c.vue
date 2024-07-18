<script setup>
import { defineProps, defineEmits } from 'vue';

function changeImageSrc(imageId) {
  var imageElement = document.getElementById(imageId);

  var currentSrc = imageElement?.getAttribute("@");

  var originSrc = 'src/assets/Images/'+imageId+'_1.png';
  var newSrc = 'src/assets/Images/'+imageId+'_2.png';
  //先遍历一遍把所有的全清空
  for (let i=1;i<=10;i++){
    var front = 'src/assets/Images/intro_'+i+'_1.png';
    document.getElementById('intro_'+i)?.setAttribute("@",front);
  }
  //单独讨论现在点击的这个组件
  if (currentSrc === newSrc) {
    imageElement?.setAttribute("@", originSrc);
  } else {
    imageElement?.setAttribute("@", newSrc);
  }
}
</script>

<template>
  <n-scrollbar x-scrollable trigger="hover" size="0.1">
    <div class="image-container">
      <div class="image-item-first" @click="changeImageSrc('intro_1')">
        <img src="@/assets/Images/intro_1_1.png" alt="image.alt" class="image" id="intro_1"/>
        <div class="image-item-footer">科技文献</div>
      </div>
      <div class="image-item" @click="changeImageSrc('intro_2')">
        <img src="@/assets/Images/intro_2_1.png" alt="image.alt" class="image" id="intro_2"/>
        <div class="image-item-footer">科技期刊</div>
      </div>
      <div class="image-item" @click="changeImageSrc('intro_3')">
        <img src="@/assets/Images/intro_3_1.png" alt="image.alt" class="image" id="intro_3"/>
        <div class="image-item-footer">科研设备</div>
      </div>
      <div class="image-item" @click="changeImageSrc('intro_4')">
        <img src="@/assets/Images/intro_4_1.png" alt="image.alt" class="image" id="intro_4"/>
        <div class="image-item-footer">试剂耗材</div>
      </div>
      <div class="image-item" @click="changeImageSrc('intro_5')">
        <img src="@/assets/Images/intro_5_1.png" alt="image.alt" class="image" id="intro_5"/>
        <div class="image-item-footer">实验方案</div>
      </div>
      <div class="image-item" @click="changeImageSrc('intro_6')">
        <img src="@/assets/Images/intro_6_1.png" alt="image.alt" class="image" id="intro_6"/>
        <div class="image-item-footer">专业教材</div>
      </div>
      <div class="image-item" @click="changeImageSrc('intro_7')">
        <img src="@/assets/Images/intro_7_1.png" alt="image.alt" class="image" id="intro_7"/>
        <div class="image-item-footer">科学视频</div>
      </div>
      <div class="image-item" @click="changeImageSrc('intro_8')">
        <img src="@/assets/Images/intro_8_1.png" alt="image.alt" class="image" id="intro_8"/>
        <div class="image-item-footer">政策法规</div>
      </div>
      <div class="image-item" @click="changeImageSrc('intro_9')">
        <img src="@/assets/Images/intro_9_1.png" alt="image.alt" class="image" id="intro_9"/>
        <div class="image-item-footer">自然科学基金</div>
      </div>
      <div class="image-item-last" @click="changeImageSrc('intro_10')">
        <img src="@/assets/Images/intro_10_1.png" alt="image.alt" class="image" id="intro_10"/>
        <div class="image-item-footer">地方基金项目</div>
      </div>
    </div>
  </n-scrollbar>
</template>

<style scoped>
.image-container {
  white-space: nowrap;
  height: 100%; /* 高度与外部容器相同 */
  margin: 12px;
}

.image-item-first {
  display: inline-block;
  width: 200px; /* 宽度与高度相同 */
  height: 100%;
  box-sizing: border-box;
  margin-top: 50px;
  margin-left: 150px;
  text-align: center;
}
.image-item {
  display: inline-block;
  width: 200px; /* 宽度与高度相同 */
  height: 100%;
  margin-top: 50px;
  box-sizing: border-box;
  text-align: center;
  font-family: Arial,"Microsoft YaHei","Hiragino Sans GB",Helvetica,"Lucida Grande",sans-serif !important;
}
.image-item-last {
  display: inline-block;
  width: 200px; /* 宽度与高度相同 */
  height: 100%;
  box-sizing: border-box;
  margin-top: 50px;
  margin-right: 150px;
  text-align: center;
}

.image-item-footer{
  display: block;
  width: 200px;
  text-align: center;
  font-size: 25px;
}
.image {
  width: 86px;
  height: 86px;
  object-fit: cover;
}
</style>

