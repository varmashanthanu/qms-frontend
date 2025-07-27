import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';
import { LoginComponent } from './auth/login.component';
import { StaffDashboardComponent } from './pages/staff-dashboard.component';
import { KioskLoginComponent } from './kiosk/kiosk-login.component';
import { KioskDashboardComponent } from './kiosk/kiosk-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'staff-dashboard', component: StaffDashboardComponent },
      { path: 'kiosk/login', component: KioskLoginComponent },
      { path: 'dashboard/branch/:branch_id', component: KioskDashboardComponent },

    ]
  }
];
