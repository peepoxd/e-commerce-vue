import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    list: [{
      name: 'Bonjai',
      imageUrl: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      quantity: 10,
      about: 'test product 01',
      status: 'open',
      price: 100,
    }, {
      name: 'Bonsai',
      imageUrl: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      quantity: 10,
      about: 'test product 02',
      status: 'open',
      price: 100
    },{
      name: 'Bonny',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1664526284160-fd1eeea62d2a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
