import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ServiceType = 'residencial' | 'prepago' | 'gran-usuario';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private selectedServiceType = new BehaviorSubject<ServiceType>('residencial');
  public selectedServiceType$ = this.selectedServiceType.asObservable();

  constructor() { }

  setServiceType(type: ServiceType) {
    this.selectedServiceType.next(type);
  }
} 