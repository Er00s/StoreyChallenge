import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { MockDataService } from '../../../services/mock-data.service';
import { Supply } from '../card/card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() placeholder = 'Buscar...';
  @Input() initialSupplyIdsToExclude: string[] = [];
  @Output() onSelect = new EventEmitter<Supply>();

  searchTerm = '';
  results: Supply[] = [];
  isLoading = false;
  showResults = false;
  
  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(private mockDataService: MockDataService, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
        this.showResults = true; // Show panel on search
      }),
      switchMap(term => this.mockDataService.searchSupplies(term))
    ).subscribe(supplies => {
      this.isLoading = false;
      this.results = supplies.filter(s => !this.initialSupplyIdsToExclude.includes(s.id));
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchSubject.next(term);
  }

  selectResult(supply: Supply): void {
    this.showResults = false;
    this.searchTerm = ''; // Reset search
    this.onSelect.emit(supply);
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showResults = false;
    }
  }
}
