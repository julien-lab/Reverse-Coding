import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer} from '../../../models/answer.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input()
  answer: Answer;

  @Output()
  answerDeleted: EventEmitter<Answer> = new EventEmitter<Answer>();

  constructor() { }

  ngOnInit() {
  }

  deleteAnswer() {
    this.answerDeleted.emit(this.answer);
  }
}
