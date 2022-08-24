import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { question } from "../_models/question.model";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  questions: question[] = [];
  changedQuestions = new Subject<question[]>();
  constructor() {}

  getQuestion() {
    let temp = localStorage.getItem("questions");
    if (!temp) {
      localStorage.setItem("questions", '{}');
    } else {
      this.questions = JSON.parse(localStorage.getItem("questions") || '{}');
    }
    this.changedQuestions.next(this.questions.slice());
    return this.questions;
  }
  addQuestion(question: question) {
    this.questions.push(question)
    // localStorage.setItem("questions", JSON.stringify(this.questions))
    this.saveData();
    this.changedQuestions.next(this.questions.slice());
  }
  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
    // localStorage.setItem("questions", JSON.stringify(this.questions))
    this.saveData();
    this.changedQuestions.next(this.questions.slice());
    // return this.questions;
  }

  saveData() {
    localStorage.setItem("questions", JSON.stringify(this.questions))
  }
}
