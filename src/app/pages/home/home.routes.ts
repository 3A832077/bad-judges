import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DetailComponent } from './detail/detail.component';

export const WELCOME_ROUTES: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'detail/:id',
        component: DetailComponent,
      },
    ],
  },
];
