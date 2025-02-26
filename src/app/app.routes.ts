import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/judges' },
  // { path: 'home', loadChildren: () => import('./pages/home/home.routes').then(m => m.HomeRoutes)},
  { path: 'judges', loadChildren: () => import('./pages/judges/judges.routes').then(m => m.JudgesRoutes)},
  { path: 'personal', loadChildren: () => import('./pages/personal/personal.routes').then(m => m.PersonalRoutes)},
  { path: 'login', loadChildren: () => import('./pages/login/login.routes').then(m => m.LoginRoutes)},
  
];
