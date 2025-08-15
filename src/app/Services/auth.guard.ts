import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedUser = sessionStorage.getItem('user');
  if (loggedUser !== null) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
