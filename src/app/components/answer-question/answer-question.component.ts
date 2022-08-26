import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { question } from '../../_models/question.model';
import { QuestionService } from '../../_services/question.service';
import { AnswerService } from '../../_services/answer.service';
import { NgForm } from '@angular/forms';

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
  ) {
    this.questionList = this.questionService.getQuestionList();
    this.changedQuestion = this.questionService.changedQuestions.subscribe(
      (questions: question[]) => {
        this.questionList = questions;
      }
    );
  }

  ngOnInit(): void {
    this.answerService.filterQuestion();
  }

  onSaveAnswer(form: NgForm, index: number) {
    if (!form.valid) {
      console.log(form);
    } else {
      console.log('index', this.questionList[index]);
      let updatedQuestion: any = this.questionList[index];
      updatedQuestion.isAnswered = true;
      updatedQuestion['answeredDate'] = new Date();
      this.questionService.updateAnswer(updatedQuestion);
    }
  }

  onRevertAnswer(index: number) {
    console.log('index', this.questionList[index]);
    let updatedQuestion: any = this.questionList[index];
    updatedQuestion.isAnswered = false;
    if (updatedQuestion.questionType !== 'open') {
      let newAnswer = updatedQuestion.answer.map((element: boolean) => {
        element = element ? false : true;
      });
      updatedQuestion.answer = newAnswer;
    } else {
      updatedQuestion.answer[0] = '';
    }
    this.questionService.updateAnswer(updatedQuestion);
  }

  getValidAnswer(index: number) {
    let test = this.questionList[index].answer.some(
      (element) => element === true
    );
    return test;
  }

  clearForm(index: number) {
    if (this.questionList[index].questionType !== 'open') {
      let newAnswer = this.questionList[index].answer.map((element: boolean) => {
        element = element ? false : true;
      });
      this.questionList[index].answer = newAnswer;
    } else {
      this.questionList[index].answer[0] = '';
    }
  }
}
