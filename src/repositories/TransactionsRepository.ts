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

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // let income = 0;
    // let outcome = 0;
    // this.transactions.forEach(transaction => {
    //   if (transaction.type === 'income') {
    //     income += transaction.value;
    //   } else {
    //     outcome += transaction.value;
    //   }
    // });

    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, { value }) => total + value, 0);

    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((total, { value }) => total + value, 0);

    const balance: Balance = { income, outcome, total: income - outcome };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    if (value < 0) {
      throw Error('Invalid value');
    }

    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
