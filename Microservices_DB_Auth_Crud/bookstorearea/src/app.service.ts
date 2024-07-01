import { Injectable } from '@nestjs/common';
import { Address } from './Essentials/address.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressDTO } from './Essentials/address.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel('Address') private AddressModel: Model<Address>) {}
  async newAddress(data: AddressDTO) {
    const exist = await this.AddressModel.findOne({ user: data.user });
    if (exist && data.user === exist.user) {
      return 'Same address exist';
    }
    else{
      const address = new this.AddressModel(data);
      return await address.save();
    }
  }
}
