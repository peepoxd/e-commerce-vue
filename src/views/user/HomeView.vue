<script setup>
import { useRouter } from 'vue-router'

import UserLayout from '@/layouts/UserLayout.vue'
import Product from '@/components/Product.vue'

import { useProductStore } from '@/stores/user/product'
import { useCartStore } from '@/stores/user/cart'
import { onMounted } from 'vue'

const router = useRouter()

const productStore = useProductStore()
const cartStore = useCartStore()

onMounted(() => {
    console.log(productStore.list)
})
const addToCart = (product) => {
    console.log("hello add to cart")
    console.log(product)
    cartStore.addToCart(product)
    router.push({name: 'cart'})
}
</script>

<template>
    <UserLayout>
        <div class="hero h-96 bg-base-200">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">Hello there</h1>
                    <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
            </div>
        </div>
        <!-- Card -->
        <Product :products="productStore.list" :addToCart="addToCart">
        </Product>
    </UserLayout>
</template>

<style>
.hero {
  background-image: url(https://images.unsplash.com/photo-1495195129352-aeb325a55b65?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
}
</style>
