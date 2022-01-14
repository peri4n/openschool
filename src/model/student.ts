import { Adress } from "./Adress";

export interface Student {
  id: number;
  birthday: Date;
  first: string;
  last: string;
  adress: Adress;
}
