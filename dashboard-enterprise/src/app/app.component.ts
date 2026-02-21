import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MODULES_IMPORTS } from './shared/utils/primeng-imports';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MODULES_IMPORTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dashboard-enterprise';
}
