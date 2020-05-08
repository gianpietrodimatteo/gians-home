import { IsNotEmpty, IsIP } from 'class-validator';


export class AddressDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsIP()
    address: string;

    @IsNotEmpty()
    user: string;
}