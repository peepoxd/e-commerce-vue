<script setup>
import UserLayout from '@/layouts/UserLayout.vue'
import Close from '@/components/icons/Close.vue'

import { useCartStore } from '@/stores/user/cart'

const cartStore = useCartStore()

const changeQuantity = (event, index) => {
    const newQuantity = parseInt(event.target.value)
    cartStore.updateQuantity(index, newQuantity)
}

</script>

<template>
    <UserLayout>
        <h1 class="text-3xl font-bold m-4"> Shopping Cart</h1>
        <div class="flex">
            <div class="flex-auto w-64 bg-base-200 p-4">
                <div v-if="cartStore.items.length === 0">
                    <h2 class="text-xl font-bold px-4">Cart is empty</h2>
                </div>
                <div v-else v-for="(item, index) in cartStore.items" class="flex">
                    <div class="flex-1">
                        <img class="w-full p-10" :src="item.imageUrl">
                    </div>
                    <div class="flex-1 ">
                        <div class="flex flex-col justify-between h-full ">
                            <div class="grid grid-cols-2 relative">
                                <div>
                                    <div><b>{{ item.name }}</b></div>
                                    <div>{{ item.about }}</div>
                                    <div>{{ item.price }} Bath</div>
                                </div>
                                <select v-model="item.quantity" class="select w-3/4"
                                    @change="changeQuantity($event, index)">
                                    <option disabled selected>{{ item.quantity }}</option>
                                    <option v-for="quantity in [1, 2, 3, 4, 5]">
                                        {{ quantity }}
                                    </option>
                                </select>
                                <div @click="cartStore.removeItemInCart(index)" class="absolute top-0 right-0">
                                    <Close></Close>
                                </div>
                            </div>
                            <div>In Stock</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-auto w-32 bg-slate-200 p-4">
                <div class="text-xl font-boid ">
                    Order Summary
                </div>
                <div class="divide-y divide-black ">
                    <div class="flex justify-between py-2">
                        ราคาสินค้าทั้งหมด
                        <div>{{ cartStore.summaryPrice }}</div>
                    </div>

                    <div class="flex justify-between py-2 ">
                        ค่าส่ง
                        <div>0</div>
                    </div>
                    <div class="flex justify-between py-auto">
                        ราคารวททั้งหมด
                        <div>{{ cartStore.summaryPrice }}</div>
                    </div>
                    <RouterLink to="/checkout" class="btn btn-neutral w-full mt-4">
                        ชำระเงิน
                    </RouterLink>
                </div>
            </div>
        </div>
    </UserLayout>
</template>