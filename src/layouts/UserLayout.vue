<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/user/cart'

const cartStore = useCartStore()

const router = useRouter()

const isLoggedIn = ref(false)
const searchText = ref('')

onMounted(() => {
    if (localStorage.getItem('isLoggedIn')) {
        isLoggedIn.value = true
    }
})
const login = () => {
    isLoggedIn.value = true
    localStorage.setItem('isLoggedIn', true)
}
const logout = () => {
    isLoggedIn.value = false
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('order-data')
    localStorage.removeItem('cart-data')
    window.location.reload()
}
const handleSearch = (event) => {
    if (event.key === 'Enter') {
        router.push({
            name: 'search',
            query: {
                q: searchText.value
            }
        })
    }
}

</script>
<template>
    <div class="container mx-auto">
        <div>
            <div class="navbar bg-base-100">
                <div class="flex-1">
                    <RouterLink :to="{ name: 'home' }" class="btn btn-ghost text-xl">daisyUI</RouterLink>
                </div>
                <div class="flex-none">
                    <div class="form-control">
                        <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto"
                            v-model="searchText" @keyup="handleSearch" />
                    </div>
                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                            <div class="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span class="badge badge-sm indicator-item">{{ cartStore.summaryQuantity }}</span>
                            </div>
                        </div>
                        <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div class="card-body">
                                <span class="font-bold text-lg"> {{ cartStore.summaryQuantity }}</span>
                                <span class="text-info">Subtotal: {{ cartStore.summaryPrice }} B</span>
                                <div class="card-actions">
                                    <RouterLink 
                                        :to="{ name: 'cart' }" 
                                        class="btn btn-primary btn-block">
                                        View cart
                                    </RouterLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!isLoggedIn" @click="login">
                        <button class="btn btn-ghost">login</button>
                    </div>
                    <!-- PROFILE-->
                    <div v-else class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                            <div class="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component"
                                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabindex="0"
                            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <RouterLink :to="{ name: 'profile' }" class="justify-between">
                                    Profile
                                    <span class="badge">New</span>
                                </RouterLink>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a @click="logout">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <slot></slot>
        <div>
            <footer class="footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
                </aside>
            </footer>
        </div>
    </div>
</template>