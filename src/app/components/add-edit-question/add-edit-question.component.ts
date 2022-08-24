import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { QuestionService } from '../../_services/question.service';

@Component({
  selector: 'app-add-edit-question',
  templateUrl: './add-edit-question.component.html',
  styleUrls: ['./add-edit-question.component.scss'],
})
export class AddEditQuestionComponent implements OnInit {
  questionOptions = new FormArray([]);

  questionForm: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required),
    questionType: new FormControl('open', Validators.required),
    options: this.questionOptions,
  });

  constructor(
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {}

  onAddOption() {
    (<FormArray>this.questionForm.get('options')).push(
      new FormGroup({
        optionText: new FormControl(null, Validators.required),
      })
    );
  }

  initForm() {
    // let questionOptions = new FormArray([]);
    // this.questionForm = new FormGroup({
    //   text: new FormControl('', Validators.required),
    //   questionType: new FormControl('', Validators.required),
    //   options: questionOptions,
    // });
  }

  onSubmit() {
    let question = this.questionForm.value;
    question['createdDate'] = new Date();
    this.questionService.addQuestion(question);
  }

  onDeleteOption(index: number) {
    (<FormArray>this.questionForm.get('options')).removeAt(index);
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  get controls() {
    return (<FormArray>this.questionForm.get('options')).controls;
  }
}
