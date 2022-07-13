import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transactions {
  id: number
  title: string
  type: string
  category: string
  amount: number
  createdAt: string
}

type NewTransaction = Omit<Transactions, 'id' | 'createdAt'>
// type NewTransaction = Pick<Transactions, 'title' | 'type' | 'amount' | 'category'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transactions[]
  createTransaction: (transaction: NewTransaction) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transactions[]>([])

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transaction: NewTransaction) {
    const response = await api.post('/transaction', {
      ...transaction,
      createdAt: new Date()
    })

    const { transaction: newTransaction } = response.data

    setTransactions([...transactions, newTransaction])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}
export const useTransactions = () => {
  const context = useContext(TransactionsContext)

  return context
}