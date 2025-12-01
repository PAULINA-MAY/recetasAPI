import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtAuthConfig  extends PassportStrategy(Strategy) {
    constructor(private readonly prisma: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }
    async validate(payload:{nombreCompleto:string}){
        const user = await this.prisma.usuario.findUnique({where:{nombreCompleto:payload.nombreCompleto}});
        return user;
    }
}