import { Request, Response } from "express";

export function getAuthorization(req: Request, res: Response){
    if (!req.headers.authorization) {
        res.status(404).send('Credencias não enviadas');
        return;
      }
      return JSON.parse(Buffer.from(req.headers.authorization.split('.')[1], 'base64').toString());

}