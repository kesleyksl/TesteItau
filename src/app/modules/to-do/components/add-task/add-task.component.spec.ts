import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, of } from 'rxjs';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { ToDoModule } from '../../to-do.module';
import { AddTaskComponent } from './add-task.component';

function mockReponse() {
  return new Task('teste');
}
describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let service: TaskService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule, HttpClientModule],
      declarations: [AddTaskComponent],
      providers: [TaskService]

    })
      .compileComponents();
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TaskService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#${AddTaskComponent.name} should has form when created`, () => {
    fixture.detectChanges();
    expect(component.taskForm).toBeTruthy();
  });

  it(`#${AddTaskComponent.prototype.invalidForm.name} should return true when form is empty`, () => {
    fixture.detectChanges();
    expect(component.invalidForm()).toBe(true);
  });

  it(`#${AddTaskComponent.prototype.invalidForm.name} should return false when form is completelly full`, () => {
    fixture.detectChanges();
    component.taskForm.controls.item.setValue('teste');
    expect(component.invalidForm()).toBe(false);
  });

  it(`#${AddTaskComponent.prototype.submitAndReset.name} should not submit form when form is invalid`, () => {
    spyOn(component, 'submitAndReset')
    fixture.detectChanges();
    const response = component.submitAndReset();
    expect(response).toBeFalsy();
  });

  it(`#${AddTaskComponent.prototype.submitAndReset.name} should reset form when submit form`, fakeAsync(() => {
    spyOn(service, 'create')
      .and.returnValue(of(mockReponse()));

    fixture.detectChanges();
    component.taskForm.controls.item.setValue('teste');
    component.submitAndReset();
    tick(1000);

    expect(component.taskForm.controls.item.value).toBe(null);

  }));

  it(`(D) Should submit button be disabled when form is invalid`, ()=>{
    fixture.detectChanges();

    const submitButton: HTMLElement = fixture.nativeElement.querySelector('.form__button--submit');
    const disabled = submitButton.getAttribute('disabled');
    expect(disabled).toBe('true');
  });

  it(`(D) Should submit button be enabled when form is valid`, ()=>{
    fixture.detectChanges();
    component.taskForm.controls.item.setValue('teste');
    fixture.detectChanges();

    const submitButton: HTMLElement = fixture.nativeElement.querySelector('.form__button--submit');
    const disabled = submitButton.getAttribute('disabled');
    expect(disabled).toBe(null);
  });

})
