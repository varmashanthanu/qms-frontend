import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-staff-dashboard',
  standalone: true,
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss'],
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule,
    TranslatePipe,
  ]
})
export class StaffDashboardComponent implements OnInit {
  tickets: any[] = [];
  isLoading = false;

  constructor(
    private ticketService: TicketService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.isLoading = true;
    this.ticketService.getMyTickets().subscribe({
      next: (data: any) => {
        this.tickets = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open('Failed to load tickets', 'Close', { duration: 3000 });
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  handleAction(ticketId: number, action: 'call' | 'serve' | 'complete' | 'skip' | 'transfer'): void {
    this.ticketService.performAction(ticketId, action).subscribe({
      next: () => {
        this.snackBar.open(`Ticket ${ticketId} marked as ${action}`, 'Close', { duration: 2500 });
        this.loadTickets();
      },
      error: (err) => {
        this.snackBar.open(`Failed to ${action} ticket ${ticketId}`, 'Close', { duration: 3000 });
        console.error(err);
      }
    });
  }
}
