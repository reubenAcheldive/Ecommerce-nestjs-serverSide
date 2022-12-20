import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private allowedRolse: boolean[]) {}
  canActivate(context: ExecutionContext): boolean {
    const host = context.switchToHttp(),
      request = host.getRequest();
    const user = request["user"];
 

    return true;
  }

  isAllowed(userRoles: boolean[]) {
    let allowed = false;
    userRoles.forEach((role: boolean) => {
      if (!allowed && userRoles.includes(role)) {
        allowed = true;
      }
    });
    return allowed;
  }
}

