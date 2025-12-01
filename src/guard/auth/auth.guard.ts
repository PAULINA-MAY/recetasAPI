import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

export class JwtAuthGuard extends AuthGuard('jwt') {
     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
     }

     handleRequest<TUser = any>(err: any, usuario: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (err || !usuario) {
            throw err || new UnauthorizedException();
        }
        return usuario;
     }
}