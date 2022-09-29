import { Sale } from "./sale.model";

export interface AddProfilDto {
  id: number;
  name: string;
  race: string;
  description: string;
  picture: string;
  birthday: Date;
  phone: number;
  // level: Level;
}
