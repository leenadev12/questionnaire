import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './layout/header/header.component';
import { QuestionManagementComponent } from "./components/question-management/question-management.component";
import { AddEditQuestionComponent } from './components/add-edit-question/add-edit-question.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuestionManagementComponent,
    AddEditQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
