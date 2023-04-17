import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appCustomValidator]'
})
export class CustomValidatorDirective implements OnInit {
  @Input('appCustomValidator') pattern: RegExp | undefined;
  @Input() formControl: FormControl | undefined;
  constructor(private elm: ElementRef) { }


  ngOnInit(): void {
    console.log(this.pattern);
  }
  @HostListener('input', ['$event'])
  onInput(e: any) {
    let val = this.elm.nativeElement.value;
    this.elm.nativeElement.value = val.replace(this.pattern, '');
    console.log(val, this.elm.nativeElement.value);

  }

}
