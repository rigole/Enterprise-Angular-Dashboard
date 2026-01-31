import { Component, Signal } from '@angular/core';
import { DashboardStateService } from '../services/dashboard-state.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [TableModule, CommonModule],
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
