import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ToDoPageComponent } from './pages/to-do-page/to-do-page.component';
import { ToDoRoutingModule } from './to-do-routing.module';
import { TaskListItemComponent } from './components/task-list/task-list-item/task-list-item.component';
import { TaskService } from './services/task.service';



@NgModule({
  declarations: [
    ToDoPageComponent,
    AddTaskComponent,
    TaskListComponent,
    TaskListItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToDoRoutingModule,
  ],
  providers:[
    TaskService
  ]
})
export class ToDoModule { }
