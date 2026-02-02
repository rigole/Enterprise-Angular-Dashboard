import {Injectable, computed, signal } from "@angular/core";
import { DashboardApiService } from "./dashboard.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardStateService {
    private readonly _loading = signal(false)
    private readonly _employees = signal<any[]>([]);
    private readonly _error = signal<string | null>(null);
    private readonly _searchTerm = signal<string>('');
    readonly searchTerm = this._searchTerm.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly employees = this._employees.asReadonly();
    readonly error = this._error.asReadonly();
    
    readonly activeEmployees = computed(() =>
      this._employees().filter(employee => employee.status === 'active')
    );

    readonly filteredEmployees = computed(() => {
      const term = this._searchTerm().toLowerCase();
      return this._employees().filter(employee =>
        employee.first_name.toLowerCase().includes(term) ||
        employee.last_name.toLowerCase().includes(term) ||
        employee.email.toLowerCase().includes(term)
      );
    });

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

  setSearchTerm(value: string) {
    this._searchTerm.set(value);
  }
    
}