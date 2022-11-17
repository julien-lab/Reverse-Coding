import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../models/dialogData';

@Component({
  selector: 'app-dialog-results',
  templateUrl: './dialog-results.component.html',
  styleUrls: ['./dialog-results.component.scss']
})
export class DialogResultsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogResultsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }
}
