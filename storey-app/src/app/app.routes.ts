import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { MainComponent } from './components/main/main.component';
import { ServicesComponent } from './components/main/services-component/services.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'services', pathMatch: 'full' },
      { path: 'services', component: ServicesComponent },
      // The other routes like 'profile' and 'settings' are removed 
      // as they are not in the new design's main navigation.
    ]
  },
  { path: '**', redirectTo: '/login' }
];
