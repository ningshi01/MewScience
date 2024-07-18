<template>
    <div>
        <n-collapse class="collapse" arrow-placement="right">
            <n-collapse-item name="1" v-if="props.aggregations.buckets">
                <template #header>
                    <p class="type">country</p>
                </template>
                <pie :option="props.aggregations.country"></pie>
            </n-collapse-item>
            <n-collapse-item name="2" v-if="props.aggregations.concept.buckets">
                <template #header>
                    <p class="type">concept</p>
                </template>
                <category :option="props.aggregations.concept"></category>
            </n-collapse-item>
            <n-collapse-item name="3" v-if="props.aggregations.language.buckets">
                <template #header>
                    <p class="type">language</p>
                </template>
                <coordinate :option="props.aggregations.language"></coordinate>
            </n-collapse-item>
            <n-collapse-item name="4" v-if="props.aggregations.source.buckets">
                <template #header>
                    <p class="type">source</p>
                </template>
                <pie :option="props.aggregations.source"></pie>
            </n-collapse-item>
            <n-collapse-item name="5" v-if="props.aggregations.keyword.buckets">
                <template #header>
                    <p class="type">keyword</p>
                </template>
                <column :option="props.aggregations.keyword"></column>
            </n-collapse-item>
            <n-collapse-item name="6" v-if="props.aggregations.mesh.buckets && props.aggregations.mesh.buckets[0]">
                <template #header>
                    <p class="type">mesh</p>
                </template>
                <funnel :option="props.aggregations.mesh"></funnel>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup>
import { onMounted, ref, inject,defineProps } from "vue";
import pie from '../../components/echartsComponents/pie.vue'
import category from '../../components/echartsComponents/category.vue'
import column from '../../components/echartsComponents/column.vue'
import Coordinate from "@/components/echartsComponents/coordinate.vue";
import Funnel from "@/components/echartsComponents/funnel.vue";
//通过ref获取html元素
let info = ref();
const props = defineProps({
    aggregations:{
        type:Object
    }
})

onMounted(() => {
    
});

</script>

<style>
.collapse {
    box-shadow: 2px 2px 5px 0.2px rgb(217, 215, 215);
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
    background-color: white;

}

p {
    font-size: small;
    font-weight: bold;
}
</style>