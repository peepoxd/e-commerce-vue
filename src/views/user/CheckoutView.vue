<script setup>
import { reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router'

import UserLayout from '@/layouts/UserLayout.vue'
import { useCartStore } from '@/stores/user/cart'


const cartStore = useCartStore()

const checkoutForm = [
    {
        name: 'Email Address',
        field: 'email'
    },
    {
        name: 'Name',
        field: 'name'
    },
    {
        name: 'Address',
        field: 'address'
    },
    {
        name: 'Note',
        field: 'note'
    }
]

const userFormData = reactive({
    name: '',
    email: '',
    address: '',
    note: ''
})

const payment = () => {
    console.log(userFormData)
}


</script>

<template>
    <UserLayout>
        <div class="flex">
            <section class="flex-auto w-64 bg-base-200 p-4">
                <h1 class="text-2xl mb-1">Checkout</h1>
                <div v-for="form in checkoutForm" class="form-control ">
                    <label class="label">
                        <span class="lebel-text"> {{ form.name }} </span>
                    </label>
                    <textarea v-if="form.field === 'address'"
                        class="textarea textarea-bordered h-24">{{ form.name }}</textarea>
                    <input v-else v-model="userFormData[form.field]" type="text" placeholder="Type here"
                        class="input input-bordered input-xs w-full " />
                </div>
                <button @click="payment" class="btn btn-neutral my-3 w-full">ชำระเงิน</button>
            </section>
            <section class="flex-auto w-32 bg-white">
                <div v-for="item in cartStore.items" class="flex bg-slate-200 p-4 m-8 rounded-box">
                    <div class="flex-1">
                        <img class="w-full p-4" :src="item.imageUrl" />
                    </div>
                    <div class="flex-1">
                        <div class="flex flex-col justify-between h-full">
                            <div>
                                <div><b>{{ item.name }}</b></div>
                                <div>จำนวน:{{ item.quantity }}</div>
                            </div>
                            <RouterLink :to="{ name: 'cart' }">
                                <button class="btn btn-gray my-3 w-full p-auto m-auto">Edit</button>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </UserLayout>
</template>