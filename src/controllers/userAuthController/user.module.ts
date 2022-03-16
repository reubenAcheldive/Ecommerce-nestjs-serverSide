import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersService } from "src/services/users/users.service";
import { Users, UsersSchema } from "../../schemas/user/user.schema";
import { UserRegisterController } from "./userRegister.controller";
import { UserLoginController } from "./usersLogin.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [UserLoginController,UserRegisterController],
  providers: [UsersService],
})
export class UserModule {}
