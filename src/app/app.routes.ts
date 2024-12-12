import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', loadChildren: () => import('./pages/home/home.routes').then(m => m.WELCOME_ROUTES)},
  { path: 'personal', loadChildren: () => import('./pages/personal/personal.routes').then(m => m.PERSONAL_ROUTES)},
  { path: 'login', loadChildren: () => import('./pages/login/login.routes').then(m => m.LOGIN_ROUTES)},
];
