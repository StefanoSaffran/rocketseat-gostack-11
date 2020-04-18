import fs from 'fs';
import csvParse from 'csv-parse';
import { join } from 'path';

import uploadConfig from '../config/upload';

import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

interface Request {
  filename: string;
}

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute({ filename }: Request): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();

    const parsers = csvParse({ ltrim: true, from_line: 2 });

    const csvFilePath = join(uploadConfig.directory, filename);
    const csvReadStream = fs.createReadStream(csvFilePath);

    const parseCSV = csvReadStream.pipe(parsers);

    const importedTransactions: TransactionDTO[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line;

      importedTransactions.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const storedTransaction: Transaction[] = [];

    for (const transaction of importedTransactions) {
      const newTransaciton = await createTransaction.execute({
        ...transaction,
      });

      storedTransaction.push(newTransaciton);
    }

    await fs.promises.unlink(csvFilePath);

    return storedTransaction;
  }
}

export default ImportTransactionsService;
