import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Question} from '../../../models/question.model';
import {AnswerService} from '../../../services/answer.service';
import {Answer} from '../../../models/answer.model';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss']
})
export class AnswerFormComponent implements OnInit {
  @Input()
  public question: Question;
  public answerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public answerService: AnswerService) {
    this.initialiazeAnswerForm();
  }

  ngOnInit() {
  }

  private initialiazeAnswerForm() {
    this.answerForm = this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }

  addAnswer() {
    const answerToCreate: Answer = this.answerForm.getRawValue() as Answer;
    if ( answerToCreate.isCorrect === null) {
      answerToCreate.isCorrect = false;
    }
    this.answerForm.reset();
    this.answerService.addAnswer(answerToCreate, this.question);
  }

}
