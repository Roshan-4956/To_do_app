import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  taskArray: { taskName: string, isCompleted: boolean }[] = []
  

  constructor() {

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

  onCheck(index: number) {
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted
    console.log(this.taskArray)
  }
}
