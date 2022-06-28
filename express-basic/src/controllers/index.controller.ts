import { Request, Response } from 'express';

interface IndexDoc {
  message: string;
}

class IndexController {
  public index = (_req: Request, res: Response): void => {
    const response: IndexDoc = {
      message: 'ok'
    };

    res.status(200).json(response);
  };
}

export default IndexController;
