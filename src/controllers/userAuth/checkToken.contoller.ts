import {
  Controller,
  Headers,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/services/users/users.service";
import jwt_decode from "jwt-decode";
import { JWT_Secret } from "src/config";
@Controller("api")
export class CheckToken {
  constructor(private usersService: UsersService) {}
  @Post("/checkPromotion")
  async verifyToken(@Headers() token: any) {
   
  
   
  
    
    const decodedHeader = jwt_decode<{email:string}>(token.authorization);
   
    const {email} = decodedHeader
    
    const user = await this.usersService.authJwtToken(email)

    return user
  }
}
