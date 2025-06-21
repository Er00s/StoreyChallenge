import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Supply } from '../card/card.component';

@Component({
  selector: 'app-associate-supply-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './associate-supply-modal.component.html',
  styleUrls: ['./associate-supply-modal.component.scss']
})
export class AssociateSupplyModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() availableSupplies: Supply[] = [];
  @Output() onSelect = new EventEmitter<Supply>();
  @Output() onClose = new EventEmitter<void>();

  searchTerm = '';
  filteredSupplies: Supply[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['availableSupplies']) {
      this.filteredSupplies = this.availableSupplies;
    }
  }

  filterSupplies(): void {
    if (!this.searchTerm) {
      this.filteredSupplies = this.availableSupplies;
    } else {
      this.filteredSupplies = this.availableSupplies.filter(supply =>
        supply.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        supply.alias.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  selectSupply(supply: Supply): void {
    this.onSelect.emit(supply);
  }

  closeModal(): void {
    this.onClose.emit();
  }
}
