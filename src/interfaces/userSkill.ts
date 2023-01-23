import { ISkill } from "./skill";
import { IUser } from "./user";


export interface IUserSkill {
  id: number;
  skill: ISkill;
  user: IUser;
  experienceLevel: number;
}