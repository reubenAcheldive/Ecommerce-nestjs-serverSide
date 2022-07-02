import { Body, Controller, Post } from "@nestjs/common";

import { UserUpdate } from "src/Dto/usersAuth/userLogin.dto";
import { UsersService } from "src/services/users/users.service";

@Controller("/api/users/")
export class UpdateUser {
  constructor(private _userService: UsersService) {}
  @Post("/update-user")
  async updateUser(@Body() { _id, firstName, lastName }: UserUpdate) {
    return await this._userService.updateUserInfo({ _id, firstName, lastName });
  }
}
