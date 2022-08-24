import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { QuestionService } from '../../_services/question.service';
import { question } from '../../_models/question.model';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss'],
})
export class QuestionManagementComponent implements OnInit, OnDestroy {
  questionsTypes = {
    open: 'Open',
    singleSelect: 'Single Choice',
    multiSelect: 'Multiple Choice',
  };

  displayedColumns: string[] = [
    'text',
    'questionType',
    'createdDate',
    'action',
  ];

  questionData: question[] = [];

  private changedQuestions: Subscription = new Subscription();

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionData = this.questionService.getQuestionList();
    this.changedQuestions = this.questionService.changedQuestions.subscribe(
      (questions: question[]) => {
        this.questionData = questions;
      }
    );
  }

  editQuestion(index: number) {
    this.router.navigate([index, 'edit']);
  }

  deleteQuestion(index: number) {
    this.questionService.deleteQuestion(index);
  }

  ngOnDestroy(): void {
    this.changedQuestions.unsubscribe();
  }
}
