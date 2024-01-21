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

