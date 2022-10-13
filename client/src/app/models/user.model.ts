import { Profil } from "./profil.model";

export interface CurrentUser {
  id: number;
  email: string;
  password: string;
}

export interface User extends CurrentUser {
  profil: Profil;
}
