import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersService } from "src/services/users/users.service";
import { Users, UsersSchema } from "../../schemas/user/user.schema";
import { CheckToken } from "./checkToken.contoller";
import { UserRegisterController } from "./Register.controller";
import { UserLoginController } from "./Login.controller";
import { UpdateUser } from "./update.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [UserLoginController,UserRegisterController,CheckToken,UpdateUser],
  providers: [UsersService],
  exports:[UsersService]
})
export class UserModule {}
