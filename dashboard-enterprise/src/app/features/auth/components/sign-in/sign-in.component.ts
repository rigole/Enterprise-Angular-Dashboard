import { Component, Signal } from '@angular/core';
import { MODULES_IMPORTS } from '../../../../shared/utils/primeng-imports';
import { AlertService } from '../../../../shared/utils/alert.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthStateService } from '../../services/auth-state.services';

@Component({
  selector: 'app-sign-in',
  imports: [MODULES_IMPORTS, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  public userForm!: FormGroup;
  formValueSignal!: Signal<any>;

  constructor(
    private fb: FormBuilder,
    private confirmService: ConfirmationService,
    private alertService: AlertService,
    private authStateService: AuthStateService
  ) { 
       this.userForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    
    })
    this.formValueSignal = toSignal(this.userForm.valueChanges, {
      initialValue: this.userForm.value
    });
  }
  login() { 
  const payload = {
    email: this.formValueSignal().email,
    password: this.formValueSignal().password
  };

  this.authStateService.login(payload.email, payload.password).subscribe({
    next: (res: any) => {
      console.log('LOGIN RESPONSE:', res);
      if (!res || !res.user || !res.token) {
        this.alertService.showErrorToast('Invalid email or password');
        return;
      }

      this.alertService.showSuccessToast('Login successful');
    },
    error: (err) => {
      console.log('LOGIN ERROR:', err);
      const message = err.error?.message || 'Failed to login';
      this.alertService.showErrorToast(message);
    }
  });
}

}
