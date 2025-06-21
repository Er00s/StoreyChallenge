import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirmación';
  @Input() question = '¿Estás seguro?';
  @Input() disclaimer = 'Esta acción no se puede deshacer.';
  
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  confirmAction(): void {
    this.onConfirm.emit();
  }

  closeModal(): void {
    this.onClose.emit();
  }
}
