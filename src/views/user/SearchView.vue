<script setup>

import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

import UserLayout from '@/layouts/UserLayout.vue'
import Product from '@/components/Product.vue'

import { useProductStore } from '@/stores/user/product'

const route = useRoute()

const productStore = useProductStore()

const searchText = ref('')
onMounted(() => {
    if (route.query.q) {
        searchText.value = route.query.q
    }
})
const filterProducts = computed(() => {
    return productStore.filterProducts(searchText.value)
})
watch(() => route.query.q ,(newSearchText) => {
    searchText.value = newSearchText
}, {immediate: true})
</script>

<template>
    <UserLayout>
        <div class="text-3xl">Search {{ newSearchText }}</div>
        <Product :products="filterProducts"></Product>
    </UserLayout>
</template>