import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionsRepository.findOne(id);

    if (!transaction) throw new AppError('Transaction not found.');

    const { total } = await transactionsRepository.getBalance();

    if (transaction.type === 'income' && total < transaction.value)
      throw new AppError('Operation denied to avoid negative funds');

    await transactionsRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
