
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyLogger } from 'src/logger/my-logger.service';
import { User, UserModel } from './domain/user';
import { UserDto } from './dto/user.dto';


@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor(
        @InjectModel('User') private model: Model<UserModel>,
        private logger: MyLogger
    ) {
        this.logger.setContext('UsersService');
    }

    async create(dto: UserDto): Promise<User> {
        this.logger.log('Adding a new user: ' + dto.name);
        const entity = new User(dto);

        const model = this.model;
        return model.init().then(() => {
            return model.create(entity);
        });
    }

    async find(query) {
        this.logger.log('Fetching users: ' + query);
        return this.model.find(query).exec();
    }

    async update(query, dto: UserDto) {
        if (query === null)
            query = { name: `${dto.name}` };
        this.logger.log('Updating user: ' + query);
        return this.model.findOneAndUpdate(query, dto);
    }

    async remove(query) {
        this.logger.log('Deleting user: ' + query);
        return this.model.findOneAndDelete(query);
    }
}