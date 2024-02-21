import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private loginService: LoginService,
    private router: Router) {}

  logOut() {
    this.loginService.logOut();
    this.router.navigate(['login']);
  }

}
