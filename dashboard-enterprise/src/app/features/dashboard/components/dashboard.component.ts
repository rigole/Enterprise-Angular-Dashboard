import { Component, Signal } from '@angular/core';
import { DashboardStateService } from '../services/dashboard-state.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MODULES_IMPORTS } from '../../../shared/utils/primeng-imports';


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
    console.log(value);
    this.dashboardStateService.setSearchTerm(value);
  }
}
