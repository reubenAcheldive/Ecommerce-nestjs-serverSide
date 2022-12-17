import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";

import { Users, UsersSchema } from "../../schemas/user/user.schema";
import { CheckToken } from "./controllers/checkToken.contoller";
import { UserLoginController } from "./controllers/Login.controller";
import { UserRegisterController } from "./controllers/Register.controller";
import { UpdateUser } from "./controllers/update.controller";
import { UsersService } from "./service/users.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [
    UserLoginController,
    UserRegisterController,
    CheckToken,
    UpdateUser,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}

