import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TaskService } from '../../services/task.service';
import { ToDoModule } from '../../to-do.module';
import { AddTaskComponent } from './add-task.component';


describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, ToDoModule],
      declarations: [ AddTaskComponent ],
      providers: [TaskService]
       
    })
    .compileComponents();
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
