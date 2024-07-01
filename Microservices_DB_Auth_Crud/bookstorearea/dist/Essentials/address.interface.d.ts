import { Document } from 'mongoose';
export interface Address extends Document {
    readonly doorNumber: string;
    readonly street: string;
    readonly country: string;
    readonly user: string;
}
