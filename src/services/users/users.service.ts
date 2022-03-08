import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";
import bcrypt from "bcrypt";
import { UserDocument, Users } from "src/schemas/user/user.schema";
@Injectable()
export class UsersService {
  salt() {
    return bcrypt.genSaltSync(2);
  }

  constructor(
    @InjectModel(Users.name) private usersModal: Model<UserDocument>
  ) {}

  async isUserExistsByEmail(email: string){
    return this.usersModal.exists({ email }) 
  }
  async isUserExistsById(id: string): Promise<boolean> {
    return this.usersModal.exists({ id }) ? true : false;
  }

  async authLogin(email:string,password:string): Promise<boolean> {
    return 
  };

  async createNewUser(payload: Users) {
    const encryptedUserPassword = await bcrypt.hash(
      payload.password,
      this.salt()
    );
    const { address, city, firstName, email, isAdmin, lastName } = payload;
    const createdNewUser = new this.usersModal({
      address,
      city,
      firstName,
      email,
      isAdmin,
      lastName,
      password: encryptedUserPassword,
    });
    return createdNewUser.save();
  }
}
