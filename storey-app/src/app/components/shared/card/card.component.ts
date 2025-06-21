import { Component, Input, OnInit, OnDestroy, HostListener, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { MockDataService } from '../../../services/mock-data.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { SearchComponent } from '../search/search.component';

export interface Supply {
  id: string;
  address: string;
  location: string;
  alias: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmationModalComponent, SearchComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy, OnChanges {
  @Input() title: string = "Cargando...";
  @Input() nis: string = "Cargando...";
  @Input() alias: string = "Cargando...";
  @Input() initialSupplies!: Supply[];
  @Input() tags: { text: string, type: 'success' | 'warning' | 'error' }[] = [];

  // State
  isOpen = false;
  isMenuOpenForSupplyId: string | null = null;
  
  // Supply Management
  activeSupply: Supply | null = null;
  otherSupplies: Supply[] = [];

  isDropdownOpen = false;
  isContextMenuOpen = false;
  selectedSupply: Supply | null = null;
  
  isUnlinkModalOpen = false;
  supplyToUnlink: Supply | null = null;
  
  private destroy$ = new Subject<void>();

  constructor(private mockDataService: MockDataService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.updateSupplies();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialSupplies']) {
      this.updateSupplies();
    }
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateSupplies(): void {
    if (this.initialSupplies && this.initialSupplies.length > 0) {
      this.activeSupply = this.initialSupplies[0];
      this.otherSupplies = this.initialSupplies.slice(1);
    } else {
      this.activeSupply = null;
      this.otherSupplies = [];
    }

    if (this.initialSupplies.length <= 1) {
      this.isOpen = false;
    }
  }

  selectSupply(supply: Supply): void {
    this.activeSupply = supply;
    this.otherSupplies = this.initialSupplies.filter(s => s.id !== this.activeSupply!.id);
    this.isOpen = false;
  }

  toggleOpen(): void {
    if (this.initialSupplies.length > 1) {
      this.isOpen = !this.isOpen;
    }
  }

  toggleMenu(supplyId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.isMenuOpenForSupplyId = this.isMenuOpenForSupplyId === supplyId ? null : supplyId;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.context-menu-container')) {
      this.isMenuOpenForSupplyId = null;
    }
  }

  editAlias(supplyId: string): void {
    console.log(`Edit alias for supply ${supplyId}`);
    this.isMenuOpenForSupplyId = null;
  }

  unlinkSupply(supplyId: string): void {
    console.log(`Unlink supply ${supplyId}`);
    this.isMenuOpenForSupplyId = null;
  }

  toggleContextMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isContextMenuOpen = !this.isContextMenuOpen;
  }

  openUnlinkModal(supply: Supply) {
    this.supplyToUnlink = supply;
    this.isUnlinkModalOpen = true;
    this.isContextMenuOpen = false; 
  }
  
  handleModalClose() {
    this.isUnlinkModalOpen = false;
    this.supplyToUnlink = null;
  }

  handleUnlinkConfirm() {
    if (!this.supplyToUnlink) {
      this.handleModalClose();
      return;
    }

    // Filtrar el suministro desvinculado de la lista local del componente
    this.initialSupplies = this.initialSupplies.filter(s => s.id !== this.supplyToUnlink!.id);

    // Si quedan suministros, hacer que el primero sea el activo
    if (this.initialSupplies.length > 0) {
      this.activeSupply = this.initialSupplies[0];
      this.otherSupplies = this.initialSupplies.slice(1);
    } else {
      // Si no quedan suministros, la tarjeta desaparecerá
      this.activeSupply = null;
      this.otherSupplies = [];
    }

    this.handleModalClose();
  }
}
