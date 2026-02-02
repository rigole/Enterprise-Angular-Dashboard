import {Injectable, computed, signal } from "@angular/core";
import { DashboardApiService } from "./dashboard.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardStateService {
    private readonly _loading = signal(false)
    private readonly _employees = signal<any[]>([]);
    private readonly _error = signal<string | null>(null);

    readonly loading = this._loading.asReadonly();
    readonly employees = this._employees.asReadonly();
    readonly error = this._error.asReadonly();

    readonly activeEmployees = computed(() =>
    this._employees().filter(employee => employee.status === 'active')
  );

  constructor(private api: DashboardApiService) {}

  loadEmployees() {
    this._loading.set(true);
    this._error.set(null);

    this.api.getEmployees().subscribe({
      next: (employees: any[]) => {
        this._employees.set(employees);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Failed to load dashboard items');
        this._loading.set(false);
      }
    });
  }
    
}