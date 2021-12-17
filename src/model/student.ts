import { Adress } from "./Adress";

export interface Student {
  id: number;
  birthday: Date;
  firstName: string;
  lastName: string;
  adress: Adress;
}
