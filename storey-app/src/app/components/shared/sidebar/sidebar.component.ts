import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
export class SidebarComponent implements OnChanges {
  @Input() isExpanded = true;
  @Output() toggle = new EventEmitter<void>();

  isServicesMenuOpen = false;

  constructor(private stateService: StateService) {}

  ngOnChanges(changes: SimpleChanges) {
    // Si isExpanded cambió a false (se colapsó), cerrar todos los submenús
    if (changes['isExpanded'] && !changes['isExpanded'].currentValue) {
      this.isServicesMenuOpen = false;
    }
  }

  onToggle() {
    // Siempre cerrar todos los submenús cuando se hace toggle
    this.isServicesMenuOpen = false;
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
