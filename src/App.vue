<script setup lang="ts">
import { createPinia } from 'pinia'
import Dashboard from './components/Dashboard.vue'
import TransactionForm from './components/TransactionForm.vue'
import TransactionList from './components/TransactionList.vue'

const pinia = createPinia()
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Budget Tracker</h1>
      
      <Dashboard />
      
      <div class="grid gap-6 mt-8 md:grid-cols-2">
        <TransactionForm />
        <TransactionList />
      </div>
    </div>
  </div>
</template>