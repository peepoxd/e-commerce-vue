<script setup>
import { onMounted, ref } from 'vue';

import UserLayout from '@/layouts/UserLayout.vue'
import Toast from '@/layouts/UserLayout.vue'

import { useEventStore } from '@/stores/event'
import SuccessView from './SuccessView.vue';

const eventStore = useEventStore()

const profileImageUrl = ref("https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg")
const name = ref('')
const email = ref('')

const updateProfile = () => {

    const profileData = {
        imageUrl: profileImageUrl.value,
        name: name.value,
        email: email.value
    }
    localStorage.setItem('profile-data', JSON.stringify(profileData))
    if (!eventStore.alert) { 
        eventStore.popupMessage('success','update successful!')
    }


}

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        console.log("1")
        const reader = new FileReader()
        reader.onload = (e) => {
            profileImageUrl.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

onMounted(() => {
    let profileData = localStorage.getItem('profile-data')
    if (profileData) {
        console.log("1")
        profileData = JSON.parse(profileData)
        profileImageUrl.value = profileData.imageUrl
        name.value = profileData.name
        email.value = profileData.email
    }
    console.log(eventStore.data.status)
})
</script>

<template>
    
    <UserLayout>
        <div class="max-w-2xl border border-base-200 shadow-xl p-8 m-auto my-6 ">
            <div class="font-bold">Profile page</div>
            <div class="flex flex-col items-center m-4">
                <div class="flex flex-col m-2 items-center">
                    <div class="avatar">
                        <div class="w-40 rounded-full ">
                            <img :src="profileImageUrl" />
                        </div>
                    </div>
                    <input class="mt-4 m-auto" type="file" @change="handleFileUpload">
                </div>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Email</span>
                    </div>
                    <input v-model="email" type="text" placeholder="Type here" class="input input-bordered w-full " />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Name</span>
                    </div>
                    <input v-model="name" type="text" placeholder="Type here" class="input input-bordered w-full " />
                </label>
                <button @click="updateProfile" class="btn btn-base-200 mt-6 w-full">UPDATE PROFILE</button>
            </div>
        </div>
    </UserLayout>
</template>