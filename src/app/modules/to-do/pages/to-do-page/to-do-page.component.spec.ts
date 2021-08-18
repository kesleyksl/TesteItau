import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { ToDoPageComponent } from './to-do-page.component';

describe('ToDoPageComponent', () => {
  let component: ToDoPageComponent;
  let fixture: ComponentFixture<ToDoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ ToDoPageComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ToDoPageComponent);
    component = fixture.componentInstance;
  });


  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
