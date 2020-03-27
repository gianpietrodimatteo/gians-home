import { Document } from 'mongoose';
import { BaseEntity } from "src/common/domain/base-entity.interface";

export class User implements BaseEntity {
    name: string;
    password: string;
    lastUpdatedAt: Date;

    constructor(data?: any) {
        this.name = data ? data.name : null;
        this.lastUpdatedAt = data ? data.lastUpdatedAt : null;
        this.password = data ? data.password : null;
    }
}

export interface UserModel extends User, Document { }
