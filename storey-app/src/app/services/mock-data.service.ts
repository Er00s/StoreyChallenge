import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Supply } from '../components/shared/card/card.component';
import { ServiceType } from './state.service';

const ALL_AVAILABLE_SUPPLIES: Supply[] = [
  { id: '1', address: 'Avenida de la Libertad N°2541', location: 'Centro', alias: 'Oficina Principal' },
  { id: '2', address: 'Calle Falsa 123', location: 'Norte', alias: 'Depósito Norte' },
  { id: '3', address: 'Pasaje de los Sueños Rotos 45', location: 'Sur', alias: 'Casa de Verano' },
  { id: '4', address: 'Bulevar de la Desesperación 789', location: 'Este', alias: 'Taller Este' },
  { id: '5', address: 'Ruta Provincial 66', location: 'Oeste', alias: 'Planta Industrial' },
  { id: '6', address: 'Camino de la Tecnología 101', location: 'Centro', alias: 'Laboratorio I+D' },
  { id: '7', address: 'Avenida Siempreviva 742', location: 'Norte', alias: 'Casa de los Simpsons' },
  { id: '8', address: 'Calle del Olvido s/n', location: 'Sur', alias: 'Finca Abandonada' },
  { id: '9', address: 'Plaza Mayor 1', location: 'Centro', alias: 'Ayuntamiento' },
  { id: '10', address: 'Callejón Diagon', location: 'Oeste', alias: 'Tienda Mágica' },
];

const cardDataSingle = {
  title: 'Domicilio Completo',
  nis: '123456-1',
  alias: 'Casa Principal',
  supplies: ALL_AVAILABLE_SUPPLIES.slice(0, 1),
  tags: [
    { text: 'Factura Vencida', type: 'error' },
    { text: 'Aviso de corte', type: 'warning' }
  ]
};

const cardDataMulti = {
  title: 'Domicilio Completo',
  nis: '123456-2',
  alias: 'Oficina Central',
  supplies: ALL_AVAILABLE_SUPPLIES.slice(0, 3),
  tags: [
    { text: 'Al día', type: 'success' }
  ]
};

const cardDataList = {
  title: 'Domicilio Completo',
  nis: '123456-3',
  alias: 'Sucursal Oeste',
  supplies: ALL_AVAILABLE_SUPPLIES.slice(0, 5),
  tags: [
    { text: 'Débito automático', type: 'success' }
  ]
};

export interface CardData {
  title: string;
  nis: string;
  alias: string;
  supplies: Supply[];
  tags: { text: string; type: 'success' | 'warning' | 'error' }[];
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  getCardData(scenario: 'single' | 'multi' | 'list', serviceType: ServiceType): Observable<CardData> {
    let supplies: Supply[] = [];
    let alias = '';
    
    // Customize data based on serviceType
    const typeTitle = serviceType.charAt(0).toUpperCase() + serviceType.slice(1).replace('-', ' ');

    switch(scenario) {
      case 'single':
        supplies = ALL_AVAILABLE_SUPPLIES.slice(0, 1);
        alias = "Casa Principal";
        break;
      case 'multi':
        supplies = ALL_AVAILABLE_SUPPLIES.slice(0, 3);
        alias = "Oficina Central";
        break;
      case 'list':
        supplies = ALL_AVAILABLE_SUPPLIES.slice(0, 5);
        alias = "Propiedades Varias";
        break;
    }
    
    const data: CardData = {
      title: `${typeTitle} - Domicilio`,
      nis: `123456-${scenario === 'single' ? 1 : scenario === 'multi' ? 2 : 3}`,
      alias,
      supplies,
      tags: [
        { text: `Dato de ${serviceType}`, type: 'success' },
        { text: 'Dato de prueba', type: 'warning' }
      ]
    };

    return of(data).pipe(delay(500)); // Simular latencia de red
  }
  
  searchSupplies(term: string): Observable<Supply[]> {
    if (!term.trim()) {
      return of([]);
    }
    
    const filtered = ALL_AVAILABLE_SUPPLIES.filter(supply => 
      supply.address.toLowerCase().includes(term.toLowerCase()) ||
      supply.location.toLowerCase().includes(term.toLowerCase())
    );

    return of(filtered).pipe(delay(500)); 
  }

  getAssociableSupplies(currentSupplyIds: string[]): Observable<Supply[]> {
    const associable = ALL_AVAILABLE_SUPPLIES.filter(s => !currentSupplyIds.includes(s.id));
    return of(associable).pipe(delay(300));
  }
}
