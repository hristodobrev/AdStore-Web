import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  userData: BehaviorSubject<{username: string, token: string, expireDate: Date} | null>;
  constructor() { 
    this.userData = new BehaviorSubject<{username: string, token: string, expireDate: Date} | null>(null);
  }
}
