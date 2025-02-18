import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { error } from 'console';
import { ApiError } from 'src/shared/errors.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    saltOrRounds: number = 10;
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async register(username: string, unhashedPassword: string): Promise<User> {
        console.log('register', username);
        const exists = await this.userRepository.findOne({
            where: { username: username }
        });
        if (exists) {
            throw new ConflictException('Username already exists');
        }
        const user = new User();
        user.username = username;
        user.password = await bcrypt.hash(unhashedPassword, this.saltOrRounds);
        return this.userRepository.save(user);
    }

    create(newUser: User): Promise<User> {
        try {
            const user = new User();
            user.username = newUser.username;
            user.password = newUser.password;
            return this.userRepository.save(user);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findByUsername(username: string): Promise<User> {
        try {
            console.log('Findbyusername', username);
            const user = await this.userRepository.findOne({
                where: { username: username }
            });
            if (user == undefined || user == null) {
                throw new NotFoundException(`User with id ${username} not found`);
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    async userCheckForRegister(username: string): Promise<boolean> {
        try {
            const user = await this.userRepository.findOne({
                where: { username: username }
            });
            if (user == undefined || user == null) {
                return false;
            }
            return true;
        } catch (error) {
            throw error;
        }
    }

    /*____-------------------------------------------------------------------- without db*/
    private users: User[] = [];
    private idCounter = 1;

    findAll(): User[] {
        return this.users;
    }
    findOne(id: string): User {
        try {
            const user = this.users.find((user) => user.uuid === id);
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    createUser(user: User): User {
        // user.id = this.idCounter++;
        this.users.push(user);
        return user;
    }
    updateUser(id: string, newUser: User): User | ApiError {
        try {
            const user = this.users.find((user) => user.uuid === id);
            if (!user) {
                throw new error(`No user found with id:${id}`);
            }
            Object.assign(user, newUser);
            return user;
        } catch (error) {
            return error;
        }
    }
    delete(id: string): void {
        this.users = this.users.filter((user) => user.uuid !== id);
    }
}
