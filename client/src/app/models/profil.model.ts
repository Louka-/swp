import { Sale } from "./sale.model";

export interface Profil {
  id: number;
  name: string;
  race: string;
  description: string;
  picture: string;
  birthday: Date;
  phone: string;
  city: string;
  sales: Sale[];
  // level: Level;
}
