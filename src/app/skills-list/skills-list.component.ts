import { Component } from '@angular/core';
import { mockUserSkills } from 'src/mockdata/mock-userSkills';



@Component({
  selector: 'app-skills-list',
  templateUrl: './skills-list.component.html',
})
export class SkillsListComponent {
  pageTitle = 'Skill List';
  mockUserSkills = mockUserSkills;
}

