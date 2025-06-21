import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  currentUser: User | null = null;
  isSidebarExpanded: boolean;
  isMobile: boolean;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    this.isMobile = window.innerWidth <= 780;
    this.isSidebarExpanded = !this.isMobile;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 780;

    if (wasMobile !== this.isMobile) {
      this.isSidebarExpanded = !this.isMobile;
    }
  }

  logout(): void {
    this.authService.logout();
  }

  toggleSidebar() {
    this.isSidebarExpanded = !this.isSidebarExpanded;
  }
}
