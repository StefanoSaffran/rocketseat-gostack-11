import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface GetTransactionAndBalanceDTO {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): GetTransactionAndBalanceDTO {
    const balance = this.getBalance();

    const transactions = {
      transactions: this.transactions,
      balance,
    };
    return transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((totalIncome, nextTransaction) => {
      return nextTransaction.type === 'income'
        ? totalIncome + nextTransaction.value
        : totalIncome;
    }, 0);

    const outcome = this.transactions.reduce(
      (totalOutcome, nextTransaction) => {
        return nextTransaction.type === 'outcome'
          ? totalOutcome + nextTransaction.value
          : totalOutcome;
      },
      0,
    );

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
