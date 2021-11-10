import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
  title: string;
  message: string;
  type: string;
}
@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.scss']
})
export class DialogOverviewComponent implements OnInit {
  public input:string = "";
  public static readonly BACK_ACTION = "BACK";
  ngOnInit(){

  }
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      if(!data.type){
        this.data.type = "alert"
      }
    }

  onNoClick(): void {
    this.dialogRef.close(DialogOverviewComponent.BACK_ACTION);
  }


}
