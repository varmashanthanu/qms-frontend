// src/app/services/ticket.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private baseUrl = 'http://localhost:8000/api/v1/services';

  constructor(private http: HttpClient) {}

  getMyTickets() {
    return this.http.get(`${this.baseUrl}/my-tickets/`);
  }

  performAction(ticketId: number, action: 'call' | 'serve' | 'complete' | 'skip' | 'transfer') {
    return this.http.post(`${this.baseUrl}/tickets/${ticketId}/action/`, { action });
  }
}
