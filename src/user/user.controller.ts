import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiError } from 'src/shared/errors.types';

@Controller('user')
export class UserController {
    constructor(private readonly userSErvice: UserService) {}

    @Post()
    create(@Body() newUser: User): Promise<User> {
        return this.userSErvice.create(newUser);
    }

    @Get(':userName')
    findBy(@Param('userName') userName: string): Promise<User> {
        return this.userSErvice.findByUsername(userName);
    }

    /**
     *
     * non db functions
     */

    @Get()
    findAll(): User[] {
        return this.userSErvice.findAll();
    }

    @Get(':id')
    getById(@Param('id') id: string): User {
        return this.userSErvice.findOne(id);
    }

    @Post()
    createUser(@Body() user: User): User {
        return this.userSErvice.createUser(user);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updated: User): User | ApiError {
        return this.userSErvice.updateUser(id, updated);
    }

    @Delete(':id')
    delete(@Param('id') id: string): void {
        this.userSErvice.delete(id);
    }
}
