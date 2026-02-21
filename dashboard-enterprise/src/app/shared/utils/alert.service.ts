import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    constructor(private messageService: MessageService) { }

    public showSuccessToast(message: string): void {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: message,
            life: 3500
        });
    }

    public showErrorToast(message: string): void {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3500
        });
    }

    public showWarningToast(message: string): void {
        this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: message,
            life: 3500
        });
    }
}