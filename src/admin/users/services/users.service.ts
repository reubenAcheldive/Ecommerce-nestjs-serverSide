import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument, Users } from "src/schemas/user/user.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModal: Model<UserDocument>
  ) {}
  async getAllUsers() {
    const getUsers = await this.usersModal.find({}).select("-password");

    return getUsers;
  }
  async deleteUser(id: string) {
    const deleteUser = await this.usersModal.deleteOne({ _id: id });
    return deleteUser;
  }
  async changeUserRoll(id: string, isAdmin: boolean) {
    return await (
      await this.usersModal.findByIdAndUpdate(id, { isAdmin }, { new: true })
    ).save();
  }
}

