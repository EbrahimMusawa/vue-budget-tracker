<script setup lang="ts">
import { useBudgetStore } from '../stores/budget'
import { format } from 'date-fns'

const store = useBudgetStore()
</script>

<template>
  <div class="card">
    <h2 class="text-xl font-semibold mb-4">Recent Transactions</h2>
    
    <div class="space-y-4">
      <div v-for="transaction in store.transactions" :key="transaction.id"
           class="flex items-center justify-between p-4 rounded-lg"
           :class="transaction.type === 'income' ? 'bg-green-50' : 'bg-red-50'">
        <div>
          <p class="font-medium">{{ transaction.category }}</p>
          <p class="text-sm text-gray-600">{{ transaction.description }}</p>
          <p class="text-xs text-gray-500">
            {{ format(new Date(transaction.date), 'MMM dd, yyyy') }}
          </p>
        </div>
        
        <div class="flex items-center gap-4">
          <span class="font-semibold"
                :class="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'">
            {{ transaction.type === 'income' ? '+' : '-' }}${{ transaction.amount.toFixed(2) }}
          </span>
          
          <button @click="store.removeTransaction(transaction.id)"
                  class="text-gray-400 hover:text-red-500">
            <span class="sr-only">Delete</span>
            ×
          </button>
        </div>
      </div>
      
      <p v-if="store.transactions.length === 0" class="text-center text-gray-500">
        No transactions yet
      </p>
    </div>
  </div>
</template>