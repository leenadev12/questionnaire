import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './layout/header/header.component';
import { QuestionManagementComponent } from './components/question-management/question-management.component';
import { AddEditQuestionComponent } from './components/add-edit-question/add-edit-question.component';
import { AnswerQuestionComponent } from './components/answer-question/answer-question.component';
import { SortByTimePipe } from './_pipes/sort-by-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuestionManagementComponent,
    AddEditQuestionComponent,
    AnswerQuestionComponent,
    SortByTimePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [SortByTimePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
