import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QuizGame} from '../../models/quizgame';
import {Quiz} from '../../models/quiz.model';
import {Player} from '../../models/player.model';
import {DialogResultsComponent} from '../dialog-results/dialog-results.component';
import {Question} from '../../models/question.model';
import {printLine} from 'tslint/lib/verify/lines';
import {Router} from '@angular/router';
import {DialogClueComponent} from '../dialog-clue/dialog-clue.component';
import {MatDialog} from '@angular/material';
import {Answer} from '../../models/answer.model';



@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent  implements OnChanges {
  @Input()
  private quizGames: QuizGame[];
  @Input()
  private player: Player;
  @Input()
  private quiz: Quiz;
  private mapQuestions: Map<string, number> = new Map();

  constructor(public dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.quizGames.currentValue && changes.quiz.currentValue) {
      this.quiz.questions.forEach((question) => this.mapQuestions.set(question.label, 0));
      this.quizGames.forEach((quizgame) => {
        quizgame.questionsFailed.forEach((questionFail) => {
          this.mapQuestions.set(questionFail.label, this.mapQuestions.get(questionFail.label) + 1);
        });
      });
    }


  }

  openDialogResults(wrongSelectedAnswers: Answer[], listQuestionsFailed: Question[], listAllQuestions: Question[]) {
    this.dialog.open(DialogResultsComponent, {
      width: 'auto',
      height: 'auto',
      data: { selectedAnswers: wrongSelectedAnswers, questionsFailed: listQuestionsFailed, questions: listAllQuestions }
    });
  }
}
