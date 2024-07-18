<script setup >
import {reactive, ref, toRefs, defineProps, onMounted} from "vue";

const props = defineProps({
  //子组件接收父组件传递过来的值
  scholar: {
    default: {
      summary_stats: []
    },
    type: Object
  }
})
//使用父组件传递过来的值
const {scholar} = toRefs(props)
</script>

<template>

  <n-card hoverable :bordered="false">
    <div class="container">
      <div class="title">
        <span class="title-text">相关数据</span>
      </div>

      <div class="content">
        <n-row>
          <n-col :span="12">
            <n-popover trigger="hover" width="300">
              <template #trigger>
                <n-statistic label="h指数" :value="scholar.summary_stats.h_index"/>
              </template>
              <span>"h指数"（H-index）是一种用于评估其学术研究成就和影响力的指标,它旨在综合考量一个学者的科研产出（发表的论文数量）和论文的引用次数。<br>
                H-index 的计算方式如下：一个学者的index是一个非负整数，表示该学者的前 H 篇论文（按引用次数降序排列）每篇被引用至少 H 次，同时，该学者的其余论文（排在 H+1 或更低的位置）每篇被引用次数不超过 H 次。</span>
            </n-popover>
          </n-col>
          <n-col :span="12">
            <n-popover trigger="hover" width="300">
              <template #trigger>
                <n-statistic label="i10指数" :value="scholar.summary_stats.i10_index"/>
              </template>
              <span>"i10 指数"（i10-index）是一种用于衡量其学术研究活跃度的指标,它表示一个学者在其学术生涯中至少有多少篇论文被引用了至少 10 次。
                这个指标主要用于评估学者的学术活跃度和影响力，以及他们在学术界的持续贡献。</span>
            </n-popover>
          </n-col>
        </n-row>
        <n-row>
          <n-col :span="12">
            <n-statistic label="成果引用量" :value="scholar.summary_stats.cited_by_count"/>
          </n-col>
          <n-col :span="12">
            <n-statistic label="成果总量" :value="scholar.summary_stats.works_count"/>
          </n-col>
        </n-row>
        <n-statistic label="对外开放文献比例" :value="scholar.summary_stats.oa_percent"/>
      </div>

    </div>
  </n-card>

</template>

<style scoped>
.container {
  margin: -10px;
}

.title {
  border-bottom: 2px solid rgba(137, 116, 255, 0.89);
  padding-bottom: 5px;
}

.title-text {
  font-weight: bold; /* 字体加粗 */
  font-size: 17px; /* 字体大小为 20px */
  color: rgba(137, 116, 255, 0.89); /* 字体颜色为蓝色 */

}

.content {
  line-height: 1.5; /* 1.5倍行高 */
  margin-top: 10px;
  margin-bottom: 2px;
  margin-left: 20px;
  font-weight: 500;
}
</style>