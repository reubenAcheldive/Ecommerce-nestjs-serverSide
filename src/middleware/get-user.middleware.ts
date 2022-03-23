import { JWT_Secret } from "./../config";
import { NestMiddleware } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";

export class GetUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const authJwtToken = req.headers.authorization;
    
    const token = authJwtToken.split(" ")[1];
    console.log(token);

   "authentication"
    try {
      const user = jwt.verify(token, JWT_Secret);
      console.log(
           user);

      if (!user) {
        console.log("error in jwt");
     
      }
     
        console.log("we found user deatile ", user);
        req["user"] = user;
    
    } catch (error: any) {
      console.log(error, "error in jwt");
    }
    next();
  }
}
