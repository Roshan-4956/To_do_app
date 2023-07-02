import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop'
// import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {

  taskArray: { taskName: string, isCompleted: boolean }[] = []
  

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    console.log(form)
    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false
    })

    form.reset()
  }

  onDelete(index: number) {
    console.log(index)
    this.taskArray.splice(index, 1)
  }
  onEdit(index: number) {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {task: ""},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if(result.task !== "")
      this.taskArray[index].taskName= result.task;
    });
  }
  

  onCheck(index: number) {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted
    console.log(this.taskArray)
  }

  drop(event: CdkDragDrop<{ taskName: string, isCompleted: boolean }[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {task:string},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}