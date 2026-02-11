import { Component, OnInit, Signal } from '@angular/core';
import { MODULES_IMPORTS } from '../../../../shared/utils/primeng-imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-employee',
  imports: [MODULES_IMPORTS],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})

export class AddEmployeeComponent implements OnInit {
  public userForm!: FormGroup;
  formValueSignal!: Signal<any>;
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      profession: ['', Validators.required],
      date: ['', Validators.required]
    })
    this.formValueSignal = toSignal(this.userForm.valueChanges, {
      initialValue: this.userForm.value
    });
  }

  ngOnInit() { }

}
