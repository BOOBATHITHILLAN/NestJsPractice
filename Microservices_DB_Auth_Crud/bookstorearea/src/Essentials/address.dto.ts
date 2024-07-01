import { IsNotEmpty } from 'class-validator';

export class AddressDTO {
  @IsNotEmpty()
  doorNumber: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  user: string;
}
