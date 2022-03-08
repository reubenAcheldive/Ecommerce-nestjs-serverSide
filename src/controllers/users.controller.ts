import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from "@nestjs/common";
import { User } from "src/decorators/user.decorator";
import { UsersService } from "src/services/users/users.service";
import { UserLoginDto } from "../Dto/userLogin.dto";
import {} from "class-validator";
@Controller("api/users")
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post("/login")
  async getUserByEmail(@Body() payload: UserLoginDto) {
    const userIsExist = await this.UsersService.isUserExistsByEmail(
      payload.userEmail
    );
    if (!userIsExist) {
      return ;
    }
    return userIsExist;
  }
}
