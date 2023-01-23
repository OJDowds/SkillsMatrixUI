import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillsListComponent } from './skills-list/skills-list.component';

const routes: Routes = [
  { path: 'skills', component: SkillsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
