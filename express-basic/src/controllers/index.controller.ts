interface IndexDoc {
  message: string;
}

import { Request, Response } from "express";

class IndexController {
  public index = (_req: Request, res: Response): void => {
    const response: IndexDoc = {
      message: "ok",
    };

    res.status(200).json(response);
  };
}

export default IndexController;
