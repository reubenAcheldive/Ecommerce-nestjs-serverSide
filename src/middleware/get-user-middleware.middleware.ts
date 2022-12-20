import { UsersService } from "./../client/user/service/users.service";
import { Injectable, NestMiddleware, ExecutionContext } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { JWT_Secret } from "src/config";
@Injectable()
export class GetUserMiddlewareMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}
  async use(req: any, res: any, next: () => void) {
    const authJwtToken = req.headers?.authorization?.split(" ")[1];

    if (!authJwtToken) {
      next();
      return;
    }
    try {
      const user = jwt.verify(authJwtToken, JWT_Secret);
 

      const checkIfUserExists = await this.userService.findUserById(
        user["_id"]
      );

      if (checkIfUserExists) {
        req["user"] = checkIfUserExists;
      }
    } catch (error) {
      console.log(error);
    }
    next();
  }
}

