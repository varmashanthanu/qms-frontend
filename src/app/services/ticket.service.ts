// src/app/services/ticket.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private baseUrl = `${environment.apiBaseUrl}services/`;

  constructor(private http: HttpClient) {}

  // Fetch staff user tickets
  getMyTickets() {
    return this.http.get(`${this.baseUrl}my-tickets/`);
  }

  // Perform staff user actions on tickets
  performAction(ticketId: number, action: 'call' | 'serve' | 'complete' | 'skip' | 'transfer') {
    return this.http.post(`${this.baseUrl}tickets/${ticketId}/action/`, { action });
  }

  // Generate new ticket for customer
  createTicket(serviceId: number, branchId: number | null, customerData: any = {}) {
    // If branchId or serviceId is not provided, throw an error
    if (!branchId || !serviceId) {
      throw new Error('Branch ID and Service ID are required to create a ticket.');
    }

    const payload = {
      service: serviceId,
      branch: branchId,
      customer_name: customerData.name || '',
      customer_phone: customerData.phone || '',
      customer_email: customerData.email || ''
    };

    return this.http.post(`${this.baseUrl}tickets/`, payload);
  }

}
