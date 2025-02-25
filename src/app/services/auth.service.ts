import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

export interface User {
id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface UserApiResponse {
  isSuccess: boolean;
  message: string;
  result: User[];
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  form: any;

  constructor(private http: HttpClient,private _router: Router) { }

  private isAuthenticationSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticationSubject.asObservable(); // Observable for real-time updates

  //private apiURL = 'https://localhost:7002/api/auth/login';
  private apiURL = 'https://localhost:7143/api/auth/login';
   private isLoggedIn = false; // Removed duplicate declaration

  
  // login(username: string, password: string): boolean {
    
  //   debugger;
    
  //   var value= this.http.post('https://localhost:7002/api/auth/login',{username:username,password:password});
  //   alert('Hi')
  //   if (username == "admin" && password == "admin") {
  //     this.isAuthenticated = true;
  //     localStorage.setItem("username", username);
      
  //     this.isAuthenticationSubject.next(true);  // Notify to the Subscribers
  //     return true;
  //   }
  //   return false;

    
  // }
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ result: { token: string; role: string; userName: string ; user: { id: string, name: string, email: string, phoneNumber: string, role: string } }}>(`${this.apiURL}`, { username, password })
      .pipe(
        map(response => {
          const result = response.result;
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('role',result.role);
          localStorage.setItem('username',result.userName);
          this.isLoggedIn = true;
          return true;
        }),
        catchError(error => {
          console.error('Login failed', error);
          return of(false);
        })
      );
  }


  // login(obj:any): Observable<any> {
  //   this.isAuthenticated=true;
  //  return this.http.post('https://localhost:7002/api/auth/login',obj);
    
  // }

  logout(): void {
    localStorage.removeItem("token");
    this.isLoggedIn = false;  // Notify to the Subscribers
    this._router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn || !!localStorage.getItem('token');
  }

}
