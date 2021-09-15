import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AddTaskComponent } from '../../components/add-task/add-task.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';

import { ToDoPageComponent } from './to-do-page.component';

describe('ToDoPageComponent', () => {
  let component: ToDoPageComponent;
  let fixture: ComponentFixture<ToDoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ ToDoPageComponent, AddTaskComponent, TaskListComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ToDoPageComponent);
    component = fixture.componentInstance;
  });


  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
