import {Injectable} from '@angular/core';
import {Question} from '../models/question.model';
import {BehaviorSubject} from 'rxjs';
import {Quiz} from '../models/quiz.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {UserService} from './user.service';
import {AnswerService} from './answer.service';
import {QuizGame} from '../models/quizgame';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questions: Question[];
  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject(this.questions);
  constructor(private route: ActivatedRoute, private http: HttpClient, private userService: UserService, private answerService: AnswerService) {
  }

  init() {
    this.questions$.next(this.questions);
  }

  addQuestion(question: Question, quiz: Quiz) {
    quiz.questions.push(question);
    this.questions = quiz.questions;
    this.questions$.next(this.questions);
    this.http.post<Question>( this.userService.usersUrl + this.userService.curentUser.id + '/quizzes/' + quiz.id + '/questions',  question).subscribe(
      (res) => {
        question.id = res.id;
      },
      (err) => console.log(err)
    );
  }

  deleteQuestion(question: Question, quiz: Quiz) {
    quiz.questions.splice(this.questions.indexOf(question), 1);
    this.questions = quiz.questions;
    this.questions$.next(this.questions);
    this.deleteQuestionInBack(question, quiz);
  }

  deleteQuestionInBack(question: Question, quiz: Quiz) {
    this.deleteAnswersAssociateToQuestion(question);
    this.http.delete<Question>(this.userService.usersUrl + this.userService.curentUser.id + '/quizzes/' + quiz.id + '/questions/' + question.id).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  deleteAnswersAssociateToQuestion(question: Question) {
    question.answers.forEach((answer) => {
      this.answerService.deleteAnswerInBack(answer, question);
    });
  }

  addClue(q: Question) {
    this.http.put<Question>(this.userService.usersUrl + this.userService.curentUser.id + '/quizzes/' + q.quizId + '/questions/' + q.id, {clue: q.clue})
      .subscribe();
  }

  deleteClue(q: Question) {
    this.http.put<Question>(this.userService.usersUrl + this.userService.curentUser.id + '/quizzes/' + q.quizId + '/questions/' + q.id, {clue: q.clue})
      .subscribe();
  }
}
