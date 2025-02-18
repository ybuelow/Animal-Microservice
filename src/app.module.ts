import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import config from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AnimalController } from './animal/animal.controller';
import { AnimalService } from './animal/animal.service';
import { AnimalModule } from './animal/animal.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forRoot(config),
        UserModule,
        AuthModule,
        AnimalModule,
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: '0b4b3b05713e7c4a8f951b97c1e2c7e0c5c7dfd68b92f12304fcdad32ff9719e',
            secretOrPrivateKey: '0b4b3b05713e7c4a8f951b97c1e2c7e0c5c7dfd68b92f12304fcdad32ff9719e'
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
