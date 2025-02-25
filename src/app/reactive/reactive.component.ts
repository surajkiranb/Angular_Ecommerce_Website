import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.css'
})
export class ReactiveComponent {

  submitted: boolean = false;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [Validators.required, Validators.min(18)])
  })

  // Getter Methods:
  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
  get age() { return this.userForm.get('age'); }

  onSubmit() {
    console.log(`Form Submitted: `, this.userForm.value);
    this.submitted = true;
  }

}
