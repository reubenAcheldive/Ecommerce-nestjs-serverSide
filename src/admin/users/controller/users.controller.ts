import { Controller, Get,UseGuards } from "@nestjs/common";
import { Body, Delete, Param, Put } from "@nestjs/common/decorators";
import { AdminGuard } from "src/guard/admin.guard";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { UsersService } from "../services/users.service";

@Controller("api/admin/users")
@UseGuards(AuthenticationGuard, AdminGuard)
export class UsersController {
  constructor(private readonly US: UsersService) {}

  @Get("/get-all-users")
  async getAllUser() {
    return await this.US.getAllUsers();
  }
  @Delete("user/:_id")
  async deleteUser(@Param("_id") _id: string) {
    await this.US.deleteUser(_id);
    return { _id };
  }
  @Put("user/:_id")
  async changeUserRole(
    @Param("_id") _id: string,
    @Body() { isAdmin }: { isAdmin: boolean }
  ) {
   
    return await this.US.changeUserRoll(_id, isAdmin);
  }
}

