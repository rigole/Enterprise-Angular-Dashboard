import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetEmployeePasswordComponent } from './set-employee-password.component';

describe('SetEmployeePasswordComponent', () => {
  let component: SetEmployeePasswordComponent;
  let fixture: ComponentFixture<SetEmployeePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetEmployeePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetEmployeePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
