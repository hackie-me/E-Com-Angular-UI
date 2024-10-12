import { AuthService } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  // Inject the TokenService and Router using Angular's inject() function
  const authService = inject(AuthService); 
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; 
  } else {
    router.navigate(['/admin/auth/login']); // Redirect to login if the token is not present
    return false;
  }
};
