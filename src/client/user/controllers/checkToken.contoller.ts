import { Controller, Headers, Post, UseGuards } from "@nestjs/common";

import jwt_decode from "jwt-decode";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { UsersService } from "../service/users.service";

@Controller("api/users")
@UseGuards(AuthenticationGuard)
export class CheckToken {
  constructor(private usersService: UsersService) {}
  @Post("/checkPromotion")
  async verifyToken(@Headers() token: any) {
    const decodedHeader = jwt_decode<{ _id: string }>(token.authorization);
    
    
    const { _id } = decodedHeader 
    
    
    const user = await this.usersService.authJwtToken(_id);
    
    
    return user;
  }
}
 

