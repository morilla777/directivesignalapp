import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color( value: string ){
    this._color = value;
    this.setStyle();
  }

  @Input() set errors( value: ValidationErrors | null | undefined){
    this._errors = value;
    this.setErrorMessage();
  }

  constructor( private el: ElementRef<HTMLElement>) {
    //console.log('constructor de la directiva');
    console.log(el);
    this.htmlElement = el;

    //this.htmlElement.nativeElement.innerHTML = 'Hola Mundo';
  }

  ngOnInit(): void {
    console.log('Directiva - NgOnInit');
  }

  setStyle(): void {
    if( !this.htmlElement ) return;

    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if( !this.htmlElement ) return;

    if( !this._errors ){
      this.htmlElement.nativeElement.innerHTML = '';
      return;
    }

    const errors = Object.keys( this._errors );

    if( errors.includes('required') ){
      this.htmlElement.nativeElement.innerHTML = 'Este campo es requerido';
      return;
    }

    if( errors.includes('minlength') ){
      const delta = this._errors['minlength'].requiredLength - this._errors['minlength'].actualLength;
      this.htmlElement.nativeElement.innerHTML = `A este campo le faltan mínimo ${delta} caracteres`;
      return;
    }

    if( errors.includes('email') ){
      this.htmlElement.nativeElement.innerHTML = 'Este campo debe tener formato de email';
      return;
    }


  }
}
