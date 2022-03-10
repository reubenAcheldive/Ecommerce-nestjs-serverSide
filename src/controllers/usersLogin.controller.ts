import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
} from "@nestjs/common";

import { UsersService } from "src/services/users/users.service";
import { UserLoginDto } from "../Dto/userLogin.dto";


@Controller("api/users")
export class UserLoginController {
  constructor(private UsersService: UsersService) {}

  @Post("/login")
  async getUserByEmail(@Body() payload: UserLoginDto) {
    const userIsExist = await this.UsersService.isUserExistsByEmail(
      payload.userEmail
    );
    if (!userIsExist) {
      throw new UnauthorizedException({
        message: "Incorrect password / username",
        status: false,
      });
    }
    return   await this.UsersService.authLogin(payload.userEmail, payload.userPassword)
  
  
  
  }
}
