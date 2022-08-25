import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { question } from 'src/app/_models/question.model';

import { QuestionService } from '../../_services/question.service';

@Component({
  selector: 'app-add-edit-question',
  templateUrl: './add-edit-question.component.html',
  styleUrls: ['./add-edit-question.component.scss'],
})
export class AddEditQuestionComponent implements OnInit {
  questionOptions = new FormArray([], Validators.minLength(2));

  questionForm: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required),
    questionType: new FormControl('open', Validators.required),
    options: this.questionOptions,
  });

  question: question | undefined;

  editMode: boolean = false;

  id!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onAddOption() {
    (<FormArray>this.questionForm.get('options')).push(
      new FormGroup({
        optionText: new FormControl(null, Validators.required),
      })
    );
  }

  initForm() {
    if (this.editMode) {
      this.question = this.questionService.getQuestion(this.id);
      this.questionForm.patchValue({
        text: this.question.text,
        questionType: this.question.questionType,
      });
      if (this.question['options']) {
        for (let option of this.question.options) {
          (<FormArray>this.questionForm.get('options')).push(
            new FormGroup({
              optionText: new FormControl(
                option.optionText,
                Validators.required
              ),
            })
          );
        }
      }
    }
  }

  onSubmit() {
    console.log(this.questionForm.value);

    let newQuestion = this.questionForm.value;
    if (!this.editMode) {
      newQuestion['createdDate'] = new Date();
      newQuestion['isAnswered'] = false;
      this.questionService.addQuestion(newQuestion);
    } else {
      newQuestion['createdDate'] = this.question?.createdDate;
      this.questionService.updateQuestion(this.id, newQuestion);
    }
    this.cancel();
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
