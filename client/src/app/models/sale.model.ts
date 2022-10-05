import { Profil } from "./profil.model";

export interface Sale {
  id: number;
  title: string;
  type: string;
  message: string;
  pictureOne: string;
  pictureTwo: string;
  pictureThree: string;
  price: number;
  shipping: boolean;
  createdAt: Date;
  profilId: number;

}
