<script setup>
import UserLayout from '@/layouts/UserLayout.vue'
import Product from '@/components/Product.vue'

import { useProductStore } from '@/stores/user/product'
import { onMounted } from 'vue'

const productStore = useProductStore()

onMounted(() => {
    console.log(productStore.list)
})
</script>

<template>
    <UserLayout>
        <div class="hero h-96 bg-base-200">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">Hello there</h1>
                    <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button class="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
        <!-- Card -->
        <Product :products="productStore.list"></Product>
    </UserLayout>
</template>