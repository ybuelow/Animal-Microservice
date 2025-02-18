import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '0b4b3b05713e7c4a8f951b97c1e2c7e0c5c7dfd68b92f12304fcdad32ff9719e' //process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findByUsername(payload.username);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
