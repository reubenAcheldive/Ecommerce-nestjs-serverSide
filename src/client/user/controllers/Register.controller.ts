import { Body, Controller, Post } from "@nestjs/common";
import { UserRegister } from "src/dtos/usersAuth/userLogin.dto";
import { UsersService } from "../service/users.service";

@Controller("api/users")
export class UserRegisterController {
  constructor(private UsersService: UsersService) {}

  // @UseFilters(AllExceptionsFilter)
  @Post("/register")
  // @HttpCode(HttpStatus.OK)
  async secondStep(@Body() payload: UserRegister) {
    // const che
    const createUser = await this.UsersService.createNewUser(payload);
    const { _id, firstName, lastName, isAdmin, email } = createUser;
    const authJwtToken = await this.UsersService.createJwtToken(
      payload.email,
      false
    );
    return {
      userId: _id,
      firstName,
      lastName,
      isAdmin,
      email,
      jwt: authJwtToken,
    };
  }
}
