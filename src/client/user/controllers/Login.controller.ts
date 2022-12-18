import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { UserAuthLogin } from "src/dtos/usersAuth/userLogin.dto";
import { UsersService } from "../service/users.service";

@Controller("api/users")
export class UserLoginController {
  constructor(private UsersService: UsersService) {}

  @Post("/login")
  async getUserByEmail(@Body() payload: UserAuthLogin) {
    const userIsExist = await this.UsersService.isUserExistsByEmail(
      payload.email
    );
    if (!userIsExist) {
      throw new UnauthorizedException({
        message: "Incorrect password / username",
        status: false,
      });
    }
    return await this.UsersService.authLogin(payload.email, payload.password);
  }
}
