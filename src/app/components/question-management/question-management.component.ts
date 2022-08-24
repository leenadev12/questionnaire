import { Component, OnInit } from '@angular/core';

import { QuestionService } from '../../_services/question.service';
import { question } from '../../_models/question.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss'],
})
export class QuestionManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'text',
    'questionType',
    'createdDate',
    'action',
  ];

  questionData: question[] = [];

  private changedQuestion: Subscription = new Subscription;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionData = this.questionService.getQuestion();
    this.changedQuestion = this.questionService.changedQuestions.subscribe(
      (questions: question[]) => {
        this.questionData = questions;
      }
    );
    console.log(this.questionData);
  }
  questionsTypes = {
    open: 'Open',
    singleSelect: 'Single Choice',
    multiSelect: 'Multiple Choice',
  };

  deleteQuestion(index: number) {
    this.questionService.deleteQuestion(index);
  }
}
