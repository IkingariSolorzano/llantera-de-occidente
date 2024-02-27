import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  rol: string = '';

  constructor(private loginService: LoginService, private router: Router) {
    this.loginService._rol.subscribe((rol) => {
      this.rol = rol;
    });
    console.log('El rol es', this.rol);
  }

  logOut() {
    this.loginService.logOut();
    this.router.navigate(['login']);
  }
}
