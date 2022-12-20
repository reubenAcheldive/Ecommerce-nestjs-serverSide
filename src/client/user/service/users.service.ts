import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { UserDocument, Users } from "src/schemas/user/user.schema";
import * as jwt from "jsonwebtoken";
import { JWT_Secret } from "src/config";
import { ChangePersonalDetails } from "src/dtos/usersAuth/changePersonalDetails";

@Injectable()
export class UsersService {
  salt = bcrypt?.genSaltSync(2);

  constructor(
    @InjectModel(Users.name) private usersModal: Model<UserDocument>
  ) {}

  async createJwtToken({ _id }: { _id: string }) {
    const authJwtToken = jwt.sign({ _id }, JWT_Secret, { expiresIn: "1h" });

    return authJwtToken;
  }

  async isUserExistsByEmail(email: string) {
    return this.usersModal.exists({ email });
  }
  async isUserExistsByCardId(idCard: number): Promise<any> {
    return this.usersModal.find({ id: 3 });
  }

  async authLogin(emailFromTheUser: string, passwordFromTheUser: string) {
    const findUser = await this.usersModal.find({
      email: emailFromTheUser,
    });
    if (!findUser)
      throw new UnauthorizedException({
        message: "Incorrect password / username",
        status: false,
      });

    const { password, email, firstName, lastName, isAdmin, _id } = findUser[0];

    const passwordMatch = await bcrypt?.compare(
      passwordFromTheUser,
      String(password)
    );
    if (!passwordMatch)
      throw new UnauthorizedException({
        message: "The user and password don't match",
        status: false,
      });

    const authJwtToken = await this.createJwtToken({ _id: _id.toString() });

    return {
      email,
      firstName,
      lastName,
      isAdmin,
      userId: String(_id),
      jwt: authJwtToken,
    };
  }
  async getAllUserInformation(email: string) {
    return this.usersModal.find({ email });
  }

  async createNewUser(payload: Users) {
    const encryptedUserPassword = await bcrypt.hash(
      payload.password,
      this.salt
    );

    const { firstName, email, lastName, id } = payload;
    const createdNewUser = new this.usersModal({
      firstName,
      email,
      id,
      isAdmin: false,
      lastName,
      password: encryptedUserPassword,
    });
    return await createdNewUser.save();
  }

  async authJwtToken(id: string) {
    const findUser = await this.usersModal.findOne({
      _id:id,
    });
 
    
    if (!findUser)
      throw new UnauthorizedException({
        message: "Incorrect password / username",
        status: false,
      });

    const { email, firstName, lastName, isAdmin, _id } = findUser;

    const authJwtToken = await this.createJwtToken({ _id: _id.toString() });

    return {
      email,
      firstName,
      lastName,
      isAdmin,
      userId: String(_id),
      jwt: authJwtToken,
    };
  }

  async updateUserInfo({ _id, firstName, lastName }: ChangePersonalDetails) {
    await this.usersModal.findOneAndUpdate(
      { _id },

      {
        firstName,
        lastName,
      }
    );
    const user = await this.usersModal.findById({ _id });

    return {
      firstName,
      lastName,
      isAdmin: false,
      userId: String(_id),
      jwt: await this.createJwtToken({ _id: user._id.toString() }),
      email: user.email,
    };
  }
  async findUserById(id: string) {
    return await this.usersModal.findOne({ _id: id });
  }
}
//"address"

