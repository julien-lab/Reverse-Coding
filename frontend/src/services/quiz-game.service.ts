import { Injectable } from '@angular/core';
import {QuizGame} from '../models/quizgame';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Question} from "../models/question.model";
import {Quiz} from '../models/quiz.model';
import {Answer} from '../models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class QuizGameService {
  private quizGames: QuizGame[];
  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizGames$: BehaviorSubject<QuizGame[]> = new BehaviorSubject(this.quizGames);
  constructor(private http: HttpClient) {
    this.setQuizGamesFromUrl();
  }

  private setQuizGamesFromUrl() {
    this.http.get<QuizGame[]>('http://localhost:9428/api/quizgames').subscribe((object) => {
      this.quizGames = object;
      this.quizGames$.next(this.quizGames);
    });
  }

  createQuizGame(quizGame: QuizGame) {
    this.quizGames.push(quizGame);
    this.quizGames$.next(this.quizGames);
    this.http.post<QuizGame>('http://localhost:9428/api/quizgames' , quizGame).subscribe(
      (res) => quizGame.id = res.id,
      (err) => console.log(err)
    );
  }

  updateQuizGame(quizGameId: number, nbWA: number, questionsF: Question[], wronglySelectedAnswer: Answer[]) {
    this.http.put<QuizGame[]>('http://localhost:9428/api/quizgames/' + quizGameId , {nbWrongAnswer: nbWA, questionsFailed: questionsF, selectedAnswers: wronglySelectedAnswer} )
      .subscribe();
  }

  deleteQuizGamesInBack(quiz: Quiz) {
    const quizGamesToDelete = [];
    this.quizGames.forEach((quizgame) => {
        if (quizgame.quizId === quiz.id) {
            quizGamesToDelete.push(quizgame);
            this.http.delete<QuizGame>('http://localhost:9428/api/quizgames/' + quizgame.id).subscribe(
            (res) => console.log(res),
            (err) => console.log(err)
            );
        }
    });
    quizGamesToDelete.forEach((quizgame) => {
      this.quizGames.splice(this.quizGames.indexOf(quizgame), 1);
      this.quizGames$.next(this.quizGames);
    });
  }
}
