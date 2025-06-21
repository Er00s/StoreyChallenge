import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StateService, ServiceType } from '../../../services/state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isExpanded = true;
  @Output() toggle = new EventEmitter<void>();

  isServicesMenuOpen = false;

  constructor(private stateService: StateService) {}

  onToggle() {
    // Si la barra lateral está expandida y se va a colapsar, cerrar todos los submenús
    if (this.isExpanded) {
      this.isServicesMenuOpen = false;
    }
    this.toggle.emit();
  }

  toggleServicesMenu() {
    this.isServicesMenuOpen = !this.isServicesMenuOpen;
  }

  selectService(service: ServiceType) {
    this.stateService.setServiceType(service);
  }

  onNavLinkClick() {
    // Si la barra lateral está colapsada, la expandimos automáticamente
    if (!this.isExpanded) {
      this.toggle.emit();
    }
  }
}
