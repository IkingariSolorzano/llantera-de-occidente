import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const admin = '4a0d01dd-4d82-453f-a9b8-38503ff5b311';
const user = 'aaa4c309-b14f-4b47-8dae-3b035b138c4e';
const empresa = 'a3c952d9-32ce-4daa-ad4a-b06501b2d54b';
const cliente = 'cec5ee66-0011-465a-aa95-980d6f468528';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  rol$: BehaviorSubject<string> = new BehaviorSubject<string>('');
   _rol = this.rol$.asObservable();

  constructor() {
    if (localStorage.getItem('rol') !== null) {
      this.rol$.next(localStorage.getItem('rol')!);
    }

  }

  get rol(): string {
    return this.rol$.value;
  }

  login(credentials: any): Observable<boolean> {
    console.log(credentials.username);
    console.log(credentials.password);
    if (credentials.username === 'admin' && credentials.password === '123456') {
      console.log('entro');
      localStorage.setItem('logged', credentials.username);
      localStorage.setItem('rol', admin);
      this.rol$.next(admin);
      return new Observable((observer) => {
        observer.next(true);
        observer.complete();
      });
    }else if (credentials.username === 'usuario' && credentials.password === '123456') {
      console.log('entro');
      localStorage.setItem('logged', credentials.username);
      localStorage.setItem('rol', user);
      this.rol$.next(user);
      return new Observable((observer) => {
        observer.next(true);
        observer.complete();
      });
    }
     else {
      return new Observable((observer) => {
        observer.next(false);
        observer.complete();
      });
    }
  }

  isLogged(): boolean {
    return (
      localStorage.getItem('logged') !== null
    );
  }

  logOut() {
    localStorage.removeItem('logged');
    localStorage.removeItem('rol');
    this.rol$.next('');
  }
}
