import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { KioskAuthService } from '../services/kiosk-auth.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-kiosk-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './kiosk-login.component.html',
  styleUrl: './kiosk-login.component.scss'
})
export class KioskLoginComponent {
  kioskKey: string = '';
  error: string | null = null;

  constructor(private kioskAuth: KioskAuthService, private router: Router) {}

  async submit() {
    try {
      console.log(`trying to login with ${this.kioskKey}`);
      const response = await this.kioskAuth.login(this.kioskKey);
      console.log('Login successful', response);
      const branchId = response.branch_id;

      console.log(`Navigating to branch dashboard with ID: ${branchId}`);
      this.router.navigate([`dashboard/branch/${branchId}`]);
    } catch (err: any) {
      console.error('Login failed', err);
      this.error = err.error?.detail || 'Invalid Kiosk Key'
    }
  }

}
