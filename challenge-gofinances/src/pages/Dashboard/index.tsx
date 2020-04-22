import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const { data } = await api.get<{
        transactions: Transaction[];
        balance: Balance;
      }>('transactions');

      setTransactions(
        data.transactions.map(t => ({
          ...t,
          formattedValue: formatValue(Number(t.value)),
          formattedDate: format(new Date(t.created_at), 'dd/MM/yyyy'),
        })),
      );
      setBalance({
        income: formatValue(Number(data.balance.income)),
        outcome: formatValue(Number(data.balance.outcome)),
        total: formatValue(Number(data.balance.total)),
      });
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions ? (
                transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="title">{transaction.title}</td>
                    <td className={transaction.type}>
                      {`${transaction.type === 'outcome' ? '-' : ''} ${
                        transaction.formattedValue
                      }`}
                    </td>
                    <td>{transaction.category?.title}</td>
                    <td>{transaction.formattedDate}</td>
                  </tr>
                ))
              ) : (
                <h1>Carregando</h1>
              )}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
