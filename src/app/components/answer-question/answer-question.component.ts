import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { question } from '../../_models/question.model';
import { QuestionService } from '../../_services/question.service';
import { AnswerService } from '../../_services/answer.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.scss'],
})
export class AnswerQuestionComponent implements OnInit {
  questionList: question[] = [];

  changedQuestion: Subscription = new Subscription();

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {}

  ngOnInit(): void {
    this.answerService.filterQuestion();
    this.questionList = this.questionService.getQuestionList();
    this.changedQuestion = this.questionService.changedQuestions.subscribe(
      (questions: question[]) => {
        this.questionList = questions;
      }
    );
    this.initForm();
  }

  onSaveAnswer(index: number) {
    console.log('index', this.questionList[index]);
    let updatedQuestion: any = this.questionList[index];
    updatedQuestion.isAnswered = true;
    updatedQuestion['answeredDate'] = new Date();
    this.questionService.updateQuestion(index, updatedQuestion);
  }

  onRevertAnswer(index: number) {
    console.log('index', this.questionList[index]);
    let updatedQuestion: any = this.questionList[index];
    updatedQuestion.isAnswered = false;
    if (updatedQuestion.questionType !== 'open') {
      updatedQuestion.options.forEach((option: { checked: any; }) => {
        option.checked = false;
      });
    } else {
      updatedQuestion.answer = '';
    }
    this.questionService.updateQuestion(index, updatedQuestion);
  }

  initForm() {}
}
