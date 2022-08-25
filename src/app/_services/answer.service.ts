import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { question } from '../_models/question.model';
import { QuestionService } from "./question.service";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  questionList: question[] = [];

  answeredQuestion = new Subject<question[]>();

  unAnsweredQuestion = new Subject<question[]>();

  constructor(private questionService: QuestionService) {
    this.questionList = this.questionService.getQuestionList();
    this.questionService.changedQuestions.subscribe((questions: question[]) => {
      this.questionList = questions;
    })
  }

  getAnsweredQuestion() {
  }

  filterQuestion() {
    let answeredQues = this.questionList.filter((question: question) => {
      question.answeredDate?.length
    })
    this.answeredQuestion.next(answeredQues);
    let unAnsweredQues = this.questionList.filter((question: question) => {
      !question.answeredDate?.length
    })
    this.answeredQuestion.next(unAnsweredQues);
  }
}
