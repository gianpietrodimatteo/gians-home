import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'src/logger/logger.module';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressSchema } from './schema/address.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),
    LoggerModule
  ],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule { }
