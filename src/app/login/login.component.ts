import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  formValid: boolean = false;

  constructor(private formBuilder: FormBuilder) {
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

  f() {
    return this.loginForm.controls;
  }

  login() {
    console.log('Haciendo login');
    //user: admin, password: 123456
    if (
      this.loginForm.value.username === 'admin' &&
      this.loginForm.value.password === '123456'
    ) {
      alert('Login success');
    }
  }
}
