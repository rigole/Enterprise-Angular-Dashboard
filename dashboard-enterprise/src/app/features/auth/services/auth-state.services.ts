import {Injectable, computed, signal } from "@angular/core";
import { AuthService } from "./auth.service";
import { Employee } from "../../../shared/utils/model/Employee";
import { AlertService } from "../../../shared/utils/alert.service";


@Injectable({
  providedIn: 'root'
})

export class AuthStateService {
    private readonly _loading = signal(false)
    private readonly _employee = signal<Employee[]>([]);
    private readonly _error = signal<string | null>(null);
    readonly loading = this._loading.asReadonly();
    readonly employee = this._employee.asReadonly();
    readonly error = this._error.asReadonly();

    constructor(private api: AuthService, private alertService: AlertService) {}


    addEmployee(employee: Employee) {
    this._loading.set(true);
    this._error.set(null);

    this.api.addEmployee(employee).subscribe({
      next: (newEmployee: any) => {
        this._employee.update(employees => [...employees, newEmployee]);
        this._loading.set(false);
        this.alertService.showSuccessToast('Employee added successfully');
      },
      error: () => {
        this._error.set('Failed to add employee');
        this.alertService.showErrorToast('Failed to add employee');
        this._loading.set(false);
      }
    });
  }


}