import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { MyLogger } from 'src/logger/my-logger.service';
import { AddressService } from './address.service';
import { AddressDto } from './dto/address.dto';

@Controller('address')
export class AddressController {
    constructor(
        private readonly service: AddressService,
        private logger: MyLogger
    ) {
        this.logger.setContext('AddressService');
    }

    @Post()
    async create(@Body() dto: AddressDto) {
        this.logger.log('Request to create a new address ' + dto.name)
        await this.service.create(dto);
    }

    @Get()
    async read(@Query() params) {
        this.logger.log('Request to fetch an/some address(es) ' + params)
        return this.service.find(params);
    }

    @Put()
    async update(@Query() params, @Body() dto: AddressDto) {
        this.logger.log('Request to update an address ' + params ? params : dto.name)
        await this.service.update(params, dto);
    }

    @Delete()
    async delete(@Query() params) {
        this.logger.log('Request to delete an address ' + params)
        await this.service.remove(params)
    }

}
