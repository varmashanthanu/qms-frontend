import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';
import { LoginComponent } from './auth/login.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ]
  }
];
