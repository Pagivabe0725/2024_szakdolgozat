import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('userId')) {
    return true;
  } else {
    window.location.href = '/public/login';
    return false;
  }
};
