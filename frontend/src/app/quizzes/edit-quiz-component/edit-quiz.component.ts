import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {AnswerService} from '../../../services/answer.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogAnswerQuizComponent} from '../dialog-answer/dialog-answer-quiz.component';


@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent {
  quiz: Quiz;
  quizzes: Quiz[];
  linkReturn = '/modif-quiz';
  private answerList: AnswerService;

  constructor(private route: ActivatedRoute,
              private quizService: QuizService,
              private router: Router, public dialog: MatDialog) {
    const id = +this.route.snapshot.paramMap.get('id');
    setTimeout(() => {
      this.quizService.quizzes$.subscribe((quiz) => {
        this.quizzes = quiz;
        this.quiz = this.quizzes.find((q) => q.id === id);
      });
    }, 100);
  }

  checkAnswer() {
    return true;
    for (const question of this.quiz.questions) {
      let i = 0;
      for (const answer of this.answerList.answers) {
        if (answer.questionId === question.id) {
          if (answer.isCorrect) {
            i += 1;
          }
        }
      }
      if (i !== 1) {
        return false;
      }
    }
    return true;
  }

  back() {
    if (this.checkAnswer() === true) {
      this.router.navigate(['/modif-quiz']);
    } else {
      this.dialog.open(DialogAnswerQuizComponent, {
        width: '800px',
        height: '250px',
      });
    }
  }
}
