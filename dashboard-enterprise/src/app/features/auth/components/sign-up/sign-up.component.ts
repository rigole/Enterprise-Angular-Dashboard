import { Component } from '@angular/core';
import { MODULES_IMPORTS } from '../../../../shared/utils/primeng-imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [MODULES_IMPORTS ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})



export class SignUpComponent {
  public userForm!: FormGroup;
  constructor(private fb: FormBuilder) {
      this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      profession: ['', Validators.required],
      date: ['', Validators.required]
    })
  }
}
