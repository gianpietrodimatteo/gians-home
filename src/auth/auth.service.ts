import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const users = await this.usersService.find({ name: `${username}` });
        const user = users[1];
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}