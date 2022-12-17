import { Controller, Headers, Post } from "@nestjs/common";

import jwt_decode from "jwt-decode";
import { UsersService } from "../service/users.service";

@Controller("/users")
export class CheckToken {
  constructor(private usersService: UsersService) {}
  @Post("/checkPromotion")
  async verifyToken(@Headers() token: any) {
    const decodedHeader = jwt_decode<{ email: string }>(token.authorization);

    const { email } = decodedHeader;

    const user = await this.usersService.authJwtToken(email);

    return user;
  }
}
("folder structure");
