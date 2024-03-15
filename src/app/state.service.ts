import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  userData: ReplaySubject<{username: string, token: string, expireDate: Date} | null>;
  constructor() { 
    this.userData = new ReplaySubject<{username: string, token: string, expireDate: Date} | null>();
  }

  isAuthenticated() {
    return this.userData.pipe(map(data => data != null));
  }
}
