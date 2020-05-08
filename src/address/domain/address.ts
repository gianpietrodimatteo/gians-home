import { Document } from 'mongoose';
import { BaseEntity } from 'src/common/domain/base-entity.interface';

export class Address implements BaseEntity {
    name: string;
    lastUpdatedAt: Date;
    address: string;
    user: string;

    constructor(data?: any) {
        this.name = data && data.name || null;
        this.lastUpdatedAt = data && data.lastUpdatedAt || null;
        this.address = data && data.address || null;
        this.user = data && data.user || null;
    }
}

export interface AddressModel extends Address, Document { }
