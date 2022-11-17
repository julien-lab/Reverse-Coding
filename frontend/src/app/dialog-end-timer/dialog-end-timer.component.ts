import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../models/dialogData";

@Component({
  selector: 'app-dialog-end-timer',
  templateUrl: './dialog-end-timer.component.html',
  styleUrls: ['./dialog-end-timer.component.scss']
})
export class DialogEndTimerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEndTimerComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  nextQuestion(): void {
    this.dialogRef.close();
  }

}
