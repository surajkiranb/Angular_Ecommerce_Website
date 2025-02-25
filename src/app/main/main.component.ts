import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: false,
})
export class MainComponent {

  username: string = "";
  status: boolean = false;


  constructor(private _authService: AuthService,
    private _router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    document.body.className = "selector";
    this._authService.isAuthenticated$.subscribe((status) => {
      this.status = status;
      this.cd.detectChanges();
      if (localStorage.getItem("userName")) {
        this.username = localStorage.getItem("userName") ?? '';
        
      }
    })
    
    
  }

  logout() {
    debugger;
    this._authService.isAuthenticated$.subscribe((status) => {
      this.status = status;
      this.cd.detectChanges();
      this._authService.logout();
      this._router.navigate(['/login']);
    })

  }
  ngOnDestroy() {
    document.body.className = "";
  }


}
