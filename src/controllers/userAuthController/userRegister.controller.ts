import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  UnauthorizedException,
  UseFilters,
} from "@nestjs/common";
import { UserRegister } from "src/Dto/usersAuth/userLogin.dto";
import { AllExceptionsFilter } from "src/filters/mongoose.filter";
import { UsersService } from "src/services/users/users.service";

@Controller("/api/users")
export class UserRegisterController {
  constructor(private UsersService: UsersService) {}

  // @UseFilters(AllExceptionsFilter)
  @Post("/register")
  // @HttpCode(HttpStatus.OK)
  async secondStep(@Body() payload: UserRegister) {
    // const che
    const createUser = await this.UsersService.createNewUser(payload);
  const { _id,firstName,lastName ,isAdmin,email} = createUser;
    return { userId:_id,firstName,lastName ,isAdmin,email,jwt:"test"}
  }
}
