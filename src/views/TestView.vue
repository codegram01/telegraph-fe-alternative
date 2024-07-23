<script setup>
import { ref } from 'vue';

const fileInpElm = ref(null)

const onUpFile = async () => {
    console.log(fileInpElm.value.files)

    const data = new FormData()
    for(const file of fileInpElm.value.files) {
        data.append("file", file)
    }

    await fetch("https://telegra.ph/upload", {
        method: "POST",
        mode: "cors",
        body: data
    }).then(async res => {
        console.log(res)
        // const data = await res.json()

        // console.log("--> ", data)
    })

}
</script>

<template>
    <div>
        <input type="file" ref="fileInpElm" @input="onUpFile"/>
    </div>
</template>

<style scoped>

</style>