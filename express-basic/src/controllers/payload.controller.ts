import { Request, Response } from 'express';

interface IndexDoc {
  message: string;
  service: string;
}

class PayloadController {
  public index = (_req: Request, res: Response): void => {
    const response: IndexDoc = {
      message: 'ok',
      service: 'blogbuilder'
    };

    res.status(200).json(response);
  };
}

export default PayloadController;
