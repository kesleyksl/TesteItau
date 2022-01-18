import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TaskService } from '../../services/task.service';

import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let service: TaskService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ TaskListComponent ],
      providers: [TaskService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TaskService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`${TaskListComponent.name} should call service when init`, ()=>{
      spyOn(service, 'getAll');
      fixture.detectChanges();
      expect(service.getAll).toHaveBeenCalled();
  });
});
