import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthResponse } from "./Interface/Auth.interface";

@Injectable()
export class ClientGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const host = context.switchToHttp(),
      Request = host.getRequest();

    const isClient = Request["user"] as AuthResponse;
 

    if (!isClient.isAdmin) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}

