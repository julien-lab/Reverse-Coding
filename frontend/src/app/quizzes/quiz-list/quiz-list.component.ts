import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {MatDialog} from '@angular/material/dialog';
import {DialogDeleteQuizComponent} from '../dialog-delete-quiz/dialog-delete-quiz.component';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  linkReturn = '/gestion';
  constructor(public quizService: QuizService, public dialog: MatDialog) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
  }

  ngOnInit() {
  }

  deleteQuiz(quiz: Quiz) {
    const dialogRef = this.dialog.open(DialogDeleteQuizComponent, {
      width: '450px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
        if ( result ) {
            console.log('Delete ', quiz);
            this.quizService.deleteQuiz(quiz);
        }
    });
  }
}
