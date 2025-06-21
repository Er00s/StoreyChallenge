import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/main/home/home.component';
import { authGuard } from './guards/auth.guard';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      // The other routes like 'profile' and 'settings' are removed 
      // as they are not in the new design's main navigation.
    ]
  },
  { path: '**', redirectTo: '/login' }
];
