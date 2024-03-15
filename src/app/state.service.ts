import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  userData: ReplaySubject<{username: string, token: string, expireDate: Date} | null>;
  constructor() { 
    this.userData = new ReplaySubject<{username: string, token: string, expireDate: Date} | null>();
  }
}
