import { IUserSkill } from 'src/interfaces/userSkill';
import { mockSkills, mockUsers } from 'src/mockdata/mock-data';

export const mockUserSkills: IUserSkill[] = [
  { id: 1, skill: mockSkills[0], user: mockUsers[0], experienceLevel: 5 },
  { id: 2, skill: mockSkills[1], user: mockUsers[1], experienceLevel: 3 },
  { id: 3, skill: mockSkills[2], user: mockUsers[2], experienceLevel: 2 },
];