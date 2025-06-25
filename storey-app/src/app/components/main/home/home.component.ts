import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, Supply } from '../../shared/card/card.component';
import { MockDataService, CardData } from '../../../services/mock-data.service';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import {
  switchMap,
  startWith,
  debounceTime,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { StateService, ServiceType } from '../../../services/state.service';
import { AssociateSupplyModalComponent } from '../../shared/associate-supply-modal/associate-supply-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, AssociateSupplyModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private cardDataSubject = new BehaviorSubject<CardData | null>(null);
  cardData$: Observable<CardData | null> = this.cardDataSubject.asObservable();

  private destroy$ = new Subject<void>();

  isAssociateModalOpen = false;
  associableSupplies: Supply[] = [];

  constructor(
    private mockDataService: MockDataService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.subscribeToServiceType();
  }

  subscribeToServiceType() {
    this.stateService.selectedServiceType$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.cardDataSubject.next(null)), // Set loading state
        debounceTime(0),
        switchMap((serviceType) => {
          let scenario: 'single' | 'multi' | 'list';
          switch (serviceType) {
            case 'residencial':
              scenario = 'single';
              break;
            case 'prepago':
              scenario = 'multi';
              break;
            case 'gran-usuario':
              scenario = 'list';
              break;
            default:
              scenario = 'single';
          }
          return this.mockDataService.getCardData(scenario, serviceType);
        })
      )
      .subscribe((data) => {
        this.cardDataSubject.next(data);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openAssociateModal(): void {
    const currentSupplies = this.cardDataSubject.value?.supplies || [];
    const currentSupplyIds = currentSupplies.map((s) => s.id);

    this.mockDataService
      .getAssociableSupplies(currentSupplyIds)
      .subscribe((supplies) => {
        this.associableSupplies = supplies;
        this.isAssociateModalOpen = true;
      });
  }

  closeAssociateModal(): void {
    this.isAssociateModalOpen = false;
  }

  associateNewSupply(supply: Supply): void {
    const currentData = this.cardDataSubject.value;
    if (currentData) {
      const updatedSupplies = [...currentData.supplies, supply];
      const updatedData: CardData = {
        ...currentData,
        supplies: updatedSupplies,
      };
      this.cardDataSubject.next(updatedData);
    }
    this.closeAssociateModal();
  }
}
