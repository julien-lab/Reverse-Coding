import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../../models/dialogData';

@Component({
  selector: 'app-dialog-clue',
  templateUrl: './dialog-clue.component.html',
  styleUrls: ['./dialog-clue.component.scss']
})
export class DialogClueComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogClueComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

}
