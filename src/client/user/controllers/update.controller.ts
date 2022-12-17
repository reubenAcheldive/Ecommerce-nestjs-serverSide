import { ChangePersonalDetails } from "./../../../dtos/usersAuth/changePersonalDetails";
import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "../service/users.service";

@Controller("/users")
export class UpdateUser {
  constructor(private _userService: UsersService) {}
  @Post("/update-user")
  async updateUser(
    @Body() { _id, firstName, lastName }: ChangePersonalDetails
  ) {
    return await this._userService.updateUserInfo({ _id, firstName, lastName });
  }
}
