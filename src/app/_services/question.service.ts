import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { question } from '../_models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  questions: question[] = [];
  changedQuestions = new Subject<question[]>();
  constructor() {}

  getQuestionList() {
    let temp = localStorage.getItem('questions');
    if (!temp) {
      localStorage.setItem('questions', '[]');
    } else {
      this.questions = JSON.parse(localStorage.getItem('questions') || '{}');
    }
    this.changedQuestions.next(this.questions.slice());
    return this.questions;
  }

  addQuestion(question: question) {
    this.questions.push(question);
    this.saveData();
    this.changedQuestions.next(this.questions.slice());
  }

  updateQuestion(index: number, question: question) {
    this.questions.splice(index, 1, question);
    this.saveData();
    this.changedQuestions.next(this.questions.slice());
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
    this.saveData();
    this.changedQuestions.next(this.questions.slice());
  }

  updateAnswer(revertQuestion: question) {
    let index = this.questions.findIndex(
      (question: question) =>
        question.createdDate === revertQuestion.createdDate
    );
    this.updateQuestion(index, revertQuestion);
  }

  getQuestion(id: number) {
    return this.questions[id];
  }

  saveData() {
    localStorage.setItem('questions', JSON.stringify(this.questions));
  }
}
