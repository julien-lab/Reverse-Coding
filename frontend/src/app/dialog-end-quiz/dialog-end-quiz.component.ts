import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-end-quiz',
  templateUrl: './dialog-end-quiz.component.html',
  styleUrls: ['./dialog-end-quiz.component.scss']
})
export class DialogEndQuizComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEndQuizComponent>, private router: Router) { }

  ngOnInit() {
  }
  // A ajouter si bien avancé
  // replayQuiz() {
  //   this.dialogRef.close();
  //   this.router.navigate([' ']);
  // }

  playAnotherQuiz() {
    this.router.navigate(['select-quiz-player']);
    this.dialogRef.close(true);
  }

  backHome() {
    this.dialogRef.close();
  }

  seeResults() {
    this.router.navigate(['resultats']);
    this.dialogRef.close(true);
  }
}
