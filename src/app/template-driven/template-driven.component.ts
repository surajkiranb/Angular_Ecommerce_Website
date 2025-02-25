import { Component } from '@angular/core';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrl: './template-driven.component.css'
})
export class TemplateDrivenComponent {

  submitted: boolean = false;

  user: any = {
    name: '',
    email: '',
    age: null
  }

  onSubmit() {
    console.log(`Form Submitted: `, this.user);
    this.submitted = true;
  }

}
