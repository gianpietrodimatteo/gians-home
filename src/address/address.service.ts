import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyLogger } from 'src/logger/my-logger.service';
import { Address, AddressModel } from './domain/address';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {
    constructor(
        @InjectModel('Address') private model: Model<AddressModel>,
        private logger: MyLogger
    ) {
        this.logger.setContext('AddressService');
    }

    async create(dto: AddressDto): Promise<Address> {
        this.logger.log('Adding a new address: ' + dto.name);
        const entity = new Address(dto);

        const model = this.model;
        return model.init().then(() => {
            return model.create(entity);
        });
    }

    async find(query) {
        this.logger.log('Fetching addresses: ' + query);
        return this.model.find(query).exec();
    }

    async update(query, dto: AddressDto) {
        if (query === null)
            query = { name: `${dto.name}` };
        this.logger.log('Updating address: ' + query);
        return this.model.findOneAndUpdate(query, dto);
    }

    async remove(query) {
        this.logger.log('Deleting address: ' + query);
        return this.model.findOneAndDelete(query);
    }

}



