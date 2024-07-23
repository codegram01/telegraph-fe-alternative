<script setup>
import { onBeforeMount, ref } from 'vue';
import { token } from '@/store/auth';
import { getListPostsApi } from '@/services/post';


onBeforeMount(async ()=> {
    await getListPosts()
})

const total_count = ref(0)
const pages = ref([])
const getListPosts = async () => {
    try {
        const data = await getListPostsApi()

        console.log(data)

        total_count.value = data.total_count
        pages.value = data.pages
    } catch (error) {
        console.log(error)
    }
}

/*
"path": "Are-you-install-X-07-02",
"url": "https://telegra.ph/Are-you-install-X-07-02",
"title": "Are you install X",
"description": "Hello, world!",
"author_name": "Elon Musk",
"views": 0,
"can_edit": true
*/

</script>

<template>
    <div>
        <h1>List Post</h1>
        <div>
            Total Post {{ total_count }}

            <RouterLink to="/posts/create">Create Post</RouterLink>
        </div>
        <hr>
        <table>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
            <tr v-for="page of pages" :key="page.path">
                <td><RouterLink :to="`/posts/${page.path}`"><h2>{{ page.title }}</h2></RouterLink></td>
                <td>{{ page.description }}</td>
                <td>
                    <RouterLink :to="`/posts/${page.path}/update`">Update</RouterLink>
                </td>
            </tr>
        </table>
    
    </div>
</template>

<style scoped>
table, th, td {
  border: 1px solid;
}
</style>