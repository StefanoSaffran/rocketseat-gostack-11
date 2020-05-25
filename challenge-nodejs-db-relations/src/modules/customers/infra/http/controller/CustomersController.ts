import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      name,
      email,
    });

    return response.json(customer);
  }
}
