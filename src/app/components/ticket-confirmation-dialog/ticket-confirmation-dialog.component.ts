import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ticket-confirmation-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './ticket-confirmation-dialog.component.html',
  styleUrls: ['./ticket-confirmation-dialog.component.scss']
})
export class TicketConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TicketConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
