import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {User} from '../models/user.model';
import {QuestionService} from './question.service';
import {QuizGameService} from './quiz-game.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizzes: Quiz[];
  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private userService: UserService, private questionService: QuestionService, private quizGameService: QuizGameService) {
    this.setQuizzesFromUrl();
  }

  addQuiz(quiz: Quiz) {
    quiz.userId = this.userService.curentUser.id;
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);

    this.http.post<Quiz>(this.userService.usersUrl + this.userService.curentUser.id + '/quizzes',  quiz).subscribe(
      (res) => quiz.id = res.id,
      (err) => console.log(err)
    );
  }

  deleteQuiz(quiz: Quiz) {
    this.quizzes.splice(this.quizzes.indexOf(quiz), 1);
    this.quizzes$.next(this.quizzes);
    this.deleteQuizGamesAssociateToQuiz(quiz);
    this.deleteQuestionsAssociateToQuiz(quiz);
    this.http.delete<Quiz>(this.userService.usersUrl + this.userService.curentUser.id + '/quizzes/' + quiz.id).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  deleteQuestionsAssociateToQuiz(quiz: Quiz) {
    quiz.questions.forEach((question) => {
      this.questionService.deleteQuestionInBack(question, quiz);
    });
  }

  deleteQuizGamesAssociateToQuiz(quiz: Quiz) {
    this.quizGameService.deleteQuizGamesInBack(quiz);
  }

  setQuizzesFromUrl() {
    this.userService.setCurrentUser();
    this.http.get<User>(this.userService.usersUrl + this.userService.curentUser.id).subscribe((object) => {
      // @ts-ignore
      this.quizzes = object.quizzes;
      this.quizzes$.next(this.quizzes);
    });
  }
}
