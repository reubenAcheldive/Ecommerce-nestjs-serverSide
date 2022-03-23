import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { UserDocument, Users } from "src/schemas/user/user.schema";
import * as jwt from "jsonwebtoken";
import { JWT_Secret } from "src/config";
@Injectable()
export class UsersService {
  salt = bcrypt?.genSaltSync(2);

  constructor(
    @InjectModel(Users.name) private usersModal: Model<UserDocument>
  ) {}

  async createJwtToken(email, roles: boolean) {
    const authJwtToken = jwt.sign({ email, roles }, JWT_Secret);

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

    const authJwtToken = await this.createJwtToken(email, isAdmin);
    console.log(authJwtToken);

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
    console.log(payload);

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

  async authJwtToken(emailFromTheUser: string) {
    const findUser = await this.usersModal.find({
      email: emailFromTheUser,
    });
    if (!findUser)
      throw new UnauthorizedException({
        message: "Incorrect password / username",
        status: false,
      });

    const { email, firstName, lastName, isAdmin, _id } = findUser[0];

    const authJwtToken = await this.createJwtToken(email, isAdmin);
    console.log(authJwtToken);

    return {
      email,
      firstName,
      lastName,
      isAdmin,
      userId: String(_id),
      jwt: authJwtToken,
    };
  }
}
