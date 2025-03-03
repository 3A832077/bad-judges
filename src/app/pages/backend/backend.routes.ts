import { Routes } from '@angular/router';
import { BackendComponent } from './backend.component';
import { JudgesComponent } from './judges/judges.component';
import { JudicialComponent } from './judicial/judicial.component';

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
        path: 'judicial',
        component: JudicialComponent
      }
    ]
  },
];
