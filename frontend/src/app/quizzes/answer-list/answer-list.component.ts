import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {AnswerService} from '../../../services/answer.service';
import {Answer} from '../../../models/answer.model';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {
  @Input()
  public question: Question;
  public answerList: Answer[] = [];

  constructor(public answerService: AnswerService) {
  }

  ngOnInit() {
    this.answerList = this.question.answers;
    this.answerService.init();
  }

  deleteAnswer(answer: Answer) {
    this.answerService.deleteAnswer(answer, this.question);
  }
}
