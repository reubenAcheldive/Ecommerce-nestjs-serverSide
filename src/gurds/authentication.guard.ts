import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthenticationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const host = context.switchToHttp(),
      Request = host.getRequest();

    const user = Request["user"];

    console.log(user);

    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    return true;
  }
}
