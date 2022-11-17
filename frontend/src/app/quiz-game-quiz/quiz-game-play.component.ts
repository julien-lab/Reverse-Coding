import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {Answer} from '../../models/answer.model';
import {Question} from '../../models/question.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizGameService} from '../../services/quiz-game.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogEndQuizComponent} from '../dialog-end-quiz/dialog-end-quiz.component';
import {DialogEndQuestionComponent} from '../dialog-end-question/dialog-end-question.component';
import {DialogEndTimerComponent} from '../dialog-end-timer/dialog-end-timer.component';
import {DialogClueComponent} from '../dialog-clue/dialog-clue.component';

@Component({
  selector: 'app-quiz-game-quiz',
  templateUrl: './quiz-game-play.component.html',
  styleUrls: ['./quiz-game-play.component.scss']
})

export class QuizGamePlayComponent implements OnChanges {

  @Input()
  public quizPlayed: Quiz;
  public currentQuestion: Question;
  private answersClone: Answer[];
  private quizGameId: number;
  public indiceCurrentQuestion = 0;
  public nbWrongAnswers = 0;
  public questionsFailed = [];
  public selectedAnswers = [];
  private timer;

  constructor(private route: ActivatedRoute, private quizGameService: QuizGameService, public dialog: MatDialog,
              private router: Router) {
    this.quizGameId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.quizPlayed.currentValue) {
      this.currentQuestion = this.quizPlayed.questions[this.indiceCurrentQuestion];
      this.cloneAnswersOfCurQuestion(this.currentQuestion.answers);
      const correctAnswer = this.currentQuestion.answers.find((a) => a.isCorrect === true );
      this.startTimer(correctAnswer);
    }
  }

  private afterCloseDialog(dialogRef: MatDialogRef<DialogEndTimerComponent, any>) {
      dialogRef.afterClosed().subscribe(result => {
        if ( this.indiceCurrentQuestion + 1 < this.quizPlayed.questions.length) {
          this.currentQuestion = this.quizPlayed.questions[++this.indiceCurrentQuestion];
          this.cloneAnswersOfCurQuestion(this.currentQuestion.answers);
          const correctAnswer = this.currentQuestion.answers.find((answer) => answer.isCorrect === true );
          this.startTimer(correctAnswer);
        } else {
          this.openDialogEndQuiz();
          this.quizGameService.updateQuizGame(this.quizGameId, this.nbWrongAnswers, this.questionsFailed, this.selectedAnswers);
        }
      });
  }

  private cloneAnswersOfCurQuestion(answers: Answer[]) {
    this.answersClone = [];
    answers.forEach((a) => {
      this.answersClone.push(a);
    });
  }

  isCorrect(answer: Answer) {
    this.saveAnswerSelected(answer);
    if (answer.isCorrect) {
      this.stopTimer();
      this.openDialogEndQuestion(answer);
    } else {
      this.saveLogs();
      this.answersClone.splice(this.answersClone.indexOf(answer), 1);
    }
  }

  private saveAnswerSelected(answer: Answer) {
    this.selectedAnswers.push(answer);
  }

  private saveLogs() {
    ++this.nbWrongAnswers;
    if (!this.questionsFailed.find((q) => q.id === this.currentQuestion.id)) {
      this.questionsFailed.push(this.currentQuestion);
    }
  }

  private startTimer(correctAnswer: Answer) {
    this.timer = setTimeout(() => {
      this.openDialogEndTimer(correctAnswer);
    }, this.currentQuestion.timer * 1000);
  }

  private stopTimer() {
    clearTimeout(this.timer);
  }

  openDialogEndQuiz(): void {
    const dialogRef = this.dialog.open(DialogEndQuizComponent, {
      width: '900px',
      height: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( !result) {
        this.router.navigate([' ']);
      }
    });
  }

  private openDialogEndQuestion(a: Answer) {
    const dialogRef = this.dialog.open(DialogEndQuestionComponent, {
      width: '900px',
      height: '250px',
      data: {answer: a}
    });

    this.afterCloseDialog(dialogRef);
  }

  private openDialogEndTimer(a: Answer) {
    const dialogRef = this.dialog.open(DialogEndTimerComponent, {
      width: '900px',
      height: '250px',
      data: {answer: a}
    });
    this.saveLogs();
    this.afterCloseDialog(dialogRef);
  }

  openDialogClue() {
    this.dialog.open(DialogClueComponent, {
      width: '800px',
      height: '250px',
      data: {clue: this.currentQuestion.clue}
    });
  }
}
