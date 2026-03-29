import { Component, signal } from '@angular/core';
import { MODULES_IMPORTS } from '../../../../shared/utils/primeng-imports';
import { AuthStateService } from '../../../auth/services/auth-state.services';
import { Employee } from '../../../../shared/utils/model/Employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MODULES_IMPORTS],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user: any;
  constructor(private authStateService: AuthStateService, private router: Router) {
    this.user = this.authStateService.user;
  }

  logout() {
    this.authStateService.logout();
    this.router.navigate(['/auth/sign-in']);
  }
}
