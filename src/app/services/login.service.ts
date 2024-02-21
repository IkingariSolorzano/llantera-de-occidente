import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  login(credentials: any): Observable<boolean> {
    if (credentials.username === 'admin' && credentials.password === '123456') {
      sessionStorage.setItem('logged', credentials.username);
      return new Observable((observer) => {
        observer.next(true);
        observer.complete();
      });
    } else {
      return new Observable((observer) => {
        observer.next(false);
        observer.complete();
      });
    }
  }

  isLogged(): boolean {
    return (sessionStorage.getItem('logged') !== null && sessionStorage.getItem('logged') == 'admin');
  }

  logOut() {
    sessionStorage.removeItem('logged');
  }
}
