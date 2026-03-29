import { Component, computed, OnInit, Signal } from '@angular/core';
import { MODULES_IMPORTS } from '../../../../shared/utils/primeng-imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConfirmationService } from 'primeng/api';
import { AuthStateService } from '../../services/auth-state.services';
import { AlertService } from '../../../../shared/utils/alert.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  imports: [MODULES_IMPORTS, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})


export class AddEmployeeComponent implements OnInit {
  public userForm!: FormGroup;
  formValueSignal!: Signal<any>;
  
  constructor(private fb: FormBuilder,
    private authStateService: AuthStateService,
    private confirmService: ConfirmationService,
    private alertService: AlertService,
    private router: Router) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      profession: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      hiringDate: ['', Validators.required]
    })
    this.formValueSignal = toSignal(this.userForm.valueChanges, {
      initialValue: this.userForm.value
    });
    
  }

  ngOnInit() { }

  addEmployee() {
    this.confirmService.confirm({
      message: 'Are you sure that you want to add this employee?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'No',
        severity: 'danger',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Yes',
        severity: 'success',
        outlined: true
      },
      accept: () => {
        this.authStateService.addEmployee(this.formValueSignal()).subscribe({
          next: (res: any) => {
            const token = res.token;
            this.alertService.showSuccessToast('Employee added successfully');
            this.router.navigate(['auth/set-employee-password', token]);
            this.userForm.reset();  
          },
          error: () => {
            this.alertService.showErrorToast('Failed to add employee');
          }
        })
      },
      reject: () => {
        this.alertService.showErrorToast('Failed to add employee');
      }
    })
  }

}


