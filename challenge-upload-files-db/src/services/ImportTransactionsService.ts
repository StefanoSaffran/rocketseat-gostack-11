import fs from 'fs';
import csvParse from 'csv-parse';

import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

interface Request {
  filePath: string;
}

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute({ filePath }: Request): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();

    const parsers = csvParse({ ltrim: true, from_line: 2 });

    const csvReadStream = fs.createReadStream(filePath);

    const parseCSV = csvReadStream.pipe(parsers);

    const importedTransactions: TransactionDTO[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line;

      if (!title || !type || !value) return;

      importedTransactions.push({ title, type, value, category });
    });

    await new Promise((resolve, reject) => {
      parseCSV.on('error', err => reject(err));
      parseCSV.on('end', resolve);
    });

    const storedTransaction: Transaction[] = [];

    for (const transaction of importedTransactions) {
      const newTransaciton = await createTransaction.execute({
        ...transaction,
      });

      storedTransaction.push(newTransaciton);
    }

    await fs.promises.unlink(filePath);

    return storedTransaction;
  }
}

export default ImportTransactionsService;
