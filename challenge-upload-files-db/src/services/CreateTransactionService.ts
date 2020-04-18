import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const categoriesRepository = getRepository(Category);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (!['income', 'outcome'].includes(type))
      throw new AppError('Type is invalid');

    const { total } = await transactionsRepository.getBalance();

    if (type === 'outcome' && total < value)
      throw new AppError('Transaction not permitted, insufficient funds');

    let categoryID;

    const storedCategory = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!storedCategory) {
      const newCategory = categoriesRepository.create({
        title: category,
      });

      const { id } = await categoriesRepository.save(newCategory);

      categoryID = id;
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id: storedCategory?.id || categoryID,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
