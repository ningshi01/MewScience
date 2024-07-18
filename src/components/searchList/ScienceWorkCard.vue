<template>
    <n-card class="card" size="small" v-for="work in props.works" style="margin-bottom: 3px;" @click="routeToDetail(work._id)">
        <template #header >
            <n-ellipsis class="cardHeader" >
                <span style="font-weight: 450;font-family:Arial, Helvetica, sans-serif;">{{ work._source.title }}</span>
            </n-ellipsis>
        </template>
        <template #header-extra>
            <n-space>
                <p>
                    作者: <span>{{  work._source.authorships[0] != null? work._source.authorships[0].author.display_name: 'unknown'}}</span>
                </p>
                <p>
                    发表日期: <span>{{  work._source.publication_date != null?work._source.publication_date:'unknown'}}</span>
                </p>
                <p>
                    被引次数: <span>{{  work._source.cited_by_count != null?work._source.cited_by_count:'unknown'}}</span>
                </p>
            </n-space>
        </template>
        <n-ellipsis :line-clamp="3" :tooltip="false">
            <p style="font-weight: 200;">
                &nbsp&nbsp&nbsp&nbsp{{ work._source.abstract != null?work._source.abstract:'no abstract' }}
            </p>
        </n-ellipsis>
        <template #footer>
            <n-space>
                <n-tag size="small" v-for="key in work._source.keywords">
                    {{ key.keyword }}
                </n-tag>
            </n-space>
        </template>
    </n-card>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps({
    works:{
        type:Array
    }
})

const routeToDetail  = (id) =>{
    console.log('begin to route with id:'+id)
    router.push({name:'DisplayPaper',query:{id:id}})
}
</script>

<style>
.card {
    border-radius: 5px;
    box-shadow: 2px 2px 5px 0.2px rgb(217, 215, 215);
}
.cardHeader:hover {
    cursor: pointer;
}
</style>