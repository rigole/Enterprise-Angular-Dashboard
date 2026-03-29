import { CanActivateFn, Router } from "@angular/router";
import { AuthStateService } from "../features/auth/services/auth-state.services";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
    const authStateService = inject(AuthStateService);
    const router = inject(Router);
    const user = authStateService.user();
    if (user) {
        return true;
    }
    return router.createUrlTree(['/auth/sign-in']);
};