<script setup lang="ts">
import { useBudgetStore } from '../stores/budget'
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const store = useBudgetStore()

const chartData = computed(() => ({
  labels: ['Income', 'Expenses', 'Balance'],
  datasets: [{
    label: 'Amount ($)',
    data: [store.totalIncome, store.totalExpenses, store.balance],
    backgroundColor: ['#16a34a', '#dc2626', '#2563eb']
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  }
}
</script>

<template>
  <div class="grid gap-6 md:grid-cols-3">
    <div class="card bg-blue-50">
      <h3 class="text-lg font-medium text-blue-900">Total Balance</h3>
      <p class="text-2xl font-bold text-blue-600">${{ store.balance.toFixed(2) }}</p>
    </div>
    
    <div class="card bg-green-50">
      <h3 class="text-lg font-medium text-green-900">Total Income</h3>
      <p class="text-2xl font-bold text-green-600">${{ store.totalIncome.toFixed(2) }}</p>
    </div>
    
    <div class="card bg-red-50">
      <h3 class="text-lg font-medium text-red-900">Total Expenses</h3>
      <p class="text-2xl font-bold text-red-600">${{ store.totalExpenses.toFixed(2) }}</p>
    </div>
  </div>

  <div class="card mt-6">
    <h3 class="text-lg font-medium mb-4">Financial Overview</h3>
    <div class="h-64">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>