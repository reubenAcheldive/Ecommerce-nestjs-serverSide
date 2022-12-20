import { Body, Controller, Post } from "@nestjs/common";
import { CartServices } from "src/client/carts/services/cart.services";
import { UserRegister } from "src/dtos/usersAuth/userLogin.dto";
import { UsersService } from "../service/users.service";

@Controller("api/users")
export class UserRegisterController {
  constructor(private UsersService: UsersService,private cartServices:CartServices) {}

  // @UseFilters(AllExceptionsFilter)
  @Post("/register")
  // @HttpCode(HttpStatus.OK)
  async secondStep(@Body() payload: UserRegister) {
    // const che
    const createUser = await this.UsersService.createNewUser(payload);
    const { _id, firstName, lastName, isAdmin, email } = createUser;
    const authJwtToken = await this.UsersService.createJwtToken({_id: _id.toString()});
    await this.cartServices.createNewCart(_id.toString())
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

