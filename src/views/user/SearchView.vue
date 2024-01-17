<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter} from 'vue-router'

import UserLayout from '@/layouts/UserLayout.vue'
import Product from '@/components/Product.vue'

import { useProductStore } from '@/stores/user/product'
import { useCartStore } from '@/stores/user/cart'

const route = useRoute()
const router = useRouter()

const productStore = useProductStore()
const cartStore = useCartStore()

const addToCart = (product) => {
    console.log("hello add to cart")
    console.log(product)
    cartStore.addToCart(product)
    router.push({name: 'cart'})
}

const searchText = ref('')
onMounted(() => {
    if (route.query.q) {
        searchText.value = route.query.q
    }
})
const filterProducts = computed(() => {
    return productStore.filterProduct(searchText.value)
})
watch(() => route.query.q ,(newSearchText) => {
    searchText.value = newSearchText
}, {immediate: true})
</script>

<template>
    <UserLayout>
        <div class="text-3xl">Search {{ newSearchText }}</div>
        <Product 
            :products="filterProducts"
            :addToCart="addToCart"
        ></Product>
    </UserLayout>
</template>