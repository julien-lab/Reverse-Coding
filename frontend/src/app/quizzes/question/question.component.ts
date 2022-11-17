import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../models/question.model';
import {QuestionService} from '../../../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Output()
  questionDeleted: EventEmitter<Question> = new EventEmitter<Question>();

  clueValue = '';

  constructor(public questionService: QuestionService) {
  }

  ngOnInit() {
  }

  deleteQuestion() {
    this.questionDeleted.emit(this.question);
  }

  addClue(q: Question) {
    if (this.clueValue !== '') {
      q.clue = this.clueValue;
      this.questionService.addClue(q);
    }
  }

  deleteClue(q: Question) {
    q.clue = 'Pas d\'indice pour cette question.';
    this.questionService.deleteClue(q);
  }
}
