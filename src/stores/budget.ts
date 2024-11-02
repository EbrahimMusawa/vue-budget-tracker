import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { formatISO } from 'date-fns'

export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string
}

export const useBudgetStore = defineStore('budget', () => {
  const transactions = ref<Transaction[]>([])
  
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    transactions.value.push({
      ...transaction,
      id: crypto.randomUUID()
    })
  }

  const removeTransaction = (id: string) => {
    transactions.value = transactions.value.filter(t => t.id !== id)
  }

  const totalIncome = computed(() => 
    transactions.value
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
  )

  const totalExpenses = computed(() => 
    transactions.value
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  )

  const balance = computed(() => totalIncome.value - totalExpenses.value)

  return {
    transactions,
    addTransaction,
    removeTransaction,
    totalIncome,
    totalExpenses,
    balance
  }
})