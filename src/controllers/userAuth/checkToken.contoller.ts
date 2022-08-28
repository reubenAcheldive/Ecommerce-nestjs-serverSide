import {
  Controller,
  Headers,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/services/users/users.service";
import jwt_decode from "jwt-decode";
import { JWT_Secret } from "src/config";
@Controller("api")
export class CheckToken {
  constructor(private usersService: UsersService) {}
  @Post("/checkPromotion")
  async verifyToken(@Headers() token: any) {
    console.log({token});
    const decodedHeader = jwt_decode<{ email: string }>(token.authorization);

    const { email } = decodedHeader;
    console.log({ email });

    const user = await this.usersService.authJwtToken(email);
    console.log(
      "🚀 ~ file: checkToken.contoller.ts ~ line 21 ~ CheckToken ~ verifyToken ~ user",
      user
    );
    console.log();

    return user;
  }
}
