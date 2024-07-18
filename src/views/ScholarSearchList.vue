<template>
    <div class="container">
        <n-layout style="z-index: 0;height: 100%;">
            <div style="min-height: 25px;background-color: rgb(0, 0, 0);"></div>
            <n-layout-header class="header" :bordered="true">
                <n-space justify="space-between">
                    <n-space justify="left">
                        <img src="@/assets/tempLogo.png" class="logo" width="120" height="40" style="margin-left: 10px;"
                            @click="router.push({ path: '/Introduction' })">
                        <n-button :bordered="false" text-color="black" size="large" text
                            style="margin: 15px 10px 10px 50px;" @click="$router.push({ path: '/workSearchList' })">
                            <p style="font-size: larger;font-weight: 550;">
                                文献检索
                            </p>
                        </n-button>
                        <n-button :bordered="false" text-color="black" size="large" text
                            style="margin: 15px 10px 10px 40px;" @click="$router.push({ path: '/scholarSearchList' })">
                            <p style="font-size: larger;font-weight: 650;">
                                学者检索
                            </p>
                        </n-button>
                    </n-space>
                    <n-space justify="right">
                        <n-dropdown placement="bottom-start" trigger="hover" size="small" :options="userOptions"
                            @select="handleUserSelect">
                            <n-button :bordered="false" style="margin: 15px;" color="black" text>
                                <n-icon :size="24">
                                    <PersonCircleSharp>
                                    </PersonCircleSharp>
                                </n-icon>
                            </n-button>
                        </n-dropdown>
                    </n-space>
                </n-space>
            </n-layout-header>
            <n-layout class="searchContainer">
                <n-space justify="center" style="padding: 10px;">
                    <n-space class="inputContainer" vertical>
                        <n-space justify="center" :height="200">
                            <n-input size="large" placeholder="输入关键词" class="inputBar" @keyup.enter.native="onInputConfirm"
                                v-model:value="searchContent">
                                <template #prefix>
                                    <n-icon>
                                        <SearchOutline></SearchOutline>
                                    </n-icon>
                                </template>
                            </n-input>
                            <n-button @click="onInputConfirm" style="margin-top: 3px;">
                                检索
                            </n-button>
                            <n-button @click="showConditions" style="margin-top: 3px;" secondary>
                                添加条件
                            </n-button>
                        </n-space>

                        <!-- <n-transfer ref="transfer" v-show='isShow' v-model:value="value" size="small" :options="options"
                            :render-source-list="renderSourceList" source-filterable /> -->
                        <n-space justify="center" v-if="isShow">
                            <n-input-number v-model:value="min_score" placeholder="关联度最低阈值(1-40)" clearable :min="1" :max="40"></n-input-number>
                            <n-input v-model:value="institution" placeholder="输入机构"></n-input>
                        </n-space>
                    </n-space>
                </n-space>
            </n-layout>
            <n-layout class="layout-body" has-sider>
                <!-- <n-layout-sider class="sider" content-style="padding: 24px;">
                    <n-space vertical class="sider-container">

                    </n-space>
                </n-layout-sider> -->
                <n-layout-content class="content" content-style="padding: 24px;" style="">
                    <n-space justify="center">
                        <n-pagination :display-order="['quick-jumper', 'pages', 'size-picker']" v-model:page="page_now"
                            v-model:page-size="page_size" :item-count=author_num :page-sizes="pageSizes" show-quick-jumper
                            show-size-picker @update:page="startSearch" @update:page-size="startSearch"
                            style="margin-bottom: 7px;" />
                        <!-- <n-select v-model:value="selectValue" size="small" :options="sortOptions" style="width: 200px;" @update:value="handleSortSelect"/> -->
                    </n-space>
                    <n-space justify="center" v-for="author in authors">
                        <n-card class="card" @click="goToDetail(author._source.id)">
                            <template #header>
                                <n-ellipsis class="cardHeader" style="max-width: 580px;">
                                    <span style="font-weight: 700;font-family:Arial, Helvetica, sans-serif;">{{
                                        author._source.display_name }}</span>
                                </n-ellipsis>
                            </template>
                            <template #header-extra>
                                <n-space vertical>
                                    <p style="font-size: larger;font-weight: 600;">
                                        {{ author._score }} <span
                                            style="font-size: small;font-weight: 400;">relativity</span>
                                    </p>

                                    <p style="">
                                        cited: <span>{{ author._source.cited_by_count }}</span>
                                    </p>
                                    <p>
                                        published: <span>{{ author._source.works_count }}</span>
                                    </p>
                                </n-space>
                            </template>
                            <n-space justify vertical>
                                <p v-if="author._source.last_known_institution">
                                    Affiliation: {{ author._source.last_known_institution.display_name }} <span
                                        style="font-weight: 600;">{{ author._source.last_known_institution.country_code }}</span>
                                    <a style="margin-left: 30px;color:cornflowerblue;"
                                        :href="author._source.last_known_institution.ror">{{
                                            author._source.last_known_institution.ror }}</a>
                                </p>
                                <p>
                                    ResearcherID: {{ author._id }}
                                </p>
                                <p>
                                    Top Journals:
                                </p>
                            </n-space>
                            <template #footer>
                                <n-space>
                                    <n-tag size="small" v-for="i in author._source.x_concepts">
                                        {{ i.display_name }}
                                    </n-tag>
                                </n-space>
                            </template>
                        </n-card>
                    </n-space>
                </n-layout-content>
            </n-layout>
            <div class="footer">Accelerating innovation© 2023 MewScienceCopyright noticeTerms of usePrivacy statementCookie
                policy</div>
        </n-layout>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, h } from 'vue';
import { repeat } from 'seemly';
import { queryScienceAuthors,accountLogout } from '../api/index'
import { useRoute, useRouter } from 'vue-router';
import { SearchOutline, PersonCircleSharp } from '@vicons/ionicons5'
import { useLoadingBar } from 'naive-ui'
import { getToken } from '../utils/auths.js';
/**
* 仓库
*/
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({})
onBeforeMount(() => {
    //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
    //console.log('3.-组件挂载到页面之后执行-------onMounted')
    searchContent.value = route.query.searchContent == null ? '':route.query.searchContent
    institution.value = route.query.institution == null?'':route.query.institution
    isShow.value=false
    if (getToken('csrftoken') != null) {
        userOptions[1].label = '退出登录'
        userOptions[1].key = 'logout'
    } else {
        userOptions[1].label = '登录'
        userOptions[1].key = 'login'
    }
    startSearch()
})
watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
    ...toRefs(data)
})
const handleUserSelect = (key: string | number) => {
    console.log(key)
    const handleUserSelect = (key: string | number) => {
        console.log(key)
        if (key == 'login') {
            router.push({ path: '/login' })
        } else if (key == 'logout') {
            accountLogout({}).then(res => {
                console.log(res)
            })
        } else if (key == 'personSpace') {
            router.push({ path: '/userInfo' })
        }
    }
}
const min_score =ref(10)
const loadingBar = useLoadingBar()
const sort_content = ref()
const author_num = ref(100) //文献总条数
const authors:any = ref([])
const institution:any = ref("")
const searchContent:any = ref("")
const selectValue = ref("筛选");
const isShow = ref(false)
const showConditions = () => {
    isShow.value = !isShow.value
    console.log(isShow.value)
}
const userOptions = [
    {
        label: '个人资料',
        key: 'personSpace'
    },
    {
        label: '登录',
        key: 'login'
    }
]
const sortOptions = [
    {
        label: "发表文章",
        value: 'published',
    },
    {
        label: '被引次数',
        value: 'cited'
    },
    {
        label: '相关度',
        value: 'relativity'
    },
]
const onInputConfirm = () => {
    page_now.value = 1
    startSearch()
}
const startSearch = () => {
    loadingBar.start()
    console.log("startSearch")
    console.log(institution.value)
    console.log(min_score.value)
    queryScienceAuthors({
        name: searchContent.value == "" ? "范德彪" : searchContent.value,
        institution: institution.value,
        page: page_now.value,
        page_size: page_size.value,
        min_score: min_score.value
    }).then(res => {
        console.log(res)
        authors.value = res.data.hits;
        author_num.value = res.data.total.value;
        loadingBar.finish()
        min_score.value = 10
        institution.value = ''
    })
}

const handleSortSelect = (key: string) => {
    console.log(key)

}

const goToDetail = (id: string) => {
    console.log('begin to route with id:' + id);
    router.push({ path: '/ScholarPage', query: { id: id } })
}

function createLabel(level: number): string {
    if (level === 4) return '道生一'
    if (level === 3) return '一生二'
    if (level === 2) return '二生三'
    if (level === 1) return '三生万物'
    return ''
}

type Option = {
    label: string
    value: string
    children?: Option[]
}

function createData(level = 4, baseKey = ''): Option[] | undefined {
    if (!level) return undefined
    return repeat(6 - level, undefined).map((_, index) => {
        const value = '' + baseKey + level + index
        return {
            label: createLabel(level),
            value,
            children: createData(level - 1, value)
        }
    })
}

function flattenTree(list: undefined | Option[]): Option[] {
    const result: Option[] = []
    function flatten(_list: Option[] = []) {
        _list.forEach((item) => {
            result.push(item)
            flatten(item.children)
        })
    }
    flatten(list)
    return result
}
const treeData = createData()
const valueRef = ref<Array<string | number>>([])
const options = flattenTree(createData())
const value = valueRef


const page_now = ref(1) //当前页数
//page从1开始
const page_size = ref(10) //每页尺寸
const pageSizes = [
    {
        label: '10 每页',
        value: 10
    },
    {
        label: '20 每页',
        value: 20
    },
    {
        label: '30 每页',
        value: 30
    },
    {
        label: '40 每页',
        value: 40
    }
] //可选的每页条数

</script>
<style scoped>
.logo:hover {
    cursor: pointer;
}

.container {
    position: absolute;
    height: 100%;
    width: 100%;
    min-height: 100vh;
    background-color: rgb(243, 242, 242);
}

.header {
    background-color: rgb(255, 255, 255);
    padding: 10px;
    border-radius: 0 0 4px 4px;
}

.searchContainer {
    background-color: rgba(243, 242, 242, 0);
    padding: 10px;
    position: sticky;
    top: 0;
    z-index: 10;
}

.inputContainer {
    width: 800px;
    min-height: 80px;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
    box-shadow: 2px 2px 5px 0.1px rgb(139, 139, 139);
}

.layout-body {
    border-radius: 12px 12px 0 0;
    background-color: rgb(243, 242, 242);
    min-height: 100vh;
    border-color: rgb(199, 199, 199);
    border-width: 1px 0px 0px 0px;
    border-style: solid
}

.sider {
    background-color: rgb(243, 242, 242);
    padding: 10px;
}

.sider-container {
    padding: 10px;
}

.siderpart {
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
    box-shadow: 2px 2px 5px 0.1px rgb(204, 203, 203);
}

.content {
    background-color: rgb(243, 242, 242);
}

.card {
    width: 1000px;
    min-height: 100px;
    margin: 3px;
    box-shadow: 2px 2px 5px 0.1px rgb(204, 203, 203);
}

.footer {
    margin-top: auto;
    text-align: center;
    vertical-align: middle;
    font-size: large;
    color: white;
    font-weight: 400;
    padding: 20px;
    background-color: rgb(0, 0, 0);
}
</style>