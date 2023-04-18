import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillsListComponent } from './skills-list/skills-list.component';
import { SkillEditComponent } from './skills-edit/skills-edit.component';

const routes: Routes = [
  { path: 'skills', component: SkillsListComponent },
  {
    path: 'skills-edit/:id',
    component: SkillEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
