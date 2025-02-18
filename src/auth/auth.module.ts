import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: '0b4b3b05713e7c4a8f951b97c1e2c7e0c5c7dfd68b92f12304fcdad32ff9719e',
            secretOrPrivateKey: '0b4b3b05713e7c4a8f951b97c1e2c7e0c5c7dfd68b92f12304fcdad32ff9719e'
        })
    ],
    providers: [AuthService, UserService, JwtService],
    controllers: [AuthController]
})
export class AuthModule {}
