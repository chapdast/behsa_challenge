import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  numbersPattern = /[^0-9]+/g;
  persianAlphabetPattern = /[^\u0600-\u06FF\uFB8A\u067E\u0686\u06AF]+/g;

  //@ts-ignore
  form: FormGroup;
  formSubmit = () => {
    console.log("Form Data:", this.form.getRawValue());

  };

  constructor() { }
  ngOnInit(): void {
    this.form = new FormGroup({
      numberOnly: new FormControl(),
      persianAlphabet: new FormControl(),
    })
  }
}
