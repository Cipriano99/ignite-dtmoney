import outcomeImg from '../../assets/outcome.svg'
import incomeImg from '../../assets/income.svg'
import totalImg from '../../assets/total.svg'

import { Container } from "./styles"
import { useTransactions } from '../../hooks/useTransactionsContext'

export const Summary = () => {
  const { transactions } = useTransactions()

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount
      acc.total += transaction.amount;
    } else {
      acc.whithdraw += transaction.amount
      acc.total -= transaction.amount;
    }

    return acc
  }, {
    deposits: 0,
    whithdraw: 0,
    total: 0,
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(
            summary.deposits
          )}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>
          -
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(
            summary.whithdraw
          )}
        </strong>
      </div>

      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(
            summary.total
          )}
        </strong>
      </div>
    </Container>
  )
}