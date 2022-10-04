import { Profil } from "./profil.model";

export interface User {
  id: number;
  email: string;
  password: string;
  profil: Profil;
}
