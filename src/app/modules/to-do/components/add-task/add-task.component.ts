import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  creating: boolean = false;
  @ViewChild('form') private form: NgForm;

  constructor(private readonly _formBuilder: FormBuilder,
    private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.taskForm = this.generateNewTaskForm();
  }

  private generateNewTaskForm() {
    return this._formBuilder.group({
      item: ['', [Validators.required]],
      done: [false]
    });

  }

  invalidForm() {
    return this.taskForm.invalid || (this.taskForm?.value.item.trim() === '') || this.creating;
  }

  submitAndReset() {
    if (this.taskForm.invalid)
      return


    this.creating = true;
    this.taskForm.disable();
    const newTask = new Task(this.taskForm.value.item, this.taskForm.value.done);
    this.taskService.create(newTask).pipe(take(1)).subscribe(() => {
      this.taskForm.controls.item.enable();
      this.creating = false;
      this.resetForm();

    });

  }

  teste(e:any){
    console.log(e)
  }
  private resetForm() {
    this.form.resetForm();
  }


}
