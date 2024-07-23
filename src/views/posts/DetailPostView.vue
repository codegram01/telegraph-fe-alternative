<script setup>
import { getPostApi } from "@/services/post"
import { computed, nextTick, onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { nodeToDom, domToNode } from "@/modules/editor"


const route = useRoute()
const path = computed(()=> {
    return route.params.path
})

const isLoading = ref(true)
onMounted(async ()=> {
    await getPost()
    isLoading.value = false
})

const detailPost = ref(null)
const getPost = async () => {
    try {
        await getPostApi(path.value).then(res => {
            console.log(res)
            detailPost.value = res

            nextTick(()=> {
                const node = nodeToDom({
                    children: res.content
                })
                contentElm.value.appendChild(node)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

const contentElm = ref(null)
</script>

<template>
    <div>
        <div v-if="detailPost">
            <h1>{{ detailPost.title }}</h1>
            <p>Author: {{ detailPost.author_name }}</p>
            <div class="content" ref="contentElm"></div>
        </div>
        <div v-if="!detailPost && !isLoading">
            <h1>Not found post</h1>
        </div>
    </div>
</template>