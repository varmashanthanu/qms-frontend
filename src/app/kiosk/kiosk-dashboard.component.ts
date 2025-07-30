import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { TicketService } from '../services/ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { TicketConfirmationDialogComponent } from '../components/ticket-confirmation-dialog/ticket-confirmation-dialog.component';

@Component({
  selector: 'app-kiosk-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TranslatePipe],
  templateUrl: './kiosk-dashboard.component.html',
  styleUrls: ['./kiosk-dashboard.component.scss']
})
export class KioskDashboardComponent {
  branchId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private dialog: MatDialog
  ) {
    this.branchId = Number(this.route.snapshot.paramMap.get('branch_id'));
  }

  handleCashierClick() {
    this.ticketService.createTicket(environment.cashierServiceId, this.branchId)
      .subscribe({
        next: (response: any) => {
          console.log('Ticket created successfully:', response);
          // TODO implement the confirmation modal
          this.dialog.open(TicketConfirmationDialogComponent, {
            data: response,
            width: '400px',
            disableClose: false
          })
        },
        error: (error: any) => {
          console.error('Error creating ticket:', error);
          // TODO Handle error, e.g., show a notification to the user
        }
      })
  }

}
