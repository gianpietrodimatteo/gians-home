import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    lastUpdatedAt: { type: Date, default: Date.now },
    password: { type: String, required: true },
});