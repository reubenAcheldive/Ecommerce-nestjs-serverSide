import { JWT_Secret } from "./../config";
import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";

export class GetUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const authJwtToken = req.headers.authorization;
    if (!authJwtToken) throw new UnauthorizedException();
    const token = authJwtToken.split(" ")[1];

    ("authentication");
    try {
      const user = jwt.verify(token, JWT_Secret);
      console.log(user);

      if (!user) {
        throw new UnauthorizedException();
      }

      req["user"] = user;
    } catch (error: any) {
      console.log(error);
    }
    next();
  }
}
