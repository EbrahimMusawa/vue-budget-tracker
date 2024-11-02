<script setup lang="ts">
import { ref } from 'vue'
import { useBudgetStore } from '../stores/budget'

const store = useBudgetStore()

const amount = ref('')
const type = ref<'income' | 'expense'>('expense')
const category = ref('')
const description = ref('')

const handleSubmit = () => {
  if (!amount.value || !category.value) return

  store.addTransaction({
    type: type.value,
    amount: parseFloat(amount.value),
    category: category.value,
    description: description.value,
    date: new Date().toISOString()
  })

  // Reset form
  amount.value = ''
  category.value = ''
  description.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="card">
    <h2 class="text-xl font-semibold mb-4">Add Transaction</h2>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Type</label>
        <select
          v-model="type"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          v-model="amount"
          step="0.01"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          v-model="category"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          v-model="description"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button type="submit" class="btn btn-primary w-full">
        Add Transaction
      </button>
    </div>
  </form>
</template>