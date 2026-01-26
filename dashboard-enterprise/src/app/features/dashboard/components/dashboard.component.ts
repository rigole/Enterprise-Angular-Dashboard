import { Component, Signal } from '@angular/core';
import { DashboardStateService } from '../services/dashboard-state.service';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-dashboard',
  imports: [TableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    users!: Signal<any[]>;
    loading!: Signal<boolean>;
    error!: Signal<string | null>;
    
    constructor(private dashboardStateService: DashboardStateService) { }
    
    ngOnInit(): void {
        this.users = this.dashboardStateService.employees;
        this.loading = this.dashboardStateService.loading;
        this.error = this.dashboardStateService.error;
        this.dashboardStateService.loadEmployees();
    }
  }
