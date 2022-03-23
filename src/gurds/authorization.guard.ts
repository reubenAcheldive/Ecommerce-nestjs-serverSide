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
    const allowed = this.isAllowed(user.isAdmin);
    console.log("user is allowed", allowed);
    if (!allowed) {
      console.log(
        "user is authentication but not unauthorized denynig access "
      );
      throw new ForbiddenException();
    }
    console.log("user is authorization allowedid access");
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
