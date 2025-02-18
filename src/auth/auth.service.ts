import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private authRepository: Repository<User>,
        private userService: UserService,
        private jwtService: JwtService
    ) {}
    saltOrRounds: number = 10;

    async register(username: string, unhashed: string): Promise<User> {
        try {
            console.log('register', username, unhashed);
            const exists = await this.userService.userCheckForRegister(username);
            if (exists) {
                throw new ConflictException('Username already exists');
            }
            const user = new User();
            user.username = username;
            user.password = await bcrypt.hash(unhashed, this.saltOrRounds);
            return this.authRepository.save(user);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async login(username: string, password: string): Promise<{ token: string }> {
        try {
            const user = await this.userService.findByUsername(username);
            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials');
            }
            console.log('JWT_SECRET:', process.env.JWT_SECRET);
            let tokenPayload = { username: user.username, sub: user.uuid };
            let token = this.jwtService.sign(tokenPayload, { secret: `${process.env.JWT_SECRET}` });

            //const token = //this.jwtService.sign({ username: user.username, sub: user.uuid });

            return { token };
        } catch (error) {
            throw error;
        }
    }

    async validateUser(payload: any): Promise<User> {
        return this.userService.findByUsername(payload.username);
    }
}
