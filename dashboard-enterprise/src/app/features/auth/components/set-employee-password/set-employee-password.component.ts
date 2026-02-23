import { Component, OnInit, Signal } from '@angular/core';
import { MODULES_IMPORTS } from '../../../../shared/utils/primeng-imports';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../shared/utils/alert.service';
import { AuthStateService } from '../../services/auth-state.services';

@Component({
  selector: 'app-set-employee-password',
  imports: [MODULES_IMPORTS, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './set-employee-password.component.html',
  styleUrl: './set-employee-password.component.scss'
})
export class SetEmployeePasswordComponent implements OnInit {

    private token!: string;
    public passwordForm!: FormGroup;
    formValueSignal!: Signal<any>;
  
  constructor(private fb: FormBuilder,
    private authStateService: AuthStateService,
    private confirmService: ConfirmationService,
    private alertService: AlertService,
    private route: ActivatedRoute) {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
    this.formValueSignal = toSignal(this.passwordForm.valueChanges, {
      initialValue: this.passwordForm.value
    });
  }

  
  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }

  addEmployee(){}

  
}
