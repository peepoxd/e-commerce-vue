<script setup>
import { ref, onMounted } from 'vue';

import UserLayout from '@/layouts/UserLayout.vue'

import { useCartStore } from '@/stores/user/cart'

const orderData = ref({})
const cartStore = useCartStore()

onMounted(() => {
    cartStore.loadCheckout()
    console.log(cartStore.checkout.orderNumber)
    if (cartStore.checkout.orderNumber) {
        orderData.value = cartStore.checkout
    }

})
</script>

<template>
    <UserLayout>
        <div class="max-w-2xl border border-base-200 shadow-xl p-8 m-auto my-6">
            <div>
                <div class="text-2xl font-bold">Your order is successful</div>
                <div class="">Hi {{ orderData.name }}</div>
                <div class="">รอรับสินค้า</div>
            </div>
            <div class=" divider"></div>
            <div class="grid grid-cols-4 gap-2">
                <div>
                    <div class="font-bold ">Date</div>
                    <div class="">{{ orderData.createdDate }}</div>
                </div>
                <div>
                    <div class="font-bold ">Order Number</div>
                    <div class="">{{ orderData.orderNumber }}</div>
                </div>
                <div>
                    <div class="font-bold ">Payment method</div>
                    <div class="">{{ orderData.paymentMethod }}</div>
                </div>
                <div>
                    <div class="font-bold ">Address</div>
                    <div class="">{{ orderData.address }}</div>
                </div>
            </div>
            <div class=" divider"></div>
            <div v-for="product in orderData.products" class="grid grid-cols-4 gap-2 mb-4 items-center">
                <div>
                    <img :src="product.imageUrl" alt="">
                </div>
                <div>

                    <div><b>Name : </b>{{ product.name }}</div>
                </div>
                <div>

                    <div> <b>Amount : </b> {{ product.quantity }}</div>
                </div>
                <div>

                    <div> <b>Summary : </b> {{ product.price * product.quantity }}</div>
                </div>
            </div>
            <div class=" divider"></div>
            <div class="m-3 flex justify-between">
                <div class="font-bold">รวมราคาสินค้า</div>
                <div>{{ orderData.totalPrice }}</div>
            </div>
            
            <div class="m-3 flex justify-between">
                <div class="font-bold">ค่าส่ง</div>
                <div>0</div>
            </div>
            <div class=" divider"></div>
            <div class="m-3 flex justify-between">
                <div class="font-bold">รวมราคาทั้งสิ้น</div>
                <div>{{ orderData.totalPrice }}</div>
            </div>
            <div class=" divider"></div>
            <div class="font-bold">Thank you</div>
        </div>
    </UserLayout>
</template>