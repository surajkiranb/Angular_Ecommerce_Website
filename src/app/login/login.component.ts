import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private _authService: AuthService,
    private _router: Router) { }

  login():void {
debugger;
    this._authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        console.log(success);
        this._router.navigate(['/home']);
      } else {
        alert('Login failed');
      }
    });
}

}
