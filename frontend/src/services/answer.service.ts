import {Injectable} from '@angular/core';
import {Question} from '../models/question.model';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Answer} from '../models/answer.model';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  answers: Answer[];
  answers$: BehaviorSubject<Answer[]> = new BehaviorSubject(this.answers);

  constructor(private route: ActivatedRoute, private http: HttpClient, private userService: UserService) {
  }

  init() {
    this.answers$.next(this.answers);
  }

  deleteAnswer(answer: Answer, question: Question) {
    this.answers = question.answers;
    question.answers.splice(this.answers.indexOf(answer), 1);
    this.answers$.next(this.answers);
    this.deleteAnswerInBack(answer, question);
  }

  deleteAnswerInBack(answer: Answer, question: Question) {
    this.http.delete<Answer>(this.userService.usersUrl + this.userService.curentUser.id + '/quizzes/' + question.quizId + '/questions/' + question.id + '/answers/' + answer.id).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  addAnswer(answer: Answer, question: Question) {
    question.answers.push(answer);
    this.answers = question.answers;
    this.answers$.next(this.answers);
    this.http.post<Answer>( this.userService.usersUrl + this.userService.curentUser.id + '/quizzes/' + question.quizId + '/questions/' + question.id + '/answers',  answer).subscribe(
      (res) => {
        answer.id = res.id;
      },
      (err) => console.log(err)
    );
  }
}
