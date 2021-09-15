import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[preventEspecialCharacters]'
})
export class PreventEspecialCharactersDirective {

  constructor(private readonly el: ElementRef,
              private readonly control: NgControl) { }

  @HostListener('input', ["$event.target.value"])
  onInput(value: string){
      console.log('qualquer coisa ai')
      const regulaExpression  = /[`~!@#$%^&*()_|+\-=?;:'",.¨{}ºª´^~<>=+°§¬¢£³²¹\{\}\[\]\\\/]/gi;
      this.el.nativeElement.value = value.replace(regulaExpression, '');
      this.control.control?.setValue(this.el.nativeElement.value)
    }
}
