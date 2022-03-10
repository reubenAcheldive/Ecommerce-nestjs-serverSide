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
import { UserRegister } from "src/Dto/userLogin.dto";
import { AllExceptionsFilter } from "src/filters/mongoose.filter";
import { UsersService } from "src/services/users/users.service";

@Controller("/api/users/register")
export class UserRegisterController {
  constructor(private UsersService: UsersService) {}
  @Post("user-check")
  async firstStep(@Body("id", ParseIntPipe) id: number) {
    const userExists = await this.UsersService.isUserExistsByCardId(id);
    console.log(userExists.length > 0, userExists);

    if (userExists.length > 0) {
      throw new UnauthorizedException({
        message: "User is Already Exists",
        status: false,
      });
    }
    return {
      message: "User is not  Exists",
      status: true,
    };
  }
  // @UseFilters(AllExceptionsFilter)
  @Post("/secondStep")
  // @HttpCode(HttpStatus.OK)
  async secondStep(@Body() payload: UserRegister) {
    // const che
    return await this.UsersService.createNewUser(payload);
  }
}
