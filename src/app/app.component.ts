import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './common/header/header.component';

import {} from '@angular/fire';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isLogged: string='';
  rol = '';
  loginService = inject(LoginService);
  title = 'llantera-de-occidente';

  constructor() {
    this.loginService.rol$.subscribe((rol) => {
      this.rol = rol;
    });
  }

  ngOnInit() {
    this.loginService._rol.subscribe(
      data=>{
        this.isLogged = data;
      }
    )
  }
}
