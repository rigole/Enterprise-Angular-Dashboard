import { Component, Signal } from '@angular/core';
import { DashboardStateService } from '../services/dashboard-state.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MODULES_IMPORTS } from '../../../shared/utils/primeng-imports';
import { AlertService } from '../../../shared/utils/alert.service';


@Component({
  selector: 'app-dashboard',
  imports: [MODULES_IMPORTS],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  users!: Signal<any[]>;
  loading!: Signal<boolean>;
  error!: Signal<string | null>;
  search!: Signal<string>;

  constructor(private dashboardStateService: DashboardStateService) { }

  ngOnInit(): void {
    this.users = this.dashboardStateService.filteredEmployees;
    this.loading = this.dashboardStateService.loading;
    this.search = this.dashboardStateService.searchTerm;
    this.error = this.dashboardStateService.error;
    this.dashboardStateService.loadEmployees();
  }

  onSearchChange(value: string) {
    this.dashboardStateService.setSearchTerm(value);
  }

  calculateTenure(anniversary: string | Date): string {
    if (!anniversary) return 'N/A';

    const start = new Date(anniversary);
    const today = new Date();
    const diffInMs = today.getTime() - start.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffInDays / 365.25);
    const months = Math.floor((diffInDays % 365.25) / 30.44);

    if (years > 0) {
      return `${years} years, ${months} months`;
    } else {
      return `${months} months`;
    }
  }
}
