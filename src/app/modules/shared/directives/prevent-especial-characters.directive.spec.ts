import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SharedModule } from '../shared.module';
import { PreventEspecialCharactersDirective } from './prevent-especial-characters.directive';
describe(PreventEspecialCharactersDirective.name, () => {

  let fixture: ComponentFixture<PreventEspecialCharactersTestComponent>;
  let component: PreventEspecialCharactersTestComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PreventEspecialCharactersDirective, PreventEspecialCharactersTestComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(PreventEspecialCharactersTestComponent);
    component = fixture.componentInstance;
  });


  it(`(D) Should remove special character when input`, () => {
    fixture.detectChanges();
    const value = 'some value+-()-+.*/'
    let input = fixture.debugElement.query(By.css('input'));
    let el: HTMLInputElement = input.nativeElement;
    el.value = value;
    el.dispatchEvent(new Event('input'));
    expect(component.value.value).toBe('some value');
  });


});

@Component({
  template: `<input preventEspecialCharacters class="input"  [formControl]="value"/>`
})
class PreventEspecialCharactersTestComponent {
  public value = new FormControl('');
}