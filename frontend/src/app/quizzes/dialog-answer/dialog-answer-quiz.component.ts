import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-answer-quiz',
  templateUrl: './dialog-answer-quiz.component.html',
  styleUrls: ['./dialog-answer-quiz.component.scss']
})
export class DialogAnswerQuizComponent {

  constructor(public dialogRef: MatDialogRef<DialogAnswerQuizComponent>) { }

  back() {
    this.dialogRef.close();
  }
}
