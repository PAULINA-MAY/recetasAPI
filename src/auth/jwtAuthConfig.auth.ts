import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy,ExtractJwt } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly prisma: PrismaService, 
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt.secret'), 
        });
    }

    //valida que haya precencia del nombreCompleto en el payload del token y sea unico
    async validate(payload: { nombreCompleto: string }) {
        return this.prisma.usuario.findUnique({
            where: { nombreCompleto: payload.nombreCompleto }
        });
    
    }


}
