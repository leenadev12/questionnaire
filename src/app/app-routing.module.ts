import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionManagementComponent } from './components/question-management/question-management.component';
import { AddEditQuestionComponent } from './components/add-edit-question/add-edit-question.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/question-management',
    pathMatch: 'full',
  },
  {
    path: 'home',
    redirectTo: '/question-management',
    pathMatch: 'full',
  },
  {
    path: 'question-management',
    component: QuestionManagementComponent,
  },
  {
    path: 'create',
    component: AddEditQuestionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
