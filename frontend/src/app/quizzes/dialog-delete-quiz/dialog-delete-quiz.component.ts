import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-quiz',
  templateUrl: './dialog-delete-quiz.component.html',
  styleUrls: ['./dialog-delete-quiz.component.scss']
})
export class DialogDeleteQuizComponent {

  constructor(public dialogRef: MatDialogRef<DialogDeleteQuizComponent>) { }

  back() {
      this.dialogRef.close();
  }
}
