import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [{
            name: 'product 01',
            imageUrl: 'https://fastly.picsum.photos/id/693/200/300.jpg?hmac=mVvEbAr0g-bdhrVxrz7IorqUfEy95C2hPkIT9Vm3nn8',
            quantity: 4,
            about: 'test',
            status: 'open',
            price: 100,
        }]
    }),
    getters: {
        summaryPrice (state) {
            return state.items.reduce((acc, item) => {
                return acc + (item.price * item.quantity)
            }, 0)
        },
        summaryQuantity (state) {
            return state.items.reduce((acc, item) => acc + item.quantity, 0)
        }
    },
    actions: {
        addToCart(productData) {
            this.items.push(productData)
        },
        updateQuantity(index, quantity) {
            this.items[index].quantity = quantity
        },
        removeItemInCart(index) {
            this.items.splice(index, 1)
        }
    }
})