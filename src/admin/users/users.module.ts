import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
 
import { Users, UsersSchema } from "src/schemas/user/user.schema";
import { UsersController } from "./controller/users.controller";
import { UsersService } from "./services/users.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

