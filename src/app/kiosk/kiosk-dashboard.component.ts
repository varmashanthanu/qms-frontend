import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-kiosk-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TranslatePipe],
  templateUrl: './kiosk-dashboard.component.html',
  styleUrls: ['./kiosk-dashboard.component.scss']
})
export class KioskDashboardComponent {
  branchId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.branchId = this.route.snapshot.paramMap.get('branch_id');
  }
}
