import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        console.log(data);
        
        const request = ctx.switchToHttp().getRequest();
        const user = request.body.firstName;
        console.log(user);
        
        return user?.[user];
    }
);