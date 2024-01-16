import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    list: [{
      name: 'product 01',
      imageUrl: 'https://fastly.picsum.photos/id/693/200/300.jpg?hmac=mVvEbAr0g-bdhrVxrz7IorqUfEy95C2hPkIT9Vm3nn8',
      quantity: 10,
      about: 'test product 01',
      status: 'open',
      price: 100,
    }, {
      name: 'product 02',
      imageUrl: 'https://fastly.picsum.photos/id/469/200/300.jpg?hmac=XkjIV9jof2hkk4eUpQpbQVMBiSTfqdlJxIdlcIdEM6Q',
      quantity: 10,
      about: 'test product 02',
      status: 'open',
      price: 100
    }]
  }),
  actions: {
    filterProduct(searchText) {
      return this.list.filter(product => product.name.includes(searchText))
    }
  }
})
