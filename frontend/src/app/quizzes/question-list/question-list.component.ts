import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {Question} from '../../../models/question.model';
import {QuestionService} from '../../../services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  @Input()
  public quiz: Quiz;
  public questionList: Question[] = [];
  constructor(public questionService: QuestionService) {
    this.questionService.questions$.subscribe((question) => this.questionList = question);
  }

  ngOnInit() {
    this.questionService.questions = this.quiz.questions;
    this.questionService.init();
  }

  deleteQuestion(question: Question) {
    this.questionService.deleteQuestion(question, this.quiz);
  }
}
