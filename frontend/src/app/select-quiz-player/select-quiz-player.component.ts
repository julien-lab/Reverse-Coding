import { Component, OnInit } from '@angular/core';
import {Quiz} from '../../models/quiz.model';
import {QuizService} from '../../services/quiz.service';
import {Player} from '../../models/player.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PlayerService} from '../../services/player.service';
import {QuizGame} from '../../models/quizgame';
import {QuizGameService} from '../../services/quiz-game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-select-quiz-player',
  templateUrl: './select-quiz-player.component.html',
  styleUrls: ['./select-quiz-player.component.scss']
})
export class SelectQuizPlayerComponent implements OnInit {
  public quizList: Quiz[];
  public quizIdSelected = 0;
  public playerList: Player[];
  public playerForm: FormGroup;
  public quizGame: QuizGame = {};
  linkReturn = '/home';
  constructor(public quizService: QuizService, private playerService: PlayerService,
              private quizGameService: QuizGameService, private router: Router,
              private formBuilder: FormBuilder) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
    this.playerService.players$.subscribe((player) => this.playerList = player);
  }

  ngOnInit() {
    this.playerForm = this.formBuilder.group({
      id: ['']
    });
  }

  rowSelected(quiz: Quiz) {
    this.quizIdSelected = quiz.id;
  }

  createQuizGame() {
    this.quizGame.quizId = this.quizIdSelected;
    const player = this.playerForm.getRawValue();
    this.quizGame.playerId = +player.id;
    this.quizGame.nbWrongAnswer = 0;
    this.quizGame.questionsFailed = [];
    this.quizGame.date = new Date();
    this.quizGame.selectedAnswers = [];
    this.quizGameService.createQuizGame(this.quizGame);
    // A améliorer (attendre tant que l'id de quizgame est undefined)
    setTimeout(() => {
      this.router.navigate(['select-quiz-player/' + this.quizGame.id]);
    }, 100);
  }
}
