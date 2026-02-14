import { Component, OnInit, Signal } from '@angular/core';
import { MODULES_IMPORTS } from '../../../../shared/utils/primeng-imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthStateService } from '../../services/auth-state.services';

@Component({
  selector: 'app-add-employee',
  imports: [MODULES_IMPORTS],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})


export class AddEmployeeComponent implements OnInit {
  public userForm!: FormGroup;
  formValueSignal!: Signal<any>;
  constructor(private fb: FormBuilder, private authStateService: AuthStateService) {
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

  addEmployee(){
    console.log(this.formValueSignal())
    this.authStateService.addEmployee(this.formValueSignal())
  }

}
