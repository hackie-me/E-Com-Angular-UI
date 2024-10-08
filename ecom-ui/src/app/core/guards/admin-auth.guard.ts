import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  // Inject the TokenService and Router using Angular's inject() function
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.isLoggedIn()) {
    return true;  // Allow route access if the user is logged in
  } else {
    router.navigate(['/admin/auth/login']); // Redirect to login if the token is not present
    return false;
  }
};
