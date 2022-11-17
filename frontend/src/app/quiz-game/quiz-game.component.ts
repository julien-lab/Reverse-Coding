import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuizGameService} from '../../services/quiz-game.service';
import {QuizGame} from '../../models/quizgame';
import {QuizService} from '../../services/quiz.service';
import {Quiz} from '../../models/quiz.model';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.scss']
})
export class QuizGameComponent {
  quizGame: QuizGame;
  quizPlayed: Quiz;
  constructor(private route: ActivatedRoute,
              private quizGameService: QuizGameService, private quizService: QuizService) {
    const quizGameId = +this.route.snapshot.paramMap.get('id');
    this.quizGameService.quizGames$.subscribe((quizGames) => {
        this.quizGame = quizGames.find((q) => q.id === quizGameId);
        this.quizService.quizzes$.subscribe((quizzes) => {
            this.quizPlayed = quizzes.find((q) => q.id === this.quizGame.quizId);
            console.log(this.quizPlayed);
        });
    });
  }

}
