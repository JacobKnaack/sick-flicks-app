import { Request, Response, NextFunction } from "express";

export function statusCode(req: Request, res: Response, next: NextFunction): void {
  console.log(req);
  next();  
}
