import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (true) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
