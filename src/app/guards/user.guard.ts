import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);
  if (loginService.rol =='aaa4c309-b14f-4b47-8dae-3b035b138c4e') {
    console.log(loginService.rol);
    router.navigate(['/cotizar']);
    return false;
  }
    return true;
};
