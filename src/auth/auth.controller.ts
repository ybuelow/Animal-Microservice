import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() body: { username: string; password: string }) {
        const { username, password } = body;
        return await this.authService.register(username, password);
    }

    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
        const { username, password } = body;
        return await this.authService.login(username, password);
    }

    /**
     * Beispiel für Useguard
     * @param req
     * @returns
     */
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return this.authService.validateUser(req.user);
    }
}
