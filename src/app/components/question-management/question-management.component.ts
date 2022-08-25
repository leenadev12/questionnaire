import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { QuestionService } from '../../_services/question.service';
import { question } from '../../_models/question.model';
import { SortByTimePipe } from "../../_pipes/sort-by-time.pipe";

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
    private router: Router,
    private sortByTimePipe: SortByTimePipe
  ) {}

  ngOnInit(): void {
    this.questionData = this.questionService.getQuestionList();
    this.changedQuestions = this.questionService.changedQuestions.subscribe(
      (questions: question[]) => {
        this.questionData = questions;
      }
    );
    this.sortByTimePipe.transform(this.questionData, 'createdDate');
  }

  editQuestion(index: number) {
    this.router.navigate([index, 'edit']);
  }

  deleteQuestion(index: number) {
    this.questionService.deleteQuestion(index);
    Swal.fire(
      'Deleted!',
      'Your question has been deleted.',
      'success'
    )
  }

  confirmationPopup(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteQuestion(index);
      }
    })
  }

  ngOnDestroy(): void {
    this.changedQuestions.unsubscribe();
  }
}
