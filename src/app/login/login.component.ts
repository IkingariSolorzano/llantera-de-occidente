import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  formValid: boolean = false;
  errorMessage: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
    });

    this.loginForm.valueChanges.subscribe((value) => {
      this.formValid = this.loginForm.valid;
    });
  }

  ngOnInit(){
    if (this.loginService.isLogged()) {
      this.router.navigate(['home']);
    }
  }

  f() {
    return this.loginForm.controls;
  }

  login() {
    this.loginService.login(this.loginForm.value).subscribe((response) => {
      if (response) {
        console.log('Login successful');
        this.router.navigate(['home']);
      }
      console.log('Login failed');
      setTimeout(() => {
        this.errorMessage = '';
      }, 2500);
      this.errorMessage = 'Usuario o contraseña incorrectos';
    });
  }
}
