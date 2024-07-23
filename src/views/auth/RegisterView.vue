<script setup>
import { ref } from "vue";
import { setToken, authInfo } from "@/store/auth.js"
import { api } from "@/modules/api";
import { registerApi } from "@/services/auth";

const inpRegister = ref({
  short_name: "",
  author_name: ""
})

const register = async () => {
  try {
    const data = await registerApi(inpRegister.value.short_name, inpRegister.value.author_name)
    // const data = await api("/createAccount", `short_name=${inpRegister.value.short_name}&author_name=${inpRegister.value.author_name}`)

    alert("Register success")

    setToken(data.access_token)

    authInfo.value = {
      short_name: data.short_name,
      author_name: data.author_name
    }

  } catch (error) {
   
  }

}
</script>

<template>
  <div>
    <h1>Register</h1>
    <div>
      <input v-model="inpRegister.short_name" type="text" placeholder="Enter short name">
      <input v-model="inpRegister.author_name" type="text" placeholder="Enter author name">

      <button @click="register">Register</button>
    </div>
  </div>
</template>
