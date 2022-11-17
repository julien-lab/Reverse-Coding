import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../models/dialogData";

@Component({
  selector: 'app-dialog-end-question',
  templateUrl: './dialog-end-question.component.html',
  styleUrls: ['./dialog-end-question.component.scss']
})
export class DialogEndQuestionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEndQuestionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  nextQuestion(): void {
    this.dialogRef.close();
  }
}
