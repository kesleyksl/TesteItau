import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { Task } from '../../../interfaces/task';
import { TaskService } from '../../../services/task.service';
import { TaskListComponent } from '../task-list.component';

import { TaskListItemComponent } from './task-list-item.component';

function mockUpdateResponseTrue() {
    return new BehaviorSubject<Task>(new Task('', true, '')).asObservable();
}
function mockResponse() {
    return new BehaviorSubject<Task>(new Task('', true, '')).asObservable();
}
describe(TaskListComponent.name, () => {
    let component: TaskListItemComponent;
    let fixture: ComponentFixture<TaskListItemComponent>;
    let service: TaskService;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [TaskListItemComponent],
            providers: [TaskService]
        })
            .compileComponents();
        fixture = TestBed.createComponent(TaskListItemComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(TaskService);
    });

    it('should create componente', () => {
        expect(component).toBeTruthy();
    });

    it(`(D) Should not show item when there is no task`, () => {
        fixture.detectChanges();
        const taskItem = fixture.nativeElement.querySelector('.list-item');
        expect(taskItem).not.toBeTruthy();
    });

    it(`(D) Should show item when there is item`, () => {
        fixture.detectChanges();
        component.task = new Task('');
        fixture.detectChanges();
        const taskItem = fixture.nativeElement.querySelector('.list-item');
        expect(taskItem).toBeTruthy();
    });

    it(`${TaskListItemComponent.prototype.updateTaskStatus.name} should call service method when called`, () => {
        spyOn(service, 'update')
            .and.returnValue(mockUpdateResponseTrue());
        const status = false;
        component.task = new Task('', status, '');
        fixture.detectChanges();
        component.updateTaskStatus(true);

        expect(service.update).toHaveBeenCalled();
    });

    it(`${TaskListItemComponent.prototype.deleteTask.name} should call service method when called`, () => {
        spyOn(service, 'delete')
            .and.returnValue(mockResponse());
        const status = false;
        component.task = new Task('', status, '1');
        fixture.detectChanges();
        component.deleteTask();
        expect(service.delete).toHaveBeenCalled();
    });
});
