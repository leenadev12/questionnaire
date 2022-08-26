import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { question } from '../../_models/question.model';
import { QuestionService } from '../../_services/question.service';
import { SortByTimePipe } from '../../_pipes/sort-by-time.pipe';
@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.scss'],
})
export class AnswerQuestionComponent implements OnInit, OnDestroy {
  questionList: question[] = [];

  unansweredQuestionList: question[] = [];

  changedQuestion: Subscription = new Subscription();

  constructor(
    private questionService: QuestionService,
    private sortByTimePipe: SortByTimePipe
  ) {
    this.questionList = this.questionService.getQuestionList();
    this.unansweredQuestionList = this.questionService.getQuestionList();
    this.changedQuestion = this.questionService.changedQuestions.subscribe(
      (questions: question[]) => {
        this.unansweredQuestionList = this.sortByTimePipe.transform(questions, 'createdDate');
        this.questionList = questions;
      }
    );
  }

  ngOnInit(): void {}

  onSaveAnswer(form: NgForm, index: number) {
    if (!form.valid) {
    } else {
      let updatedQuestion: any = this.unansweredQuestionList[index];
      updatedQuestion.isAnswered = true;
      updatedQuestion['answeredDate'] = new Date();
      this.questionService.updateAnswer(updatedQuestion);
    }
  }

  onRevertAnswer(index: number) {
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
      let newAnswer = this.questionList[index].answer.map(
        (element: boolean) => {
          element = element ? false : true;
        }
      );
      this.questionList[index].answer = newAnswer;
    } else {
      this.questionList[index].answer[0] = '';
    }
  }

  ngOnDestroy(): void {
    this.changedQuestion.unsubscribe();
  }
}
