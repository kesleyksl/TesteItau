import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from './notification.service';


describe('NotificationService', () => {
  let service: NotificationService;
  let matSnackbarDependency: MatSnackBar;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule, NoopAnimationsModule],
      providers: [NotificationService,
        { provide: MatSnackBar, useClass: MatSnackBar }]
    });

    service = TestBed.get(NotificationService);
    matSnackbarDependency = TestBed.get(MatSnackBar);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });


  it(`#${NotificationService.prototype.showSnackbar.name} 
            should return true when pass a message`, () => {
                  let response = service.showSnackbar({
                    message: 'Teste',
                    action: 'x',
                    config: {
                      duration: 3000,
                    }
                  });
                  expect(response).toBeTruthy();
  });
  it(`#${NotificationService.prototype.showSnackbar.name} 
    should throw when not pass message`, () => {
                  spyOn(service, 'showSnackbar').and.throwError('Empty message')
                  expect(() => { service.showSnackbar({message: ''}); }).toThrowError('Empty message');
  });

  
});
