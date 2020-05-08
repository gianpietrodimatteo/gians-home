import * as mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    lastUpdatedAt: { type: Date, default: Date.now },
    address: { type: String, required: true },
    user: { type: String, required: true },
});