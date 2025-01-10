import { Routes } from '@angular/router';
import { JudgesComponent } from './judges.component';
import { DetailComponent } from './detail/detail.component';

export const JudgesRoutes: Routes = [
  {
    path: '', component: JudgesComponent,
    children: [
      {
        path: 'detail/:id',
        component: DetailComponent,
      },
    ],
  },
];
