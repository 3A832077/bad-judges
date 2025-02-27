import { Routes } from '@angular/router';
import { BackendComponent } from './backend.component';
import { JudgesComponent } from './judges/judges.component';
import { DempartmentsComponent } from './dempartments/dempartments.component';

export const BackendRoutes: Routes = [
  {
    path: '', component: BackendComponent,
    children: [
      {
        path: '',
        redirectTo: 'judges',
        pathMatch: 'full'
      },
      {
        path: 'judges',
        component: JudgesComponent
      },
      {
        path: 'dempartments',
        component: DempartmentsComponent
      }
    ]
  },
];
