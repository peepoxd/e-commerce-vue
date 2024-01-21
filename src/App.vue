<script setup>
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'

import Toast from '@/components/Toast.vue'
import { useCartStore } from '@/stores/user/cart'
import { useEventStore } from '@/stores/event'

const eventStore = useEventStore()
const cartStore = useCartStore()

onMounted(()=>{
  cartStore.loadCart()
})
</script>

<template>
  <Toast
      v-if="eventStore.alert"
      :status="eventStore.data.status"
      :message="eventStore.data.message"
    >
    </Toast>
  <RouterView />
</template>

<style>
template {
background-image: url(https://images.unsplash.com/photo-1495195129352-aeb325a55b65?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
}
</style>
