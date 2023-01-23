import { ISkill } from "src/interfaces/skill";
import { IUser } from "src/interfaces/user";




export const mockSkills: ISkill[] = [
  { id: 1, skillName: 'JavaScript', skillCategory: 'Programming' },
  { id: 2, skillName: 'CSS', skillCategory: 'Design' },
  { id: 3, skillName: 'Angular', skillCategory: 'Framework' },
];

export const mockUsers: IUser[] = [
  { id: 1, userName: 'John Smith', description: 'Full Stack developer' },
  { id: 2, userName: 'Jane Doe', description: 'Front-end developer' },
  { id: 3, userName: 'Bob Ross', description: 'Back-end developer' },
];

